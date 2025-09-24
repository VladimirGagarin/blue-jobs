import { createContext, useState, useEffect } from "react";

// ✅ default guest user
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

  // ✅ Load userId from localStorage and fetch details
  useEffect(() => {
    const storedId = localStorage.getItem("bluejobs_userId");

    if (storedId) {
      // For now, fake fetch (replace later with backend call)
      const mockUser = {
        userId: storedId,
        userName: "",
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

  // ✅ Only store userId in localStorage
  const updateUser = (newUser) => {
    if (newUser?.userId) {
      localStorage.setItem("bluejobs_userId", newUser.userId);
    } else {
      localStorage.removeItem("bluejobs_userId");
    }
    setUser(newUser || guestUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
