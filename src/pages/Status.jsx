import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Info, Calendar, Clock, AlertCircle } from "lucide-react";
import { statusData } from "../data/statusData";

export default function Status() {
      const { darkMode } = useOutletContext();
      const { columns, employees: initialEmployees } = statusData;
      const [employees, setEmployees] = useState(initialEmployees);
      const [draggedId, setDraggedId] = useState(null);
      const [overColumn, setOverColumn] = useState(null);

      const getEmployeesByStatus = (statusId) => employees.filter((emp) => emp.status === statusId);

      const handleDrop = (columnId, employeeId) => {
            setEmployees((prev) =>
                  prev.map((emp) => (emp.id === employeeId ? { ...emp, status: columnId } : emp))
            );
            setDraggedId(null);
            setOverColumn(null);
      };

      return (
            <div
                  className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
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
                                                const droppedId = e.dataTransfer.getData("text/plain") || draggedId;
                                                if (droppedId) handleDrop(col.id, droppedId);
                                          }}
                                    >
                                          <div className={`flex items-center justify-between p-3 rounded-t-xl ${col.color} ${col.textColor} font-bold`}>
                                                <span>{col.title}</span>
                                                <span className="bg-white/30 px-2 py-0.5 rounded-full text-sm">{colEmployees.length}</span>
                                          </div>
                                          <div
                                                className={`p-4 rounded-b-xl min-h-[500px] border-2 transition-colors ${isActiveDrop ? "border-dashed border-blue-400" : "border-transparent"} ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
                                          >
                                                <div className="space-y-4">
                                                      {colEmployees.map((emp) => (
                                                            <div
                                                                  key={emp.id}
                                                                  draggable
                                                                  onDragStart={(e) => {
                                                                        setDraggedId(emp.id);
                                                                        e.dataTransfer.setData("text/plain", emp.id);
                                                                        e.dataTransfer.effectAllowed = "move";
                                                                  }}
                                                                  onDragEnd={() => {
                                                                        setDraggedId(null);
                                                                        setOverColumn(null);
                                                                  }}
                                                                  className={`p-4 rounded-lg shadow-sm border transition-shadow hover:shadow-md cursor-move ${draggedId === emp.id ? "opacity-80" : "opacity-100"} ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"}`}
                                                            >
                                                                  <div className="flex items-center gap-3 mb-3">
                                                                        <img src={emp.avatar} alt={emp.name} className="w-10 h-10 rounded-full object-cover" />
                                                                        <div>
                                                                              <h3 className="font-semibold text-sm">{emp.name}</h3>
                                                                              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{emp.role}</p>
                                                                        </div>
                                                                  </div>

                                                                  {emp.status === "probation" && (
                                                                        <div className={`flex items-center gap-2 text-xs p-2 rounded ${darkMode ? "bg-blue-900/30 text-blue-200" : "bg-blue-50 text-blue-700"}`}>
                                                                              <Clock size={14} />
                                                                              <span>Ends: {emp.probationEnd}</span>
                                                                        </div>
                                                                  )}

                                                                  {emp.status === "notice" && (
                                                                        <div className={`flex items-center gap-2 text-xs p-2 rounded ${darkMode ? "bg-red-900/30 text-red-200" : "bg-red-50 text-red-700"}`}>
                                                                              <AlertCircle size={14} />
                                                                              <span>Last Day: {emp.noticeEnd}</span>
                                                                        </div>
                                                                  )}

                                                                  {emp.status === "active" && (
                                                                        <div className={`flex items-center gap-2 text-xs p-2 rounded ${darkMode ? "bg-green-900/30 text-green-200" : "bg-green-50 text-green-700"}`}>
                                                                              <Calendar size={14} />
                                                                              <span>Joined: {emp.joinedDate}</span>
                                                                        </div>
                                                                  )}
                                                            </div>
                                                      ))}
                                                      {colEmployees.length === 0 && (
                                                            <div className={`text-center py-8 text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                                                                  No employees in this status
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
