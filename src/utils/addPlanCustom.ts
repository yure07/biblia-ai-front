import { addDoc, collection, doc, serverTimestamp, setDoc, type FieldValue } from "firebase/firestore"
import { db } from "../firebaseConnection"
import type { BibleStudyPlan } from "../@types/detailsStudyPlanCustom"

type newPlanProps = {
  completed: boolean
  currentDay: number
  lastUpdatedAt: FieldValue
  createdAt: FieldValue
  title: string
  totalDays: number
}

type addPlanCustomProps = {
  userId: string
  planId: string
  totalDays: number
  studyPlan?: BibleStudyPlan
}

type planConfigProps = {
  title: string
  totalDays: number
}

const firstLetterUppercase = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};


const addUserPlan = async ({ userId, planId, totalDays }: addPlanCustomProps) => {
  const newPlan:newPlanProps = {
    completed: false,
    currentDay: 1,
    lastUpdatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
    title: firstLetterUppercase(planId),
    totalDays
  }
  try {
    const userPlansRef = doc(db, "controlPlansUser", userId)

    await setDoc(
      userPlansRef,
      {
        plans: {
          [planId.replace(/\s+/g, '-')]: newPlan, // Adiciona o plano como um novo objeto dentro de "plans"
        },
      },
      { merge: true } // Mantém os outros planos já existentes
    );

    console.log("Plano adicionado com sucesso!");
  } catch (error) {
    console.error("Erro ao adicionar plano:", error);
  }
}

const addPlanDetails = async (planId: string, studyPlan: BibleStudyPlan) => {
  try {
    const customId = planId.replace(/\s+/g, '-');
    const planRef = doc(db, "studyPlans", customId);
    
    await setDoc(planRef, {
      days: studyPlan.days,
      title: studyPlan.title
    });
  
    console.log("Novo detalhes de plano criado com ID:", customId);
  } catch (error) {
    console.error("Erro ao adicionar detalhes do plano:", error);
  }
}

export const addPlanCustom = async ({ userId, planId, totalDays, studyPlan }: addPlanCustomProps) => {
  await addUserPlan({ userId, planId, totalDays })
  if(studyPlan) await addPlanDetails(planId, studyPlan)
}