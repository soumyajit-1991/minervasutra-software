// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import EventTracker from "./EventTracker";

// export default function EmployeeProfile() {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("Profile");
//   const [activeMenu, setActiveMenu] = useState("Profile");
//   const [user, setUser] = useState(null);

//   // 🔐 Load logged-in employee
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const role = localStorage.getItem("role");

//     if (!storedUser || role !== "employee") {
//       navigate("/login");
//       return;
//     }

//     setUser(JSON.parse(storedUser));
//   }, [navigate]);

//   if (!user) return null;

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* ===== SIDEBAR ===== */}
//       <aside className="w-64 fixed left-0 top-0 h-screen bg-white shadow-md pt-20">
//         <h2 className="px-6 text-lg font-bold mb-6">Employee Panel</h2>

//         <nav className="flex flex-col gap-1 px-4 text-sm">
//           {["Profile", "Event Tracker", "Project Management"].map(item => (
//             <button
//               key={item}
//               onClick={() => setActiveMenu(item)}
//               className={`text-left px-4 py-2 rounded ${
//                 activeMenu === item
//                   ? "bg-blue-100 text-blue-600 font-medium"
//                   : "text-gray-600 hover:bg-gray-100"
//               }`}
//             >
//               {item}
//             </button>
//           ))}
//         </nav>
//       </aside>

//       {/* ===== MAIN CONTENT ===== */}
//       <div className="flex-1 ml-64 p-6 mt-16">

//         {/* ===== PROFILE ===== */}
//         {activeMenu === "Profile" && (
//           <>
//             <div className="bg-white rounded-xl shadow overflow-hidden">
//               <div className="relative h-48 bg-gradient-to-r from-pink-500 via-yellow-300 to-blue-400" />

//               <div className="p-6 flex items-center gap-4">
//                 <img
//                   src="https://i.pravatar.cc/150"
//                   alt="profile"
//                   className="w-28 h-28 rounded-full border-4 border-white -mt-20 bg-white"
//                 />
//                 <div>
//                   <h2 className="text-2xl font-bold">{user.name}</h2>
//                   <p className="text-gray-500">{user.email}</p>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}

//         {/* ===== EVENT TRACKER ===== */}
//         {activeMenu === "Event Tracker" && (
//           <EventTracker email={user.email} />
//         )}

//         {/* ===== PROJECT MANAGEMENT ===== */}
//         {activeMenu === "Project Management" && (
//           <div className="bg-white p-10 rounded-xl shadow">
//             <h2 className="text-xl font-bold">Project Management</h2>
//             <p className="text-gray-600 mt-2">
//               Assigned projects and tasks.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventTracker from "./EventTracker";
import TaskManagement from "./taskManagement";
import logo from '../../assets/Screenshot 2025-12-29 220722.png';

export default function EmployeeProfile() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Profile");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [profileData, setProfileData] = useState({
    about: "",
    skills: [],
    experience: { years: "", description: "" },
    personalInfo: {
      dob: "",
      gender: "",
      maritalStatus: "",
      nationality: "",
      address: "",
    },
  });

  // 🔐 Load logged-in employee
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    if (!storedUser || role !== "employee") {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [navigate]);

  // 📡 Fetch profile data
  useEffect(() => {
    if (!user?.email) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `https://hr-management-h9l2.vercel.app/api/employee-profile/${user.email}`
        );
        const data = await res.json();

        if (data) {
          setProfileData({
            about: data.about || "",
            skills: data.skills || [],
            experience: data.experience || {},
            personalInfo: data.personalInfo || {},
          });
        }
      } catch (err) {
        console.error("Profile fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (!user || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ===== SIDEBAR ===== */}
      <aside className="hidden md:block w-64 fixed left-0 top-0 h-screen bg-white shadow pt-20">
  {/* LOGO */}
  <div className="flex justify-center mb-6">
    <img
      src={logo}
      alt="Company Logo"
      className="h-16 object-contain"
    />
  </div>

  <nav className="flex flex-col gap-1 px-4 text-sm">
    {["Profile", "Event Tracker", "Project Management"].map((item) => (
      <button
        key={item}
        onClick={() => setActiveMenu(item)}
        className={`text-left px-4 py-2 rounded ${
          activeMenu === item
            ? "bg-blue-100 text-blue-600 font-medium"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        {item}
      </button>
    ))}
  </nav>
</aside>


      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 md:ml-64 p-4 md:p-6 mt-16">
        {/* ===== PROFILE ===== */}
        {activeMenu === "Profile" && (
          <>
            {/* Header Card */}
            <div className="bg-white rounded-xl shadow overflow-hidden mb-6">
              <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-600" />

             <div className="p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
  <div className="flex items-center gap-4">
    <img
      src="https://i.pravatar.cc/150"
      alt="profile"
      className="w-24 h-24 rounded-full border-4 border-white -mt-16 bg-white"
    />

    <div className="text-center sm:text-left">
      <h2 className="text-2xl font-bold">{user.name}</h2>
      <p className="text-gray-500">{user.email}</p>
    </div>
  </div>

  {/* ✅ EDIT BUTTON */}
  <button
    onClick={() => navigate("/employee-profile/edit")}
    className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
  >
    ✏️ Edit Details
  </button>
</div>

            </div>

            {/* GRID LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* LEFT COLUMN */}
              <div className="lg:col-span-1 space-y-6">
                {/* About */}
                <div className="bg-white p-5 rounded-xl shadow">
                  <h3 className="font-bold mb-2">About</h3>
                  <p className="text-gray-600 text-sm">
                    {profileData.about || "No about information added."}
                  </p>
                </div>

                {/* Skills */}
                <div className="bg-white p-5 rounded-xl shadow">
                  <h3 className="font-bold mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.length > 0 ? (
                      profileData.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">
                        No skills added
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Info */}
                <div className="bg-white p-5 rounded-xl shadow">
                  <h3 className="font-bold mb-4">
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <p>
                      <strong>DOB:</strong>{" "}
                      {profileData.personalInfo.dob}
                    </p>
                    <p>
                      <strong>Gender:</strong>{" "}
                      {profileData.personalInfo.gender}
                    </p>
                    <p>
                      <strong>Marital Status:</strong>{" "}
                      {profileData.personalInfo.maritalStatus}
                    </p>
                    <p>
                      <strong>Nationality:</strong>{" "}
                      {profileData.personalInfo.nationality}
                    </p>
                    <p className="sm:col-span-2">
                      <strong>Address:</strong>{" "}
                      {profileData.personalInfo.address}
                    </p>
                  </div>
                </div>

                {/* Experience */}
                <div className="bg-white p-5 rounded-xl shadow">
                  <h3 className="font-bold mb-3">Experience</h3>

                  {profileData.experience?.years ? (
                    <>
                      <p className="font-medium">
                        {profileData.experience.years} Years
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        {profileData.experience.description}
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No experience added
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ===== EVENT TRACKER ===== */}
        {activeMenu === "Event Tracker" && (
          <EventTracker email={user.email} />
        )}

        {/* ===== PROJECT MANAGEMENT ===== */}
        {activeMenu === "Project Management" && (
          <TaskManagement/>
        )}
      </div>
    </div>
  );
}
