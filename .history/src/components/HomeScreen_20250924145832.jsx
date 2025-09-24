import "./Home.css";
import {useUser } from "./useUser.js";
import { useNavigate } from "react-router-dom";
import {useState, useEffect, useRef } from "react";
import {userCountryOfResidence, browserCountryAbbreviations} from "./useUser.js";
import CtaVideo from "../assets/cta_video.mp4";
import {FaPlay, FaPause, FaVolumeMute, FaVolumeUp} from "react-icons/fa";
import Logo from "../assets/logo.svg";



export default function HomeContent() { 
    const {language} = useUser();
    const navigate = useNavigate();
    const [currentTermIndex, setCurrentTermIndex] = useState(0);
    const userCountry = userCountryOfResidence();
    const countries = browserCountryAbbreviations(); // list  of countries
    const { user } = useUser();
    const userId = user?.userId || "guest";
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isStalled, setIsStalled] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isWaiting, setIsWaiting] = useState(false);
    const videoRef = useRef(null);

   

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

    //  on mount remove video listeners
    useEffect(() => {
        if (videoRef && videoRef.current) {
            videoRef.current.addEventListener("ended", () => setIsPlaying(false));
            videoRef.current.addEventListener("pause", () => setIsPlaying(false));
            videoRef.current.addEventListener("play", () => setIsPlaying(true));
        }

        return () => {
            if (videoRef && videoRef.current) {
                videoRef.current.pause();
                videoRef.current.src = "";
            }
        };
    }, []);
    // whenever isMuted changes, update videoRef current muted property
    useEffect(() => {
        if (videoRef && videoRef.current) {
            videoRef.current.muted = isMuted;   
        }
    }, [isMuted]);

    // when video plays,stalled or waiting, set isPlaying, isStalled and isWaiting states
    useEffect(() => {
        if (videoRef && videoRef.current) {
            if (isPlaying) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
            if (isStalled) {
                videoRef.current.pause();
                setIsPlaying(false);
            }
            if (isWaiting) {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    }, [isPlaying, isStalled, isWaiting]);

    // checking stalled and waiting states
    useEffect(() => {
        if (isStalled || isWaiting) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
        }


        if(videoRef && videoRef.current){
            if(isPlaying){
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }, [isPlaying, isStalled, isWaiting]);

    // videoRef eventListeners for loadeddata, waiting, playing, stalled
    useEffect(() => {
         const video = videoRef.current;
        if (video) {

            video.addEventListener("loadeddata", () => setIsVideoLoaded(true));
            video.addEventListener("waiting", () => setIsWaiting(true));
            video.addEventListener("playing", () => setIsPlaying(true));
            video.addEventListener("stalled", () => setIsStalled(true));
        }

        return () => {
            if (video) {
                video.pause();
                video.removeEventListener("loadeddata", () => setIsVideoLoaded(true));
                video.removeEventListener("waiting", () => setIsWaiting(true));
                video.removeEventListener("playing", () => setIsPlaying(true));
                video.removeEventListener("stalled", () => setIsStalled(true));
            }
        };
    }, []);

    // briefing text in english and french

    const briefing = {
        en: "Discover a world of opportunities with Blue Jobs. Whether you're looking for casual gigs, part-time work, or full-time employment, our platform connects you with verified job listings tailored to your skills and preferences. Join our community of job seekers and employers today and take the next step in your career journey.",
        fr: "Découvrez un monde d'opportunités avec Blue Jobs. Que vous recherchiez des emplois occasionnels, à temps partiel ou à temps plein, notre plateforme vous connecte à des offres d'emploi vérifiées adaptées à vos compétences et préférences. Rejoignez notre communauté de chercheurs d'emploi et d'employeurs dès aujourd'hui et faites le prochain pas dans votre parcours professionnel."
    }
    const taglineQuestion = {
        en: "Are you Looking for a Job ? , Are you looking for employees? Don't worry we got you! ",
        fr: ""
    }
    
   return (
     <div className="home-section">
        <div className="Logo-contaier">
            <img src={Logo} alt="Blue Jobs Logo" className="logo-home" />
        </div>
       <div className="left-side-cta-content">
         <h1 className="title">
           {language === "it" ? "Trouver ,": "Find ,"}
           <span className="highlight">{fancyJobTerms[currentTermIndex]}</span>
           {language === "fr" ? " dans " : " in "}{" "}
           {countries.find((c) => c.abb === userCountry)?.name || "Kenya"} — {language === "fr" ? " rapide, vérifié, fiable" : " fast, verified, reliable"}
               </h1>
            <p className="briefing">{briefing[language] || briefing["en"]}</p>

            <div className="ctas-home">
               <button onClick={() => navigate(`/job?type=get&userId=${userId}`)}>{language === "fr" ? "Rechercher un emploi" : "Looking for a job"}</button>
               <button onClick={() => navigate(`/job?type=post&userId=${userId}`)}>{language === "fr" ? "Publier une offre" : "Post a job"}</button>
            </div>
       </div>
       <div className="right-side-cta-content">
               <video src={CtaVideo} ref={videoRef} onLoadedData={() => setIsVideoLoaded(true)} onWaiting={() => setIsWaiting(true)} onPlaying={() => setIsPlaying(true)} onStalled={() => setIsStalled(true)} muted={isMuted} />
               {!isVideoLoaded && <div className="video-placeholder">{language === "fr" ? "Chargement de la vidéo..." : "Loading video..."}</div>}
               {(isWaiting || isStalled) && isVideoLoaded && <div className="video-placeholder">{language === "fr" ? "Chargement de la vidéo..." : "Loading video..."}</div>}
               {CtaVideo && isVideoLoaded && (
                <div className="video-controls">
                    <button onClick={() => {
                        if (isPlaying) {
                            videoRef.current.pause();
                            setIsPlaying(false);
                        } else {
                            videoRef.current.play();
                            setIsPlaying(true);
                        }
                    }}>
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <button onClick={() => {
                        setIsMuted((prev) => !prev);
                    }}>
                        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                    </button>
                   </div>
               )}
           </div>
     </div>
   );

}