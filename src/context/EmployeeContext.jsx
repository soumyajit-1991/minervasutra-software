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




import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://hr-management-backend-sable.vercel.app/api/employees");
      setEmployees(res.data);
      
      // Set the first employee as current user (you can modify this logic)
      if (res.data.length > 0) {
        setCurrentEmployee(prev => prev || res.data[0]);
      }
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch all employees on mount
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // 🔥 This function is used in AddEmployee.jsx
  const addEmployee = async (employeeData) => {
    try {
      const res = await axios.post(
        "https://hr-management-backend-sable.vercel.app/api/employees",
        employeeData
      );

      setEmployees((prev) => [res.data, ...prev]);
      
      // If no current employee is set, set the newly created one
      if (!currentEmployee) {
        setCurrentEmployee(res.data);
      }
      
      return res.data;
    } catch (error) {
      console.error('Failed to create employee:', error.response?.data || error);
      throw error;
    }
  };

  return (
    <EmployeeContext.Provider value={{ 
      employees, 
      loading, 
      currentEmployee, 
      addEmployee, 
      fetchEmployees,
      setCurrentEmployee 
    }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => useContext(EmployeeContext);
