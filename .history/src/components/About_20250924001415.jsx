import "../index.css";
import { useLanguage } from "./useUser";
import AccessibilityImage from "../assets/accessibility.jpg";
import Innovation from "../assets/innovation.jpg";
import Community from "../assets/community.jpg";
import Youth from "../assets/youth_empowerment.jpg";
import Support from "../assets/support.jpg";


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
          <div className="motive-section">
              <h3>{language === "fr" ? "Notre Motivation" : "Our Motivation"}</h3>
              <div className="motive-grid-container">
                  <div className="motive-grid-item">
                      <div className="top-side">
                          <img src={AccessibilityImage} alt="Accessibility" className="motive-image" loading="lazy" />
                      </div>
                      <div className="bottom-side">
                      
                            <h4>{language === "fr" ? "Accessibilité" : "Accessibility"}</h4>
                            <p>{language === "fr" ? "Nous croyons que tout le monde devrait avoir accès à des opportunités d'emploi." : "We believe that everyone should have access to job opportunities."}</p>
                        </div>
                  </div>
                  <div className="motive-grid-item">
                      <div className="top-side"></div>
                      <div className="bottom-side"></div>
                      <h4>{language === "fr" ? "Innovation" : "Innovation"}</h4>
                      <p>{language === "fr" ? "Nous utilisons la technologie pour améliorer la recherche d'emploi." : "We use technology to enhance the job search experience."}</p>
                  </div>
                  <div className="motive-grid-item">
                      <h4>{language === "fr" ? "Autonomisation des Jeunes" : "Youth Empowerment"}</h4>
                        <p>{language === "fr" ? "Nous nous engageons à autonomiser les jeunes dans leur parcours professionnel." : "We are committed to empowering youth in their career journeys."}</p>
                  </div>
                  
                  <div className="motive-grid-item">
                      <h4>{language === "fr" ? "Communauté" : "Community"}</h4>
                      <p>{language === "fr" ? "Nous construisons une communauté de chercheurs d'emploi et d'employeurs." : "We are building a community of job seekers and employers."}</p>
                  </div>
                    <div className="motive-grid-item">
                      <h4>{language === "fr" ? "Soutien" : "Support"}</h4>
                      <p>{language === "fr" ? "Nous offrons un soutien aux chercheurs d'emploi à chaque étape de leur parcours." : "We provide support to job seekers at every stage of their journey."}</p>
                  </div>
              </div>
          </div>
    </div>
  );
}
