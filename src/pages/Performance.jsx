import { useOutletContext } from "react-router-dom";
import { TrendingUp, CheckSquare, Clock, Award, Star, List } from "lucide-react";
import { performanceData } from "../data/performanceData";

export default function Performance() {
      const { darkMode } = useOutletContext();
      const { metrics, reviews } = performanceData;

      const cardClass = `p-6 rounded-xl shadow-md transition-colors duration-300 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
            }`;

      return (
            <div
                  className={`p-6 ml-64 mt-16 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
                        }`}
            >
                  <h1 className="text-2xl font-bold mb-6">Performance Board</h1>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                              title="Average Score"
                              value={metrics.avgScore}
                              icon={<TrendingUp size={24} className="text-blue-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Reviews Completed"
                              value={metrics.reviewsCompleted}
                              icon={<CheckSquare size={24} className="text-green-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Pending Reviews"
                              value={metrics.pendingReviews}
                              icon={<Clock size={24} className="text-yellow-500" />}
                              darkMode={darkMode}
                        />
                        <StatCard
                              title="Top Performers"
                              value={metrics.topPerformers}
                              icon={<Award size={24} className="text-purple-500" />}
                              darkMode={darkMode}
                        />
                  </div>

                  {/* Performance Reviews Table */}
                  <div className={cardClass}>
                        <div className="flex justify-between items-center mb-6">
                              <h2 className="text-lg font-semibold">Employee Performance Reviews</h2>
                              <div className="flex gap-2">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition transition-colors">
                                          Start New Review
                                    </button>
                              </div>
                        </div>
                        <div className="overflow-x-auto">
                              <table className="w-full text-left">
                                    <thead>
                                          <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                                                <th className="py-3 px-2">Employee</th>
                                                <th className="py-3 px-2">Department</th>
                                                <th className="py-3 px-2">Role</th>
                                                <th className="py-3 px-2">Rating</th>
                                                <th className="py-3 px-2">Reviewer</th>
                                                <th className="py-3 px-2">Date</th>
                                                <th className="py-3 px-2">Status</th>
                                                <th className="py-3 px-2">Action</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {reviews.map((review) => (
                                                <tr
                                                      key={review.id}
                                                      className={`border-b last:border-0 transition-colors ${darkMode ? "border-gray-700 hover:bg-gray-700" : "border-gray-100 hover:bg-gray-50"
                                                            }`}
                                                >
                                                      <td className="py-3 px-2 font-medium">{review.employee}</td>
                                                      <td className="py-3 px-2">{review.department}</td>
                                                      <td className="py-3 px-2 text-sm">{review.role}</td>
                                                      <td className="py-3 px-2">
                                                            <div className="flex items-center gap-1">
                                                                  <span className="font-semibold">{review.rating > 0 ? review.rating : "-"}</span>
                                                                  {review.rating > 0 && <Star size={14} className="text-yellow-400 fill-yellow-400" />}
                                                            </div>
                                                      </td>
                                                      <td className="py-3 px-2 text-sm">{review.reviewer}</td>
                                                      <td className="py-3 px-2 text-sm">{review.date}</td>
                                                      <td className="py-3 px-2">
                                                            <span
                                                                  className={`px-2 py-1 rounded-full text-xs font-medium ${review.status === "Completed"
                                                                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                                                        }`}
                                                            >
                                                                  {review.status}
                                                            </span>
                                                      </td>
                                                      <td className="py-3 px-2">
                                                            <button
                                                                  className={`p-2 rounded-full transition-colors ${darkMode ? "hover:bg-gray-600 text-gray-400" : "hover:bg-gray-200 text-gray-500"
                                                                        }`}
                                                            >
                                                                  <List size={18} />
                                                            </button>
                                                      </td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        </div>
                  </div>
            </div>
      );
}

function StatCard({ title, value, icon, darkMode }) {
      return (
            <div
                  className={`flex items-center p-4 rounded-xl shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"
                        }`}
            >
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full mr-4">{icon}</div>
                  <div>
                        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{title}</p>
                        <h3 className="text-xl font-bold">{value}</h3>
                  </div>
            </div>
      );
}
