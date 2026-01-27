import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "hr",
  });

  /* ========== FETCH USERS ========== */
  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ========== SUBMIT ========== */
  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/users", form);
      alert("User created");

      setForm({
        name: "",
        email: "",
        password: "",
        role: "hr",
      });

      setShowForm(false);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* LEFT – USERS LIST */}
      <div className="flex-1 p-6 bg-gray-100">
        <h2 className="text-xl font-bold mb-4">Users</h2>

        {users.map((u) => (
          <div
            key={u._id}
            className="bg-white p-4 mb-3 rounded shadow"
          >
            <p className="font-semibold">{u.name}</p>
            <p className="text-sm">{u.email}</p>
            <p className="text-xs text-gray-500">
              Role: {u.role}
            </p>
          </div>
        ))}

        {users.length === 0 && (
          <p className="text-gray-500">No users found</p>
        )}
      </div>

      {/* RIGHT – BUTTON / FORM */}
      <div className="w-[380px] border-l bg-white p-6">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="bg-black text-white w-full py-3 rounded text-lg"
          >
            + Add User
          </button>
        ) : (
          <>
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Create User</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-red-500 font-bold"
              >
                ✕
              </button>
            </div>

            <input
              placeholder="Name"
              className="border p-2 w-full mb-3"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              placeholder="Email"
              type="email"
              className="border p-2 w-full mb-3"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              placeholder="Password"
              type="password"
              className="border p-2 w-full mb-3"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <select
              className="border p-2 w-full mb-4"
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            >
              <option value="user">hr</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>

            <button
              onClick={handleSubmit}
              className="bg-black text-white w-full py-2 rounded"
            >
              Save User
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Users;
