import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, HashRouter, RouterProvider} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import { create } from 'zustand'

const isFromGithub = import.meta.env.VITE_ROUTER_MODE || "hash";

const routesA = createBrowserRouter([

]);

const routesB = createHas

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
