// src/hooks/useUser.js
import { useContext } from "react";
import UserContext from "../contexts/UserData";
import {useC}

export function useUser() {
  return useContext(UserContext);
}
