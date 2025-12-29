import { Outlet, NavLink } from "react-router-dom";

export default function EmployeeLayout() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 h-screen fixed bg-gray-800 text-white">
        <h2 className="p-4 text-lg font-bold">Employee Panel</h2>

        <nav className="flex flex-col gap-2 p-4">
          <NavLink to="/employee" end className="hover:bg-gray-700 p-2 rounded">
            Dashboard
          </NavLink>
          <NavLink to="/employee/profile" className="hover:bg-gray-700 p-2 rounded">
            My Profile
          </NavLink>
          <NavLink to="/employee/attendance" className="hover:bg-gray-700 p-2 rounded">
            Attendance
          </NavLink>
        </nav>
      </aside>

      {/* Page Content */}
      <div className="flex-1 ml-64">
        <Outlet />
      </div>
    </div>
  );
}
