import Login from "../components/Login";
import Signup from "../components/Signup";
import Home from "../components/Home";
import { Navigate } from "react-router-dom";
import TopBar from "../components/common/TopBar";
import Dashboard from "../components/Dashboard";
import Profile from "../components/Profile";
import AdminCreate from "../components/AdminCreate";
import UserSubmit from "../components/UserSubmit";
import UserCreate from "../components/UserCreate";
import ViewProject from "../components/ViewProject";
import ViweSubmitD from "../components/ViewSubmitD";
import ProtectedRoute from "./ProtectedRoute";
import AdminGuard from "./AdminGuard";
export default [
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/ViewProject/:projectId",
    element: (
      <>
        <ProtectedRoute>
          <TopBar />
          <ViewProject />
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: "/home",
    element: (
      <>
        <ProtectedRoute>
          <TopBar />
          <Home />
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: "/Dashboard",
    element: (
      <>
        <AdminGuard>
          <ProtectedRoute>
            <TopBar />
            <Dashboard />
          </ProtectedRoute>
        </AdminGuard>
      </>
    ),
  },
  {
    path: "/ViewSubmit/:projectId",
    element: (
      <>
        <ProtectedRoute>
          <TopBar />
          <ViweSubmitD />
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: "/create",
    element: (
      <>
        <AdminGuard>
          <ProtectedRoute>
            <TopBar />
            <AdminCreate />
          </ProtectedRoute>
        </AdminGuard>
      </>
    ),
  },
  {
    path: "/submitProject",
    element: (
      <>
        <ProtectedRoute>
          <TopBar />
          <UserCreate />
        </ProtectedRoute>
      </>
    ),
  },

  {
    path: "/CreateProject",
    element: (
      <>
        <ProtectedRoute>
          <TopBar />
          <UserSubmit />
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: "/Profile",
    element: (
      <>
        <TopBar />
        <Profile />
      </>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
];
