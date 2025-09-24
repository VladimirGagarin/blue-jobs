import React from "react";
import "./Consent.css";
import { useLanguage } from "./useUser.js";
   
export function Consent() {
    const { language } = useLanguage();
    const TermsAndConditions = [
        {en: "You must be at least 18 years old to use this service.", fr: "Vous devez avoir au moins 18 ans pour utiliser ce service."},
        {en: "You agree to provide accurate and truthful information.", fr: "Vous acceptez de fournir des informations exactes et véridiques."},
        {en: "You consent to the processing of your personal data in accordance with our Privacy Policy.", fr: "Vous consentez au traitement de vos données personnelles conformément à notre politique de confidentialité."},
        {en: "You understand that we are not responsible for any third-party content or services.", fr: "Vous comprenez que nous ne sommes pas responsables du contenu ou des services de tiers."},
        {en: "You agree to comply with all applicable laws and regulations while using our service.", fr: "Vous acceptez de respecter toutes les lois et réglementations applicables lors de l'utilisation de notre service."},
        {en: "We reserve the right to modify these terms at any time without prior notice.", fr: "Nous nous réservons le droit de modifier ces conditions à tout moment sans préavis."},
    ];

    const ourPolicies = [
        {
            title: { en: "Privacy Policy", fr: "Politique de Confidentialité" },
            content: [
                { en: "We take your privacy seriously.", fr: "Nous prenons votre vie privée au sérieux." },
                { en: "We do not share your personal data with third parties without your consent.", fr: "Nous ne partageons pas vos données personnelles avec des tiers sans votre consentement." },
                { en: "You can request to delete your data at any time.", fr: "Vous pouvez demander la suppression de vos données à tout moment." },
               { en: "We recommend when giving out personal data consider providing legitimate data because it will be used against you if it is false.", fr: "Nous recommandons, lors de la fourniture de données personnelles, de fournir des données légitimes car elles seront utilisées contre vous si elles sont fausses." },
                { en: "Privacy is our priority when it comes in sharing data.", fr: "La confidentialité est notre priorité en matière de partage de données." },

            ]
        },
        {
            title: { en: "Cookie Policy", fr: "Politique de Cookies" }, content: [
                { en: "We use cookies to enhance your browsing experience.", fr: "Nous utilisons des cookies pour améliorer votre expérience de navigation." },
                { en: "You can manage your cookie preferences in your browser settings.", fr: "Vous pouvez gérer vos préférences en matière de cookies dans les paramètres de votre navigateur." },
                { en: "By using our site, you consent to our use of cookies.", fr: "En utilisant notre site, vous consentez à notre utilisation des cookies." },
            ]
        },
    ];

  return (
    <div>
          <h1>{language === "fr" ? "Page de Consentement" : "Consent Page"}</h1>
          
      </div>
  );
}