import React from "react";
import "./Consent.css";
import { useLanguage } from "./useUser.js";
   
export function Consent() {
    const { language } = useLanguage();
    const TermsAndConditions = [
        { id: 1, text_en: "You agree to our terms and conditions.", text_fr: "Vous acceptez nos termes et conditions." },

  return (
    <div>
      <h1>{language === "fr" ? "Page de Consentement" : "Consent Page"}</h1>
      <p>{language === "fr" ? "Ceci est l'endroit où les informations de consentement seront affichées." : "This is where the consent information will be displayed."}</p>
    </div>
  );
}