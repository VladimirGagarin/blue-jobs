import "../index.css";
import { useLanguage } from "./useUser";

export default function AboutContent() {
  const { language } = useLanguage();

  return (
    <div className="about-section">
      <h2>{language === "fr" ? "À propos de nous" : "About Blue Jobs"}</h2>
      <s
    </div>
  );
}
