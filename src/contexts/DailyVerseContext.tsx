import React, { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRandomVerse } from "../api/dailyVerse";

type VerseContextProps = {
  verse: string | null
}

const VerseContext = createContext<VerseContextProps | null>(null);

async function fetchVerse() {
  try {
    const randomVerse = await getRandomVerse()
    return randomVerse || "Confie no Senhor de todo o coração. (Provérbios 3:5)";
  } catch (error) {
    console.error("Erro ao buscar versículo:", error);
    return "Confie no Senhor de todo o coração. (Provérbios 3:5)";
  }
}

export function VerseProvider({ children }: { children: ReactNode }) {
  const [verse, setVerse] = useState<string | null>('');
  
  useEffect(() => {
    checkAndUpdateVerse();
  }, []);

  
  async function checkAndUpdateVerse() {
    const currentDate = new Date();
    const today = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`; 
    const lastDate = await AsyncStorage.getItem("lastVerseDate");

    if (lastDate !== today) {
      const newVerse = await fetchVerse();
      setVerse(newVerse);
      await AsyncStorage.setItem("lastVerseDate", today);
      await AsyncStorage.setItem("verse", newVerse);
    } else {
      const savedVerse = await AsyncStorage.getItem("verse");
      setVerse(savedVerse);
    }
  }


  return <VerseContext.Provider value={{ verse }}>{children}</VerseContext.Provider>;
}

export function useVerse() {
  const context = useContext(VerseContext);
    if (!context) {
      throw new Error("useVerse deve ser usado dentro de um VerseProvider");
    }
    return context;
}
