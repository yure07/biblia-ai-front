import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConnection";
import type { ChatCompletionMessageParam } from "openai/resources";

type addMessagesToChatProps = {
  chatId: string | undefined
  userMessage: ChatCompletionMessageParam
  assistantMessage: ChatCompletionMessageParam  
}

export const addMessagesToChat = async ({ chatId, userMessage, assistantMessage }: addMessagesToChatProps) => {
  try {
    const messagesRef = collection(db, `chats/${chatId}/messages`);

    await Promise.all([
      addDoc(messagesRef, {
        sender: "user",
        text: userMessage,
        createdAt: serverTimestamp(),
      }),
      addDoc(messagesRef, {
        sender: "assistant",
        text: assistantMessage,
        createdAt: serverTimestamp(),
      }),
    ]);

    console.log("Mensagens adicionadas ao chat:", chatId);
  } catch (error) {
    console.error("Erro ao adicionar mensagens:", error);
  }
};
