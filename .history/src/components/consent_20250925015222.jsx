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
        {title:{en: "Privacy Policy", fr: "Politique de Confidentialité"}},
        {en: "Cookie Policy", fr: "Politique de Cookies"},
    ];

  return (
    <div>
      <h1>{language === "fr" ? "Page de Consentement" : "Consent Page"}</h1>
      <p>{language === "fr" ? "Ceci est l'endroit où les informations de consentement seront affichées." : "This is where the consent information will be displayed."}</p>
    </div>
  );
}