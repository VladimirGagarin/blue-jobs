import "./Home.css";
import {useUser } from "./useUser.js";
import { useNavigate } from "react-router-dom";
import {useState, useEffect } from "react";


export default function HomeContent() { 
    const {language} = useUser();
    const navigate = useNavigate();
    const [currentTermIndex, setCurrentTermIndex] = useState(0);

    // on mount, reset term index to 0 and every 3 seconds, increment term index
    useEffect(() => {
        setCurrentTermIndex(0);
        const interval = setInterval(() => {
            

   const fancyJobTerms = [
     "Casual Jobs",
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
   return(
       <div className="home-section">
           <div className="left-side-cta-content">
               
           </div>
           <div className="right-side-cta-content"></div>
    </div>
   )

}