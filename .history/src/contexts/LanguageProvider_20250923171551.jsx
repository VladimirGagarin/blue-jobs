// english french toggle
import React, { createContext, useState, } from 'react';


export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr'); // default to French

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (!));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
// Usage: wrap your app with <LanguageProvider> in index.js or App.js

