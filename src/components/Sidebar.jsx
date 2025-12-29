import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    ClipboardList,
    BarChart,
    Settings,
    HelpCircle,
    ScrollText,
    BanknoteArrowDown,
    IdCardLanyard,
    Users,
    CalendarClock,
    Briefcase,
    TrendingUp,
    DollarSign,
    CircleUser,
    Info,
    CalendarDays,
    ListTodo,
    FilePlus,
    Megaphone,
    Filter,
    CalendarCheck,
    FileSignature,
    MessageCircle,
    TableProperties,
    Palmtree,
    Hourglass,
    GraduationCap,
    Map,
    Award,
    BarChart2,
    ShieldCheck,
    Bot,
} from "lucide-react";
import logo from '../assets/Screenshot 2025-12-29 220722.png'

const Sidebar = ({ darkMode }) => {
    const location = useLocation();

    const linkClass = (path) =>
        `relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 group ${
            location.pathname === path
                ? "bg-gradient-to-r from-fuchsia-700/10 to-cyan-400/10 text-fuchsia-700 dark:text-cyan-400 font-semibold shadow-sm"
                : darkMode
                ? "text-gray-400 hover:bg-gradient-to-r from-fuchsia-700/10 to-cyan-400/10 hover:text-fuchsia-400" 
                : "text-gray-600 hover:bg-gradient-to-r from-fuchsia-700/10 to-cyan-400/10  hover:text-fuchsia-700" 
        }`;

    // Helper for the active indicator line
    const ActiveIndicator = ({ path }) => (
        location.pathname === path && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-fuchsia-700 dark:bg-cyan-400 rounded-r-full" />
        )
    );

    return (
        <div
            className={`w-64 h-screen fixed top-0 left-0 shadow-xl flex flex-col transition-colors duration-300 z-50  ${
                darkMode
                    ? "bg-gray-800 text-gray-100 border-gray-700"
                    : "bg-white text-gray-900 border-gray-100"
            }`}
        >
            {/* Brand Header with Gradient Text */}
            {/* <div className="px-6 py-6">
                <h1 className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-fuchsia-700 to-cyan-400 bg-clip-text text-transparent">
                   Minervasutra
                </h1>
            </div> */}
            <div className="flex justify-center mb-6 bg-transparent">
                        <img
                          src={logo}
                          alt="Company Logo"
                          className="h-16 object-contain bg-transparent"
                        />
                      </div>

            {/* Styled scrollbar container */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent dark:scrollbar-thumb-gray-700 hover:scrollbar-thumb-fuchsia-700/50">
                <nav className="px-4 pb-4 space-y-6">
                    
                    {/* Section: Menu */}
                    <div>
                        <p className={`px-3 mb-3 text-xs font-bold tracking-wider uppercase ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                            Menu
                        </p>
                        <div className="space-y-1">
                            <Link to="/" className={linkClass("/")}>
                                <ActiveIndicator path="/" />
                                <LayoutDashboard size={20} className={location.pathname === "/" ? "text-fuchsia-700 dark:text-cyan-400" : ""} />
                                <span>Dashboard</span>
                            </Link>
                            
                            
                            <div className="ml-4 pl-4 border-l border-gray-200 dark:border-gray-700 space-y-1 mt-2">
                                <Link to="/headcount" className={linkClass("/headcount")}>
                                    <ActiveIndicator path="/headcount" /> {/* ADDED */}
                                    <Users size={16} /> <span>Headcount</span>
                                </Link>
                                <Link to="/attendance" className={linkClass("/attendance")}>
                                    <ActiveIndicator path="/attendance" /> {/* ADDED */}
                                    <CalendarClock size={16} /> <span>Attendance</span>
                                </Link>
                                <Link to="/vacancypage" className={linkClass("/vacancypage")}>
                                    <ActiveIndicator path="/vacancypage" /> {/* ADDED */}
                                    <Briefcase size={16} /> <span>Vacancy list</span>
                                </Link>
                                <Link to="/performance" className={linkClass("/performance")}>
                                    <ActiveIndicator path="/performance" /> {/* ADDED */}
                                    <TrendingUp size={16} /> <span>Performance</span>
                                </Link>
                                <Link to="/payroll" className={linkClass("/payroll")}>
                                    <ActiveIndicator path="/payroll" /> {/* ADDED */}
                                    <DollarSign size={16} /> <span>Payroll</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Section: Employee Management */}
                    <div>
                        <p className={`px-3 mb-3 text-xs font-bold tracking-wider uppercase ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                            Employee Management
                        </p>
                        <div className="space-y-1">
                            <Link to="/employee-profiles" className={linkClass("/employee-profiles")}>
                                <ActiveIndicator path="/employee-profiles" />
                                <CircleUser size={18} /> <span>Profiles</span>
                            </Link>
                            <Link to="/status" className={linkClass("/status")}>
                                <ActiveIndicator path="/status" />
                                <Info size={18} /> <span>Status</span>
                            </Link>
                            <Link to="/event-tracker" className={linkClass("/event-tracker")}>
                                <ActiveIndicator path="/event-tracker" />
                                <CalendarDays size={18} /> <span>Event tracker</span>
                            </Link>
                            <Link to="/task-management" className={linkClass("/task-management")}>
                                <ActiveIndicator path="/task-management" />
                                <ListTodo size={18} /> <span>Task management</span>
                            </Link>
                        </div>
                    </div>

                    {/* Section: ATS */}
                    <div>
                        <p className={`px-3 mb-3 text-xs font-bold tracking-wider uppercase ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                            ATS & Recruiting
                        </p>
                        <div className="space-y-1">
                            <Link to="/#ats-jd" className={linkClass("/#ats-jd")}>
                                <ActiveIndicator path="/#ats-jd" /> {/* ADDED */}
                                <FilePlus size={18} /> <span>JD creation</span>
                            </Link>
                            <Link to="/job-postings" className={linkClass("/job-postings")}>
                                <ActiveIndicator path="/job-postings" /> {/* ADDED */}
                                <Megaphone size={18} /> <span>Job postings</span>
                            </Link>
                            <Link to="/candidate-pipeline" className={linkClass("/candidate-pipeline")}>
                                <ActiveIndicator path="/candidate-pipeline" /> {/* ADDED */}
                                <Filter size={18} /> <span>Candidate pipeline</span>
                            </Link>
                            <Link to="/interview-scheduling" className={linkClass("/interview-scheduling")}>
                                <ActiveIndicator path="/interview-scheduling" /> {/* ADDED */}
                                <CalendarCheck size={18} /> <span>Interviews</span>
                            </Link>
                            <Link to="/offer-management" className={linkClass("/offer-management")}>
                                <ActiveIndicator path="/offer-management" /> {/* ADDED */}
                                <FileSignature size={18} /> <span>Offers</span>
                            </Link>
                            <Link to="/negotiation-notes" className={linkClass("/negotiation-notes")}>
                                <ActiveIndicator path="/negotiation-notes" /> {/* ADDED */}
                                <MessageCircle size={18} /> <span>Negotiations</span>
                            </Link>
                        </div>
                    </div>

                    {/* Section: Time Off */}
                    <div>
                        <p className={`px-3 mb-3 text-xs font-bold tracking-wider uppercase ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                            Time Off
                        </p>
                        <div className="space-y-1">
                            <Link to="/time-sheet" className={linkClass("/time-sheet")}>
                                <ActiveIndicator path="/time-sheet" /> {/* ADDED */}
                                <TableProperties size={18} /> <span>Time sheet</span>
                            </Link>
                            <Link to="/pto-list" className={linkClass("/pto-list")}>
                                <ActiveIndicator path="/pto-list" /> {/* ADDED */}
                                <Palmtree size={18} /> <span>PTO list</span>
                            </Link>
                            <Link to="/overtime-list" className={linkClass("/overtime-list")}>
                                <ActiveIndicator path="/overtime-list" /> {/* ADDED */}
                                <Hourglass size={18} /> <span>Overtime</span>
                            </Link>
                        </div>
                    </div>

                    {/* Section: Knowledge */}
                    <div>
                        <p className={`px-3 mb-3 text-xs font-bold tracking-wider uppercase ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                            Knowledge & Growth
                        </p>
                        <div className="space-y-1">
                            <Link to="/trainings" className={linkClass("/trainings")}>
                                <ActiveIndicator path="/trainings" /> {/* ADDED */}
                                <GraduationCap size={18} /> <span>Trainings</span>
                            </Link>
                            <Link to="/skill-roadmap" className={linkClass("/skill-roadmap")}>
                                <ActiveIndicator path="/skill-roadmap" /> {/* ADDED */}
                                <Map size={18} /> <span>Skill roadmap</span>
                            </Link>
                            <Link to="/certifications" className={linkClass("/certifications")}>
                                <ActiveIndicator path="/certifications" /> {/* ADDED */}
                                <Award size={18} /> <span>Certifications</span>
                            </Link>
                            <Link to="/progress" className={linkClass("/progress")}>
                                <ActiveIndicator path="/progress" /> {/* ADDED */}
                                <BarChart2 size={18} /> <span>Progress</span>
                            </Link>
                            <Link to="/compliance" className={linkClass("/compliance")}>
                                <ActiveIndicator path="/compliance" /> {/* ADDED */}
                                <ShieldCheck size={18} /> <span>Compliance</span>
                            </Link>
                            {/* <Link to="/analytics" className={linkClass("/analytics")}>
                                <ActiveIndicator path="/analytics" />
                                <BarChart size={18} /> <span>Analytics</span>
                            </Link> */}
                        </div>
                    </div>

                    {/* Section: Others */}
                    <div>
                        <p className={`px-3 mb-3 text-xs font-bold tracking-wider uppercase ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                            Others
                        </p>
                        <div className="space-y-1">
                            <Link to="/customer-orders" className={linkClass("/customer-orders")}>
                                <ActiveIndicator path="/customer-orders" /> {/* ADDED */}
                                <ClipboardList size={18} /> <span>Orders</span>
                            </Link>
                            <Link to="/notes" className={linkClass("/notes")}>
                                <ActiveIndicator path="/notes" /> {/* ADDED */}
                                <ScrollText size={18} /> <span>Notes</span>
                            </Link>
                            <Link to="/expenses" className={linkClass("/expenses")}>
                                <ActiveIndicator path="/expenses" /> {/* ADDED */}
                                <BanknoteArrowDown size={18} /> <span>Expenses</span>
                            </Link>
                            <Link to="/employee" className={linkClass("/employee")}>
                                <ActiveIndicator path="/employee" /> {/* ADDED */}
                                <IdCardLanyard size={18} /> <span>Employee</span>
                            </Link>
                            <Link to="/ai-assistant" className={linkClass("/ai-assistant")}>
                                <ActiveIndicator path="/ai-assistant" />
                                <Bot size={20} className={location.pathname === "/ai-assistant" ? "text-fuchsia-700 dark:text-cyan-400" : ""} />
                                <span>Assistant</span>
                            </Link>
                        </div>
                    </div>

                    {/* Section: Preferences */}
                    <div>
                        <p className={`px-3 mb-3 text-xs font-bold tracking-wider uppercase ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                            Preferences
                        </p>
                        <div className="space-y-1">
                            <Link to="/help-supports" className={linkClass("/help-supports")}>
                                <ActiveIndicator path="/help-supports" /> {/* ADDED */}
                                <HelpCircle size={18} /> <span>Help & Support</span>
                            </Link>
                            <Link to="/settings" className={linkClass("/settings")}>
                                <ActiveIndicator path="/settings" /> {/* ADDED */}
                                <Settings size={18} /> <span>Settings</span>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>

            {/* (Footer CTA Card is commented out) */}
        </div>
    );
};

export default Sidebar;