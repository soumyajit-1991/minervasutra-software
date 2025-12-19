import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import Headcount from "./pages/Headcount";
import Attendance from "./pages/Attendance";
import Vacancy from "./pages/Vacancy";
import Performance from "./pages/Performance";
import Payroll from "./pages/Payroll";
import EmployeeDirectory from "./pages/EmployeeDirectory";
import TeamHierarchy from "./pages/TeamHierarchy";
import EmployeeProfiles from "./pages/EmployeeProfiles";
import Status from "./pages/Status";
import Workflow from "./pages/Workflow";
import MeetingTracker from "./pages/MeetingTracker";
import TaskManagement from "./pages/TaskManagement";
import JobPostings from "./pages/JobPostings";
import CandidatePipeline from "./pages/CandidatePipeline";
import InterviewScheduling from "./pages/InterviewScheduling";
import OfferManagement from "./pages/OfferManagement";
import Login from "./pages/Login";
import NegotiationNotes from "./pages/NegotiationNotes";
import TimeSheet from "./pages/TimeSheet";
import PTOList from "./pages/PTOList";
import OvertimeList from "./pages/OvertimeList";
import Trainings from "./pages/Trainings";
import SkillRoadmap from "./pages/SkillRoadmap";
import Certifications from "./pages/Certifications";
import Progress from "./pages/Progress";
import Compliance from "./pages/Compliance";
import Customer from "./pages/Customer";
import Analytics from "./pages/Analytics";
import Suppliers from "./pages/Suppliers";
import Product from "./pages/Product";
import Doctor from "./pages/Doctor";
import SupplierOrder from "./pages/SupplierOrder";
import CustomerOrders from "./pages/CustomerOrders";
import HelpSupport from "./pages/Helps&Supports";
import Settings from "./pages/Settings";
import Notes from "./pages/Notes";
import Expenses from "./pages/Expenses";
import Employee from "./pages/Employees";
import ReturnProduct from "./pages/ReturnProduct";
import Branch from "./pages/Branch";
import AiAssistant from "./pages/AiAssistant";

// Add Forms
import AddCustomer from "./addform/AddCustomer";
import AddSupplier from "./addform/AddSuppliers";
import AddProduct from "./addform/AddProduct";
import AddDoctor from "./addform/AddDoctor";
import AddAppointment from "./addform/AddAppointment";
import AddNewSupplierOrder from "./addform/AddSupplierOrder";
import AddCustomerOrder from "./addform/AddCustomerOrder";
import AddNote from "./addform/AddNote";
import AddExpense from "./addform/AddExpense";
import AddEmployee from "./addform/AddEmployee";
import AddNewEmployee from "./addform/AddNewEmployee";
import AddReturnProduct from "./addform/AddReturnProduct";
import AddBranch from "./addform/AddBranch";
import AddCompliance from "./addform/AddCompliance";
import AddJobPosting from "./addform/AddJobPosting";
import AddCandidate from "./addform/AddCandidate";
import EditCandidate from "./addform/EditCandidate";
import AddInterview from "./addform/AddInterview";
import EditInterview from "./addform/EditInterview";
import AddOffer from "./addform/AddOffer";
import EditOffer from "./addform/EditOffer";
import AddNegotiation from "./addform/AddNegotiation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          {/* Pages */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/headcount" element={<Headcount />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/vacancypage" element={<Vacancy />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/employee-directory" element={<EmployeeDirectory />} />
          <Route path="/team-hierarchy" element={<TeamHierarchy />} />
          <Route path="/employee-profiles" element={<EmployeeProfiles />} />
          <Route path="/status" element={<Status />} />
          <Route path="/workflow" element={<Workflow />} />
          <Route path="/event-tracker" element={<MeetingTracker />} />
          <Route path="/task-management" element={<TaskManagement />} />
          <Route path="/ai-assistant" element={<AiAssistant />} />
          <Route path="/job-postings" element={<JobPostings />} />
          <Route path="/candidate-pipeline" element={<CandidatePipeline />} />
          <Route path="/interview-scheduling" element={<InterviewScheduling />} />
          <Route path="/offer-management" element={<OfferManagement />} />
          <Route path="/negotiation-notes" element={<NegotiationNotes />} />
          <Route path="/time-sheet" element={<TimeSheet />} />
          <Route path="/pto-list" element={<PTOList />} />
          <Route path="/overtime-list" element={<OvertimeList />} />
          <Route path="/trainings" element={<Trainings />} />
          <Route path="/skill-roadmap" element={<SkillRoadmap />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/customer" element={<Customer />} />
          {/* <Route path="/analytics" element={<Analytics />} /> */}
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/products" element={<Product />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/supplier-orders" element={<SupplierOrder />} />
          <Route path="/customer-orders" element={<CustomerOrders />} />
          <Route path="/help-supports" element={<HelpSupport />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/return-product" element={<ReturnProduct />} />
          <Route path="/branch" element={<Branch />} />

          {/* Add Forms */}
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/add-supplier" element={<AddSupplier />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/add-appointment" element={<AddAppointment />} />
          <Route path="/add-supplier-order" element={<AddNewSupplierOrder />} />
          <Route path="/add-customer-order" element={<AddCustomerOrder />} />
          <Route path="/add-note" element={<AddNote />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/edit-expense/:id" element={<AddExpense />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/add-new-employee" element={<AddNewEmployee />} />
          <Route path="/add-return-product" element={<AddReturnProduct />} />
          <Route path="/add-branch" element={<AddBranch />} />
          <Route path="/add-compliance" element={<AddCompliance />} />
          <Route path="/add-job-posting" element={<AddJobPosting />} />
          <Route path="/add-candidate" element={<AddCandidate />} />
          <Route path="/edit-candidate/:id" element={<EditCandidate />} />
          <Route path="/add-interview" element={<AddInterview />} />
          <Route path="/edit-interview/:id" element={<EditInterview />} />
          <Route path="/add-offer" element={<AddOffer />} />
          <Route path="/edit-offer/:id" element={<EditOffer />} />
          <Route path="/add-negotiation" element={<AddNegotiation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
