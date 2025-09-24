// src/hooks/useUser.js
import { useContext } from "react";
import UserContext from "../contexts/UserData";
import { LanguageC } from "../contexts/LanguageProvider";

export function useUser() {
  return useContext(UserContext);
}

export const useLanguage = () => useContext(LanguageContext);
