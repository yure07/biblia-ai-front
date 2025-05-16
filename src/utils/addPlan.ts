import { type FieldValue, arrayUnion, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConnection";
import { useEffect, useState } from "react";

type newPlanProps = {
  completed: boolean
  currentDay: number
  lastUpdatedAt: FieldValue
  createdAt: FieldValue
  title: string
  totalDays: number
}

type addPlanProps = {
  userId: string,
  planId: 'evangelhos7dias' | 'versiculos-fe' | 'como-vencer-ansiedade'
}

type planConfigProps = {
  title: string
  totalDays: number
}

export const addPlan = async ({ userId, planId }: addPlanProps) => {
  
  const planConfig: planConfigProps =
    planId === 'evangelhos7dias'
      ? { title: 'Evangelhos em 7 dias', totalDays: 7 }
    : planId === 'como-vencer-ansiedade'
      ? { title: 'Como vencer a ansiedade', totalDays: 15 } 
      : { title: 'Versículos sobre fé', totalDays: 12 };


  const newPlan:newPlanProps = {
    completed: false,
    currentDay: 1,
    lastUpdatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
    title: planConfig.title,
    totalDays: planConfig.totalDays
  }

  try {
    const userPlansRef = doc(db, "controlPlansUser", userId)

    await setDoc(
      userPlansRef,
      {
        plans: {
          [planId]: newPlan, // Adiciona o plano como um novo objeto dentro de "plans"
        },
      },
      { merge: true } // Mantém os outros planos já existentes
    );

    console.log("Plano adicionado com sucesso!");
  } catch (error) {
    console.error("Erro ao adicionar plano:", error);
  }
}