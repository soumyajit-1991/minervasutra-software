import { useEffect, useState } from "react";
import axios from "axios";

export default function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const employeeEmail = user?.email;

  useEffect(() => {
    if (!employeeEmail) return;

    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/tasks/employee/${employeeEmail}`
        );
        setTasks(res.data || []);
      } catch (err) {
        console.error("Task fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [employeeEmail]);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        Loading tasks...
      </div>
    );
  }

  // 📊 STATS
  const totalTasks = tasks.length;
  const inProgress = tasks.filter(t => t.status === "In Progress").length;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const overdue = tasks.filter(t => t.status === "Overdue").length;

  return (
    <div className="space-y-6">
      {/* ===== STATS CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Tasks" value={totalTasks} />
        <StatCard title="In Progress" value={inProgress} />
        <StatCard title="Completed" value={completed} />
        <StatCard title="Overdue" value={overdue} />
      </div>

      {/* ===== TASK LIST ===== */}
      <div className="bg-white rounded-xl shadow">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-lg font-bold">All Tasks</h2>

          <div className="flex gap-3">
            <select className="border rounded px-3 py-1 text-sm">
              <option>All Status</option>
            </select>

            <select className="border rounded px-3 py-1 text-sm">
              <option>All Priority</option>
            </select>
          </div>
        </div>

        {tasks.length === 0 ? (
          <p className="p-6 text-gray-500">
            No tasks assigned to you.
          </p>
        ) : (
          <div className="divide-y">
            {tasks.map(task => (
              <div
                key={task._id}
                className="p-6 flex flex-col lg:flex-row lg:justify-between gap-6"
              >
                {/* LEFT */}
                <div className="flex gap-4">
                  <img
                    src="https://i.pravatar.cc/100"
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />

                  <div>
                    <h3 className="font-semibold">
                      {task.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      Assigned to {task.assignedToName} • {task.taskCode}
                    </p>

                    <p className="text-sm text-gray-600 mt-2">
                      {task.description}
                    </p>

                    {/* TAGS */}
                    {task.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {task.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs rounded bg-gray-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col items-end gap-3 text-sm">
                  {/* STATUS */}
                  <span
                    className={`px-3 py-1 rounded-full font-medium ${
                      task.status === "In Progress"
                        ? "bg-blue-100 text-blue-700"
                        : task.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {task.status}
                  </span>

                  {/* PRIORITY */}
                  <span
                    className={`px-3 py-1 rounded-full font-medium ${
                      task.priority === "High"
                        ? "bg-orange-100 text-orange-700"
                        : task.priority === "Critical"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {task.priority}
                  </span>

                  {/* DUE DATE */}
                  {task.dueDate && (
                    <p className="text-gray-500">
                      📅 Due:{" "}
                      {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  )}

                  {/* CATEGORY */}
                  {task.category && (
                    <span className="px-3 py-1 rounded bg-gray-100">
                      {task.category}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ===== SMALL COMPONENT ===== */
function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
