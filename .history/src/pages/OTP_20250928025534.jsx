import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage, useUser } from "../components/useUser.js"; // Import useUser
import {
  FaArrowLeft,
  FaCheck,
  FaRedo,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import Footer from "../components/footer.jsx";
import "./OTP.css";

export default function OTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const { language, setLanguage } = useLanguage();
  const { user } = useUser(); // Get current user from context
  const navigate = useNavigate();
  const location = useLocation();
    const inputRefs = useRef([]);
    const 

  // Get OTP action and contact info from multiple sources (priority order)
  const getContactInfo = () => {
    // 1. First priority: From navigation state (login/signup flow)
    if (location.state?.userEmail || location.state?.userPhone) {
      return {
        userEmail: location.state.userEmail,
        userPhone: location.state.userPhone,
        action: location.state.action || "verify",
      };
    }

    // 2. Second priority: From current user context (if user is logged in but needs OTP verification)
    if (user && (user.userEmail || user.userPhoneNumber)) {
      return {
        userEmail: user.userEmail,
        userPhone: user.userPhoneNumber,
        action: "verify",
      };
    }

    // 3. Fallback: No specific info available
    return {
      userEmail: null,
      userPhone: null,
      action: "verify",
    };
  };

  const { userEmail, userPhone, action } = getContactInfo();

  // Set document title
  useEffect(() => {
    const actionText =
      action === "login"
        ? "Login"
        : action === "signup"
        ? "Signup"
        : "Verification";
    document.title =
      language === "fr"
        ? `${actionText} OTP | Blue Jobs`
        : `${actionText} OTP | Blue Jobs`;
  }, [language, action]);

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

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Text content based on language and action
  const getContent = () => {
    const baseContent = {
      en: {
        title: "Verify Your Identity",
        subtitle: "Enter the 6-digit code sent to your email/phone",
        codeSent: "Verification code sent to:",
        verify: "Verify Code",
        verifying: "Verifying...",
        resend: "Resend Code",
        resendIn: "Resend code in",
        seconds: "seconds",
        success: "Verification Successful!",
        successMessage: "Your account has been verified successfully.",
        goToProfile: "Go to Profile",
        backToLogin: "Back to Login",
        backToSignup: "Back to Signup",
        backToAction: "Go Back",
        invalidOtp: "Invalid verification code",
        otpExpired: "Verification code has expired",
        error: "An error occurred. Please try again.",
      },
      fr: {
        title: "Vérifiez Votre Identité",
        subtitle: "Entrez le code à 6 chiffres envoyé à votre email/téléphone",
        codeSent: "Code de vérification envoyé à :",
        verify: "Vérifier le code",
        verifying: "Vérification...",
        resend: "Renvoyer le code",
        resendIn: "Renvoyer le code dans",
        seconds: "secondes",
        success: "Vérification Réussie !",
        successMessage: "Votre compte a été vérifié avec succès.",
        goToProfile: "Aller au Profil",
        backToLogin: "Retour à la Connexion",
        backToSignup: "Retour à l'Inscription",
        backToAction: "Retour",
        invalidOtp: "Code de vérification invalide",
        otpExpired: "Le code de vérification a expiré",
        error: "Une erreur s'est produite. Veuillez réessayer.",
      },
    };

    // Customize based on action
    if (action === "login") {
      baseContent.en.title = "Complete Your Login";
      baseContent.en.subtitle = "Enter the code to complete your login";
      baseContent.fr.title = "Complétez Votre Connexion";
      baseContent.fr.subtitle = "Entrez le code pour compléter votre connexion";
    } else if (action === "signup") {
      baseContent.en.title = "Verify Your Account";
      baseContent.en.subtitle = "Enter the code to verify your new account";
      baseContent.fr.title = "Vérifiez Votre Compte";
      baseContent.fr.subtitle =
        "Entrez le code pour vérifier votre nouveau compte";
    }

    return baseContent[language] || baseContent.en;
  };

  const t = getContent();

  // OTP input handlers (same as before)
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    if (error) setError("");
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    const digits = pasteData.replace(/\D/g, "").slice(0, 6).split("");

    if (digits.length === 6) {
      const newOtp = [...otp];
      digits.forEach((digit, index) => {
        newOtp[index] = digit;
      });
      setOtp(newOtp);
      inputRefs.current[5].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const otpString = otp.join("");

    if (otpString.length !== 6) {
      setError(t.invalidOtp);
      setLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const isValid = otpString === "123456"; // Test code

      if (isValid) {
        setSuccess(true);
        // In real app, you would complete the verification process here
        // This could be login completion, signup completion, etc.
      } else {
        setError(t.invalidOtp);
      }
    } catch (err) {
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setError("");
    setCanResend(false);
    setCountdown(60);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("OTP resent to:", userEmail || userPhone);
      // In real app, call your backend to resend OTP
    } catch (err) {
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    // Smart back navigation based on action
    if (action === "login") {
      navigate("/login", { replace: true });
    } else if (action === "signup") {
      navigate("/signup", { replace: true });
    } else {
      navigate(-1); // Go back to previous page
    }
  };

  const handleCompletion = () => {
    // Smart completion based on action
    if (action === "login" || action === "signup") {
      navigate("/?panel=profile", { replace: true });
    } else {
      navigate("/?panel=home", { replace: true });
    }
  };

  if (success) {
    return (
      <>
        <div className="otp-container">
          <div className="otp-content">
            <div className="otp-success">
              <div className="success-icon">
                <FaCheck size={48} />
              </div>
              <h1 className="success-title">{t.success}</h1>
              <p className="success-message">{t.successMessage}</p>
              <button className="success-button" onClick={handleCompletion}>
                {action === "login" || action === "signup"
                  ? t.goToProfile
                  : t.backToAction}
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="otp-container">
        <button className="otp-back-button" onClick={handleGoBack}>
          <FaArrowLeft size={20} />
          {action === "login"
            ? t.backToLogin
            : action === "signup"
            ? t.backToSignup
            : t.backToAction}
        </button>

        <div className="otp-content">
          <div className="otp-header">
            <h1 className="otp-title">{t.title}</h1>
            <p className="otp-subtitle">{t.subtitle}</p>

            {(userEmail || userPhone) && (
              <div className="otp-contact-info">
                <p>{t.codeSent}</p>
                <div className="contact-details">
                  {userEmail && (
                    <span className="contact-item">
                      <FaEnvelope /> {userEmail}
                    </span>
                  )}
                  {userPhone && (
                    <span className="contact-item">
                      <FaPhone /> {userPhone}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {error && <div className="otp-error">{error}</div>}

          <form className="otp-form" onSubmit={handleVerify}>
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="otp-input"
                  disabled={loading}
                  autoComplete="one-time-code"
                />
              ))}
            </div>

            <button
              type="submit"
              className="verify-button"
              disabled={loading || otp.join("").length !== 6}
            >
              {loading ? t.verifying : t.verify}
            </button>
          </form>

          <div className="otp-resend">
            <button
              onClick={handleResend}
              disabled={!canResend || loading}
              className="resend-button"
            >
              <FaRedo style={{ marginRight: "8px" }} />
              {t.resend}
            </button>
            {!canResend && (
              <span className="countdown">
                {t.resendIn} {countdown} {t.seconds}
              </span>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
