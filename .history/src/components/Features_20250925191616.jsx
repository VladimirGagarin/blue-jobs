import "./Feature.css";
import { useLanguage } from "./useUser";
import { useUser } from "./useUser.js";
import { useNavigate } from "react-router-dom";

export default function FeatureContent() {
  const { language } = useLanguage();
  const { user } = useUser();
  const navigate = useNavigate(); // Add navigate function
  const userId = user?.userId || "guest";

  // Define navigation links based on user authentication
  

  const features = [
    {
      id: 1,
      title: {
        en: "📝 Professional Resume Builder",
        fr: "📝 Créateur de CV Professionnel",
      },
      description: {
        en: "Create stunning resumes with our easy-to-use builder. Templates optimized for ATS systems.",
        fr: "Créez des CV percutants avec notre créateur facile à utiliser. Modèles optimisés pour les systèmes ATS.",
      },
      link: "/resume-builder",
      icon: "📄",
      comingSoon: false,
    },
    {
      id: 2,
      title: {
        en: "💼 Interview Preparation Guide",
        fr: "💼 Guide de Préparation aux Entretiens",
      },
      description: {
        en: "Master your interviews with common questions, tips, and practice scenarios.",
        fr: "Maîtrisez vos entretiens avec des questions courantes, conseils et scénarios de pratique.",
      },
      link: "/interview-guide",
      icon: "🎯",
      comingSoon: false,
    },
    {
      id: 3,
      title: {
        en: "📱 Mobile App",
        fr: "📱 Application Mobile",
      },
      description: {
        en: "Get job alerts and apply on-the-go with our mobile application.",
        fr: "Recevez des alertes d'emploi et postulez en déplacement avec notre application mobile.",
      },
      link: "/mobile-app",
      icon: "📲",
      comingSoon: true,
    },
    {
      id: 4,
      title: {
        en: "🔍 Advanced Job Search",
        fr: "🔍 Recherche d'Emploi Avancée",
      },
      description: {
        en: "Filter jobs by salary, location, experience level, and company ratings.",
        fr: "Filtrez les emplois par salaire, lieu, niveau d'expérience et notations d'entreprise.",
      },
      link: "/advanced-search",
      icon: "✨",
      comingSoon: false,
    },
    {
      id: 5,
      title: {
        en: "💰 Salary Calculator",
        fr: "💰 Calculateur de Salaire",
      },
      description: {
        en: "Compare salaries by location, experience, and industry standards.",
        fr: "Comparez les salaires par lieu, expérience et standards de l'industrie.",
      },
      link: "/salary-calculator",
      icon: "💵",
      comingSoon: true,
    },
    {
      id: 6,
      title: {
        en: "🎓 Career Path Guidance",
        fr: "🎓 Guide de Parcours Professionnel",
      },
      description: {
        en: "Discover career paths, required skills, and growth opportunities.",
        fr: "Découvrez les parcours professionnels, compétences requises et opportunités de croissance.",
      },
      link: "/career-paths",
      icon: "🚀",
      comingSoon: false,
    },
    {
      id: 7,
      title: {
        en: "📊 Job Market Insights",
        fr: "📊 Insights du Marché de l'Emploi",
      },
      description: {
        en: "Real-time data on hiring trends, in-demand skills, and industry growth.",
        fr: "Données en temps réel sur les tendances d'embauche, compétences recherchées et croissance sectorielle.",
      },
      link: "/market-insights",
      icon: "📈",
      comingSoon: true,
    },
    {
      id: 8,
      title: {
        en: "🤝 Employer Branding",
        fr: "🤝 Image Marque Employeur",
      },
      description: {
        en: "Tools for employers to showcase company culture and attract top talent.",
        fr: "Outils pour les employeurs pour mettre en valeur la culture d'entreprise et attirer les meilleurs talents.",
      },
      link: "/employer-branding",
      icon: "🏢",
      comingSoon: false,
    },
  ];

  const resumeTips = [
    {
      en: "Keep your resume to 1-2 pages maximum",
      fr: "Limitez votre CV à 1-2 pages maximum",
    },
    {
      en: "Use action verbs and quantify achievements",
      fr: "Utilisez des verbes d'action et quantifiez les réalisations",
    },
    {
      en: "Tailor your resume for each job application",
      fr: "Adaptez votre CV pour chaque candidature",
    },
    {
      en: "Include relevant keywords from the job description",
      fr: "Incluez des mots-clés pertinents de la description de poste",
    },
    {
      en: "Proofread carefully for spelling and grammar errors",
      fr: "Relisez attentivement pour les fautes d'orthographe et de grammaire",
    },
  ];

  // Navigation handlers
  const handleGetStarted = () => {
    if (userId && userId !== "guest" && userId !== null) {
      navigate(`/job?type=get&userId=${userId}`);
    } else {
      navigate("/guest");
    }
  };

  const handleBrowseJobs = () => {
        // Browse jobs is available to ALL users (guests and authenticated)
        // You might have a public jobs page or show filtered view for guests
        navigate("/?panel=public_jobs"); // Or wherever your public job listings are
        
    };

  return (
    <div className="feature-panel">
      <div className="feature-header">
        <h1>
          {language === "fr"
            ? "Fonctionnalités Blue Jobs"
            : "Blue Jobs Features"}
        </h1>
        <p className="feature-subtitle">
          {language === "fr"
            ? "Découvrez tous nos outils pour booster votre carrière"
            : "Discover all our tools to boost your career"}
        </p>
      </div>

      {/* Main Features Grid */}
      <section className="features-section">
        <h2>
          {language === "fr"
            ? "Nos Fonctionnalités Principales"
            : "Our Main Features"}
        </h2>
        <div className="features-grid">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`feature-card ${
                feature.comingSoon ? "coming-soon" : ""
              }`}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title[language]}</h3>
              <p>{feature.description[language]}</p>
              {feature.comingSoon && (
                <span className="coming-soon-badge">
                  {language === "fr" ? "Bientôt disponible" : "Coming Soon"}
                </span>
              )}
              <button className="feature-button">
                {language === "fr" ? "Explorer" : "Explore"} →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Resume Tips Section */}
      <section className="resume-tips-section">
        <h2>
          {language === "fr"
            ? "💡 Conseils pour un CV Parfait"
            : "💡 Perfect Resume Tips"}
        </h2>
        <div className="tips-container">
          {resumeTips.map((tip, index) => (
            <div key={index} className="tip-card">
              <span className="tip-number">{index + 1}</span>
              <p>{tip[language]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile App Preview */}
      <section className="app-preview-section">
        <div className="app-content">
          <div className="app-text">
            <h2>
              {language === "fr"
                ? "📱 Application Blue Jobs"
                : "📱 Blue Jobs Mobile App"}
            </h2>
            <p>
              {language === "fr"
                ? "Téléchargez notre application pour rechercher des emplois, postuler et recevoir des alertes où que vous soyez."
                : "Download our app to search jobs, apply, and get alerts wherever you are."}
            </p>
            <div className="app-badges">
              <div className="app-badge">
                <span className="badge-icon">🍎</span>
                <span>App Store</span>
              </div>
              <div className="app-badge">
                <span className="badge-icon">🤖</span>
                <span>Google Play</span>
              </div>
            </div>
            <p className="coming-soon-text">
              {language === "fr"
                ? "Disponible prochainement"
                : "Available soon"}
            </p>
          </div>
          <div className="app-visual">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="app-screen-content">
                  <div className="app-header">Blue Jobs</div>
                  <div className="app-feature">🔍 Search Jobs</div>
                  <div className="app-feature">💼 My Applications</div>
                  <div className="app-feature">📅 Interviews</div>
                  <div className="app-feature">⭐ Favorites</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>
          {language === "fr"
            ? "Prêt à booster votre carrière ?"
            : "Ready to boost your career?"}
        </h2>
        <p>
          {language === "fr"
            ? "Rejoignez des milliers de professionnels qui ont trouvé leur emploi idéal avec Blue Jobs."
            : "Join thousands of professionals who found their dream job with Blue Jobs."}
        </p>
        <div className="cta-buttons">
            <button className="cta-button primary" onClick={handleGetStarted}>
                {language === "fr" ? "Commencer Maintenant" : "Get Started Now"}
            </button>
            <button className="cta-button secondary" onClick={handleBrowseJobs}>
                {language === "fr" ? "Voir les Offres" : "Browse Jobs"}
            </button>
        </div>

        {/* Additional context for guests */}
        {userId === "guest" && (
          <p className="guest-notice">
            {language === "fr"
              ? "👋 Invité ? Inscrivez-vous pour postuler aux offres et accéder à toutes les fonctionnalités !"
              : "👋 Guest? Sign up to apply for jobs and access all features!"}
          </p>
        )}
      </section>
    </div>
  );
}