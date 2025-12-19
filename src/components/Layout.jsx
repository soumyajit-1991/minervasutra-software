import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Layout() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className={`flex h-screen transition-colors duration-300 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"
        }`}
    >
      <Sidebar darkMode={darkMode} />
      <div className="flex-1 flex flex-col ml-64">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        {/* 👇 Scrollbar added here */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-900">
          <Outlet context={{ darkMode }} />
        </main>
      </div>
    </div>
  );
}
