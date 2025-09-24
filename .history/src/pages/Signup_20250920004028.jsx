// src/pages/Signup.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/useUser";
import "./Signup.css";
import { FaHome } from "react-icons/fa";
import LoadingPage from "../components/LoadingPage";


export default function SignupPage() {
  const { updateUser } = useUser();
    const navigate = useNavigate();
     const [loading, setLoading] = useState(true);
     const [countryOfREsidence, setCountry] = useState(null)

  // Local form state
  const [form, setForm] = useState({
    userName: "",
    userNationalId: "",
    userEmail: "",
    userPhoneNumber: "",
    userNationality: "Kenyan",
  });

  // persistent generated ID
  const [userId, setUserId] = useState("");

  // generate once on mount
  useEffect(() => {
    const generateUserId = async () => {
      let country = "XX"; // default if not found
      try {
        // try geolocation API (browser)
        const res = await fetch("https://ipapi.co/country/");
          country = await res.text();
          setCountry(country);
      } catch (e) {
        console.warn("Could not fetch location, using default",e);
      }

      // secure random string
      const rand = crypto.randomUUID().split("-")[0]; // short segment
      setUserId(`${country}-${rand}`);
    };

    generateUserId();
  }, []);

     useEffect(() => {
       const handleLoad = () => {
         setTimeout(() => setLoading(false), 8000);
       };

       if (document.readyState === "complete") {
         handleLoad();
       } else {
         window.addEventListener("load", handleLoad);
       }

       return () => window.removeEventListener("load", handleLoad);
     }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    if (!form.userName || !form.userNationalId || !form.userPhoneNumber) {
      alert("Please fill in all required fields");
      return;
    }

    const newUser = {
      userId,
      ...form,
      userIsPremium: false,
      userJobPostPermit: true,
      userApplyPermit: true,
      userPostedJobs: [],
      userAppliedJobs: [],
      userPostTokens: 0,
      userApplyTokens: 0,
      userDateCreated: new Date().toISOString(),
      userPassportPhoto: null,
    };

    updateUser(newUser);
    navigate(`/dashboard?user=${newUser.userId}`);
  };

  return (
    <div className="App">
        {loading && <LoadingPage message={"In about to signup in a minute..."} />}
      <div className="signup-page">
        <header className="signup-header">
          <h2>Signup</h2>
          <button onClick={() => navigate("/")}>
            <FaHome /> Home
          </button>
        </header>

        {/* read-only UserId */}
        <div className="form-group">
          <label>User ID</label>
          <input type="text" value={userId || "(generating...)"} readOnly />
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="userName"
            value={form.userName}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label>National ID / Passport</label>
          <input
            type="text"
            name="userNationalId"
            value={form.userNationalId}
            onChange={handleChange}
            placeholder="12345678"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="userEmail"
            value={form.userEmail}
            onChange={handleChange}
            placeholder="example@email.com"
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="userPhoneNumber"
            value={form.userPhoneNumber}
            onChange={handleChange}
            placeholder="+254712345678"
          />
        </div>

        <div className="form-group">
          <label>Nationality</label>
          <input
            type="text"
            name="userNationality"
            value={form.userNationality}
            onChange={handleChange}
          />
        </div>

        <button className="signup-btn" onClick={handleSignup}>
          Create Account
        </button>
      </div>
    </div>
  );
}
