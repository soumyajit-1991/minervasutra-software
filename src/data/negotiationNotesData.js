export const negotiationNotesData = {
      metrics: {
            totalNegotiations: 18,
            active: 6,
            approved: 9,
            rejected: 3
      },
      negotiations: [
            {
                  id: "NEG-2024-001",
                  candidateName: "Emily Rodriguez",
                  candidateAvatar: "https://i.pravatar.cc/150?u=emilyr",
                  position: "HR Manager",
                  originalOffer: "$90,000",
                  counterOffer: "$95,000",
                  finalOffer: "$95,000",
                  status: "Approved",
                  negotiationDate: "2024-11-28",
                  approvedBy: "Sarah Johnson",
                  approvalDate: "2024-11-30",
                  documents: [
                        { name: "Offer Letter - Final", url: "#" },
                        { name: "Counter Offer Summary", url: "#" }
                  ],
                  notes: [
                        {
                              date: "2024-11-28",
                              author: "Lisa Anderson",
                              content: "Candidate requested higher base salary citing market research and 10 years experience"
                        },
                        {
                              date: "2024-11-29",
                              author: "Sarah Johnson",
                              content: "Reviewed market data, candidate's request is reasonable. Recommending approval"
                        },
                        {
                              date: "2024-11-30",
                              author: "Sarah Johnson",
                              content: "Approved counter offer. Updated offer letter sent to candidate"
                        }
                  ],
                  benefits: ["Additional PTO days", "Flexible work schedule"]
            },
            {
                  id: "NEG-2024-002",
                  candidateName: "Christopher Lee",
                  candidateAvatar: "https://i.pravatar.cc/150?u=christopherl",
                  position: "Senior Pharmacist",
                  originalOffer: "$100,000",
                  counterOffer: "$108,000",
                  finalOffer: "$105,000",
                  status: "Active",
                  negotiationDate: "2024-12-01",
                  approvedBy: null,
                  approvalDate: null,
                  documents: [
                        { name: "Revised Offer Draft", url: "#" }
                  ],
                  notes: [
                        {
                              date: "2024-12-01",
                              author: "John Davis",
                              content: "Candidate requested $108k base salary and sign-on bonus"
                        },
                        {
                              date: "2024-12-02",
                              author: "Lisa Anderson",
                              content: "Counter-proposed $105k with performance bonus structure. Awaiting candidate response"
                        }
                  ],
                  benefits: ["Sign-on bonus $5,000", "Performance bonus eligibility"]
            },
            {
                  id: "NEG-2024-003",
                  candidateName: "Robert Johnson",
                  candidateAvatar: "https://i.pravatar.cc/150?u=robertj",
                  position: "IT Systems Administrator",
                  originalOffer: "$85,000",
                  counterOffer: "$92,000",
                  finalOffer: "$90,000",
                  status: "Approved",
                  negotiationDate: "2024-11-25",
                  approvedBy: "John Davis",
                  approvalDate: "2024-11-27",
                  documents: [
                        { name: "Remote Work Addendum", url: "#" }
                  ],
                  notes: [
                        {
                              date: "2024-11-25",
                              author: "Sarah Johnson",
                              content: "Candidate requested higher salary and remote work flexibility"
                        },
                        {
                              date: "2024-11-26",
                              author: "John Davis",
                              content: "Approved $90k with full remote work option. Good compromise"
                        },
                        {
                              date: "2024-11-27",
                              author: "Sarah Johnson",
                              content: "Candidate accepted revised offer"
                        }
                  ],
                  benefits: ["Full remote work", "Home office stipend"]
            },
            {
                  id: "NEG-2024-004",
                  candidateName: "Sarah Mitchell",
                  candidateAvatar: "https://i.pravatar.cc/150?u=sarahm",
                  position: "Senior Pharmacist",
                  originalOffer: "$98,000",
                  counterOffer: "$105,000",
                  finalOffer: "$102,000",
                  status: "Approved",
                  negotiationDate: "2024-11-22",
                  approvedBy: "Lisa Anderson",
                  approvalDate: "2024-11-24",
                  documents: [
                        { name: "Relocation Package Details", url: "#" },
                        { name: "Approval Memo", url: "#" }
                  ],
                  notes: [
                        {
                              date: "2024-11-22",
                              author: "John Davis",
                              content: "Candidate requested higher base and relocation assistance"
                        },
                        {
                              date: "2024-11-23",
                              author: "Lisa Anderson",
                              content: "Approved $102k base with $8k relocation package"
                        }
                  ],
                  benefits: ["Relocation assistance $8,000", "Continuing education budget"]
            },
            {
                  id: "NEG-2024-005",
                  candidateName: "Michael Chen",
                  candidateAvatar: "https://i.pravatar.cc/150?u=michaelc",
                  position: "Pharmacy Technician",
                  originalOffer: "$45,000",
                  counterOffer: "$52,000",
                  finalOffer: null,
                  status: "Rejected",
                  negotiationDate: "2024-11-20",
                  approvedBy: "Sarah Johnson",
                  approvalDate: "2024-11-21",
                  documents: [],
                  notes: [
                        {
                              date: "2024-11-20",
                              author: "Lisa Anderson",
                              content: "Candidate requested $52k, significantly above budget for this role"
                        },
                        {
                              date: "2024-11-21",
                              author: "Sarah Johnson",
                              content: "Counter offer exceeds budget constraints. Offered $48k as final. Candidate declined"
                        }
                  ],
                  benefits: []
            },
            {
                  id: "NEG-2024-006",
                  candidateName: "Jessica Taylor",
                  candidateAvatar: "https://i.pravatar.cc/150?u=jessicat",
                  position: "Inventory Manager",
                  originalOffer: "$68,000",
                  counterOffer: "$72,000",
                  finalOffer: null,
                  status: "Active",
                  negotiationDate: "2024-12-03",
                  approvedBy: null,
                  approvalDate: null,
                  documents: [],
                  notes: [
                        {
                              date: "2024-12-03",
                              author: "John Davis",
                              content: "Candidate requested $72k and additional vacation days. Under review"
                        }
                  ],
                  benefits: ["Additional 5 PTO days requested"]
            }
      ]
};
