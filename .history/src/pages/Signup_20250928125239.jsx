// src/pages/Signup.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useLanguage } from "../components/useUser";
import "./Signup.css";
import { FaHome, FaEye, FaEyeSlash } from "react-icons/fa";
import LoadingPage from "../components/LoadingPage";
import BgImg from "../assets/office_002.jpg";

export default function SignupPage() {
  const { updateUser } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { language, setLanguage } = useLanguage();
  const hasAutoDetectLanguage = useRef(false);

  // Translations
  const translations = {
    en: {
      title: "Create Account",
      subtitle: "Fill in your details to get started",
      home: "Home",
      userId: "User ID",
      generating: "Generating...",
      fullName: "Full Name *",
      fullNamePlaceholder: "Enter your full name",
      nationalId: "National ID / Passport *",
      nationalIdPlaceholder: "12345678",
      nationality: "Nationality",
      email: "Email *",
      emailPlaceholder: "example@email.com",
      phone: "Phone Number *",
      phonePlaceholder: "+254712345678",
      password: "Password *",
      passwordPlaceholder: "Create a strong password",
      confirmPassword: "Confirm Password *",
      confirmPasswordPlaceholder: "Re-enter your password",
      createAccount: "Create Account",
      haveAccount: "Already have an account?",
      signIn: "Sign in",
      joinCommunity: "Join Our Community",
      communityText: "Create your account and start your career journey today",
      // Error messages
      nameRequired: "Full name is required",
      idRequired: "National ID is required",
      emailRequired: "Email is required",
      emailInvalid: "Invalid email format",
      phoneRequired: "Phone number is required",
      phoneInvalid: "Invalid phone number format",
      passwordRequired: "Password is required",
      passwordLength: "Password must be at least 8 characters",
      passwordStrength:
        "Password must contain uppercase, lowercase, number and special character",
      confirmRequired: "Please confirm your password",
      passwordMismatch: "Passwords do not match",
      loading: "Getting ready for signup...",
    },
    fr: {
      title: "Créer un Compte",
      subtitle: "Remplissez vos détails pour commencer",
      home: "Accueil",
      userId: "ID Utilisateur",
      generating: "Génération...",
      fullName: "Nom Complet *",
      fullNamePlaceholder: "Entrez votre nom complet",
      nationalId: "ID National / Passeport *",
      nationalIdPlaceholder: "12345678",
      nationality: "Nationalité",
      email: "Email *",
      emailPlaceholder: "exemple@email.com",
      phone: "Numéro de Téléphone *",
      phonePlaceholder: "+254712345678",
      password: "Mot de Passe *",
      passwordPlaceholder: "Créez un mot de passe fort",
      confirmPassword: "Confirmer le Mot de Passe *",
      confirmPasswordPlaceholder: "Re-saisissez votre mot de passe",
      createAccount: "Créer un Compte",
      haveAccount: "Vous avez déjà un compte?",
      signIn: "Se connecter",
      joinCommunity: "Rejoignez Notre Communauté",
      communityText:
        "Créez votre compte et commencez votre parcours professionnel aujourd'hui",
      // Error messages
      nameRequired: "Le nom complet est requis",
      idRequired: "L'ID national est requis",
      emailRequired: "L'email est requis",
      emailInvalid: "Format d'email invalide",
      phoneRequired: "Le numéro de téléphone est requis",
      phoneInvalid: "Format de numéro de téléphone invalide",
      passwordRequired: "Le mot de passe est requis",
      passwordLength: "Le mot de passe doit avoir au moins 8 caractères",
      passwordStrength:
        "Le mot de passe doit contenir majuscule, minuscule, chiffre et caractère spécial",
      confirmRequired: "Veuillez confirmer votre mot de passe",
      passwordMismatch: "Les mots de passe ne correspondent pas",
      loading: "Préparation de l'inscription...",
    },
    sw: {
      title: "Unda Akaunti",
      subtitle: "Jaza maelezo yako kuanza",
      home: "Nyumbani",
      userId: "Kitambulisho cha Mtumiaji",
      generating: "Inatengenezwa...",
      fullName: "Jina Kamili *",
      fullNamePlaceholder: "Weka jina lako kamili",
      nationalId: "Kitambulisho cha Taifa / Pasi *",
      nationalIdPlaceholder: "12345678",
      nationality: "Uraia",
      email: "Barua Pepe *",
      emailPlaceholder: "mfano@email.com",
      phone: "Nambari ya Simu *",
      phonePlaceholder: "+254712345678",
      password: "Nenosiri *",
      passwordPlaceholder: "Tengeneza nenosiri thabiti",
      confirmPassword: "Thibitisha Nenosiri *",
      confirmPasswordPlaceholder: "Weka tena nenosiri lako",
      createAccount: "Unda Akaunti",
      haveAccount: "Tayari una akaunti?",
      signIn: "Ingia",
      joinCommunity: "Jiunge na Jamii Yetu",
      communityText: "Unda akaunti yako na anza safari yako ya kazi leo",
      // Error messages
      nameRequired: "Jina kamili linahitajika",
      idRequired: "Kitambulisho cha taifa kinahitajika",
      emailRequired: "Barua pepe inahitajika",
      emailInvalid: "Umbo la barua pepe si sahihi",
      phoneRequired: "Nambari ya simu inahitajika",
      phoneInvalid: "Umbo la nambari ya simu si sahihi",
      passwordRequired: "Nenosiri linahitajika",
      passwordLength: "Nenosiri lazima liwe na herufi 8 au zaidi",
      passwordStrength:
        "Nenosiri lazima liwe na herufi kubwa, ndogo, nambari na herufi maalum",
      confirmRequired: "Tafadhali thibitisha nenosiri lako",
      passwordMismatch: "Nenosiri halifanani",
      loading: "Inajiandalia kwa usajili...",
    },
  };

  const t = translations[language] || translations.en;

  // Local form state
  const [form, setForm] = useState({
    userName: "",
    userNationalId: "",
    userEmail: "",
    userPhoneNumber: "",
    userNationality: "Kenyan",
    userPassword: "",
    confirmPassword: "",
  });

  // Persistent generated ID
  const [userId, setUserId] = useState("");


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

  // Generate once on mount
  useEffect(() => {
    const generateUserId = async () => {
      let country = "KE"; // Default to Kenya
      try {
        const res = await fetch("https://ipapi.co/country/");
        country = (await res.text()) || "KE";
        setForm((prev) => ({ ...prev, userNationality: country }));
      } catch (e) {
        console.warn("Could not fetch location, using default", e);
      }

      const rand = crypto.randomUUID().split("-")[0];
      setUserId(`${country.toLowerCase()}-${rand}`);
    };

    generateUserId();
  }, []);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 2000);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!form.userName.trim()) newErrors.userName = t.nameRequired;
    if (!form.userNationalId.trim()) newErrors.userNationalId = t.idRequired;

    if (!form.userEmail.trim()) {
      newErrors.userEmail = t.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.userEmail)) {
      newErrors.userEmail = t.emailInvalid;
    }

    if (!form.userPhoneNumber.trim()) {
      newErrors.userPhoneNumber = t.phoneRequired;
    } else if (!/^\+?[\d\s-()]{10,}$/.test(form.userPhoneNumber)) {
      newErrors.userPhoneNumber = t.phoneInvalid;
    }

    if (!form.userPassword) {
      newErrors.userPassword = t.passwordRequired;
    } else if (form.userPassword.length < 8) {
      newErrors.userPassword = t.passwordLength;
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(form.userPassword)
    ) {
      newErrors.userPassword = t.passwordStrength;
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = t.confirmRequired;
    } else if (form.userPassword !== form.confirmPassword) {
      newErrors.confirmPassword = t.passwordMismatch;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSignup = () => {
    if (!validateForm()) return;

    const newUser = {
      userId,
      userName: form.userName,
      userNationalId: form.userNationalId,
      userEmail: form.userEmail,
      userPhoneNumber: form.userPhoneNumber,
      userNationality: form.userNationality,
      userIsPremium: false,
      userJobPostPermit: true,
      userApplyPermit: true,
      userVerified: false,
      userPostedJobs: [],
      userAppliedJobs: [],
      userPostTokens: 3,
      userApplyTokens: 5,
      userDateCreated: new Date().toISOString(),
      userPassportPhoto: null,
      userPassword: form.userPassword,
      userRole: "basic",
      userNotifications: [],
    };

    updateUser(newUser);
    navigate("/otp", {
      replace: true,
      state: {
        userEmail: newUser.userEmail,
        userPhone: newUser.userPhoneNumber,
        action: "signup",
      },
    });
  };

  if (loading) {
    return <LoadingPage message={t.loading} />;
  }

  return (
    <div className="signup-container">
      <div className="signup-content">
        {/* Left Side - Image */}
        <div className="signup-image-section">
          <img
            src={BgImg}
            alt="Office background"
            className="background-image"
          />
          <div className="image-overlay">
            <div className="image-content">
              <h2>{t.joinCommunity}</h2>
              <p>{t.communityText}</p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="signup-form-section">
          <header className="signup-header">
            <button className="home-btn" onClick={() => navigate("/")}>
              <FaHome /> {t.home}
            </button>
            <h1>{t.title}</h1>
            <p>{t.subtitle}</p>
          </header>

          <div className="signup-form">
            {/* Read-only UserId */}
            <div className="form-group">
              <label>{t.userId}</label>
              <input
                type="text"
                value={userId || t.generating}
                readOnly
                className="readonly-input"
              />
            </div>

            <div className="form-group">
              <label>{t.fullName}</label>
              <input
                type="text"
                name="userName"
                value={form.userName}
                onChange={handleChange}
                placeholder={t.fullNamePlaceholder}
                className={errors.userName ? "error" : ""}
              />
              {errors.userName && (
                <span className="error-text">{errors.userName}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>{t.nationalId}</label>
                <input
                  type="text"
                  name="userNationalId"
                  value={form.userNationalId}
                  onChange={handleChange}
                  placeholder={t.nationalIdPlaceholder}
                  className={errors.userNationalId ? "error" : ""}
                />
                {errors.userNationalId && (
                  <span className="error-text">{errors.userNationalId}</span>
                )}
              </div>

              <div className="form-group">
                <label>{t.nationality}</label>
                <input
                  type="text"
                  name="userNationality"
                  value={form.userNationality}
                  onChange={handleChange}
                  className="readonly-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>{t.email}</label>
                <input
                  type="email"
                  name="userEmail"
                  value={form.userEmail}
                  onChange={handleChange}
                  placeholder={t.emailPlaceholder}
                  className={errors.userEmail ? "error" : ""}
                />
                {errors.userEmail && (
                  <span className="error-text">{errors.userEmail}</span>
                )}
              </div>

              <div className="form-group">
                <label>{t.phone}</label>
                <input
                  type="tel"
                  name="userPhoneNumber"
                  value={form.userPhoneNumber}
                  onChange={handleChange}
                  placeholder={t.phonePlaceholder}
                  className={errors.userPhoneNumber ? "error" : ""}
                />
                {errors.userPhoneNumber && (
                  <span className="error-text">{errors.userPhoneNumber}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>{t.password}</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="userPassword"
                  value={form.userPassword}
                  onChange={handleChange}
                  placeholder={t.passwordPlaceholder}
                  className={errors.userPassword ? "error" : ""}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.userPassword && (
                <span className="error-text">{errors.userPassword}</span>
              )}
            </div>

            <div className="form-group">
              <label>{t.confirmPassword}</label>
              <div className="password-input-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder={t.confirmPasswordPlaceholder}
                  className={errors.confirmPassword ? "error" : ""}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="error-text">{errors.confirmPassword}</span>
              )}
            </div>

            <button className="signup-btn" onClick={handleSignup}>
              {t.createAccount}
            </button>

            <div className="login-link">
              {t.haveAccount}{" "}
              <span onClick={() => navigate("/login", { replace: true })}>
                {t.signIn}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
