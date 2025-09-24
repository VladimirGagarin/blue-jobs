import "./Home.css";
import {useUser } from "./useUser.js";
import { useNavigate } from "react-router-dom";
import {useState, useEffect } from "react";
import {userCountryOfResidence, browserCountryAbbreviations} from "./useUser.js";


export default function HomeContent() { 
    const {language} = useUser();
    const navigate = useNavigate();
    const [currentTermIndex, setCurrentTermIndex] = useState(0);
    const userCountry = userCountryOfResidence();
    const countries = browserCountryAbbreviations(); // list  of countries

   

   const fancyJobTerms = [
     "Casual Jobs",
     "Blue Jobs",
     "Gig Work",
     "Hustles",
     "Janta", // Swahili slang for work
     "Boulot", // French slang for work
     "Chamba", // Hindi slang for work
     "Ise", // Yoruba (Nigeria) = work
     "Orụ", // Igbo (Nigeria) = work
     "Kazi", // Swahili (East Africa) = work
     "Obulamu", // Luganda (Uganda) slang, but more often means 'life'
     "Shum", // Amharic (Ethiopia) = job/work
     "Hojii", // Oromo (Ethiopia) = work
     "Umsebenzi", // Zulu/Xhosa (South Africa) = work
     "Mosala", // Sotho/Tswana (Southern Africa) = work
     "Misebenzi", // Nguni (South Africa) plural = jobs
     "Talato", // Hausa (Nigeria/Niger) word for labor
     "Jobo", // Nigerian slang for job/work
     "Handiwork", // West African Pidgin slang for hustle/work
     "Shughl", // Arabic = work
     "Mosala", // Lingala (Congo) = work
     "Akazi", // Kinyarwanda (Rwanda) = work
   ];
   
   
    // on mount, reset term index to 0 and every 3 seconds, increment term index
    useEffect(() => {
        setCurrentTermIndex(0);
        const interval = setInterval(() => {
            setCurrentTermIndex((prevIndex) => (prevIndex + 1) % fancyJobTerms.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [fancyJobTerms.length]);

    
   return(
       <div className="home-section">
           <div className="left-side-cta-content">
               <h1 className="title">{language === "fr" ? "" : "Find ,"}<span className="highlight"></span>{language ==="fr" ? "" : " in "} {countries.ab}</h1>
           </div>
           <div className="right-side-cta-content"></div>
    </div>
   )

}