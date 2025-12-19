export const teamHierarchyData = {
      id: "E001",
      name: "Dr. Eleanor Vance",
      role: "CEO",
      avatar: "https://i.pravatar.cc/150?u=eleanor",
      children: [
            {
                  id: "E002",
                  name: "Marcus Thorne",
                  role: "CTO",
                  avatar: "https://i.pravatar.cc/150?u=marcus",
                  children: [
                        {
                              id: "E005",
                              name: "Alice Johnson",
                              role: "Frontend Lead",
                              avatar: "https://i.pravatar.cc/150?u=alice",
                              children: [
                                    { id: "E011", name: "Sam Wilson", role: "Junior Dev", avatar: "https://i.pravatar.cc/150?u=sam" }
                              ]
                        },
                        {
                              id: "E006",
                              name: "Ethan Hunt",
                              role: "DevOps Engineer",
                              avatar: "https://i.pravatar.cc/150?u=ethan",
                        }
                  ]
            },
            {
                  id: "E003",
                  name: "Olivia Pope",
                  role: "VP of Sales",
                  avatar: "https://i.pravatar.cc/150?u=olivia",
                  children: [
                        {
                              id: "E007",
                              name: "Bob Smith",
                              role: "Regional Manager",
                              avatar: "https://i.pravatar.cc/150?u=bob",
                        },
                        {
                              id: "E008",
                              name: "George Abitbol",
                              role: "Sales Rep",
                              avatar: "https://i.pravatar.cc/150?u=george",
                        }
                  ]
            },
            {
                  id: "E004",
                  name: "Miranda Priestly",
                  role: "VP of Marketing",
                  avatar: "https://i.pravatar.cc/150?u=miranda",
                  children: [
                        {
                              id: "E009",
                              name: "Sophia Petrillo",
                              role: "Content Strategist",
                              avatar: "https://i.pravatar.cc/150?u=sophia",
                        },
                        {
                              id: "E010",
                              name: "Dorothy Zbornak",
                              role: "SEO Specialist",
                              avatar: "https://i.pravatar.cc/150?u=dorothy",
                        }
                  ]
            }
      ]
};
