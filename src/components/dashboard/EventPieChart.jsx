import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const data = [
      { name: "Meetings", value: 400 },
      { name: "Trainings", value: 300 },
      { name: "Webinars", value: 300 },
      { name: "Conferences", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function EventPieChart({ darkMode, data = [], title = "Distribution" }) {
      return (
            <div
                  className={`p-4 shadow rounded-xl transition-colors duration-300 flex flex-col items-center justify-center ${darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900 "
                        }`}
                  style={{ height: "100%" }}
            >
                  <h3 className="font-semibold mb-4 self-start">{title}</h3>
                  <div className="w-full flex-1 min-h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                    <Pie
                                          data={data}
                                          cx="50%"
                                          cy="50%"
                                          innerRadius={60}
                                          outerRadius={80}
                                          fill="#8884d8"
                                          paddingAngle={5}
                                          dataKey="value"
                                    >
                                          {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                                          ))}
                                    </Pie>
                                    <Tooltip
                                          contentStyle={{
                                                backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                                                borderColor: darkMode ? '#374151' : '#e5e7eb',
                                                color: darkMode ? '#f3f4f6' : '#111827'
                                          }}
                                    />
                                    <Legend />
                              </PieChart>
                        </ResponsiveContainer>
                  </div>
            </div>
      );
}
