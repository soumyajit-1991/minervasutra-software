export const attendanceData = {
      // Daily Stats
      metrics: {
            totalEmployees: 485,
            present: 420,
            absent: 15,
            late: 25,
            onLeave: 25,
            attendanceRate: 86.6, // percentage
      },

      // Weekly Attendance Trend
      attendanceTrend: [
            { day: "Mon", present: 430, absent: 10, late: 20, leave: 25 },
            { day: "Tue", present: 425, absent: 12, late: 23, leave: 25 },
            { day: "Wed", present: 435, absent: 8, late: 17, leave: 25 },
            { day: "Thu", present: 420, absent: 15, late: 25, leave: 25 },
            { day: "Fri", present: 410, absent: 20, late: 30, leave: 25 },
            { day: "Sat", present: 200, absent: 5, late: 5, leave: 275 }, // Half day/Weekend
            { day: "Sun", present: 0, absent: 0, late: 0, leave: 485 },
      ],

      // Leave Distribution
      leaveDistribution: [
            { name: "Sick Leave", value: 10, color: "#ef4444" }, // red-500
            { name: "Casual Leave", value: 8, color: "#f97316" }, // orange-500
            { name: "Paid Leave", value: 5, color: "#eab308" },   // yellow-500
            { name: "Unpaid Leave", value: 2, color: "#6b7280" }, // gray-500
      ],

      // Recent Logs
      logs: [
            { id: 101, name: "Alice Johnson", time: "08:55 AM", status: "On Time", department: "Engineering" },
            { id: 102, name: "Bob Smith", time: "09:05 AM", status: "Late", department: "Sales" },
            { id: 103, name: "Charlie Brown", time: "08:45 AM", status: "On Time", department: "Product" },
            { id: 104, name: "Diana Prince", time: "--:--", status: "Absent", department: "HR" },
            { id: 105, name: "Ethan Hunt", time: "09:15 AM", status: "Late", department: "Engineering" },
            { id: 106, name: "Fiona Gallagher", time: "08:50 AM", status: "On Time", department: "Support" },
      ],
};
