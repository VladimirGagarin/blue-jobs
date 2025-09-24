// english french toggle
import React, { createContext, useState, useEffect , useContext} from 'react';


export const LanguageContext = createContext();
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'fr' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
// Usage: wrap your app with <LanguageProvider> in index.js or App.js

// To consume the context in any component:
const context = useContext(LanguageContext);
const { language, toggleLanguage } = context;