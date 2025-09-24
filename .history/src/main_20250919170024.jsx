import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, createHashRouter, RouterProvider} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import GuestScreen from "./pages/Guest.jsx";
import DashboardScreen from ""

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
