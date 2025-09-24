import { create } from "zustand";
import { mockUsers } from "../Utils/user";

const useUserStore = create((set) => ({
  user: null, // current logged-in user

  // actions
  login: (email) =>
    set(() => {
      const found = mockUsers.find((u) => u.email === email);
      return { user: found || null };
    }),

  logout: () => set({ user: null }),

  signup: (newUser) =>
    set(() => {
      const id = mockUsers.length + 1;
      const createdUser = { id, ...newUser };
      mockUsers.push(createdUser); // ⚠️ fake persist
      return { user: createdUser };
    }),
}));

export default useUserStore;
