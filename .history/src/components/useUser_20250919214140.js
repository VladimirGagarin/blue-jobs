// src/hooks/useUser.js
import { useContext } from "react";
import UserContext from "../contexts/UserData";

export function useUser() {
  return useContext(UserContext);
}
