import "./Home.css";
import { useLanguage, useUser } from "./useUser.js";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { userCountryOfResidence, browserCountryAbbreviations } from "./useUser.js";
import CtaVideo from "../assets/cta_video.mp4";
import CtaVideoFr from "../assets/cta_video_fr.mp4";
import {
  FaPlay,
  FaPause,
  FaVolumeMute,
  FaVolumeUp,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import Logo from "../assets/logo.png";


export default function HomeContent() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [currentTermIndex, setCurrentTermIndex] = useState(0);
  const userCountry = userCountryOfResidence();
  const countries = browserCountryAbbreviations();
  const { user } = useUser();
  const userId = user?.userId || "guest";
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
 const [isMuted, setIsMuted] = useState(false);
 const [isStalled, setIsStalled] = useState(false);
 const [isFullscreen, setIsFullscreen] = useState(false);
    const videoRef = useRef(null);
      const videoContainerRef = useRef(null);

  const fancyJobTerms = [
    { en: "Hustles", fr: "Hustles" },
    { en: "Tasks", fr: "Tâches" },
    { en: "Jobs", fr: "Boulots" },
    { en: "Work", fr: "Travail" },
    { en: "Gigs", fr: "Gigs" },

    // { en: "Gigs", fr: "Missions" },
    // { en: "Flex", fr: "Flex" },
    // { en: "Quick", fr: "Rapide" },
    // { en: "Cash", fr: "Cash" },
    // { en: "Gigs", fr: "Jobs" },

    // { en: "Grind", fr: "Grind" },
    // { en: "Bread", fr: "Pain" },
    // { en: "Coin", fr: "Sous" },
    // { en: "Hustle", fr: "Hustle" },
    // { en: "Side", fr: "Side" },

    // { en: "Flexi", fr: "Flexi" },
    // { en: "On-Demand", fr: "Demande" },
    // { en: "Instant", fr: "Instant" },
    // { en: "Projects", fr: "Projets" },
    // { en: "Earners", fr: "Gains" },

    // { en: "Bag", fr: "Sac" },
    // { en: "Paper", fr: "Fric" },
    // { en: "Gigs", fr: "Gigs" },
    // { en: "Hustle", fr: "Hustle" },
    // { en: "Extra", fr: "Extra" },

    // { en: "Small", fr: "Petits" },
    // { en: "Bonus", fr: "Bonus" },
    // { en: "Weekend", fr: "Weekend" },
    // { en: "Quick", fr: "Vite" },
    // { en: "Easy", fr: "Facile" },
  ];

  // Text rotation effect
  useEffect(() => {
    setCurrentTermIndex(0);
    const interval = setInterval(() => {
      setCurrentTermIndex(
        (prevIndex) => (prevIndex + 1) % fancyJobTerms.length
      );
    }, 30000);
    return () => clearInterval(interval);
  }, [fancyJobTerms.length]);

  // Stop video when language changes
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      setIsPlaying(false);
      // Video source will be updated automatically via the src attribute
    }
  }, [language]);

  // Video event handlers - SINGLE useEffect for all event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      console.log("Video loaded");
      setIsVideoLoaded(true);
      setIsStalled(false);
    };

    const handleWaiting = () => {
      console.log("Video waiting/buffering");
      setIsStalled(true);
      setIsPlaying(false);
    };

    const handlePlaying = () => {
      console.log("Video playing");
      setIsPlaying(true);
      setIsStalled(false);
    };

    const handlePause = () => {
      console.log("Video paused");
      setIsPlaying(false);
    };

    const handleStalled = () => {
      console.log("Video stalled");
      setIsStalled(true);
      setIsPlaying(false);
    };

    const handleCanPlay = () => {
      console.log("Video can play");
      setIsStalled(false);
    };

    const handleEnded = () => {
      console.log("Video ended");
      setIsPlaying(false);
      video.currentTime = 0;
      video.play().catch(console.error);
    };

    const handleError = (e) => {
      console.error("Video error:", e);
      setIsVideoLoaded(false);
      setIsStalled(true);
    };

    // Add event listeners
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("pause", handlePause);
    video.addEventListener("stalled", handleStalled);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);

    // Set initial muted state
    video.muted = isMuted;

    // Cleanup function
    return () => {
      if (video) {
        video.removeEventListener("loadeddata", handleLoadedData);
        video.removeEventListener("waiting", handleWaiting);
        video.removeEventListener("playing", handlePlaying);
        video.removeEventListener("pause", handlePause);
        video.removeEventListener("stalled", handleStalled);
        video.removeEventListener("canplay", handleCanPlay);
        video.removeEventListener("ended", handleEnded);
        video.removeEventListener("error", handleError);

        // Only pause, don't clear src to avoid reloading
        video.pause();
        video.currentTime = 0;
      }
    };
  }, [isMuted]); // Only depend on isMuted

  // Fullscreen functionality
  const toggleFullscreen = async () => {
    const container = videoContainerRef.current;
    if (!container) return;

    try {
      if (!document.fullscreenElement) {
        await container.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
      // Fallback for browsers that don't support fullscreen API
      container.classList.toggle("fullscreen-fallback");
      setIsFullscreen(!isFullscreen);
    }
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

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
    src: language === "fr" ? CtaVideoFr : CtaVideo,
    poster: Logo,
    muted: isMuted,
    preload: "metadata", // Only load metadata initially
    playsInline: true, // Important for mobile
    loop: true, // Loop the video
    className: "cta-video",
    playing: isPlaying ? true : false,
    // disabled playing in picture in picture mode due to UX issues
    pictureInPicture: false,
    controls: false, // Custom controls
    style: { display: isVideoLoaded ? "block" : "none" }, // Hide until loaded
  };

  const briefing = {
    en: "Discover a world of opportunities with Blue Jobs. Whether you're looking for casual gigs, part-time work, or full-time employment, our platform connects you with verified job listings tailored to your skills and preferences. Join our community of job seekers and employers today and take the next step in your career journey.",
    fr: "Découvrez un monde d'opportunités avec Blue Jobs. Que vous recherchiez des emplois occasionnels, à temps partiel ou à temps plein, notre plateforme vous connecte à des offres d'emploi vérifiées adaptées à vos compétences et préférences. Rejoignez notre communauté de chercheurs d'emploi et d'employeurs dès aujourd'hui et faites le prochain pas dans votre parcours professionnel.",
  };

  const applyjobLink =
    userId && userId !== "guest" ? `/job?type=get&userId=${userId}` : "/guest";
  const postjobLink =
    userId && userId !== "guest" ? `/job?type=post&userId=${userId}` : "/guest";

  return (
    <div className="home-section">
      <div className="left-side-cta-content">
        <h1 className="title">
          {language === "fr" ? "Trouver ," : "Find ,"}
          <span className="highlight">
            {language === "fr"
              ? fancyJobTerms[currentTermIndex].fr
              : fancyJobTerms[currentTermIndex].en}
          </span>
          {language === "fr" ? " dans " : " in "}{" "}
          {countries.find((c) => c.abb === userCountry)?.name || "Kenya"} —{" "}
          {language === "fr"
            ? " rapide, vérifié, fiable"
            : " fast, verified, reliable"}
        </h1>

        <p className="briefing">
          {language === "fr" ? briefing.fr : briefing.en}
        </p>

        <div className="ctas-home">
          <button onClick={() => navigate(applyjobLink)}>
            {language === "fr"
              ? "Rechercher un emploi ?"
              : "Looking for a job ?"}
          </button>
          <button onClick={() => navigate(postjobLink)}>
            {language === "fr" ? "Publier une offre" : "Post a job"}
          </button>
        </div>
      </div>

      <div className="right-side-cta-content" ref={videoContainerRef}>
        <video {...videoAttributes} />

        {(!isVideoLoaded || isStalled) && (
          <div className="video-placeholder">
            {language === "fr"
              ? "Chargement de la vidéo..."
              : "Loading video..."}
          </div>
        )}

        {isVideoLoaded && !isStalled && (
          <div className="video-controls">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <button
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Minimize" : "Expand"}
              title={isFullscreen ? "Minimize" : "Expand to fullscreen"}
              className="fullscreen-toggle"
            >
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}