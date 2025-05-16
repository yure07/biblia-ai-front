import { createContext, useContext, useState, useEffect } from "react";
import { type ChatsProps, fetchChatsWithMessages } from "../utils/getChats";
import { useAuth } from "./AuthContext";
import type { ChatCompletionMessageParam } from "openai/resources";
import { createNewChat } from "../utils/createChatFB";
import { addMessagesToChat } from "../utils/addMessageChat";

interface ChatContextType {
  chats: ChatsProps[];
  loading: boolean;
  createChat: ({userMessage, responseAIContent}: createChatProps) => void
  addMessageChat: ({userMessage, responseAIContent, chatId}: addMessageChatProps) => void
}

interface createChatProps {
  userMessage: ChatCompletionMessageParam
  responseAIContent: string | null
}

interface addMessageChatProps extends createChatProps {
  chatId: string | undefined
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<ChatsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth()

  useEffect(() => {
    if(user?.uid){
      fetchChats()
    }
  },[user])

  const fetchChats = async () => {
    const chatData = await fetchChatsWithMessages(user?.uid);
    chatData && setChats(chatData);
    setLoading(false);
  };

  const createChat = async ({userMessage, responseAIContent}: createChatProps) => {
    try {
      const assistantMessage:ChatCompletionMessageParam = {
        role: 'assistant',
        content: responseAIContent
      }
      await createNewChat({
        userId: user?.uid,
        userMessage,
        assistantMessage
      })
      await fetchChats()
    } catch (error) {
      console.error("Erro ao criar chat:", error)
    }
  }
  
  const addMessageChat = async ({userMessage, responseAIContent, chatId}: addMessageChatProps) => {
    try {
      const assistantMessage:ChatCompletionMessageParam = {
        role: 'assistant',
        content: responseAIContent
      }
      await addMessagesToChat({
        chatId,
        userMessage,
        assistantMessage
      })
      await fetchChats()
    } catch (error) {
      console.error("Erro ao adicionar mensagem:", error)
    }
  }

  return (
    <ChatContext.Provider value={{ chats, loading, createChat, addMessageChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat deve ser usado dentro de um ChatProvider");
  }
  return context;
};
