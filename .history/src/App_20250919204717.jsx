import { useEffect, useState } from 'react';
import LoadingPage from "./components/LoadingPage";
import Logo from "../assets/logo.svg";

import './App.css'

function App() {
   const [loading, setLoading] = useState(true);

     useEffect(() => {
       const handleLoad = () => {
        
        
         setLoading(false);
       };

       if (document.readyState === "complete") {
         handleLoad();
       } else {
         window.addEventListener("load", handleLoad);
       }

       return () => window.removeEventListener("load", handleLoad);
     }, []);

  return (
    <>
      {loading && <LoadingPage message={"Welcome To Blue Jobs"} />}

      <div className="hero-page">
        <h1>Welcome to BlueJobs</h1>
        <p>Find or post casual jobs with ease.</p>

        
          <div className="hero-actions">
            <button>
              Go to Dashboard
            </button>
          </div>
      </div>
    </>
  );
}

export default App
