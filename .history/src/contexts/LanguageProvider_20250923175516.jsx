// english french toggle
import {  useState } from 'react';
import { LanguageContext } from "./LanguageContext";



export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr'); // default to French

 // setLanguage based on user preference or browser settings

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
// Usage: wrap your app with <LanguageProvider> in index.js or App.js

