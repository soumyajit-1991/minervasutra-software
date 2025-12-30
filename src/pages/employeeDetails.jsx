import { useParams, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, Wallet, CheckCircle } from "lucide-react";

export default function EmployeeDetails() {
  const { darkMode } = useOutletContext();
  const { id } = useParams();
  const [takenLeave, setTakenLeave] = useState(0);

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentMonthKey = new Date().toISOString().slice(0, 7); // "YYYY-MM"

  useEffect(() => {
    fetchEmployee();
  }, []);

  useEffect(() => {
    if (!employee) return;

    const storageKey = `leave_${employee._id}`;
    const savedData = JSON.parse(localStorage.getItem(storageKey));

    if (!savedData || savedData.month !== currentMonthKey) {
      // 🔄 New month → reset leave
      setTakenLeave(0);
      localStorage.setItem(
        storageKey,
        JSON.stringify({ month: currentMonthKey, leave: 0 })
      );
    } else {
      setTakenLeave(savedData.leave);
    }
  }, [employee, currentMonthKey]);

  const fetchEmployee = async () => {
    try {
      const res = await axios.get(`https://hr-management-backend-sable.vercel.app/api/employees/${id}`);
      setEmployee(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!employee) return <p>Employee not found</p>;

  // 🔢 LEAVE LOGIC (ASSUMPTION)
  const TOTAL_LEAVE = 30;
  const remainingLeave = Math.max(TOTAL_LEAVE - takenLeave, 0);
  const BASIC_SALARY = employee.salary || 0;
  const extraLeave = Math.max(takenLeave - 2, 0);
  const perDaySalary = BASIC_SALARY / 30;
  const salaryCut = extraLeave * perDaySalary;

  // const remainingLeave = Math.max(TOTAL_LEAVE - takenLeave, 0);

  // 💰 SALARY CUT LOGIC
  // const BASIC_SALARY = employee.salary || 0;
  // const extraLeave = Math.max(takenLeave - 2, 0); // first 2 leaves free
  // const perDaySalary = BASIC_SALARY / 30;
  // const salaryCut = extraLeave * perDaySalary;

  return (
    <div
      className={`p-6 ml-64 mt-16 min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <h1 className="text-2xl font-bold mb-6">
        {employee.name} – Leave Summary
      </h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard
          title="Total Leave"
          value={TOTAL_LEAVE}
          icon={<Calendar />}
          darkMode={darkMode}
        />
        <InfoCard
          title="Leave Taken"
          className="flex flex-col gap-2"
          value={takenLeave}
          icon={<CheckCircle />}
          darkMode={darkMode}
        >
          <button
            className="bg-red-400 mx-2"
            onClick={() =>
              setTakenLeave((prev) => {
                const updated = prev + 1;
                localStorage.setItem(
                  `leave_${employee._id}`,
                  JSON.stringify({ month: currentMonthKey, leave: updated })
                );
                return updated;
              })
            }
          >
            + Take Leave
          </button>

          <button
            className="bg-green-400"
            onClick={() =>
              setTakenLeave((prev) => {
                const updated = prev > 0 ? prev - 1 : 0;
                localStorage.setItem(
                  `leave_${employee._id}`,
                  JSON.stringify({ month: currentMonthKey, leave: updated })
                );
                return updated;
              })
            }
          >
            − Cancel Leave
          </button>
        </InfoCard>

        <InfoCard
          title="Remaining Leave"
          value={remainingLeave}
          icon={<Calendar />}
          darkMode={darkMode}
        />
      </div>

      {/* SALARY CUT */}
      <div
        className={`mt-8 p-6 rounded-xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Wallet /> Salary Deduction
        </h2>

        <p>
          <b>Basic Salary:</b> ₹{BASIC_SALARY.toFixed(2)}
        </p>
        <p>
          <b>Extra Leave:</b> {extraLeave} days
        </p>
        <p className="text-red-500 font-semibold">
          Salary Cut: ₹{salaryCut.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

function InfoCard({ title, value, icon, darkMode, children }) {
  return (
    <div
      className={`p-5 rounded-xl shadow-sm ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="font-semibold">{title}</h3>
      </div>

      <p className="text-2xl font-bold">{value}</p>

      {children}
    </div>
  );
}
