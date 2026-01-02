// import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
// import { createEmployee, fetchEmployees, removeEmployee, updateEmployee as updateEmployeeApi } from "../api/employeeService";
// import { toast } from "../utils/notifications";
// import { dataCache } from "../utils/dataCache";

// const EmployeeContext = createContext(null);

// export function EmployeeProvider({ children }) {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let mounted = true;
//     fetchEmployees()
//       .then((data) => {
//         if (mounted) {
//           setEmployees(data);
//           setError(null);
//         }
//       })
//       .catch((err) => {
//         if (mounted) {
//           setError(err.message || "Unable to load employees");
//         }
//       })
//       .finally(() => {
//         if (mounted) setLoading(false);
//       });
//     return () => {
//       mounted = false;
//     };
//   }, []);

//   const addEmployee = useCallback(async (employee) => {
//     try {
//       const created = await createEmployee(employee);
//       setEmployees((prev) => [created, ...prev]);
//       dataCache.clear(); // Clear all cache when data changes
//       toast.success('Employee created successfully!');
//       return created;
//     } catch (error) {
//       toast.error('Failed to create employee: ' + error.message);
//       throw error;
//     }
//   }, []);

//   const updateEmployee = useCallback(async (id, updates) => {
//     try {
//       const updated = await updateEmployeeApi(id, updates);
//       setEmployees((prev) => prev.map((emp) => (emp._id === id ? { ...emp, ...updated } : emp)));
//       dataCache.clear(); // Clear all cache when data changes
//       toast.success('Employee updated successfully!');
//       return updated;
//     } catch (error) {
//       toast.error('Failed to update employee: ' + error.message);
//       throw error;
//     }
//   }, []);

//   const deleteEmployee = useCallback(async (id) => {
//     try {
//       await removeEmployee(id);
//       setEmployees((prev) => prev.filter((emp) => emp._id !== id));
//       dataCache.clear(); // Clear all cache when data changes
//       toast.success('Employee deleted successfully!');
//       return id;
//     } catch (error) {
//       toast.error('Failed to delete employee: ' + error.message);
//       throw error;
//     }
//   }, []);

//   const refreshEmployees = useCallback(async () => {
//     try {
//       setLoading(true);
//       const data = await fetchEmployees();
//       setEmployees(data);
//       setError(null);
//     } catch (err) {
//       setError(err.message || "Unable to load employees");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const value = useMemo(
//     () => ({
//       employees,
//       loading,
//       error,
//       addEmployee,
//       updateEmployee,
//       deleteEmployee,
//       refreshEmployees,
//       totalEmployees: employees.length
//     }),
//     [employees, loading, error, addEmployee, updateEmployee, deleteEmployee, refreshEmployees]
//   );

//   return <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>;
// }

// export function useEmployees() {
//   const ctx = useContext(EmployeeContext);
//   if (!ctx) throw new Error("useEmployees must be used within EmployeeProvider");
//   return ctx;
// }



import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const EmployeeContext = createContext(null);

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API = "https://hr-management-backend-w6w4.vercel.app/api/employees";

  /* ===================== FETCH EMPLOYEES ===================== */
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setEmployees(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  /* ===================== DELETE EMPLOYEE ===================== */
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
    } catch (err) {
      console.error("Delete employee failed", err);
      throw err;
    }
  };

  /* ===================== UPDATE EMPLOYEE ===================== */
  const updateEmployee = async (id, data) => {
    try {
      const res = await axios.put(`${API}/${id}`, data);
      setEmployees((prev) =>
        prev.map((emp) => (emp._id === id ? res.data : emp))
      );
    } catch (err) {
      console.error("Update employee failed", err);
      const errorMsg = err.response?.data?.error || err.message;
      console.error("Error details:", errorMsg);
      throw new Error(errorMsg);
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        loading,
        error,
        fetchEmployees,
        deleteEmployee, // ✅ REQUIRED
        updateEmployee, // ✅ REQUIRED
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export const useEmployees = () => {
  const ctx = useContext(EmployeeContext);
  if (!ctx) {
    throw new Error("useEmployees must be used inside EmployeeProvider");
  }
  return ctx;
};
