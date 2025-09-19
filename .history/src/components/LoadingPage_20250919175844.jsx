import Logo from "../assets/logo.svg";
import "./LoadingPage.css";

export default function LoadingPage({ message }) {
  return (
    <div className="loading-page">
      <div className="spinner"></div>
      <img className="logo" src={Logo} alt="blue_jobs_logo" loading="lazy" />
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
}
