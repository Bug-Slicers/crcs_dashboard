import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import Home from "./components/root/home";
import ErrorPage from "./routes/error-page";
import Applications from "./components/root/applications";
import Charts from "./components/root/charts";
import Amendments from "./components/root/amendments";
import CRCS_MIS from "./components/root/crcs-mis/crcs-mis";
import Reports from "./components/root/reports";
import Admin from "./routes/admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisteredSocieties from "./components/admin/registered-societies";
import Profile from "./components/admin/profile";
import Society from "./routes/society";
import SocietyApplications from "./components/society/society-applications";
import SocietyProfile from "./components/society/society-profile";
import CreateNewApplication from "./components/society/create-new-application";
import { UserProvider } from "./store/userContext";
import ViewApplication from "./components/society/view-application";
import SocietiesApplications from "./components/admin/societies-applications";
import SocietiyApplicationDetails from "./components/admin/society-application-details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "charts",
        element: <Charts />,
      },
      {
        path: "applications",
        element: <Applications />,
      },
      {
        path: "amendments",
        element: <Amendments />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "signup",
        element: <CRCS_MIS />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <RegisteredSocieties />,
      },
      {
        path: "registered-societies",
        element: <RegisteredSocieties />,
      },
      {
        path: "applications",
        element: <SocietiesApplications />,
      },
      {
        path: "application/:applicationId",
        element: <SocietiyApplicationDetails />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/society",
    element: <Society />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <SocietyProfile />,
      },
      {
        path: "applications",
        element: <SocietyApplications />,
      },
      {
        path: "profile",
        element: <SocietyProfile />,
      },
      {
        path: "new-application",
        element: <CreateNewApplication />,
      },
      {
        path: "application/:applicationId",
        element: <ViewApplication />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </UserProvider>
  </React.StrictMode>
);
