import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, HashRouter, RouterProvider} from "react-router-dom"
import './index.css'
import App from './App.jsx'

const isFromGithub = import.meta.env.VITE_ROUTER_MODE || "hash";

const routes = B

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
