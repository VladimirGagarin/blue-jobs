import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import GuestPage from "./pages/Guest.jsx";
import DashboardPage from "./pages/Dashboard.jsx";
import LoginPage from "./pages/Login.jsx";
import NotFoundPage from "./pages/NotFound.jsx";
import SignupPage from "./pages/Signup.jsx";
import ProfileContent from "./pages/Profile.jsx";
import OTP from "./pages/OTP.jsx";
import { Consent } from "./components/consent.jsx";
import { UserProvider } from "./contexts/UserData.jsx";
import { LanguageProvider } from "./contexts/LanguageProvider.jsx";

// Toggle here: set to "hash" for GitHub Pages, "browser" for real hosting
const ROUTER_MODE = import.meta.env.VITE_ROUTER_MODE || "hash";

const routes = [
  { path: "/", element: <App /> },
  { path: "/guest", element: <GuestPage /> },
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "*", element: <NotFoundPage /> },
  { path: "/consent", element:<Consent/>},
  {path: "/profile",element: <ProfileContent/>},
  
];

const router =
  ROUTER_MODE === "browser"
    ? createBrowserRouter(routes)
    : createHashRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </LanguageProvider>
  </StrictMode>
);
