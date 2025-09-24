// english french toggle
import {  useState } from 'react';
import { LanguageContext } from '';



export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr'); // default to French

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'fr' ? 'en' : 'fr'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
// Usage: wrap your app with <LanguageProvider> in index.js or App.js

