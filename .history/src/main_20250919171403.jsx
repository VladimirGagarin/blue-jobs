import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, createHashRouter, RouterProvider} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import GuestPage from "./pages/Guest.jsx";
import DashboardPage from "./pages/Dashboard.jsx";
import LoginPage from "./pages/Login.jsx";
import NotFoundPage from "./pages/NotFound.jsx";
import SignupPage from "./pages/Signup.jsx";


const isFromGithub = import.meta.env.VITE_ROUTER_MODE || "hash";

const routesA = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/guest", element: <GuestPage /> },
  { path: "/dashboard", element: <DashboardPage /> },
  {path: "/"}
]);

const routesB = createHashRouter([
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
