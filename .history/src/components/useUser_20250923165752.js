// src/hooks/useUser.js
import { useContext } from "react";
import UserContext from "../contexts/UserData";
import {}

export function useUser() {
  return useContext(UserContext);
}
