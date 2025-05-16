import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RoutesProps } from "../routes/routes";
import { auth } from "../firebaseConnection";
import { navigate, navigationRef } from "../utils/navigationService";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  photoUser: string | undefined | null
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photoUser, setPhotoUser] = useState<string | undefined | null>(null)
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkNavigationReady = () => {
      if (navigationRef.isReady()) {
        if (user) {
          navigate('dashboard');
        } else {
          navigate('initial');
        }
      }
    };
  
    checkNavigationReady();
  
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setPhotoUser(currentUser?.photoURL);
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, [user])

  return (
    <AuthContext.Provider value={{ user, loading, photoUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acessar o contexto facilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
