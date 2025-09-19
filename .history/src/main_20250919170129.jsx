import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, createHashRouter, RouterProvider} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import GuestPage from "./pages/Guest.jsx";
import DashboardPage from "./pages/Dashboard.jsx";
import LoginPage from "./pages/Login.jsx";


const isFromGithub = import.meta.env.VITE_ROUTER_MODE || "hash";

const routesA = createBrowserRouter([

]);

const routesB = createHashRouter([
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
