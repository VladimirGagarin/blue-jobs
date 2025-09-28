// src/pages/Signup.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser , useLanguage} from "../components/useUser";
import "./Signup.css";
import { FaHome, FaEye, FaEyeSlash } from "react-icons/fa";
import LoadingPage from "../components/LoadingPage";
import BgImg from "../assets/pffice_002.jpg";

export default function SignupPage() {
  const { updateUser } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const {language } = useLanguage()

  // Local form state
  const [form, setForm] = useState({
    userName: "",
    userNationalId: "",
    userEmail: "",
    userPhoneNumber: "",
    userNationality: "Kenyan",
    userPassword: "",
    confirmPassword: ""
  });

  // Persistent generated ID
  const [userId, setUserId] = useState("");

  // Generate once on mount
  useEffect(() => {
    const generateUserId = async () => {
      let country = "KE"; // Default to Kenya
      try {
        const res = await fetch("https://ipapi.co/country/");
        country = await res.text() || "KE";
        setForm(prev => ({ ...prev, userNationality: country }));
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

    if (!form.userName.trim()) newErrors.userName = "Full name is required";
    if (!form.userNationalId.trim()) newErrors.userNationalId = "National ID is required";
    
    if (!form.userEmail.trim()) {
      newErrors.userEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.userEmail)) {
      newErrors.userEmail = "Invalid email format";
    }

    if (!form.userPhoneNumber.trim()) {
      newErrors.userPhoneNumber = "Phone number is required";
    } else if (!/^\+?[\d\s-()]{10,}$/.test(form.userPhoneNumber)) {
      newErrors.userPhoneNumber = "Invalid phone number format";
    }

    if (!form.userPassword) {
      newErrors.userPassword = "Password is required";
    } else if (form.userPassword.length < 8) {
      newErrors.userPassword = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(form.userPassword)) {
      newErrors.userPassword = "Password must contain uppercase, lowercase, number and special character";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.userPassword !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
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
    return <LoadingPage message={"Getting ready for signup..."} />;
  }

  return (
    <div className="signup-container">
      <div className="signup-content">
        {/* Left Side - Image */}
        <div className="signup-image-section">
          <div className="image-placeholder">
            <h2>Join Our Community</h2>
            <p>Create your account and start your career journey today</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="signup-form-section">
          <header className="signup-header">
            <button className="home-btn" onClick={() => navigate("/")}>
              <FaHome /> Home
            </button>
            <h1>Create Account</h1>
            <p>Fill in your details to get started</p>
          </header>

          <div className="signup-form">
            {/* Read-only UserId */}
            <div className="form-group">
              <label>User ID</label>
              <input 
                type="text" 
                value={userId || "Generating..."} 
                readOnly 
                className="readonly-input"
              />
            </div>

            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="userName"
                value={form.userName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={errors.userName ? "error" : ""}
              />
              {errors.userName && <span className="error-text">{errors.userName}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>National ID / Passport *</label>
                <input
                  type="text"
                  name="userNationalId"
                  value={form.userNationalId}
                  onChange={handleChange}
                  placeholder="12345678"
                  className={errors.userNationalId ? "error" : ""}
                />
                {errors.userNationalId && <span className="error-text">{errors.userNationalId}</span>}
              </div>

              <div className="form-group">
                <label>Nationality</label>
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
                <label>Email *</label>
                <input
                  type="email"
                  name="userEmail"
                  value={form.userEmail}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className={errors.userEmail ? "error" : ""}
                />
                {errors.userEmail && <span className="error-text">{errors.userEmail}</span>}
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="userPhoneNumber"
                  value={form.userPhoneNumber}
                  onChange={handleChange}
                  placeholder="+254712345678"
                  className={errors.userPhoneNumber ? "error" : ""}
                />
                {errors.userPhoneNumber && <span className="error-text">{errors.userPhoneNumber}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Password *</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="userPassword"
                  value={form.userPassword}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className={errors.userPassword ? "error" : ""}
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.userPassword && <span className="error-text">{errors.userPassword}</span>}
            </div>

            <div className="form-group">
              <label>Confirm Password *</label>
              <div className="password-input-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={errors.confirmPassword ? "error" : ""}
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>

            <button className="signup-btn" onClick={handleSignup}>
              Create Account
            </button>

            <div className="login-link">
              Already have an account? <span onClick={() => navigate("/login", {replace: true})}>Sign in</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}