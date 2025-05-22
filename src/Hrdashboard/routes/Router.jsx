import { createBrowserRouter } from "react-router-dom";

// Navigate for redirection
import { Navigate } from 'react-router-dom';

import App from "../src/App";
import Layout from "../Layout";
import Profile from "../pages/hrProfile";
import HRSchedulePage from "../pages/hrSchedule";
import PostJob from "../pages/PostJob";
import AllJobs from "../pages/Alljobbs";
import Applications from "../pages/Applications";
import ApprovedStudents from "../pages/ApprovedStudents";
import StudentsOnHold from "../pages/StudentsOnHold";
import QuickHire from "../pages/QuickHire";
import DataRequest from "../pages/DataRequest";
import GetProfile from "../pages/GetProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/hrprofile" replace />
      },
      {
        path: "hrprofile",
        element: <hrProfile />
      },
      {
        path: "schedule",
        element: <HRSchedulePage />
      },
    //   {
    //     path: "hiring",
    //     element: <Hirin />
    //   },
      {
        path: "post-job",
        element: <PostJob />
      },
      {
        path: "all-jobs",
        element: <AllJobs />
      },
      {
        path: "applications",
        element: <Applications />
      },
      {
        path: "approved-students",
        element: <ApprovedStudents />
      },
      {
        path: "students-on-hold",
        element: <StudentsOnHold />
      },
      {
        path: "quick-hire",
        element: <QuickHire />
      },
      {
        path: "data-request",
        element: <DataRequest />
      },
      {
        path: "get-profile",
        element: <GetProfile/>
      }
    ]
  }
]);

export default Router;