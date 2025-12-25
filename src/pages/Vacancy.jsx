// import { useOutletContext, useNavigate } from "react-router-dom";
// import { Briefcase, CheckCircle, AlertCircle, FileText, Eye } from "lucide-react";

// export default function Vacancy() {
//       const { darkMode } = useOutletContext();
//       const navigate = useNavigate();
      
//       // No vacancy data available
//       const metrics = {
//             openPositions: 0,
//             filledThisMonth: 0,
//             urgentReq: 0,
//             totalApplications: 0
//       };
//       const vacancies = [];

//       const cardClass = `p-6 rounded-xl shadow-md transition-colors duration-300 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
//             }`;

//       return (
//             <div
//                   className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
//                         }`}
//             >
//                   <h1 className="text-2xl font-bold mb-6">Vacancy Management</h1>

//                   {/* Metrics Row */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                         <StatCard
//                               title="Open Positions"
//                               value={metrics.openPositions}
//                               icon={<Briefcase size={24} className="text-blue-500" />}
//                               darkMode={darkMode}
//                         />
//                         <StatCard
//                               title="Filled This Month"
//                               value={metrics.filledThisMonth}
//                               icon={<CheckCircle size={24} className="text-green-500" />}
//                               darkMode={darkMode}
//                         />
//                         <StatCard
//                               title="Urgent Requirements"
//                               value={metrics.urgentReq}
//                               icon={<AlertCircle size={24} className="text-red-500" />}
//                               darkMode={darkMode}
//                         />
//                         <StatCard
//                               title="Total Applications"
//                               value={metrics.totalApplications}
//                               icon={<FileText size={24} className="text-purple-500" />}
//                               darkMode={darkMode}
//                         />
//                   </div>

//                   {/* Vacancy List Table */}
//                   <div className={cardClass}>
//                         <div className="flex justify-between items-center mb-6">
//                               <h2 className="text-lg font-semibold">Active Vacancies</h2>
//                               <button 
//                                     onClick={() => navigate('/add-job-posting')}
//                                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition transition-colors"
//                               >
//                                     + Post New Job
//                               </button>
//                         </div>
//                         <div className="overflow-x-auto">
//                               <table className="w-full text-left">
//                                     <thead>
//                                           <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
//                                                 <th className="py-3 px-2">Job ID</th>
//                                                 <th className="py-3 px-2">Role Title</th>
//                                                 <th className="py-3 px-2">Department</th>
//                                                 <th className="py-3 px-2">Type</th>
//                                                 <th className="py-3 px-2">Posted Date</th>
//                                                 <th className="py-3 px-2">Status</th>
//                                                 <th className="py-3 px-2">Applicants</th>
//                                                 <th className="py-3 px-2">Action</th>
//                                           </tr>
//                                     </thead>
//                                     <tbody>
//                                           <tr>
//                                                 <td colSpan="8" className="py-8 text-center">
//                                                       <Briefcase size={48} className={`mx-auto mb-4 ${darkMode ? "text-gray-700" : "text-gray-300"}`} />
//                                                       <p className="text-lg font-medium">No job vacancies available</p>
//                                                       <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Post your first job to get started</p>
//                                                 </td>
//                                           </tr>
//                                     </tbody>
//                               </table>
//                         </div>
//                   </div>
//             </div>
//       );
// }

// function StatCard({ title, value, icon, darkMode }) {
//       return (
//             <div
//                   className={`flex items-center p-4 rounded-xl shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"
//                         }`}
//             >
//                   <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full mr-4">{icon}</div>
//                   <div>
//                         <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{title}</p>
//                         <h3 className="text-xl font-bold">{value}</h3>
//                   </div>
//             </div>
//       );
// }



import { useEffect, useMemo, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import {
  Briefcase,
  CheckCircle,
  AlertCircle,
  FileText,
  Eye,
  Edit2,
} from "lucide-react";
import axios from "axios";

export default function Vacancy() {
  const { darkMode } = useOutletContext();
  const navigate = useNavigate();

  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= DATE VALIDATION ================= */
  const isActiveByDate = (closingDate) => {
    if (!closingDate) return true;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const closeDate = new Date(closingDate);
    if (isNaN(closeDate.getTime())) return true;

    closeDate.setHours(0, 0, 0, 0);
    return closeDate >= today;
  };

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/job-postings"
        );

        // Only show non-expired jobs
        const activeJobs = res.data.filter((job) =>
          isActiveByDate(job.closingDate)
        );

        setVacancies(activeJobs);
      } catch (err) {
        console.error("Failed to fetch vacancies", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancies();
  }, []);

  /* ================= METRICS ================= */
  const metrics = useMemo(() => {
    return {
      openPositions: vacancies.filter((v) => v.status === "Active").length,
      filledThisMonth: vacancies.filter((v) => v.status === "Closed").length,
      urgentReq: vacancies.filter((v) => v.priority === "Critical").length,
      totalApplications: vacancies.reduce(
        (sum, v) => sum + (v.applicants || 0),
        0
      ),
    };
  }, [vacancies]);

  const cardClass = `p-6 rounded-xl shadow-md transition-colors duration-300 ${
    darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
  }`;

  /* ================= UI ================= */
  return (
    <div
      className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <h1 className="text-2xl font-bold mb-6">Vacancy Management</h1>

      {/* ================= METRICS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Open Positions" value={metrics.openPositions} icon={<Briefcase size={24} className="text-blue-500" />} darkMode={darkMode} />
        <StatCard title="Filled This Month" value={metrics.filledThisMonth} icon={<CheckCircle size={24} className="text-green-500" />} darkMode={darkMode} />
        <StatCard title="Urgent Requirements" value={metrics.urgentReq} icon={<AlertCircle size={24} className="text-red-500" />} darkMode={darkMode} />
        <StatCard title="Total Applications" value={metrics.totalApplications} icon={<FileText size={24} className="text-purple-500" />} darkMode={darkMode} />
      </div>

      {/* ================= TABLE ================= */}
      <div className={cardClass}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Active Vacancies</h2>
          <button
            onClick={() => navigate("/add-job-posting")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            + Post New Job
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                <th className="py-3 px-2">Job ID</th>
                <th className="py-3 px-2">Role Title</th>
                <th className="py-3 px-2">Department</th>
                <th className="py-3 px-2">Type</th>
                <th className="py-3 px-2">Posted Date</th>
                <th className="py-3 px-2">Status</th>
                {/* <th className="py-3 px-2">Applicants</th> */}
                {/* <th className="py-3 px-2">Action</th> */}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center">Loading vacancies...</td>
                </tr>
              ) : vacancies.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center">No active job vacancies available</td>
                </tr>
              ) : (
                vacancies.map((job) => (
                  <tr
                    key={job.jobId}
                    className={`border-b ${
                      darkMode
                        ? "border-gray-700 hover:bg-gray-700"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <td className="py-2 px-2">{job.jobId}</td>
                    <td className="py-2 px-2">{job.title}</td>
                    <td className="py-2 px-2">{job.department}</td>
                    <td className="py-2 px-2">{job.type}</td>
                    <td className="py-2 px-2">
                      {new Date(job.postedDate).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-2">{job.status}</td>
                    {/* <td className="py-2 px-2">{job.applicants}</td> */}

                    {/* ================= ACTION COLUMN ================= */}
                    <td className="py-2 px-2">
                      <div className="flex gap-3">
                        {/* <button
                          onClick={() => navigate(`/job/${job.jobId}`)}
                          className="text-blue-600 hover:underline flex items-center gap-1 text-sm"
                        >
                          <Eye size={14} /> View
                        </button> */}

                        {/* ✅ SHOW EDIT ONLY IF STATUS IS NOT CLOSED */}
                        {/* {job.status !== "Closed" && (
                          <button
  onClick={() =>
    navigate("/edit-job", {
      state: { job }
    })
  }
  className="text-green-600 hover:underline flex items-center gap-1 text-sm"
>
  <Edit2 size={14} /> Edit
</button> */}

                        {/* )} */}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ================= CARD ================= */
function StatCard({ title, value, icon, darkMode }) {
  return (
    <div className={`flex items-center p-4 rounded-xl shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full mr-4">
        {icon}
      </div>
      <div>
        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          {title}
        </p>
        <h3 className="text-xl font-bold">{value}</h3>
      </div>
    </div>
  );
}
