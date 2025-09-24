// src/contexts/UserContext.jsx
import { createContext, useState, useEffect } from "react";

// default guest user
const guestUser = {
  userId: "guest",
  userName: "Guest",
  userEmail: null,
  userNationality: null,
  userIsPremium: false,
  userJobPostPermit: false,
  userApplyPermit: false,
  userPostedJobs: [],
  userAppliedJobs: [],
  userDateCreated: null,
  userPassportPhoto: null,
};

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(guestUser);

  // Load saved userId from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("bluejobs_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Update user and persist to localStorage
  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem("bluejobs_user", JSON.stringify(newUser));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
