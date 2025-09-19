import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem("bluejobs_userId");
    if (storedId) {
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

export default UserContext;
