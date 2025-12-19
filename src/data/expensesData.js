export const expensesData = {
      metrics: {
            totalExpenses: 45000,
            monthlyBudget: 60000,
            remainingBudget: 15000,
            pendingPayments: 5
      },
      expenseRecords: [
            {
                  id: "EXP-001",
                  category: "Utilities",
                  description: "Electricity Bill - August",
                  amount: 5000,
                  paid: 5000,
                  due: 0,
                  date: "2024-08-24",
                  status: "Paid",
                  paymentMethod: "Bank Transfer",
                  vendor: "CESC Ltd."
            },
            {
                  id: "EXP-002",
                  category: "Salaries",
                  description: "Staff Salaries - August",
                  amount: 25000,
                  paid: 25000,
                  due: 0,
                  date: "2024-08-25",
                  status: "Paid",
                  paymentMethod: "Direct Deposit",
                  vendor: "Internal"
            },
            {
                  id: "EXP-003",
                  category: "Maintenance",
                  description: "AC Repair & Servicing",
                  amount: 3000,
                  paid: 1000,
                  due: 2000,
                  date: "2024-08-26",
                  status: "Partial",
                  paymentMethod: "Cash",
                  vendor: "Cool Air Services"
            },
            {
                  id: "EXP-004",
                  category: "Inventory",
                  description: "Medicine Stock Replenishment",
                  amount: 12000,
                  paid: 0,
                  due: 12000,
                  date: "2024-08-28",
                  status: "Pending",
                  paymentMethod: "Cheque",
                  vendor: "Pharma Distributors Inc."
            },
            {
                  id: "EXP-005",
                  category: "Office Supplies",
                  description: "Stationery & Printing",
                  amount: 1500,
                  paid: 1500,
                  due: 0,
                  date: "2024-08-29",
                  status: "Paid",
                  paymentMethod: "UPI",
                  vendor: "City Stationers"
            }
      ],
      employeeSalaries: [
            {
                  id: "EMP-001",
                  name: "John Doe",
                  role: "Pharmacist",
                  salary: 25000,
                  status: "Paid",
                  paymentDate: "2024-08-25",
                  bonus: 2000,
                  deductions: 500
            },
            {
                  id: "EMP-002",
                  name: "Jane Smith",
                  role: "Technician",
                  salary: 18000,
                  status: "Pending",
                  paymentDate: "2024-09-01",
                  bonus: 1000,
                  deductions: 0
            },
            {
                  id: "EMP-003",
                  name: "Bob Johnson",
                  role: "Staff",
                  salary: 15000,
                  status: "Paid",
                  paymentDate: "2024-08-25",
                  bonus: 0,
                  deductions: 200
            }
      ],
      supplierOrders: [
            {
                  id: "#ORD-001",
                  supplier: "MediCare Supplies",
                  totalAmount: 15000,
                  paidAmount: 5000,
                  dueAmount: 10000,
                  status: "Order Placed",
                  date: "2024-08-30",
                  items: [
                        { name: "Paracetamol", quantity: 500, price: 2 },
                        { name: "Amoxicillin", quantity: 200, price: 5 }
                  ]
            },
            {
                  id: "#ORD-002",
                  supplier: "Global Pharma",
                  totalAmount: 8500,
                  paidAmount: 8500,
                  dueAmount: 0,
                  status: "Received",
                  date: "2024-08-25",
                  items: [
                        { name: "Vitamins", quantity: 1000, price: 8.5 }
                  ]
            }
      ]
};
