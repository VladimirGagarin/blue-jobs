import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../components/useUser.js";
import { useLanguage } from "../components/useUser.js";
import {
  FaHome,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
} from "react-icons/fa";
import "./Login.css";
import Footer from "../components/footer.jsx";
import OfficeLogo1 from "../assets/office_003.jpg";
import OfficeLogo2 from "../assets/office_004.jpg";
import OfficeLogo3 from "../assets/office_005.jpg";
import OfficeLogo4 from "../assets/office_006.jpg";
import OfficeLogo5 from "../assets/office_007.jpg";
import OfficeLogo6 from "../assets/office_002.jpg";

const backgroundVideo = "https://assets.mixkit.co/videos/preview/mixkit-abstract-blue-and-purple-flow-4936-large.mp4";

// Array of all office images
const officeImages = [OfficeLogo1, OfficeLogo2, OfficeLogo3, OfficeLogo4, OfficeLogo5, OfficeLogo6];

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [videoError, setVideoError] = useState(false);
  
  // Slideshow states
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('right'); // 'right' or 'left'
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { login } = useUser();
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const hasAutoDetectLanguage = useRef(false);
  const slideshowInterval = useRef(null);

  // Language detection on component mount
  useEffect(() => {
    if (hasAutoDetectLanguage.current) return;

    const initializeLanguage = () => {
      const savedLanguage = localStorage.getItem("preferredLanguage");
      if (savedLanguage === "fr" || savedLanguage === "en") {
        if (language !== savedLanguage) {
          setLanguage(savedLanguage);
        }
        hasAutoDetectLanguage.current = true;
        return;
      }

      const browserLanguage = navigator.language?.split("-")[0];
      const finalLanguage = browserLanguage === "fr" ? "fr" : "en";

      if (language !== finalLanguage) {
        setLanguage(finalLanguage);
        localStorage.setItem("preferredLanguage", finalLanguage);
      }

      hasAutoDetectLanguage.current = true;
    };

    initializeLanguage();
  }, [language, setLanguage]);

  // Slideshow effect
  useEffect(() => {
    if (videoError) {
      // Start slideshow only if video failed to load
      slideshowInterval.current = setInterval(() => {
        nextImage();
      }, 5000); // Change image every 5 seconds
    }

    return () => {
      if (slideshowInterval.current) {
        clearInterval(slideshowInterval.current);
      }
    };
  }, [videoError]);

  const nextImage = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setSlideDirection('right');
    
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === officeImages.length - 1 ? 0 : prevIndex + 1
      );
      
      // Allow next transition after animation completes
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  const prevImage = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setSlideDirection('left');
    
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? officeImages.length - 1 : prevIndex - 1
      );
      
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  // Manual navigation (optional)
  const goToImage = (index) => {
    if (isTransitioning || index === currentImageIndex) return;
    
    setIsTransitioning(true);
    setSlideDirection(index > currentImageIndex ? 'right' : 'left');
    
    setTimeout(() => {
      setCurrentImageIndex(index);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  // Text content based on language
  const content = {
    en: {
      title: "Welcome Back",
      subtitle: "Sign in to your Blue Jobs account",
      email: "Email or Username",
      phone: "Phone Number",
      password: "Password",
      remember: "Remember me",
      forgot: "Forgot password?",
      login: "Sign In",
      noAccount: "Don't have an account?",
      register: "Create one here",
      home: "Back to Home",
    },
    fr: {
      title: "Content de vous revoir",
      subtitle: "Connectez-vous à votre compte Blue Jobs",
      email: "Email ou Nom d'utilisateur",
      phone: "Numéro de téléphone",
      password: "Mot de passe",
      remember: "Se souvenir de moi",
      forgot: "Mot de passe oublié ?",
      login: "Se connecter",
      noAccount: "Vous n'avez pas de compte ?",
      register: "Créez-en un ici",
      home: "Retour à l'accueil",
    },
  };

  const t = content[language];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.email && !formData.phone) {
      setError(
        language === "fr"
          ? "Veuillez entrer votre email ou numéro de téléphone"
          : "Please enter your email or phone number"
      );
      setLoading(false);
      return;
    }

    if (!formData.password) {
      setError(
        language === "fr"
          ? "Veuillez entrer votre mot de passe"
          : "Please enter your password"
      );
      setLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockUser = {
        userId: "u98765",
        userName: "Jane Doe",
        userEmail: formData.email,
        userPhoneNumber: formData.phone,
        userNationality: "Kenyan",
        userIsPremium: false,
        userJobPostPermit: true,
        userApplyPermit: true,
        userPostedJobs: [],
        userAppliedJobs: ["aj_2025X"],
        userPostTokens: 2,
        userApplyTokens: 3,
        userDateCreated: new Date().toISOString(),
        userPassportPhoto: "https://bluejobs.com/uploads/u98765.jpg",
        userRole: "basic",
        userNotifications: [],
      };

      if (login) {
        const success = login(mockUser);
        if (success) {
          navigate("/?panel=profile");
        } else {
          setError(
            language === "fr"
              ? "Échec de la connexion. Veuillez réessayer."
              : "Login failed. Please try again."
          );
        }
      }
    } catch (err) {
      setError(
        language === "fr"
          ? "Une erreur s'est produite. Veuillez réessayer."
          : "An error occurred. Please try again."
      );
      console.warn(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoHome = () => {
    navigate("/?panel=home");
  };

  return (
    <>
      <div className="login-container">
        {/* Home Button */}
        <button className="home-button-fab" onClick={handleGoHome} title={t.home}>
          <FaHome size={20} />
        </button>

        {/* Background with mist effect */}
        <div className="login-background">
          {!videoError ? (
            <video
              className="background-media"
              autoPlay
              muted
              loop
              playsInline
              onError={() => setVideoError(true)}
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
          ) : (
            <img
              src={officeImages[currentImageIndex]}
              alt="Background"
              className="background-media"
            />
          )}
        </div>

        <div className="login-content">
          {/* Media Section */}
          <div className="login-media">
            <div className="media-container">
              {!videoError ? (
                <video
                  className="media-content"
                  autoPlay
                  muted
                  loop
                  playsInline
                  onError={() => setVideoError(true)}
                >
                  <source src={backgroundVideo} type="video/mp4" />
                </video>
              ) : (
                <div className="slideshow-container">
                  <img
                    src={officeImages[currentImageIndex]}
                    alt="Login Visual"
                    className={`media-content slide-${slideDirection}`}
                  />
                  <div className="media-overlay"></div>
                  <div className="mist-border"></div>
                  
                  {/* Navigation dots (optional) */}
                  <div className="slideshow-dots">
                    {officeImages.map((_, index) => (
                      <button
                        key={index}
                        className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => goToImage(index)}
                      />
                    ))}
                  </div>
                  
                  {/* Navigation arrows (optional) */}
                  <button className="slide-nav slide-prev" onClick={prevImage}>
                    ‹
                  </button>
                  <button className="slide-nav slide-next" onClick={nextImage}>
                    ›
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Form Section (unchanged) */}
          <div className="login-form-section">
            {/* ... your existing form code ... */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}