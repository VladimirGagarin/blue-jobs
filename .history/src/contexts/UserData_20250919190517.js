import { createContext, useContext, useState, useEffect } from "react";

// ✅ 1. Create context
const UserContext = createContext();

// ✅ 2. Provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load userId from localStorage on first render
  useEffect(() => {
    const storedId = localStorage.getItem("bluejobs_userId");
    if (storedId) {
      // For now, use mock user until backend is connected
      const mockUser = {
        userId: storedId,
        userName: "Kelvin Einstein",
        userEmail: "kevo@email.com",
        userNationality: "Kenyan",
        userIsPremium: false,
        userJobPostPermit: true,
        userApplyPermit: true,
        userPostedJobs: ["j101", "j102"],
        userAppliedJobs: ["j150", "j151"],
        userDateCreated: "2025-09-18T12:00:00Z",
        userPassportPhoto: "https://bluejobs.com/uploads/u12345.jpg",
      };
      setUser(mockUser);
    }
  }, []);

  // Save userId only
  const login = (userObj) => {
    localStorage.setItem("bluejobs_userId", userObj.userId);
    setUser(userObj);
  };

  const logout = () => {
    localStorage.removeItem("bluejobs_userId");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// ✅ 3. Hook for easy access
export function useUser() {
  return useContext(UserContext);
}
