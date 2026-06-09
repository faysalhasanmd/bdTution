import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import Statistics from "../pages/Dashboard/Common/Statistics";
import MainLayout from "../layouts/MainLayout";
import { createBrowserRouter } from "react-router";
import AddTuition from "../pages/Dashboard/Seller/AddTuition";
import MyTuition from "../pages/Dashboard/Customer/MyTuition";
import TutorAppliedTuition from "../pages/Dashboard/Customer/TutorAppliedTuition";
import MyAppliedTuition from "../pages/Dashboard/Seller/MyAppliedTuition";
import ManageStudentPost from "../pages/Dashboard/Seller/ManageStudentPost";
import TuitionDetails from "../components/Home/TuitionDetails";
import Tutor from "../pages/Tutor/Tutor";
import TutorProfile from "../pages/Tutor/TutorProfile";
import PaymentComplete from "../pages/Dashboard/Customer/PaymentComplete";
import StudentPaymentHistory from "../pages/Dashboard/Customer/StudentPaymentHistory";
import TutorOngoingTuitions from "../tutrorPage/TutorOngoingTuitions";
import RevenueHistory from "../tutrorPage/RevenueHistory";
import ReportsAnalyticsPage from "../components/Dashboard/Sidebar/adminPages/ReportsAnalyticsPage";
import AdminStatistics from "../components/Dashboard/Statistics/AdminStatistics";
import TutorStatistics from "../components/Dashboard/Statistics/TutorStatistics";
import StudentStatistics from "../components/Dashboard/Statistics/StudentStatistics";
import AllTuitions from "../components/Shared/Navbar/AllTuitions";
import About from "../components/Shared/About";
import Contact from "../components/Shared/Contact";
import ProfileSetting from "../pages/Dashboard/Common/ProfileSetting";

export const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-tuitions",
        element: <AllTuitions />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/tutors", // ✅ Public Tutors page — no login needed
        element: <Tutor />,
      },
      {
        path: "/tutors/:id", // ✅ Public Tutor Profile — no login needed
        element: <TutorProfile />,
      },
      {
        path: "/tuition/:id",
        element: <TuitionDetails />,
      },
      {
        path: "/add-tuition",
        element: (
          <PrivateRoute>
            <AddTuition />
          </PrivateRoute>
        ),
      },
      {
        path: "/tutor-applied-tuition",
        element: (
          <PrivateRoute>
            <TutorAppliedTuition />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-applied-tuition",
        element: (
          <PrivateRoute>
            <MyAppliedTuition />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-tuition",
        element: (
          <PrivateRoute>
            <MyTuition />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-student-post",
        element: <ManageStudentPost />,
      },
      {
        path: "/student-payment-history",
        element: <StudentPaymentHistory />,
      },
      {
        path: "/tutor-ongoing-tuitions",
        element: <TutorOngoingTuitions />,
      },
      {
        path: "/revenue-history",
        element: <RevenueHistory />,
      },
      {
        path: "/reports-analytics",
        element: <ReportsAnalyticsPage />,
      },
      {
        path: "/admin-statistics",
        element: <AdminStatistics />,
      },
      {
        path: "/tutor-statistics",
        element: <TutorStatistics />,
      },
      {
        path: "/student-statistics",
        element: <StudentStatistics />,
      },
      {
        path: "/profile-setting",
        element: <ProfileSetting />,
      },
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/payment-complete",
    element: <PaymentComplete />,
  },

  // Dashboard Routes
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "add-tuition",
        element: (
          <PrivateRoute>
            <AddTuition />
          </PrivateRoute>
        ),
      },
      {
        path: "tutor-applied-tuition",
        element: (
          <PrivateRoute>
            <TutorAppliedTuition />
          </PrivateRoute>
        ),
      },
      {
        path: "my-applied-tuition",
        element: (
          <PrivateRoute>
            <MyAppliedTuition />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "my-tuition",
        element: (
          <PrivateRoute>
            <MyTuition />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-student-post",
        element: <ManageStudentPost />,
      },
      {
        path: "student-payment-history",
        element: <StudentPaymentHistory />,
      },
      {
        path: "tutor-ongoing-tuitions",
        element: <TutorOngoingTuitions />,
      },
      {
        path: "revenue-history",
        element: <RevenueHistory />,
      },
      {
        path: "reports-analytics",
        element: <ReportsAnalyticsPage />,
      },
      {
        path: "users/tutors",
        element: <Tutor />,
      },
      {
        path: "tutors/:id",
        element: <TutorProfile />,
      },
      {
        path: "admin-statistics",
        element: <AdminStatistics />,
      },
      {
        path: "tutor-statistics",
        element: <TutorStatistics />,
      },
      {
        path: "student-statistics",
        element: <StudentStatistics />,
      },
      {
        path: "profile-setting",
        element: <ProfileSetting />,
      },
    ],
  },
]);
