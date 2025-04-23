// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { UserType } from "../types";
import { getCurrentUser, logoutUser } from "../services/auth";

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserType | null;
  login: (userData: UserType) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if the user is logged in on app load
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await getCurrentUser();
        if (res.user) {
          setIsLoggedIn(true);
          setUser(res.user);
        }
      } catch (error) {
        console.error("Error checking login status", error);
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const login = (userData: UserType) => {
    if (!userData._id || !userData.username || !userData.email) {
      console.error("Invalid user data for login", userData);
      return;
    }
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error("Logout error", error);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
