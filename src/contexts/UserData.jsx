import { createContext, useState, useEffect } from "react";
import { mockUsers } from "../Utils/user";
import { NotificationTemplates, createNotification, getNotificationText } from '../Utils/Notification.js';

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
  userNotifications: []
};

// ✅ Your predefined test user
const testUser = {
  userId: "u98765",
  userName: "Jane Doe",
  userNationalId: "12345678",
  userEmail: "jane.doe@email.com",
  userPhoneNumber: "+254711223344",
  userNationality: "Kenyan",
  userIsPremium: false,
  userJobPostPermit: true,
  userApplyPermit: true,
  userPostedJobs: [],
  userAppliedJobs: ["aj_2025X"],
  userPostTokens: 2,
  userApplyTokens: 3,
  userDateCreated: "2025-09-26T12:00:00Z",
  userPassportPhoto: "https://bluejobs.com/uploads/u98765.jpg",
  userPassword: "JaneDoe#2025",
  userRole: "basic",
  userNotifications: [],
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
      setUser(guestUser);
         // Optional: Also store in localStorage to simulate real behavior
        localStorage.setItem("bluejobs_userId", guestUser.userId);
       
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

   // ✅ Logout function
  const logout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("bluejobs_userId");
    
    // Reset to guest user
    setUser(guestUser);
    
    // Optional: Clear any other user-related data
    localStorage.removeItem("userSession");
    localStorage.removeItem("authToken");
    
    console.log('User logged out successfully');
  };

  // ✅ Login function (for future use)
  const login = (userData) => {
    if (userData?.userId) {
      localStorage.setItem("bluejobs_userId", userData.userId);
      setUser(userData);
      return true;
    }
    return false;
  };

  // ✅ Check if user is logged in
  const isLoggedIn = () => {
    return user.userId !== "guest" && user.userId !== null;
  };

  // ✅ Check if user is guest
  const isGuest = () => {
    return user.userId === "guest";
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
