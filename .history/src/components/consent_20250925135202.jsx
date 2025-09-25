import React, { useEffect, useRef, useState } from "react";
import "./Consent.css";
import { useLanguage } from "./useUser.js";
import { useNavigate } from "react-router-dom";
import Footer from "./footer.jsx";
import LoadingPage from "./LoadingPage.jsx";

export function Consent() {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const hasDetectedLanguage = useRef(false); // Track if we've already detected
  const [loading, setLoading] = useState(true);

// Detect user language and set preference
useEffect(() => {
  if (hasDetectedLanguage.current) return; // Skip if already detected

  const detectUserLanguage = () => {
    const browserLanguage =
      navigator.language || navigator.userLanguage || "en";
    const primaryLanguage = browserLanguage.split("-")[0];

    if (primaryLanguage === "fr" || primaryLanguage === "en") {
      setLanguage(primaryLanguage);
      console.log(`Detected user language: ${primaryLanguage}`);
      hasDetectedLanguage.current = true; // Mark as detected
    }
  };

  detectUserLanguage();
}, [setLanguage]);
  
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

  const TermsAndConditions = [
    {
      en: "You must be at least 18 years old to use this service. Age and identity verification through government-issued ID (passport, national ID, driver's license) may be required for certain features.",
      fr: "Vous devez avoir au moins 18 ans pour utiliser ce service. Une vérification d'âge et d'identité par pièce d'identité gouvernementale (passeport, carte d'identité nationale, permis de conduire) peut être requise pour certaines fonctionnalités.",
    },
    {
      en: "You understand that we are not responsible for any third-party content or services.",
      fr: "Vous comprenez que nous ne sommes pas responsables du contenu ou des services de tiers.",
    },
    {
      en: "You agree to provide accurate identification information and consent to identity verification checks when required by law or platform policy.",
      fr: "Vous acceptez de fournir des informations d'identification exactes et consentez aux vérifications d'identité lorsque la loi ou la politique de la plateforme l'exige.",
    },
    {
      en: "All identification documents provided must be valid, current, and clearly legible. Expired or fraudulent documents will result in account suspension.",
      fr: "Tous les documents d'identification fournis doivent être valides, actuels et clairement lisibles. Les documents expirés ou frauduleux entraîneront la suspension du compte.",
    },
    {
      en: "We implement secure encryption for all identification documents and comply with data protection regulations for sensitive personal information.",
      fr: "Nous mettons en œuvre un cryptage sécurisé pour tous les documents d'identification et respectons les réglementations sur la protection des données pour les informations personnelles sensibles.",
    },
    {
      en: "Identity verification may be required for job applications, employer registrations, or high-value transactions to prevent fraud and ensure platform security.",
      fr: "Une vérification d'identité peut être requise pour les candidatures à des emplois, les inscriptions d'employeurs ou les transactions à haute valeur pour prévenir la fraude et assurer la sécurité de la plateforme.",
    },
    {
      en: "You consent to the processing of your personal data and identification documents in accordance with our Privacy Policy and applicable data protection laws.",
      fr: "Vous consentez au traitement de vos données personnelles et documents d'identité conformément à notre politique de confidentialité et aux lois applicables sur la protection des données.",
    },
    {
      en: "We reserve the right to modify these terms at any time without prior notice.",
      fr: "Nous nous réservons le droit de modifier ces conditions à tout moment sans préavis.",
    },
  ];

  const ourPolicies = [
    {
      title: { en: "Privacy Policy", fr: "Politique de Confidentialité" },
      content: [
        {
          en: "We take your privacy seriously.",
          fr: "Nous prenons votre vie privée au sérieux.",
        },
        {
          en: "We do not share your personal data with third parties without your consent.",
          fr: "Nous ne partageons pas vos données personnelles avec des tiers sans votre consentement.",
        },
        {
          en: "You can request to delete your data at any time.",
          fr: "Vous pouvez demander la suppression de vos données à tout moment.",
        },
        {
          en: "We recommend when giving out personal data consider providing legitimate data because it will be used against you if it is false.",
          fr: "Nous recommandons, lors de la fourniture de données personnelles, de fournir des données légitimes car elles seront utilisées contre vous si elles sont fausses.",
        },
        {
          en: "Privacy is our priority when it comes in sharing data.",
          fr: "La confidentialité est notre priorité en matière de partage de données.",
        },
      ],
    },
    {
      title: { en: "Cookie Policy", fr: "Politique de Cookies" },
      content: [
        {
          en: "We use cookies to enhance your browsing experience.",
          fr: "Nous utilisons des cookies pour améliorer votre expérience de navigation.",
        },
        {
          en: "You can manage your cookie preferences in your browser settings.",
          fr: "Vous pouvez gérer vos préférences en matière de cookies dans les paramètres de votre navigateur.",
        },
        {
          en: "By using our site, you consent to our use of cookies.",
          fr: "En utilisant notre site, vous consentez à notre utilisation des cookies.",
        },
      ],
    },
    {
      title: {
        en: "Job Platform Policies",
        fr: "Politiques de la Plateforme d'Emploi",
      },
      content: [
        {
          en: "All job postings must comply with applicable labor laws and non-discrimination principles.",
          fr: "Toutes les offres d'emploi doivent respecter les lois du travail applicables et les principes de non-discrimination.",
        },
        {
          en: "Employers are responsible for accurate job descriptions and compensation information.",
          fr: "Les employeurs sont responsables de la description précise des postes et des informations sur la rémunération.",
        },
        {
          en: "Job seekers must provide truthful credentials and qualifications.",
          fr: "Les chercheurs d'emploi doivent fournir des informations véridiques sur leurs compétences et qualifications.",
        },
        {
          en: "We prohibit any form of discrimination based on race, gender, religion, age, or disability.",
          fr: "Nous interdisons toute forme de discrimination fondée sur la race, le genre, la religion, l'âge ou le handicap.",
        },
      ],
    },
  ];

  const internationalFrameworks = [
    {
      name: {
        en: "International Labour Organization (ILO)",
        fr: "Organisation Internationale du Travail (OIT)",
      },
      description: {
        en: "UN agency setting international labor standards and promoting decent work worldwide.",
        fr: "Agence des Nations Unies établissant des normes internationales du travail et promouvant le travail décent dans le monde.",
      },
      url: "https://www.ilo.org",
    },
    {
      name: {
        en: "Universal Declaration of Human Rights",
        fr: "Déclaration Universelle des Droits de l'Homme",
      },
      description: {
        en: "Article 23 establishes the right to work, free choice of employment, and fair working conditions.",
        fr: "L'article 23 établit le droit au travail, au libre choix de l'emploi et à des conditions de travail équitables.",
      },
      url: "https://www.un.org/en/universal-declaration-human-rights/",
    },
    {
      name: {
        en: "UN Guiding Principles on Business and Human Rights",
        fr: "Principes Directeurs des Nations Unies sur les Entreprises et les Droits de l'Homme",
      },
      description: {
        en: "Framework for preventing and addressing human rights risks linked to business activity.",
        fr: "Cadre pour prévenir et traiter les risques liés aux droits de l'homme dans les activités commerciales.",
      },
      url: "https://www.ohchr.org/en/business",
    },
    {
      name: {
        en: "OECD Guidelines for Multinational Enterprises",
        fr: "Principes Directeurs de l'OCDE à l'intention des Entreprises Multinationales",
      },
      description: {
        en: "Recommendations for responsible business conduct in employment and industrial relations.",
        fr: "Recommandations pour une conduite responsable des entreprises dans l'emploi et les relations industrielles.",
      },
      url: "https://www.oecd.org/corporate/mne/",
    },
  ];

  const fundamentalPrinciples = [
    {
      en: "Freedom of association and collective bargaining",
      fr: "Liberté syndicale et droit à la négociation collective",
    },
    {
      en: "Elimination of forced or compulsory labor",
      fr: "Élimination du travail forcé ou obligatoire",
    },
    { en: "Abolition of child labor", fr: "Abolition du travail des enfants" },
    {
      en: "Elimination of discrimination in employment",
      fr: "Élimination de la discrimination en matière d'emploi",
    },
    {
      en: "Safe and healthy working conditions",
      fr: "Conditions de travail sûres et saines",
    },
    {
      en: "Reasonable working hours and rest periods",
      fr: "Horaires de travail raisonnables et périodes de repos",
    },
    {
      en: "Fair wages ensuring a decent living",
      fr: "Salaires équitables assurant une vie décente",
    },
  ];

  return (
    <div className="consent-page">
      {loading && (<LoadingPage message={`${ourPolicies.title[language]`}/>)}
      <div className="consent-header">
        <div className="header-content">
          <h1>
            {language === "fr"
              ? "Conditions d'Utilisation et Politiques"
              : "Terms of Use and Policies"}
          </h1>
          <p className="header-subtitle">
            {language === "fr"
              ? "Dernière mise à jour: " +
                new Date().toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Last updated: " +
                new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
          </p>
        </div>
        <button
          className="home-button"
          onClick={() => navigate("/?panel=home")}
        >
          {language === "fr" ? "Accueil" : "Home"}
        </button>
      </div>

      <div className="consent-container">
        <div className="consent-section">
          <h2>
            {language === "fr"
              ? "Conditions d'utilisation"
              : "Terms of Service"}
          </h2>
          <ul className="terms-list">
            {TermsAndConditions.map((term, index) => (
              <li key={index} className="term-item">
                <span className="term-icon">✓</span>
                {term[language]}
              </li>
            ))}
          </ul>
        </div>

        <div className="consent-section">
          <h2>{language === "fr" ? "Nos politiques" : "Our Policies"}</h2>
          <div className="policies-grid">
            {ourPolicies.map((policy, index) => (
              <div key={index} className="policy-card">
                <h3>{policy.title[language]}</h3>
                <ul className="policy-list">
                  {policy.content.map((item, i) => (
                    <li key={i}>{item[language]}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="consent-section">
          <h2>
            {language === "fr"
              ? "Cadres Internationaux des Droits du Travail"
              : "International Labor Rights Frameworks"}
          </h2>
          <p className="section-description">
            {language === "fr"
              ? "Notre plateforme s'aligne sur les principes fondamentaux du travail établis par les instruments internationaux :"
              : "Our platform aligns with fundamental labor principles established by international instruments:"}
          </p>

          <div className="principles-grid">
            {fundamentalPrinciples.map((principle, index) => (
              <div key={index} className="principle-card">
                <div className="principle-number">{index + 1}</div>
                <div className="principle-text">{principle[language]}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="consent-section">
          <h2>
            {language === "fr"
              ? "Ressources Internationales sur les Droits du Travail"
              : "International Labor Rights Resources"}
          </h2>
          <p className="section-description">
            {language === "fr"
              ? "Pour plus d'informations sur les droits des employeurs et des employés au niveau international :"
              : "For more information about employer and employee rights at the international level:"}
          </p>

          <div className="resources-grid">
            {internationalFrameworks.map((resource, index) => (
              <div key={index} className="resource-card">
                <h4>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-link"
                  >
                    {resource.name[language]}
                    <span className="link-arrow">↗</span>
                  </a>
                </h4>
                <p className="resource-description">
                  {resource.description[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
