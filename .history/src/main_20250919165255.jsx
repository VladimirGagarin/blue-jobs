import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {CreateBrowserRouter, HashRouter, RouterProvider} from "react-router-dom"
import './index.css'
import App from './App.jsx'

const 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
