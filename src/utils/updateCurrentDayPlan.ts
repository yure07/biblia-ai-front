import { doc, serverTimestamp, updateDoc } from "firebase/firestore"; 
import { getUserPlans } from "./getPlans";
import { db } from "../firebaseConnection";

type planProps = {
  startedAt: { toDate: () => string | number | Date; }; 
  currentDay: number;
}

export const updateCurrentDay = async (userId: string) => {
  try {
    const userRef = doc(db, "controlPlansUser", userId);
    const userPlans = await getUserPlans(userId);

    if (userPlans) {
      
      const currentDate = new Date();
      const today = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`; // Pega apenas a data (YYYY-MM-DD)
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const updatedPlans: Record<string, any> = {};

      // biome-ignore lint/complexity/noForEach: <explanation>
      Object.keys(userPlans).forEach((planId) => {
        const plan = userPlans[planId];
        // Se não existir um lastUpdatedAt, assume a data inicial
        const lastUpdate = plan.lastUpdatedAt
          ? new Date(plan.lastUpdatedAt.seconds * 1000)
          : new Date(plan.startedAt.seconds * 1000);

          const adjustedDate = new Date(lastUpdate.getTime() - 3 * 60 * 60 * 1000);
          const formattedDate = adjustedDate.toISOString().split('T')[0]

        /* if(plan.currentDay === plan.totalDays) {
          console.log('dia atual e total de dias são iguais')
        } else {
          console.log('dia atual e total de dias são diferentes')
        } */
       
        // Se o lastUpdatedAt for de um dia anterior, então podemos atualizar
        if (formattedDate !== today && plan.currentDay !== plan.totalDays) {
          updatedPlans[`plans.${planId}.currentDay`] = plan.currentDay + 1;
          updatedPlans[`plans.${planId}.lastUpdatedAt`] = serverTimestamp();
        }

        if(plan.currentDay === plan.totalDays) {
          updatedPlans[`plans.${planId}.completed`] = true;
        }

      });

      // Só faz update se houver mudanças
      if (Object.keys(updatedPlans).length > 0) {
        await updateDoc(userRef, updatedPlans);
        console.log("currentDay atualizado com sucesso!");
      } else {
        console.log("Nenhuma atualização necessária hoje.");
      }
    }
  } catch (error) {
    console.error("Erro ao atualizar currentDay: ", error);
  }
};
