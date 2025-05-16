import { useRoute } from "@react-navigation/native";
import Loading from "../../components/Loading";
import { useChat } from "../../contexts/ChatContext";
import { ChatLayout } from "../../layout/Chat";
import type { ChatsProps } from "../../utils/getChats";

export const ChatCreated = () => {
  const route = useRoute();
  const { chatId } = route.params as { chatId: string };
  const { chats } = useChat()
  const chat:ChatsProps | undefined = chats.find((chat) => chat.chatId === chatId)

  if(!chat) return <Loading/>

  return(
    <ChatLayout
      nameInHeader={chat.messages[0].text.content}
      typeChat="questions"
      messagesChatCreated={chat.messages}
      chatId={chatId}
    />
  )
}