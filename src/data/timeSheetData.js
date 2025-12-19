export const timeSheetData = {
      metrics: {
            totalHours: 168,
            regularHours: 152,
            overtimeHours: 16,
            pendingApprovals: 5
      },
      employees: [
            {
                  id: "EMP-001",
                  name: "Sarah Johnson",
                  avatar: "https://i.pravatar.cc/150?u=sarahj",
                  position: "Senior Pharmacist",
                  department: "Pharmacy Operations",
                  weekData: [
                        { day: "Monday", date: "2024-12-02", hours: 8, overtime: 0, status: "Approved" },
                        { day: "Tuesday", date: "2024-12-03", hours: 9, overtime: 1, status: "Approved" },
                        { day: "Wednesday", date: "2024-12-04", hours: 8, overtime: 0, status: "Approved" },
                        { day: "Thursday", date: "2024-12-05", hours: 10, overtime: 2, status: "Pending" },
                        { day: "Friday", date: "2024-12-06", hours: 8, overtime: 0, status: "Pending" }
                  ],
                  totalHours: 43,
                  regularHours: 40,
                  overtimeHours: 3
            },
            {
                  id: "EMP-002",
                  name: "Michael Chen",
                  avatar: "https://i.pravatar.cc/150?u=michaelc",
                  position: "Pharmacy Technician",
                  department: "Pharmacy Operations",
                  weekData: [
                        { day: "Monday", date: "2024-12-02", hours: 8, overtime: 0, status: "Approved" },
                        { day: "Tuesday", date: "2024-12-03", hours: 8, overtime: 0, status: "Approved" },
                        { day: "Wednesday", date: "2024-12-04", hours: 8, overtime: 0, status: "Approved" },
                        { day: "Thursday", date: "2024-12-05", hours: 8, overtime: 0, status: "Approved" },
                        { day: "Friday", date: "2024-12-06", hours: 8, overtime: 0, status: "Pending" }
                  ],
                  totalHours: 40,
                  regularHours: 40,
                  overtimeHours: 0
            },
            {
                  id: "EMP-003",
                  name: "Lisa Anderson",
                  avatar: "https://i.pravatar.cc/150?u=lisaa",
                  position: "HR Manager",
                  department: "Human Resources",
                  weekData: [
                        { day: "Monday", date: "2024-12-02", hours: 8, overtime: 0, status: "Approved" },
                        { day: "Tuesday", date: "2024-12-03", hours: 8, overtime: 0, status: "Approved" },
                        { day: "Wednesday", date: "2024-12-04", hours: 9, overtime: 1, status: "Approved" },
                        { day: "Thursday", date: "2024-12-05", hours: 9, overtime: 1, status: "Pending" },
                        { day: "Friday", date: "2024-12-06", hours: 8, overtime: 0, status: "Pending" }
                  ],
                  totalHours: 42,
                  regularHours: 40,
                  overtimeHours: 2
            },
            {
                  id: "EMP-004",
                  name: "John Davis",
                  avatar: "https://i.pravatar.cc/150?u=johnd",
                  position: "Clinical Pharmacist",
                  department: "Clinical Services",
                  weekData: [
                        { day: "Monday", date: "2024-12-02", hours: 8, overtime: 0, status: "Approved" },
                        { day: "Tuesday", date: "2024-12-03", hours: 8, overtime: 0, status: "Approved" },
                        { day: "Wednesday", date: "2024-12-04", hours: 8, overtime: 0, status: "Approved" },
                        { day: "Thursday", date: "2024-12-05", hours: 8, overtime: 0, status: "Approved" },
                        { day: "Friday", date: "2024-12-06", hours: 6, overtime: 0, status: "Pending" }
                  ],
                  totalHours: 38,
                  regularHours: 38,
                  overtimeHours: 0
            },
            {
                  id: "EMP-005",
                  name: "Emily Rodriguez",
                  avatar: "https://i.pravatar.cc/150?u=emilyr",
                  position: "Inventory Manager",
                  department: "Supply Chain",
                  weekData: [
                        { day: "Monday", date: "2024-12-02", hours: 8, overtime: 0, status: "Approved" },
                        { day: "Tuesday", date: "2024-12-03", hours: 10, overtime: 2, status: "Approved" },
                        { day: "Wednesday", date: "2024-12-04", hours: 9, overtime: 1, status: "Approved" },
                        { day: "Thursday", date: "2024-12-05", hours: 11, overtime: 3, status: "Pending" },
                        { day: "Friday", date: "2024-12-06", hours: 8, overtime: 0, status: "Pending" }
                  ],
                  totalHours: 46,
                  regularHours: 40,
                  overtimeHours: 6
            }
      ]
};
