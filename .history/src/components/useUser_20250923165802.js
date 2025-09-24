// src/hooks/useUser.js
import { useContext } from "react";
import UserContext from "../contexts/UserData";
import { useContext } from "react";

export function useUser() {
  return useContext(UserContext);
}
