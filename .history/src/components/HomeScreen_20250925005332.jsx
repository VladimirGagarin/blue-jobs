import "./Home.css";
import { useUser } from "./useUser.js";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { userCountryOfResidence, browserCountryAbbreviations } from "./useUser.js";
import CtaVideo from "../assets/cta_video.mp4";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import Logo from "../assets/logo.png";
import { PiPictureInPicture } from "react-icons/pi";

export default function HomeContent() { 
    const { language } = useUser();
    const navigate = useNavigate();
    const [currentTermIndex, setCurrentTermIndex] = useState(0);
    const userCountry = userCountryOfResidence();
    const countries = browserCountryAbbreviations();
    const { user } = useUser();
    const userId = user?.userId || "guest";
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);

    const fancyJobTerms = [
    { en: "Casual Jobs", fr: "Jobs Occasionnels" },
    { en: "Blue Jobs", fr: "Jobs Bleus" },
    { en: "Gig Work", fr: "Travail en Gig" },
    { en: "Hustles", fr: "Hustles" },
    { en: "Janta", fr: "Boulot" },
    
    // Cool English synonyms with French translations
    { en: "Side Gigs", fr: "Travaux Secondaires" },
    { en: "Flex Work", fr: "Travail Flexible" },
    { en: "Quick Hires", fr: "Emplois Rapides" },
    { en: "Easy Money", fr: "Argent Facile" },
    { en: "Cash Gigs", fr: "Jobs Rémunérés" },
    
    // Modern/Slang English with French equivalents
    { en: "The Grind", fr: "Le Grind" },
    { en: "Bread Making", fr: "Gagner son Pain" },
    { en: "Coin Earners", fr: "Gagne-Pain" },
    { en: "Quick Cash", fr: "Argent Rapide" },
    { en: "Side Hustle", fr: "Activité Secondaire" },
    
    // Professional but cool terms
    { en: "Flexi Work", fr: "Travail Flexi" },
    { en: "On-Demand Jobs", fr: "Emplois à la Demande" },
    { en: "Instant Work", fr: "Travail Instantané" },
    { en: "Quick Projects", fr: "Projets Rapides" },
    { en: "Easy Earners", fr: "Gains Faciles" },
    
    // Youth/Casual slang
    { en: "The Bag", fr: "Le Magot" },
    { en: "Paper Chasing", fr: "Chasse au Fric" },
    { en: "Gig Life", fr: "Vie de Gig" },
    { en: "Hustle Culture", fr: "Culture Hustle" },
    { en: "Side Money", fr: "Argent en Plus" },
    
    // French-specific slang
    { en: "Small Jobs", fr: "Petits Boulots" },
    { en: "Extra Cash", fr: "Argent Extra" },
    { en: "Weekend Work", fr: "Travail Weekend" },
    { en: "Quick Tasks", fr: "Tâches Rapides" },
    { en: "Easy Work", fr: "Travail Facile" }
];

    // Text rotation effect
    useEffect(() => {
        setCurrentTermIndex(0);
        const interval = setInterval(() => {
            setCurrentTermIndex((prevIndex) => (prevIndex + 1) % fancyJobTerms.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [fancyJobTerms.length]);

    // Video event handlers - SINGLE useEffect for all event listeners
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedData = () => {
            console.log("Video loaded");
            setIsVideoLoaded(true);
        };

        const handleWaiting = () => {
            console.log("Video waiting/buffering");
            setIsPlaying(false);
        };

        const handlePlaying = () => {
            console.log("Video playing");
            setIsPlaying(true);
        };

        const handlePause = () => {
            console.log("Video paused");
            setIsPlaying(false);
        };

        const handleEnded = () => {
            console.log("Video ended");
            setIsPlaying(false);
            // Optional: Loop the video
            video.currentTime = 0;
            video.play().catch(console.error);
        };

        const handleError = (e) => {
            console.error("Video error:", e);
            setIsVideoLoaded(false);
        };

        // Add event listeners
        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('waiting', handleWaiting);
        video.addEventListener('playing', handlePlaying);
        video.addEventListener('pause', handlePause);
        video.addEventListener('ended', handleEnded);
        video.addEventListener('error', handleError);

        // Set initial muted state
        video.muted = isMuted;

        // Cleanup function
        return () => {
            if (video) {
                video.removeEventListener('loadeddata', handleLoadedData);
                video.removeEventListener('waiting', handleWaiting);
                video.removeEventListener('playing', handlePlaying);
                video.removeEventListener('pause', handlePause);
                video.removeEventListener('ended', handleEnded);
                video.removeEventListener('error', handleError);
                
                // Only pause, don't clear src to avoid reloading
                video.pause();
            }
        };
    }, [isMuted]); // Only depend on isMuted

    // Toggle play/pause
    const togglePlay = async () => {
        const video = videoRef.current;
        if (!video) return;

        try {
            if (isPlaying) {
                video.pause();
            } else {
                await video.play();
            }
        } catch (error) {
            console.error("Video play error:", error);
        }
    };

    // Toggle mute
    const toggleMute = () => {
        const video = videoRef.current;
        if (video) {
            video.muted = !video.muted;
            setIsMuted(video.muted);
        }
    };

    // Optimized video attributes
    const videoAttributes = {
        ref: videoRef,
        src: CtaVideo,
        poster: Logo,
        muted: !isMuted,
        preload: "metadata", // Only load metadata initially
        playsInline: true, // Important for mobile
        loop: true, // Loop the video
        className: "cta-video",
        playing: isPlaying ? true : false,
        // disabled playing in
    };

    const briefing = {
        en: "Discover a world of opportunities with Blue Jobs. Whether you're looking for casual gigs, part-time work, or full-time employment, our platform connects you with verified job listings tailored to your skills and preferences. Join our community of job seekers and employers today and take the next step in your career journey.",
        fr: "Découvrez un monde d'opportunités avec Blue Jobs. Que vous recherchiez des emplois occasionnels, à temps partiel ou à temps plein, notre plateforme vous connecte à des offres d'emploi vérifiées adaptées à vos compétences et préférences. Rejoignez notre communauté de chercheurs d'emploi et d'employeurs dès aujourd'hui et faites le prochain pas dans votre parcours professionnel."
    };

    const taglineQuestion = {
        en: "Need a job? Or hunting for awesome people to hire? Relax, we've got your back (and your front)! 😎",
        fr: "Besoin d'un job ? Ou tu cherches des gens cool à embaucher ? Tranquille, on gère tout ça pour toi ! 😎"
    };

    return (
        <div className="home-section">
            <div className="left-side-cta-content">
                <h1 className="title">
                    {language === "fr" ? "Trouver ," : "Find ,"}
                     <span className="highlight">
                        {language === "fr" ? fancyJobTerms[currentTermIndex].fr : fancyJobTerms[currentTermIndex].en}
                    </span>
                    {language === "fr" ? " dans " : " in "}{" "}
                    {countries.find((c) => c.abb === userCountry)?.name || "Kenya"} — {language === "fr" ? " rapide, vérifié, fiable" : " fast, verified, reliable"}
                </h1>
                <p className="briefing">{briefing[language] || briefing["en"]}</p>

                <div className="ctas-home">
                    <button onClick={() => navigate(`/job?type=get&userId=${userId}`)}>
                        {language === "fr" ? "Rechercher un emploi" : "Looking for a job"}
                    </button>
                    <button onClick={() => navigate(`/job?type=post&userId=${userId}`)}>
                        {language === "fr" ? "Publier une offre" : "Post a job"}
                    </button>
                </div>
            </div>
            
            <div className="right-side-cta-content">
                <video {...videoAttributes} />
                
                {!isVideoLoaded && (
                    <div className="video-placeholder">
                        {language === "fr" ? "Chargement de la vidéo..." : "Loading video..."}
                    </div>
                )}
                
                {isVideoLoaded && (
                    <div className="video-controls">
                        <button onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} title={isPlaying ? "Pause" : "Play"}>
                            {isPlaying ? <FaPause /> : <FaPlay />}
                        </button>
                        <button onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
                            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}