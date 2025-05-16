import { collection, query, where, getDocs, orderBy, type Timestamp } from "firebase/firestore";
import { db } from "../firebaseConnection";

export type Message = {
  id: string;
  createdAt: Timestamp;
  sender: string;
  text: {
    content: string;
    role: "user" | "assistant";
  };
};

export type ChatsProps = {
  chatId: string;
  createdAt: Timestamp;
  userId: string;
  messages: Message[];
}

export const fetchChatsWithMessages = async (userId: string | undefined) => {
  if(!userId) {
    return
  }
  try {
    const chatsRef = collection(db, "chats");

    // Query para buscar apenas os chats do usuário logado
    const q = query(chatsRef, where("userId", "==", userId));
    
    const querySnapshot = await getDocs(q);

    const chats = await Promise.all(querySnapshot.docs.map(async (doc) => {
      const chatId = doc.id;
      const chatData = doc.data();

      // Buscar mensagens do chat
      const messagesRef = collection(db, `chats/${chatId}/messages`);
      const messagesQuery = query(messagesRef, orderBy("createdAt"));
      const messagesSnapshot = await getDocs(messagesQuery);

      const messages = messagesSnapshot.docs.map(messageDoc => ({
        id: messageDoc.id,
        ...messageDoc.data(),
      }));

      return {
        chatId,
        ...chatData,
        messages,
      } as ChatsProps
    }));

    return chats;
  } catch (error) {
    console.error("Erro ao buscar os chats e mensagens:", error);
    return [];
  }
};
