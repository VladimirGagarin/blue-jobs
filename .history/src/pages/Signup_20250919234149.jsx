// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/useUser";
import "./Signup.css";

export default function SignupPage() {
  const { updateUser } = useUser();
  const navigate = useNavigate();

  // Local form state
  const [form, setForm] = useState({
    userName: "",
    userNationalId: "",
    userEmail: "",
    userPhoneNumber: "",
    userNationality: "Kenyan",
  });

  // Simple unique id generator (replace with backend later)
  const generateUserId = () => "u" + Date.now();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    const newUser = {
      userId: generateUserId(),
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
    <div
    <div className="signup-page">
      <header className="signup-header">
        <h2>Signup</h2>
        <button onClick={() => navigate("/")}>🏠 Home</button>
      </header>

      {/* read-only UserId */}
      <div className="form-group">
        <label>User ID</label>
        <input type="text" value={"(will be generated)"} readOnly />
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
  );
}
