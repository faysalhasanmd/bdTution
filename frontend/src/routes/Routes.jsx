import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";

// Eager load (ছোট/critical pages)
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import ErrorPage from "../pages/ErrorPage";
import Blog from "../pages/blog/Blog";

// Lazy load (বাকি সব)
const Home = lazy(() => import("../pages/Home/Home"));
const About = lazy(() => import("../components/Shared/About"));
const Contact = lazy(() => import("../components/Shared/Contact"));
const PrivacyPolicy = lazy(
  () => import("../pages/PrivacyPolicy/PrivacyPolicy"),
);
const AllTuitions = lazy(
  () => import("../components/Shared/Navbar/AllTuitions"),
);
const TuitionDetails = lazy(() => import("../components/Home/TuitionDetails"));
const Tutor = lazy(() => import("../pages/Tutor/Tutor"));
const TutorProfile = lazy(() => import("../pages/Tutor/TutorProfile"));
const AddTuition = lazy(() => import("../pages/Dashboard/Seller/AddTuition"));
const MyTuition = lazy(() => import("../pages/Dashboard/Customer/MyTuition"));
const TutorAppliedTuition = lazy(
  () => import("../pages/Dashboard/Customer/TutorAppliedTuition"),
);
const MyAppliedTuition = lazy(
  () => import("../pages/Dashboard/Seller/MyAppliedTuition"),
);
const ManageStudentPost = lazy(
  () => import("../pages/Dashboard/Seller/ManageStudentPost"),
);
const ManageUsers = lazy(() => import("../pages/Dashboard/Admin/ManageUsers"));
const Profile = lazy(() => import("../pages/Dashboard/Common/Profile"));
const ProfileSetting = lazy(
  () => import("../pages/Dashboard/Common/ProfileSetting"),
);
const Statistics = lazy(() => import("../pages/Dashboard/Common/Statistics"));
const AdminStatistics = lazy(
  () => import("../components/Dashboard/Statistics/AdminStatistics"),
);
const TutorStatistics = lazy(
  () => import("../components/Dashboard/Statistics/TutorStatistics"),
);
const StudentStatistics = lazy(
  () => import("../components/Dashboard/Statistics/StudentStatistics"),
);
const PaymentComplete = lazy(
  () => import("../pages/Dashboard/Customer/PaymentComplete"),
);
const StudentPaymentHistory = lazy(
  () => import("../pages/Dashboard/Customer/StudentPaymentHistory"),
);
const TutorOngoingTuitions = lazy(
  () => import("../tutrorPage/TutorOngoingTuitions"),
);
const RevenueHistory = lazy(() => import("../tutrorPage/RevenueHistory"));
const ReportsAnalyticsPage = lazy(
  () =>
    import("../components/Dashboard/Sidebar/adminPages/ReportsAnalyticsPage"),
);

// Suspense fallback
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-lime-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
    </div>
  </div>
);

const wrap = (element) => <Suspense fallback={<Loading />}>{element}</Suspense>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: wrap(<Home />) },
      { path: "/all-tuitions", element: wrap(<AllTuitions />) },
      { path: "/about", element: wrap(<About />) },
      { path: "/contact", element: wrap(<Contact />) },
      { path: "/privacy-policy", element: wrap(<PrivacyPolicy />) },
      { path: "/blogs", element: wrap(<Blog />) },

      { path: "/tutors", element: wrap(<Tutor />) },
      { path: "/tutors/:id", element: wrap(<TutorProfile />) },
      { path: "/tuition/:id", element: wrap(<TuitionDetails />) },
      {
        path: "/add-tuition",
        element: <PrivateRoute>{wrap(<AddTuition />)}</PrivateRoute>,
      },
      {
        path: "/tutor-applied-tuition",
        element: <PrivateRoute>{wrap(<TutorAppliedTuition />)}</PrivateRoute>,
      },
      {
        path: "/my-applied-tuition",
        element: <PrivateRoute>{wrap(<MyAppliedTuition />)}</PrivateRoute>,
      },
      {
        path: "/manage-users",
        element: <PrivateRoute>{wrap(<ManageUsers />)}</PrivateRoute>,
      },
      {
        path: "/profile",
        element: <PrivateRoute>{wrap(<Profile />)}</PrivateRoute>,
      },
      {
        path: "/my-tuition",
        element: <PrivateRoute>{wrap(<MyTuition />)}</PrivateRoute>,
      },
      { path: "/manage-student-post", element: wrap(<ManageStudentPost />) },
      {
        path: "/student-payment-history",
        element: wrap(<StudentPaymentHistory />),
      },
      {
        path: "/tutor-ongoing-tuitions",
        element: wrap(<TutorOngoingTuitions />),
      },
      { path: "/revenue-history", element: wrap(<RevenueHistory />) },
      { path: "/reports-analytics", element: wrap(<ReportsAnalyticsPage />) },
      { path: "/admin-statistics", element: wrap(<AdminStatistics />) },
      { path: "/tutor-statistics", element: wrap(<TutorStatistics />) },
      { path: "/student-statistics", element: wrap(<StudentStatistics />) },
      { path: "/profile-setting", element: wrap(<ProfileSetting />) },
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/payment-complete", element: wrap(<PaymentComplete />) },

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
        element: <PrivateRoute>{wrap(<Statistics />)}</PrivateRoute>,
      },
      {
        path: "add-tuition",
        element: <PrivateRoute>{wrap(<AddTuition />)}</PrivateRoute>,
      },
      {
        path: "tutor-applied-tuition",
        element: <PrivateRoute>{wrap(<TutorAppliedTuition />)}</PrivateRoute>,
      },
      {
        path: "my-applied-tuition",
        element: <PrivateRoute>{wrap(<MyAppliedTuition />)}</PrivateRoute>,
      },
      {
        path: "manage-users",
        element: <PrivateRoute>{wrap(<ManageUsers />)}</PrivateRoute>,
      },
      {
        path: "profile",
        element: <PrivateRoute>{wrap(<Profile />)}</PrivateRoute>,
      },
      {
        path: "my-tuition",
        element: <PrivateRoute>{wrap(<MyTuition />)}</PrivateRoute>,
      },
      { path: "manage-student-post", element: wrap(<ManageStudentPost />) },
      {
        path: "student-payment-history",
        element: wrap(<StudentPaymentHistory />),
      },
      {
        path: "tutor-ongoing-tuitions",
        element: wrap(<TutorOngoingTuitions />),
      },
      { path: "revenue-history", element: wrap(<RevenueHistory />) },
      { path: "reports-analytics", element: wrap(<ReportsAnalyticsPage />) },
      { path: "users/tutors", element: wrap(<Tutor />) },
      { path: "tutors/:id", element: wrap(<TutorProfile />) },
      { path: "admin-statistics", element: wrap(<AdminStatistics />) },
      { path: "tutor-statistics", element: wrap(<TutorStatistics />) },
      { path: "student-statistics", element: wrap(<StudentStatistics />) },
      { path: "profile-setting", element: wrap(<ProfileSetting />) },
    ],
  },
]);
