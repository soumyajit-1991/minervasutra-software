import { useEffect, useMemo, useState } from "react";
import { Plus, Copy, Check } from "lucide-react";
import AddEmployeeModal from "../components/AddEmployeeModal";
import Card from "../components/common/Card";
import PageHeader from "../components/common/PageHeader";

const API_BASE = import.meta.env.VITE_API_BASE || "";

export default function Employee() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [credentials, setCredentials] = useState(null);
  const [copied, setCopied] = useState(false);
  const [customRoles, setCustomRoles] = useState([]);
  const [customDepartments, setCustomDepartments] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        setError("");
        const res = await fetch(`${API_BASE}/api/employees`);
        if (!res.ok) throw new Error("Failed to load employees");
        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const roles = useMemo(
    () => Array.from(new Set([...employees.map((e) => e.role), ...customRoles].filter(Boolean))),
    [employees, customRoles]
  );
  const departments = useMemo(
    () => Array.from(new Set([...employees.map((e) => e.department), ...customDepartments].filter(Boolean))),
    [employees, customDepartments]
  );

  const addRole = (role) => {
    setCustomRoles((prev) => (prev.includes(role) ? prev : [...prev, role]));
  };
  const addDepartment = (department) => {
    setCustomDepartments((prev) => (prev.includes(department) ? prev : [...prev, department]));
  };

  const handleCreate = async (payload) => {
    const res = await fetch(`${API_BASE}/api/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const detail = await res.json().catch(() => ({}));
      throw new Error(detail?.message || "Failed to create employee");
    }
    const data = await res.json();
    setEmployees((prev) => [data.employee, ...prev]);
    setModalOpen(false);
    setCredentials(data.showCredentials);
  };

  const handleCopy = async (text) => {
    if (!navigator?.clipboard) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6 ml-64 pt-20">
      <PageHeader
        title="Employee Management"
        description="Manage employees from the API and share first-login credentials securely."
        action={
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Employee
          </button>
        }
      />

      {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Employee List</h3>
          <span className="text-sm text-gray-500">{employees.length} shown</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Role</Th>
                <Th>Department</Th>
                <Th>Joining Date</Th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-sm text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : employees.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-sm text-gray-500">
                    No employees found.
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr
                    key={emp._id || `${emp.email}-${emp.joiningDate}`}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <Td>{emp.firstName}</Td>
                    <Td>{emp.lastName}</Td>
                    <Td>{emp.email}</Td>
                    <Td>{emp.phone}</Td>
                    <Td>{emp.role}</Td>
                    <Td>{emp.department}</Td>
                    <Td>{emp.joiningDate ? new Date(emp.joiningDate).toISOString().slice(0, 10) : "-"}</Td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <AddEmployeeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreate}
        roles={roles}
        departments={departments}
        onAddRole={addRole}
        onAddDepartment={addDepartment}
      />

      {credentials && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-2">Initial Credentials (show once)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Share these securely. The password is shown only this time and is hashed in the database.
            </p>
            <div className="space-y-2 text-sm">
              <CredentialRow label="Username" value={credentials.username} onCopy={handleCopy} copied={copied} />
              <CredentialRow label="Temporary Password" value={credentials.temporaryPassword} onCopy={handleCopy} copied={copied} />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setCredentials(null)}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                I saved it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Th({ children }) {
  return <th className="p-3 text-sm font-semibold text-gray-700 dark:text-gray-100">{children}</th>;
}

function Td({ children }) {
  return <td className="p-3 text-sm text-gray-800 dark:text-gray-100">{children}</td>;
}

function CredentialRow({ label, value, onCopy, copied }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 px-3 py-2 dark:border-gray-700">
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{label}</p>
        <p className="font-semibold break-all">{value}</p>
      </div>
      <button
        onClick={() => onCopy(value)}
        className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1 text-xs hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />} Copy
      </button>
    </div>
  );
}

