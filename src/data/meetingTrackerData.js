export const meetingTrackerData = {
      metrics: {
            scheduled: 18,
            completed: 42,
            cancelled: 5,
            avgDuration: "45 mins"
      },
      meetings: [
            {
                  id: "MTG-2024-001",
                  title: "Q4 Performance Review",
                  organizer: "Sarah Johnson",
                  avatar: "https://i.pravatar.cc/150?u=sarah",
                  date: "2024-12-06",
                  time: "10:00 AM",
                  duration: "60 mins",
                  attendees: ["John Doe", "Jane Smith", "Mike Wilson"],
                  status: "Scheduled",
                  location: "Conference Room A",
                  type: "Review",
                  priority: "High"
            },
            {
                  id: "MTG-2024-002",
                  title: "Team Standup - Development",
                  organizer: "Marcus Chen",
                  avatar: "https://i.pravatar.cc/150?u=marcus",
                  date: "2024-12-05",
                  time: "9:00 AM",
                  duration: "15 mins",
                  attendees: ["Dev Team"],
                  status: "Completed",
                  location: "Virtual - Zoom",
                  type: "Standup",
                  priority: "Medium"
            },
            {
                  id: "MTG-2024-003",
                  title: "Client Presentation - PharmaCorp",
                  organizer: "Emily Rodriguez",
                  avatar: "https://i.pravatar.cc/150?u=emily",
                  date: "2024-12-08",
                  time: "2:00 PM",
                  duration: "90 mins",
                  attendees: ["Client Team", "Sales Team"],
                  status: "Scheduled",
                  location: "Virtual - Teams",
                  type: "Client Meeting",
                  priority: "Critical"
            },
            {
                  id: "MTG-2024-004",
                  title: "Budget Planning Session",
                  organizer: "David Park",
                  avatar: "https://i.pravatar.cc/150?u=david",
                  date: "2024-12-07",
                  time: "11:00 AM",
                  duration: "120 mins",
                  attendees: ["Finance Team", "Department Heads"],
                  status: "Scheduled",
                  location: "Conference Room B",
                  type: "Planning",
                  priority: "High"
            },
            {
                  id: "MTG-2024-005",
                  title: "Weekly HR Sync",
                  organizer: "Lisa Anderson",
                  avatar: "https://i.pravatar.cc/150?u=lisa",
                  date: "2024-12-04",
                  time: "3:00 PM",
                  duration: "30 mins",
                  attendees: ["HR Team"],
                  status: "Completed",
                  location: "HR Office",
                  type: "Sync",
                  priority: "Medium"
            },
            {
                  id: "MTG-2024-006",
                  title: "Product Roadmap Discussion",
                  organizer: "Tom Bradley",
                  avatar: "https://i.pravatar.cc/150?u=tom",
                  date: "2024-12-03",
                  time: "1:00 PM",
                  duration: "45 mins",
                  attendees: ["Product Team", "Engineering"],
                  status: "Cancelled",
                  location: "Virtual - Zoom",
                  type: "Planning",
                  priority: "Medium"
            }
      ]
};
