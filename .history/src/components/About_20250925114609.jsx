import "./About.css";
import { useLanguage } from "./useUser";
import AccessibilityImage from "../assets/accessibility.jpg";
import Innovation from "../assets/innovation.jpg";
import Community from "../assets/community.jpg";
import Youth from "../assets/youth_empowerment.jpg";
import Support from "../assets/support.jpg";
import { useNavigate } from "react-router-dom";
import {useUser } from "./useUser.js";
import { useRef, useEffect } from "react";


export default function AboutContent() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { user} = useUser();
  const ctaRef = useRef(null);
  const userIsGuest = user?.userId ===
  

  const motivesContent = [
    {name: {en: "Accessibility", fr: "Accessibilité"}, description: {en: "We believe that everyone should have access to job opportunities.", fr: "Nous croyons que tout le monde devrait avoir accès à des opportunités d'emploi."}, image: AccessibilityImage},
    {name: {en: "Innovation", fr: "Innovation"}, description: {en: "We use technology to enhance the job search experience.", fr: "Nous utilisons la technologie pour améliorer la recherche d'emploi."}, image: Innovation},
    {name: {en: "Youth Empowerment", fr: "Autonomisation des Jeunes"}, description: {en: "We are committed to empowering youth in their career journeys.", fr: "Nous nous engageons à autonomiser les jeunes dans leur parcours professionnel."}, image: Youth},
    {name: {en: "Community", fr: "Communauté"}, description: {en: "We are building a community of job seekers and employers.", fr: "Nous construisons une communauté de chercheurs d'emploi et d'employeurs."}, image: Community},
    {name: {en: "Support", fr: "Soutien"}, description: {en: "We provide support to job seekers at every stage of their journey.", fr: "Nous offrons un soutien aux chercheurs d'emploi à chaque étape de leur parcours."}, image: Support},
  ];

  // on mount, scroll to call to action section after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (ctaRef.current) {
        ctaRef.current.scrollIntoView({ behavior: 'smooth', block:"center" });
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);


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
                {motivesContent.map((motive, index) => (
                  <div key={index} className="motive-card">
                    {/* Have top and bottom side of card*/}
                    <div className="top-side">
                      <img src={motive.image} alt={motive.name[language]} className="motive-image"/>
                    </div>
                    <div className="bottom-side">
                      <h4>{motive.name[language]}</h4>
                      <p>{motive.description[language]}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="motive-footer" ref={ctaRef}>
                <p>{language === "fr" ? "Chez Blue Jobs, nous sommes passionnés par l'idée de faire une différence dans la vie des chercheurs d'emploi. Rejoignez-nous dans notre mission de transformer la recherche d'emploi et de créer un avenir meilleur pour tous." : "At Blue Jobs, we are passionate about making a difference in the lives of job seekers. Join us in our mission to transform job searching and create a better future for all."}</p>
                {/* call to action buttons for looking for job and post job */}
                {user && user.userId !== null &&(

              
                <div className="ctas-motive">
                      <button onClick={() => navigate(`/job?type=get&userId=${user.userId}`)}>{language === "fr" ? "Rechercher un emploi" : "Looking for a job"}</button>
                      <button onClick={() => navigate(`/job?type=post&userId=${user.userId}`)}>{language === "fr" ? "Publier une offre" : "Post a job"}</button>
                  </div>
          )}
              </div>
          </div>
    </div>
  );
}
