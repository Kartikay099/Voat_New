import { Routes, Route, useLocation, Link } from "react-router-dom";
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
import ForgotPassword from "./Landing/components/ForgotPassword";
import Navbar from "./Landing/components/Navbar";
import ChangePassword from "./studentsComponents/components/ChangePassword"; // ✅ Added

import "./App.css";

function StudentLayout({ children }) {
  return (
    <>
      {children}
      <SupportChat />
    </>
  );
}

function App() {
  const location = useLocation();

  // Check if the current path is "/"
  const isMainPage = location.pathname === "/";

  return (
    <>
      {/* ✅ Padding only for main page */}
      {isMainPage && <div className="pt-1" />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainPages />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />


        {/* HR Dashboard Routes */}
        <Route path="/hire" element={<Layout />}>
          <Route path="hrprofile" element={<HRSchedulePage />} />
        </Route>

        {/* Student Routes */}
        <Route
          path="/profile"
          element={
            <StudentLayout>
              <StudentProfile />
            </StudentLayout>
          }
        />
        <Route
          path="/ChangePassword" // ✅ New route for Change Password
          element={
            <StudentLayout>
              <ChangePassword />
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
    </>
  );
}

export default App;
