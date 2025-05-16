import { doc, type DocumentData, getDoc } from "firebase/firestore";
import { db } from "../firebaseConnection";

export const getUserPlans = async (userId: string | undefined) => {
  if(!userId) {
    return
  }
  try {
    const userDocRef = doc(db, 'controlPlansUser', userId);
    const userDocSnap = await getDoc(userDocRef)

    if (userDocSnap.exists()) {
      const userData:DocumentData = userDocSnap.data();
      return userData?.plans || {};
    }
    console.log('Usuário não encontrado');
    return null;
  } catch (error) {
    console.error('Erro ao buscar planos do usuário:', error);
    return null;
  }
};