import "./Home.css";
import {useUser } from "./useUser.js";
import { useNavigate } from "react-router-dom";
import {useState, useEffect } from "react";
import {userCountryOfResidence, browserCountryAbbreviations} from "./useUser.js";
import {}


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

    const briefing = {
        en: "Discover a world of opportunities with Blue Jobs. Whether you're looking for casual gigs, part-time work, or full-time employment, our platform connects you with verified job listings tailored to your skills and preferences. Join our community of job seekers and employers today and take the next step in your career journey.",
        fr: "Découvrez un monde d'opportunités avec Blue Jobs. Que vous recherchiez des emplois occasionnels, à temps partiel ou à temps plein, notre plateforme vous connecte à des offres d'emploi vérifiées adaptées à vos compétences et préférences. Rejoignez notre communauté de chercheurs d'emploi et d'employeurs dès aujourd'hui et faites le prochain pas dans votre parcours professionnel."
    }
    
   return (
     <div className="home-section">
       <div className="left-side-cta-content">
         <h1 className="title">
           {language === "en" ?"Find ," : "Trouver ,"}
           <span className="highlight">{fancyJobTerms[currentTermIndex]}</span>
           {language === "fr" ? " dans " : " in "}{" "}
           {countries.find((c) => c.abb === userCountry)?.name || "Kenya"} — {language === "fr" ? " rapide, vérifié, fiable" : " fast, verified, reliable"}
               </h1>
            <p className="briefing">{briefing[language] || briefing["en"]}</p>

            <div className="ctas-home">
               <button onClick={() => navigate(`/job?type=get&userId=${userId || "guest"}`)}>{language === "fr" ? "Rechercher un emploi" : "Looking for a job"}</button>
               <button onClick={() => navigate(`/job?type=post&userId=${userId || "guest"}`)}>{language === "fr" ? "Publier une offre" : "Post a job"}</button>
            </div>
       </div>
       <div className="right-side-cta-content"></div>
     </div>
   );

}