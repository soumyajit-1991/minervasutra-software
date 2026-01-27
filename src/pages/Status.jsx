// import { useState, useEffect } from "react";
// import { useOutletContext } from "react-router-dom";
// import { Info, Calendar, Clock, AlertCircle } from "lucide-react";

// export default function Status() {
//       const { darkMode } = useOutletContext();
//       const columns = [
//             { id: "active", title: "Active", color: "bg-green-100 dark:bg-green-900", textColor: "text-green-800 dark:text-green-100" },
//             { id: "probation", title: "Probation", color: "bg-blue-100 dark:bg-blue-900", textColor: "text-blue-800 dark:text-blue-100" },
//             { id: "notice", title: "Notice Period", color: "bg-red-100 dark:bg-red-900", textColor: "text-red-800 dark:text-red-100" },
//       ];
//       const [employees, setEmployees] = useState([]);
//       const [loading, setLoading] = useState(true);
//       const [draggedId, setDraggedId] = useState(null);
//       const [overColumn, setOverColumn] = useState(null);

//       useEffect(() => {
//             // TODO: Replace with actual API call to fetch employee status data
//             setLoading(false);
//       }, []);

//       const getEmployeesByStatus = (statusId) => employees.filter((emp) => emp.status === statusId);

//       const handleDrop = (columnId, employeeId) => {
//             setEmployees((prev) =>
//                   prev.map((emp) => (emp.id === employeeId ? { ...emp, status: columnId } : emp))
//             );
//             setDraggedId(null);
//             setOverColumn(null);
//       };

//       if (loading) {
//             return (
//                   <div className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
//                         <div className="text-center py-12">
//                               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//                               <p className="mt-4">Loading employee status...</p>
//                         </div>
//                   </div>
//             );
//       }

//       return (
//             <div
//                   className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
//                         }`}
//             >
//                   <div className="flex justify-between items-center mb-6">
//                         <h1 className="text-2xl font-bold flex items-center gap-2">
//                               <Info /> Employee Status Board
//                         </h1>
//                   </div>

//                   <div className="flex gap-6 overflow-x-auto pb-4">
//                         {columns.map((col) => {
//                               const colEmployees = getEmployeesByStatus(col.id);
//                               const isActiveDrop = overColumn === col.id;

//                               return (
//                                     <div
//                                           key={col.id}
//                                           className="min-w-[320px] flex-1"
//                                           onDragOver={(e) => {
//                                                 e.preventDefault();
//                                                 setOverColumn(col.id);
//                                           }}
//                                           onDragLeave={() => setOverColumn(null)}
//                                           onDrop={(e) => {
//                                                 e.preventDefault();
//                                                 const droppedId = e.dataTransfer.getData("text/plain") || draggedId;
//                                                 if (droppedId) handleDrop(col.id, droppedId);
//                                           }}
//                                     >
//                                           <div className={`flex items-center justify-between p-3 rounded-t-xl ${col.color} ${col.textColor} font-bold`}>
//                                                 <span>{col.title}</span>
//                                                 <span className="bg-white/30 px-2 py-0.5 rounded-full text-sm">{colEmployees.length}</span>
//                                           </div>
//                                           <div
//                                                 className={`p-4 rounded-b-xl min-h-[500px] border-2 transition-colors ${isActiveDrop ? "border-dashed border-blue-400" : "border-transparent"} ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
//                                           >
//                                                 <div className="space-y-4">
//                                                       {colEmployees.map((emp) => (
//                                                             <div
//                                                                   key={emp.id}
//                                                                   draggable
//                                                                   onDragStart={(e) => {
//                                                                         setDraggedId(emp.id);
//                                                                         e.dataTransfer.setData("text/plain", emp.id);
//                                                                         e.dataTransfer.effectAllowed = "move";
//                                                                   }}
//                                                                   onDragEnd={() => {
//                                                                         setDraggedId(null);
//                                                                         setOverColumn(null);
//                                                                   }}
//                                                                   className={`p-4 rounded-lg shadow-sm border transition-shadow hover:shadow-md cursor-move ${draggedId === emp.id ? "opacity-80" : "opacity-100"} ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"}`}
//                                                             >
//                                                                   <div className="flex items-center gap-3 mb-3">
//                                                                         <img src={emp.avatar} alt={emp.name} className="w-10 h-10 rounded-full object-cover" />
//                                                                         <div>
//                                                                               <h3 className="font-semibold text-sm">{emp.name}</h3>
//                                                                               <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{emp.role}</p>
//                                                                         </div>
//                                                                   </div>

//                                                                   {emp.status === "probation" && (
//                                                                         <div className={`flex items-center gap-2 text-xs p-2 rounded ${darkMode ? "bg-blue-900/30 text-blue-200" : "bg-blue-50 text-blue-700"}`}>
//                                                                               <Clock size={14} />
//                                                                               <span>Ends: {emp.probationEnd}</span>
//                                                                         </div>
//                                                                   )}

//                                                                   {emp.status === "notice" && (
//                                                                         <div className={`flex items-center gap-2 text-xs p-2 rounded ${darkMode ? "bg-red-900/30 text-red-200" : "bg-red-50 text-red-700"}`}>
//                                                                               <AlertCircle size={14} />
//                                                                               <span>Last Day: {emp.noticeEnd}</span>
//                                                                         </div>
//                                                                   )}

//                                                                   {emp.status === "active" && (
//                                                                         <div className={`flex items-center gap-2 text-xs p-2 rounded ${darkMode ? "bg-green-900/30 text-green-200" : "bg-green-50 text-green-700"}`}>
//                                                                               <Calendar size={14} />
//                                                                               <span>Joined: {emp.joinedDate}</span>
//                                                                         </div>
//                                                                   )}
//                                                             </div>
//                                                       ))}
//                                                       {colEmployees.length === 0 && (
//                                                             <div className={`text-center py-8 text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
//                                                                   {employees.length === 0 ? "No employee data available" : "No employees in this status"}
//                                                             </div>
//                                                       )}
//                                                 </div>
//                                           </div>
//                                     </div>
//                               );
//                         })}
//                   </div>
//             </div>
//       );
// }



import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { Info, Calendar, Clock, AlertCircle } from "lucide-react";

export default function Status() {
  const { darkMode } = useOutletContext();

  const columns = [
    {
      id: "active",
      title: "Active",
      color: "bg-green-100 dark:bg-green-900",
      textColor: "text-green-800 dark:text-green-100",
    },
    {
      id: "probation",
      title: "Probation",
      color: "bg-blue-100 dark:bg-blue-900",
      textColor: "text-blue-800 dark:text-blue-100",
    },
    {
      id: "notice",
      title: "Notice Period",
      color: "bg-red-100 dark:bg-red-900",
      textColor: "text-red-800 dark:text-red-100",
    },
  ];

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draggedId, setDraggedId] = useState(null);
  const [overColumn, setOverColumn] = useState(null);

  /* ================= FETCH EMPLOYEES ================= */
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("https://hr-management-r6bh.vercel.app/api/employees");

        const normalized = res.data.map((emp) => ({
          id: emp._id,
          name: emp.name,
          email: emp.email,
          role: emp.role,
          avatar: emp.avatarUrl || "https://i.pravatar.cc/100",
          joinedDate: emp.joinedDate
            ? new Date(emp.joinedDate).toLocaleDateString()
            : "N/A",
          probationEnd: emp.probationEnd || "N/A",
          noticeEnd: emp.noticeEnd || "N/A",

          // 🔥 STATUS NORMALIZATION (VERY IMPORTANT)
          status:
            emp.status === "Active"
              ? "active"
              : emp.status === "Probation"
              ? "probation"
              : "notice",
        }));

        setEmployees(normalized);
      } catch (err) {
        console.error("Failed to fetch employees", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  /* ================= HELPERS ================= */
  const getEmployeesByStatus = (statusId) =>
    employees.filter((emp) => emp.status === statusId);

  const handleDrop = (columnId, employeeId) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === employeeId ? { ...emp, status: columnId } : emp
      )
    );
    setDraggedId(null);
    setOverColumn(null);

    // 🔥 OPTIONAL (future)
    // axios.put(`/api/employees/${employeeId}`, { status: columnId });
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div
        className={`p-6 ml-64 mt-16 min-h-screen ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
        }`}
      >
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4">Loading employee status...</p>
        </div>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div
      className={`p-6 ml-64 mt-16 min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Info /> Employee Status Board
        </h1>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {columns.map((col) => {
          const colEmployees = getEmployeesByStatus(col.id);
          const isActiveDrop = overColumn === col.id;

          return (
            <div
              key={col.id}
              className="min-w-[320px] flex-1"
              onDragOver={(e) => {
                e.preventDefault();
                setOverColumn(col.id);
              }}
              onDragLeave={() => setOverColumn(null)}
              onDrop={(e) => {
                e.preventDefault();
                const droppedId =
                  e.dataTransfer.getData("text/plain") || draggedId;
                if (droppedId) handleDrop(col.id, droppedId);
              }}
            >
              {/* COLUMN HEADER */}
              <div
                className={`flex items-center justify-between p-3 rounded-t-xl ${col.color} ${col.textColor} font-bold`}
              >
                <span>{col.title}</span>
                <span className="bg-white/30 px-2 py-0.5 rounded-full text-sm">
                  {colEmployees.length}
                </span>
              </div>

              {/* COLUMN BODY */}
              <div
                className={`p-4 rounded-b-xl min-h-[500px] border-2 transition-colors ${
                  isActiveDrop
                    ? "border-dashed border-blue-400"
                    : "border-transparent"
                } ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
              >
                <div className="space-y-4">
                  {colEmployees.map((emp) => (
                    <div
                      key={emp.id}
                      draggable
                      onDragStart={(e) => {
                        setDraggedId(emp.id);
                        e.dataTransfer.setData("text/plain", emp.id);
                      }}
                      onDragEnd={() => {
                        setDraggedId(null);
                        setOverColumn(null);
                      }}
                      className={`p-4 rounded-lg shadow-sm border cursor-move transition-shadow hover:shadow-md ${
                        darkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      {/* EMPLOYEE INFO */}
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-sm">
                            {emp.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {emp.email}
                          </p>
                          <p className="text-xs italic">{emp.role}</p>
                        </div>
                      </div>

                      {/* STATUS INFO */}
                      {emp.status === "probation" && (
                        <div
                          className={`flex items-center gap-2 text-xs p-2 rounded ${
                            darkMode
                              ? "bg-blue-900/30 text-blue-200"
                              : "bg-blue-50 text-blue-700"
                          }`}
                        >
                          <Clock size={14} />
                          <span>Ends: {emp.probationEnd}</span>
                        </div>
                      )}

                      {emp.status === "notice" && (
                        <div
                          className={`flex items-center gap-2 text-xs p-2 rounded ${
                            darkMode
                              ? "bg-red-900/30 text-red-200"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          <AlertCircle size={14} />
                          <span>Last Day: {emp.noticeEnd}</span>
                        </div>
                      )}

                      {emp.status === "active" && (
                        <div
                          className={`flex items-center gap-2 text-xs p-2 rounded ${
                            darkMode
                              ? "bg-green-900/30 text-green-200"
                              : "bg-green-50 text-green-700"
                          }`}
                        >
                          <Calendar size={14} />
                          <span>Joined: {emp.joinedDate}</span>
                        </div>
                      )}
                    </div>
                  ))}

                  {colEmployees.length === 0 && (
                    <div
                      className={`text-center py-8 text-sm ${
                        darkMode ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {employees.length === 0
                        ? "No employee data available"
                        : "No employees in this status"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
