import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { createEmployee, fetchEmployees, removeEmployee, updateEmployee as updateEmployeeApi } from "../api/employeeService";

const EmployeeContext = createContext(null);

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchEmployees()
      .then((data) => {
        if (mounted) {
          setEmployees(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message || "Unable to load employees");
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const addEmployee = useCallback(async (employee) => {
    const created = await createEmployee(employee);
    setEmployees((prev) => [created, ...prev]);
    return created;
  }, []);

  const updateEmployee = useCallback(async (id, updates) => {
    const updated = await updateEmployeeApi(id, updates);
    setEmployees((prev) => prev.map((emp) => (emp.id === id ? { ...emp, ...updated } : emp)));
    return updated;
  }, []);

  const deleteEmployee = useCallback(async (id) => {
    await removeEmployee(id);
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    return id;
  }, []);

  const value = useMemo(
    () => ({
      employees,
      loading,
      error,
      addEmployee,
      updateEmployee,
      deleteEmployee,
    }),
    [employees, loading, error, addEmployee, updateEmployee, deleteEmployee]
  );

  return <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>;
}

export function useEmployees() {
  const ctx = useContext(EmployeeContext);
  if (!ctx) throw new Error("useEmployees must be used within EmployeeProvider");
  return ctx;
}

