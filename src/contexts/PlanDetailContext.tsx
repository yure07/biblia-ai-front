import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { doc, type DocumentData, getDoc } from "firebase/firestore";
import { db } from "../firebaseConnection";

interface PlanDetailsContextType{
  planDetails: DocumentData
  loading: boolean
}

interface PlanDetailsProviderProps{
  children: ReactNode
  planId: string
  currentDay: number
}

const PlanDetailsContext = createContext<PlanDetailsContextType | undefined>(undefined);

export const PlanDetailsProvider = ({ children, planId, currentDay }:PlanDetailsProviderProps) => {
  const [planDetails, setPlanDetails] = useState<DocumentData>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlanDetails();
  },[]);

  const fetchPlanDetails = async () => {
    try {
      const planRef = doc(db, 'studyPlans', planId);
      const planDoc = await getDoc(planRef);

      if (planDoc.exists()) {
        const data = planDoc.data();
        const filteredDays = Object.entries(data.days)
          .filter(([day]) => Number(day) <= currentDay)
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          .reduce<Record<string, any>>((acc, [day, value]) => {
            acc[day] = value
            return acc
          }, {})
        setPlanDetails({ ...data, days: filteredDays })
      } else {
        setPlanDetails([]);
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes do plano:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PlanDetailsContext.Provider value={{ planDetails, loading }}>
      {children}
    </PlanDetailsContext.Provider>
  );
}

export const usePlanDetails = () => {
  const context = useContext(PlanDetailsContext);
    if (!context) {
      throw new Error("useChat deve ser usado dentro de um ChatProvider");
    }
    return context;
}
