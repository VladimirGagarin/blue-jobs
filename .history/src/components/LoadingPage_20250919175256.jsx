import Logo from "../assets/logo.svg";
import "./LoadingPage.css";

export default function LoadingPage({ message }) {
    return (
        <div className="loading-page">
            <div className="loading-spinner">
                <img src={ Logo} alt="blue_jobs_logo"/>
            </div>
        </div>
    )
}