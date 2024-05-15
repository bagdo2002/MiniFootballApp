import { User, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect, createContext, useContext } from "react";
import { FIREBASE_AUTH } from "./firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      onAuthStateChanged(FIREBASE_AUTH, async (user) => {
        console.log("AUTHENTICATED: ", user && user.email);
        await AsyncStorage.setItem("user", JSON.stringify(user.email));

        setUser(user);
        setInitialized(true);
      });
    };

    fetchData();
  }, []);

  const value = {
    user,
    initialized,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
