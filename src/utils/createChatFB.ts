import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../firebaseConnection";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import type { ChatCompletionMessageParam } from "openai/resources";

type createNewChatProps = {
  userId: string | undefined
  userMessage: ChatCompletionMessageParam
  assistantMessage: ChatCompletionMessageParam
}

export const createNewChat = async ({userId, userMessage, assistantMessage}: createNewChatProps) => {
  try {
    const chatRef = await addDoc(collection(db, "chats"), {
      userId,
      createdAt: serverTimestamp()
    });

    const messagesRef = collection(db, `chats/${chatRef.id}/messages`);

    await addDoc(messagesRef, {
      sender: "user",
      text: userMessage,
      createdAt: serverTimestamp(),
    });

    await addDoc(messagesRef, {
      sender: "assistant",
      text: assistantMessage,
      createdAt: serverTimestamp(),
    })

    console.log("Novo chat criado com ID:", chatRef.id);
    return chatRef.id;
  } catch (error) {
    console.error("Erro ao criar chat:", error);
  }
};
