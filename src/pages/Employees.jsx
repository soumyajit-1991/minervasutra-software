import { useEffect, useMemo, useRef, useState } from "react";
import { Plus, Edit, Eye, Trash2, Search, Filter, Download, X } from "lucide-react";
import { useOutletContext, useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import Card from "../components/common/Card";
import PageHeader from "../components/common/PageHeader";
import StatBadge from "../components/common/StatBadge";
import { useEmployees } from "../context/EmployeeContext";

export default function EmployeePage() {
  const { darkMode } = useOutletContext();
  const navigate = useNavigate();
  const { employees, loading, error, deleteEmployee, updateEmployee } = useEmployees();

  const [filterMode, setFilterMode] = useState("week");
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [sortKey, setSortKey] = useState("name");
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelMode, setPanelMode] = useState("view");
  const [selected, setSelected] = useState(null);
  const [editable, setEditable] = useState(null);

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const uniqueRoles = useMemo(
    () => ["all", ...new Set(employees.map((e) => e.role))],
    [employees]
  );

  const uniqueLocations = useMemo(
    () =>
      ["all", ...new Set(employees.map((e) => e.location || "").filter(Boolean))],
    [employees]
  );

  const filteredEmployees = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return employees
      .filter((e) => (roleFilter === "all" ? true : e.role === roleFilter))
      .filter((e) => (locationFilter === "all" ? true : e.location === locationFilter))
      .filter(
        (e) =>
          e.name.toLowerCase().includes(term) ||
          e.email.toLowerCase().includes(term) ||
          (e._id && e._id.toLowerCase().includes(term))
      )
      .sort((a, b) => {
        if (sortKey === "salary") return b.salary - a.salary;
        if (sortKey === "role") return a.role.localeCompare(b.role);
        return a.name.localeCompare(b.name);
      });
  }, [employees, roleFilter, locationFilter, searchTerm, sortKey]);

  const stats = useMemo(() => {
    const total = employees.length;
    const byRole = employees.reduce((acc, emp) => {
      acc[emp.role] = (acc[emp.role] || 0) + 1;
      return acc;
    }, {});
    const avgSalary = total === 0 ? 0 : Math.round(employees.reduce((s, e) => s + e.salary, 0) / total);
    return { total, byRole, avgSalary };
  }, [employees]);

  useEffect(() => {
    if (!chartRef.current || loading) return;

    const ctx = chartRef.current.getContext("2d");
    if (chartInstance.current) chartInstance.current.destroy();

    const labels = filteredEmployees.map((emp) => emp.name);
    let data;
    let maxValue;

    if (filterMode === "month") {
      data = filteredEmployees.map((emp) => emp.hoursWorked[emp.hoursWorked.length - 1].hours);
      maxValue = 200;
    } else if (filterMode === "week") {
      data = filteredEmployees.map((emp) => Math.round(emp.hoursWorked[emp.hoursWorked.length - 1].hours / 4));
      maxValue = 50;
    } else {
      data = filteredEmployees.map((emp) => emp.hoursWorked.reduce((sum, entry) => sum + entry.hours, 0));
      maxValue = 2000;
    }

    const textColor = darkMode ? "#cbd5e1" : "#1f2937";

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label:
              filterMode === "month"
                ? "Hours Worked (This Month)"
                : filterMode === "week"
                  ? "Hours Worked (This Week)"
                  : "Hours Worked (Year)",
            data,
            backgroundColor: ["rgba(14, 165, 233, 0.6)"],
            borderColor: ["rgba(14, 165, 233, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: "y",
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
            max: maxValue,
            ticks: { color: textColor },
            title: { display: true, text: "Hours", color: textColor },
          },
          y: {
            ticks: { color: textColor },
            title: { display: true, text: "Employees", color: textColor },
          },
        },
        plugins: {
          legend: {
            labels: { color: textColor },
          },
        },
      },
    });

    return () => chartInstance.current?.destroy();
  }, [filteredEmployees, filterMode, darkMode, loading]);

  const handleAddEmployee = () => {
    navigate("/add-new-employee");
  };

  const openPanel = (mode, employee) => {
    setPanelMode(mode);
    setSelected(employee);
    setEditable(employee ? { ...employee } : null);
    setPanelOpen(true);
  };

 const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this employee?")) {
    deleteEmployee(id);
  }
};

const handleSaveEdit = async (e) => {
  e.preventDefault();
  if (selected && editable) {
    try {
      // Only send fields that should be updated
      const updateData = {
        name: editable.name,
        phone: editable.phone,
        email: editable.email,
        department: editable.department,
        location: editable.location,
        role: editable.role,
        salary: editable.salary
      };
      await updateEmployee(selected._id, updateData);
      setPanelOpen(false);
    } catch (error) {
      console.error("Failed to update employee:", error);
      alert(`Failed to update employee: ${error.message}`);
    }
  }
};


  const exportCsv = () => {
    const rows = filteredEmployees.map((emp) => ({
      id: emp._id,
      name: emp.name,
      phone: emp.phone,
      email: emp.email,
      department: emp.department,
      location: emp.location,
      role: emp.role,
      salary: emp.salary,
    }));
    const header = Object.keys(rows[0] || {}).join(",");
    const body = rows.map((r) => Object.values(r).join(",")).join("\n");
    const blob = new Blob([`${header}\n${body}`], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "employees.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`space-y-6 transition-colors duration-300 ml-64 pt-20 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"
        }`}
    >
      <PageHeader
        title="Employee Management"
        description="Manage employee records, filters, and hours worked."
        action={
          <button
            onClick={handleAddEmployee}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            <Plus size={18} />
            Add New Employee
          </button>
        }
      >
        <button
          onClick={exportCsv}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
          aria-label="Export employees as CSV"
        >
          <Download size={16} />
          Export CSV
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatBadge label="Total Employees" value={stats.total} />
        {Object.entries(stats.byRole).map(([role, count]) => (
          <StatBadge key={role} label={`Role: ${role}`} value={count} />
        ))}
        <StatBadge label="Avg Salary" value={`₹${stats.avgSalary}`} />
      </div>

      <Card className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="flex flex-1 items-center gap-2">
            <Search size={16} className="text-gray-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, or ID"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-400 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              aria-label="Search employees"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Filter size={16} className="text-gray-400" aria-hidden />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
              aria-label="Filter by role"
            >
              {uniqueRoles.map((role) => (
                <option key={role} value={role}>
                  {role === "all" ? "All Roles" : role}
                </option>
              ))}
            </select>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
              aria-label="Filter by location"
            >
              {uniqueLocations.map((city) => (
                <option key={city} value={city}>
                  {city === "all" ? "All Locations" : city}
                </option>
              ))}
            </select>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
              aria-label="Sort employees"
            >
              <option value="name">Sort: Name</option>
              <option value="salary">Sort: Salary</option>
              <option value="role">Sort: Role</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Employee List</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">{filteredEmployees.length} shown</span>
        </div>
        {error && (
          <div className="mb-3 rounded-md border border-orange-300 bg-orange-50 px-3 py-2 text-sm text-orange-800 dark:border-orange-700 dark:bg-orange-900/30 dark:text-orange-100">
            {error}
          </div>
        )}
        <div className="overflow-x-auto">
          <table
            className={`min-w-[1100px] border rounded-lg text-left ${darkMode ? "border-gray-600" : "border-gray-200"}`}
          >
            <thead className={`${darkMode ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-900"} sticky top-0 z-10`}>
              <tr>
                <th className="p-3">Employee ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Email</th>
                <th className="p-3">Department</th>
                <th className="p-3">Location</th>
                <th className="p-3">Role</th>
                <th className="p-3">Salary</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="p-4 text-center text-sm text-gray-500">
                    Loading employees...
                  </td>
                </tr>
              ) : filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="9" className="p-4 text-center text-sm text-gray-500">
                    No employees match these filters.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr
                    key={emp._id}
                    className={`border-t transition-colors duration-300 ${darkMode ? "border-gray-600 hover:bg-gray-700" : "border-gray-200 hover:bg-gray-50"
                      }`}
                  >
                    <td className="p-3">{emp._id}</td>
                    <td className="p-3 font-medium">{emp.name}</td>
                    <td className="p-3">{emp.phone}</td>
                    <td className="p-3">{emp.email}</td>
                    <td className="p-3">{emp.department}</td>
                    <td className="p-3">{emp.location}</td>
                    <td className="p-3">{emp.role}</td>
                    <td className="p-3">₹{emp.salary}</td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => openPanel("view", emp)}
                        className="rounded bg-green-600 px-3 py-2 text-white transition hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
                        aria-label={`View ${emp.name}`}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => openPanel("edit", emp)}
                        className="rounded bg-blue-600 px-3 py-2 text-white transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                        aria-label={`Edit ${emp.name}`}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(emp._id)}
                        className="rounded bg-orange-600 px-3 py-2 text-white transition hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
                        aria-label={`Delete ${emp.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* <Card className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <h3 className="text-lg font-semibold">Employee Hours Worked</h3>
          <div className="flex gap-2">
            {["week", "month", "year"].map((mode) => (
              <button
                key={mode}
                onClick={() => setFilterMode(mode)}
                className={`rounded-md px-3 py-1 text-sm border transition ${filterMode === mode
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
                  }`}
                aria-pressed={filterMode === mode}
              >
                {mode === "week" ? "This Week" : mode === "month" ? "This Month" : "This Year"}
              </button>
            ))}
          </div>
        </div>
        <div className="h-64">
          <canvas ref={chartRef} aria-label="Employee hours chart" />
        </div>
      </Card> */}

      {panelOpen && selected && (
        <div
          className="fixed inset-0 z-40 flex justify-end bg-black/40"
          role="dialog"
          aria-modal="true"
          aria-label={`${panelMode === "view" ? "View" : "Edit"} ${selected.name}`}
        >
          <div className="w-full max-w-md h-full bg-white dark:bg-gray-800 shadow-xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-semibold">
                {panelMode === "view" ? "Employee Details" : "Edit Employee"}
              </h4>
              <button
                onClick={() => setPanelOpen(false)}
                className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Close panel"
              >
                <X size={18} />
              </button>
            </div>

            {panelMode === "view" && (
              <div className="space-y-3 text-sm">
                <InfoRow label="Employee ID" value={selected._id} />
                <InfoRow label="Name" value={selected.name} />
                <InfoRow label="Phone" value={selected.phone} />
                <InfoRow label="Email" value={selected.email} />
                <InfoRow label="Department" value={selected.department} />
                <InfoRow label="Location" value={selected.location} />
                <InfoRow label="Role" value={selected.role} />
                <InfoRow label="Salary" value={`₹${selected.salary}`} />
                <InfoRow label="Gender" value={selected.personalInfo?.gender || 'Not specified'} />
                <InfoRow label="Address" value={selected.personalInfo?.address || 'Not specified'} />
              </div>
            )}

            {panelMode === "edit" && editable && (
              <form onSubmit={handleSaveEdit} className="space-y-3">
                <LabeledInput
                  label="Name"
                  value={editable.name}
                  onChange={(e) => setEditable({ ...editable, name: e.target.value })}
                  required
                />
                <LabeledInput
                  label="Phone"
                  value={editable.phone}
                  onChange={(e) => setEditable({ ...editable, phone: e.target.value })}
                  required
                />
                <LabeledInput
                  label="Email"
                  type="email"
                  value={editable.email}
                  onChange={(e) => setEditable({ ...editable, email: e.target.value })}
                  required
                />
                <LabeledInput
                  label="Department"
                  value={editable.department}
                  onChange={(e) => setEditable({ ...editable, department: e.target.value })}
                  required
                />
                <LabeledInput
                  label="Location"
                  value={editable.location}
                  onChange={(e) => setEditable({ ...editable, location: e.target.value })}
                  required
                />
                <LabeledInput
                  label="Role"
                  value={editable.role}
                  onChange={(e) => setEditable({ ...editable, role: e.target.value })}
                  required
                />
                <LabeledInput
                  label="Salary"
                  type="number"
                  value={editable.salary}
                  onChange={(e) => setEditable({ ...editable, salary: Number(e.target.value) || 0 })}
                  required
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setPanelOpen(false)}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function LabeledInput({ label, ...props }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-gray-600 dark:text-gray-300">{label}</span>
      <input
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-400 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        {...props}
      />
    </label>
  );
}
