export const complianceData = {
      metrics: {
            totalRequirements: 15,
            compliant: 12,
            pending: 2,
            nonCompliant: 1,
            nextAudit: "2025-06-15"
      },
      requirements: [
            {
                  id: "COMP-001",
                  title: "HIPAA Compliance Training",
                  description: "Annual training on Health Insurance Portability and Accountability Act regulations.",
                  category: "Regulatory",
                  frequency: "Annual",
                  lastAuditDate: "2024-01-15",
                  nextDueDate: "2025-01-15",
                  status: "Compliant",
                  complianceRate: 100,
                  assignee: "All Staff",
                  priority: "High"
            },
            {
                  id: "COMP-002",
                  title: "OSHA Safety Standards",
                  description: "Workplace safety standards and hazardous material handling protocols.",
                  category: "Safety",
                  frequency: "Bi-Annual",
                  lastAuditDate: "2024-06-20",
                  nextDueDate: "2024-12-20",
                  status: "Pending",
                  complianceRate: 85,
                  assignee: "Pharmacy Operations",
                  priority: "High"
            },
            {
                  id: "COMP-003",
                  title: "DEA Controlled Substance Audit",
                  description: "Inventory audit of all controlled substances as per DEA regulations.",
                  category: "Regulatory",
                  frequency: "Quarterly",
                  lastAuditDate: "2024-09-30",
                  nextDueDate: "2024-12-31",
                  status: "Compliant",
                  complianceRate: 100,
                  assignee: "Inventory Manager",
                  priority: "Critical"
            },
            {
                  id: "COMP-004",
                  title: "State Board License Renewal",
                  description: "Renewal of pharmacy facility license with the State Board of Pharmacy.",
                  category: "Licensing",
                  frequency: "Annual",
                  lastAuditDate: "2023-11-01",
                  nextDueDate: "2024-11-01",
                  status: "Non-Compliant",
                  complianceRate: 0,
                  assignee: "Pharmacy Manager",
                  priority: "Critical"
            },
            {
                  id: "COMP-005",
                  title: "Fraud, Waste, and Abuse Training",
                  description: "Medicare Parts C and D General Compliance Training.",
                  category: "Regulatory",
                  frequency: "Annual",
                  lastAuditDate: "2024-02-10",
                  nextDueDate: "2025-02-10",
                  status: "Compliant",
                  complianceRate: 98,
                  assignee: "All Staff",
                  priority: "Medium"
            },
            {
                  id: "COMP-006",
                  title: "Cold Chain Management Log",
                  description: "Review of temperature logs for refrigerated medications.",
                  category: "Operations",
                  frequency: "Monthly",
                  lastAuditDate: "2024-11-01",
                  nextDueDate: "2024-12-01",
                  status: "Pending",
                  complianceRate: 90,
                  assignee: "Pharmacy Technician",
                  priority: "Medium"
            }
      ]
};
