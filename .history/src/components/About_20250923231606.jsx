import "../index.css";
import { useLanguage } from "./useUser";

export default function AboutContent() {
  const { language } = useLanguage();

  return (
    <div className="about-section">
      <h2>{language === "fr" ? "À propos de nous" : "About Blue Jobs"}</h2>
      <p>
        {language === "fr"
          ? "Nous sommes une plateforme dédiée à la mise en relation des chercheurs d'emploi et des employeurs."
          : "We are a platform dedicated to connecting job seekers with employers."}
      </p>
    </div>
  );
}
