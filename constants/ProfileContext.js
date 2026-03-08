import { createContext, useContext, useState } from "react";

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState({
    firstName: "Maria",
    lastName: "Santos",
    phone: "",
    email: "",
    address: "",
    guardianName: "Juan Santos",
    photo: null, // uri string or null
  });

  const updateProfile = (fields) =>
    setProfile((prev) => ({ ...prev, ...fields }));

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
