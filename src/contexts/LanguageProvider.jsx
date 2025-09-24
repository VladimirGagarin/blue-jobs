// src/contexts/LanguageProvider.jsx
import { useState } from 'react';
import { LanguageContext } from "./LanguageContext";

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr'); // default to French

  // Rename this to be more descriptive and return the setter properly
    const toggleLanguage = (newLanguage) => {
    // Validate the language input
    if (newLanguage !== 'fr' && newLanguage !== 'en') {
      console.error('Invalid language:', newLanguage, ' - Defaulting to French');
      setLanguage('fr'); // Set to French instead of just returning
      return;
    }
    
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};