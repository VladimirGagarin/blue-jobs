// src/hooks/useUser.js
import { useContext } from "react";
import UserContext from "../contexts/UserData";
import {use}

export function useUser() {
  return useContext(UserContext);
}
