import { createContext, useState, useEffect } from "react";
import { mockUsers } from "../Utils/user";

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

// ✅ Your predefined test user
const testUser = {
  userId: "u12349",
  userName: "Sr. Mary Japheth",
  userNationalId: "56789012",
  userEmail: "mary.japheth@email.com",
  userPhoneNumber: "+254744556677",
  userNationality: "Kenyan",
  userIsPremium: false,
  userJobPostPermit: true,
  userApplyPermit: false,
  userPostedJobs: ["bj_160K"],
  userAppliedJobs: [],
  userPostTokens: 1,
  userApplyTokens: 0,
  userDateCreated: "2025-09-21T18:40:00Z",
  userPassportPhoto: "https://bluejobs.com/uploads/u12349.jpg",
  userPassword: "SrJaphet#2025",
  userRole: "basic",
};

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(guestUser);

  // ✅ Load userId from localStorage and fetch details
  useEffect(() => {
    const storedId = localStorage.getItem("bluejobs_userId");
    const allUsers = [...mockUsers]; // Replace with actual data source

    if (storedId) {
      // For now, fake fetch (replace later with backend call)
      const findUser = allUsers.find(u => u.userId === storedId);
      if (findUser) {
        setUser(findUser);
      }
     
    
    }
    else {
      setUser(testUser);
         // Optional: Also store in localStorage to simulate real behavior
    localStorage.setItem("bluejobs_userId", testUser.userId);
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
