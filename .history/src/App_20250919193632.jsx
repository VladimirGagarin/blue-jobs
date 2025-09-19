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
      {loading && (
        <LoadingPage message={""}/
      )}
    </>
  )
}

export default App
