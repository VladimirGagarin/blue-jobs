import "../index.css";
import { useLanguage } from "./useUser";

export default function AboutContent() {
  const { language } = useLanguage();

  return (
    <div className="about-section">
      <h2>{language === "fr" ? "À propos de nous" : "About Blue Jobs"}</h2>
      <article>
        <p>
          {language === "fr"
            ? "Bienvenue chez Blue Jobs, votre plateforme de confiance pour la recherche d'emploi. Nous nous engageons à connecter les chercheurs d'emploi avec des opportunités passionnantes dans le monde entier. Notre mission est de simplifier le processus de recherche d'emploi en offrant une interface conviviale et des outils puissants pour vous aider à trouver le poste idéal."
            : "Welcome to Blue Jobs, your trusted platform for job searching. We are committed to connecting job seekers with exciting opportunities worldwide. Our mission is to simplify the job search process by providing a user-friendly interface and powerful tools to help you find the perfect position."}
        </p>
        <p>
          {language === "fr"
            ? "Chez Blue Jobs, nous comprenons que la recherche d'emploi peut être un défi. C'est pourquoi nous avons conçu notre plateforme pour être intuitive et facile à utiliser, que vous soyez un professionnel expérimenté ou un nouveau diplômé. Notre équipe dévouée travaille sans relâche pour s'assurer que vous avez accès aux dernières offres d'emploi et aux ressources nécessaires pour réussir dans votre carrière."
            : "At Blue Jobs, we understand that job searching can be challenging. That's why we've designed our platform to be intuitive and easy to use, whether you're an experienced professional or a recent graduate. Our dedicated team works tirelessly to ensure you have access to the latest job listings and resources needed to succeed in your career."}
        </p>
          </article>
          <div className="motive-section"></div>
    </div>
  );
}
