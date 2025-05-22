import { Routes, Route } from "react-router-dom";
import Register from "./Landing/components/Register";
import Login from "./Landing/components/Login";
import MainPages from "./Landing/components/MainPages";
import StudentDashboard from "./studentsComponents/components/StudentDashboard";
import StudentProfile from "./studentsComponents/components/StudentProfile";
import SchedulePage from "./studentsComponents/components/SchedulePage";
import ApplyForJobs from "./studentsComponents/components/ApplyForJobs";
import JobDetails from "./studentsComponents/components/jobView/JobDetails";
import JobApplied from "./studentsComponents/components/JobApplied";
import SupportChat from "./studentsComponents/components/Supportchat";
import Layout from "./Hrdashboard/Layout";
import HRSchedulePage from "./Hrdashboard/pages/hrSchedule";

//import OTPLogin from "./Landing/components/OTPLogin"; // ✅ Add path as per your folder
import ForgotPassword from "./Landing/components/ForgotPassword"; // ✅ Add path as per your folder

import "./App.css";

// Layout for student-related routes that need SupportChat
function StudentLayout({ children }) {
  return (
    <>
      {children}
      <SupportChat />
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainPages />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
  {/* <Route path="/otp-login" element={<OTPLogin />} /> ✅ OTP login route */}
      <Route path="/forgot-password" element={<ForgotPassword />} /> {/* ✅ Forgot password */}

      {/* HR Dashboard Routes */}
      <Route path="/hire" element={<Layout />}>
        <Route path="hrprofile" element={<HRSchedulePage />} />
      </Route>

      {/* Student Routes with SupportChat */}
      <Route
        path="/profile"
        element={
          <StudentLayout>
            <StudentProfile />
          </StudentLayout>
        }
      />
      <Route
        path="/schedule"
        element={
          <StudentLayout>
            <SchedulePage />
          </StudentLayout>
        }
      />
      <Route
        path="/apply-for-jobs"
        element={
          <StudentLayout>
            <ApplyForJobs />
          </StudentLayout>
        }
      />
      <Route
        path="/apply-for-jobs/job-details/:id"
        element={
          <StudentLayout>
            <JobDetails />
          </StudentLayout>
        }
      />
      <Route
        path="/applied-jobs"
        element={
          <StudentLayout>
            <JobApplied />
          </StudentLayout>
        }
      />
    </Routes>
  );
}

export default App;
