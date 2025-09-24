// src/hooks/useUser.js
import { useContext } from "react";
import UserContext from "../contexts/UserData";
import { LanguageProvider } from "../contexts/LanguageProvider";

export function useUser() {
  return useContext(UserContext);
}

export const useLanguage = () => useContext(LanguageContext);
