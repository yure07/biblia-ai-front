import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./AuthContext"
import { getUserPlans } from "../utils/getPlans"
import type { DocumentData } from "firebase/firestore"
import { updateCurrentDay } from "../utils/updateCurrentDayPlan"

interface PlanContextType{
  plansUser: DocumentData
  loading: boolean
  fetchPlans: () => void
}

const UserPlansContext = createContext<PlanContextType | undefined>(undefined)

export const UserPlansProvider = ({ children }: { children: React.ReactNode }) => {
  const [plansUser, setPlansUser] = useState<DocumentData>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      if(user?.uid){
        await updateCurrentDay(user.uid)
        fetchPlans()
      }
    }
    fetchData()
  }, [user])

  const fetchPlans = async () => {
    const plansUserDatabase:DocumentData = await getUserPlans(user?.uid)
    plansUserDatabase && setPlansUser(plansUserDatabase)
    setLoading(false)
  }

  return (
    <UserPlansContext.Provider value={{ plansUser, loading, fetchPlans }}>
      {children}
    </UserPlansContext.Provider>
  );
}

export const useUserPlans = () => {
  const context = useContext(UserPlansContext);
  if (!context) {
    throw new Error("useUserPlans deve ser usado dentro de um ChatProvider");
  }
  return context;
}