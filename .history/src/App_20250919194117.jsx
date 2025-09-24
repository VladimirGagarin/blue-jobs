import { useEffect, useState } from 'react';
import LoadingPage from "./components/LoadingPage";


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

        {!user ? (
          <div className="hero-actions">
            <button onClick={() => setPage("guest")}>Proceed as Guest</button>
            <button onClick={() => setPage("login")}>Login</button>
            <button onClick={() => setPage("signup")}>Signup</button>
          </div>
        ) : (
          <div className="hero-actions">
            <button onClick={() => setPage("dashboard")}>
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App
