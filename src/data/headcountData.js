export const headcountData = {
      // Key high-level metrics
      metrics: {
            totalEmployees: 485,
            activeEmployees: 450,
            onLeave: 25,
            remote: 120, // number of remote employees
            contract: 35, // number of contract employees
            attritionRate: 3.2, // percentage
            hiringRate: 5.1 // percentage
      },

      // Headcount by Department
      departmentDist: [
            { name: "Engineering", count: 180, color: "#3b82f6" }, // blue-500
            { name: "Sales", count: 120, color: "#22c55e" },       // green-500
            { name: "Marketing", count: 60, color: "#f97316" },    // orange-500
            { name: "HR", count: 25, color: "#a855f7" },           // purple-500
            { name: "Finance", count: 40, color: "#eab308" },      // yellow-500
            { name: "Support", count: 60, color: "#ec4899" }       // pink-500
      ],

      // Employee Type Distribution
      employeeTypeDist: [
            { name: "Full-Time", value: 410, color: "#3b82f6" },
            { name: "Part-Time", value: 40, color: "#60a5fa" },
            { name: "Contract", value: 35, color: "#93c5fd" }
      ],

      // Gender Diversity Stats
      genderDist: [
            { name: "Male", value: 260, color: "#3b82f6" },
            { name: "Female", value: 215, color: "#ec4899" },
            { name: "Other", value: 10, color: "#a855f7" }
      ],

      // Monthly Headcount Trend (Last 12 Months)
      trends: [
            { month: "Jan", headcount: 420, hired: 10, left: 2 },
            { month: "Feb", headcount: 428, hired: 12, left: 4 },
            { month: "Mar", headcount: 435, hired: 10, left: 3 },
            { month: "Apr", headcount: 442, hired: 8, left: 1 },
            { month: "May", headcount: 450, hired: 15, left: 7 },
            { month: "Jun", headcount: 455, hired: 10, left: 5 },
            { month: "Jul", headcount: 462, hired: 9, left: 2 },
            { month: "Aug", headcount: 468, hired: 8, left: 2 },
            { month: "Sep", headcount: 475, hired: 10, left: 3 },
            { month: "Oct", headcount: 480, hired: 8, left: 3 },
            { month: "Nov", headcount: 482, hired: 5, left: 3 },
            { month: "Dec", headcount: 485, hired: 4, left: 1 }
      ],

      // Recent Activity (Hires/Exits)
      recentActivity: [
            { id: 1, name: "Alice Johnson", role: "Frontend Dev", department: "Engineering", action: "Joined", date: "2024-12-01", status: "success" }, // status colors: success=green
            { id: 2, name: "Bob Smith", role: "Sales Executive", department: "Sales", action: "Resigned", date: "2024-11-28", status: "error" },    // status colors: error=red
            { id: 3, name: "Charlie Brown", role: "Product Manager", department: "Product", action: "Joined", date: "2024-11-25", status: "success" },
            { id: 4, name: "Diana Prince", role: "HR Specialist", department: "HR", action: "On Leave", date: "2024-11-20", status: "warning" },   // status colors: warning=yellow
            { id: 5, name: "Ethan Hunt", role: "DevOps Engineer", department: "Engineering", action: "Joined", date: "2024-11-15", status: "success" }
      ]
};
