import { CommonActions, useNavigation } from "@react-navigation/native"
import type { ChatCompletionMessageParam } from "openai/resources"
import React, { useEffect, useState } from "react"
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { Dimensions, Keyboard, Platform, ScrollView, StyleSheet, TouchableOpacity, View, Text, Image } from "react-native"
import { ScaledSheet, moderateScale } from "react-native-size-matters"
import { themes } from "../global/themes"
import type { NavigatorRoutesProps } from "../routes/routes"
import { ChatInput } from "../screens/Chat/components/Input"
import { sendMessageToAPI } from "../api/chatService";
import { generateStudyPlan } from "../api/studyPlan";
import type { Message } from "../utils/getChats";
import { useChat } from "../contexts/ChatContext";
import { parseBibleStudyPlan } from "../utils/formatStudyPlanCustom";
import { addPlanCustom } from "../utils/addPlanCustom";
import { useAuth } from "../contexts/AuthContext";
import { useUserPlans } from "../contexts/UserPlansContext";

type ChatLayoutProps = {
  nameInHeader: string
  typeChat: 'questions' | 'planCustom'
  messagesChatCreated?: Message[]
  chatId?:string
}

const { width } = Dimensions.get("window")

export const ChatLayout = ({ nameInHeader, typeChat, messagesChatCreated, chatId }: ChatLayoutProps) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const [messageUser, setMessageUser] = useState<string>('')
  const [messagesChat, setMessagesChat] = useState<ChatCompletionMessageParam[]>([])
  const [loadingAPI, setLoadingAPI] = useState<boolean>(false)
  const navigation = useNavigation<NavigatorRoutesProps>()
  const { fetchPlans } = useUserPlans()
  const { createChat, addMessageChat } = useChat()
  const { user } = useAuth()

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSubscription = Keyboard.addListener(showEvent, () => setKeyboardVisible(true));
    const hideSubscription = Keyboard.addListener(hideEvent, () => setKeyboardVisible(false));

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [])

  useEffect(() => {
    if(typeChat === 'planCustom' && messagesChat.length === 0){
      setMessagesChat((prev) => [...prev, {
        id: 0,
        role: 'assistant',
        content: 'O que deseja aprender?'
      }])
    }
  }, [typeChat, messagesChat])

  useEffect(() => {
    if (messagesChatCreated) {
      const formattedMessages: ChatCompletionMessageParam[] = messagesChatCreated.map((msg) => ({
        role: msg.text.role,
        content: msg.text.content,
      }));
      setMessagesChat(formattedMessages);
    }
  }, [messagesChatCreated])

  const sendMessageChatQuestions = async () => {
    Keyboard.dismiss()
    const newMessages:ChatCompletionMessageParam[] = [...messagesChat, {
      role: 'user',
      content: messageUser
    }]
    setMessagesChat(newMessages)
    setMessageUser('')
    setLoadingAPI(true)
    try {
      const responseAI = await sendMessageToAPI(newMessages)
      setMessagesChat((prev) => [...prev, {
        id: prev.length,
        role: 'assistant',
        content: responseAI.content
      }])
      if(newMessages.length < 2) {
        createChat({
          userMessage: newMessages[newMessages.length-1], 
          responseAIContent: responseAI.content
        })
      } else {
        addMessageChat({
          userMessage: newMessages[newMessages.length-1], 
          responseAIContent: responseAI.content,
          chatId
        })
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
    } finally {
      setLoadingAPI(false)
    }
  }

  const sendMessageChatPlan = async () => {
    Keyboard.dismiss()
    if(messageUser !== ''){
      if(messagesChat.length === 1){
        setMessagesChat((prev) => [...prev, {
          id: 1,
          content: messageUser,
          role: 'user'
        },
        {
          id: 2,
          content: 'em quantos dias?',
          role: 'assistant'
        }])
        setMessageUser('')
        return
      }
      if(messagesChat.length === 3){
        setMessagesChat((prev) => [...prev, {
          id: 3,
          content: messageUser,
          role: 'user'
        }])
        const includeDay = messageUser.includes('dia') || messageUser.includes('dias')
        const contentMessage = `${messagesChat[1].content}, em ${messageUser} ${includeDay ? '' : 'dias'}`
        const messageToSendChat:ChatCompletionMessageParam = {
          role: 'user',
          content: contentMessage
        }
        
        setMessageUser('')
        setLoadingAPI(true)
        try {
          const responseAI = await generateStudyPlan(messageToSendChat)
          
          if(responseAI.content && user?.uid && typeof messagesChat[1].content === 'string'){
            const planFormatted = parseBibleStudyPlan(responseAI.content)
            await addPlanCustom({
              userId: user.uid,
              planId: messagesChat[1].content,
              totalDays: Number(messageUser.replace(/\D/g, "")),
              studyPlan: planFormatted
            })
          }
          fetchPlans()
          navigation.navigate('dashboard')
        } catch (error) {
          console.error("Erro ao enviar mensagem:", error)
        } finally {
          setLoadingAPI(false)
        }
      }
    }
  }

  return(
    <View style={styles.container}>
      <TouchableOpacity  
        onPress={() => {
          if(nameInHeader === 'Personalizado'){
            navigation.navigate('newPlan')
            return
          }
          navigation.navigate('dashboard')}
        }
        style={styles.iconBack}
      >
        <Ionicons 
          name="chevron-back" 
          size={24} 
          color="black"
        />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.titleNewChat} numberOfLines={1}>{nameInHeader}</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 100 }} 
        style={styles.chatSpace}>
        {messagesChat.length === 0 && (
          <View style={styles.contentChatEmpty}>
            <Text style={styles.titleChatEmpty}>Como posso ajudar?</Text>
          </View>
        )}

        {messagesChat.map((message, index) => (
          <View 
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index} 
            style={[styleScaled.messageContainer, 
              index === 0 && { marginTop: 24 },
              message.role === 'user' && { marginLeft: 'auto' }
            ]}>
            <Text style={styleScaled.messageText}>
            {Array.isArray(message.content)
              ? message.content.flatMap(part => part.type || []).join(' ')
              : message.content || "Mensagem sem conteúdo"
            }
            </Text>
          </View>
        ))}

        {loadingAPI && (
          <View style={styleScaled.messageAiThinking}>
            <Text style={styleScaled.messageText}>{typeChat === 'questions' && 'Estou pensando' || 'Criando plano'}...</Text>
          </View>
        )}
      </ScrollView>

      <View style={[styles.containerInput, { bottom: keyboardVisible ? '35%' : 0 }]}>
        <View style={styles.contentContainerInput}>
          <ChatInput 
            isStudyPlan={nameInHeader === 'Personalizado'}
            value={messageUser} 
            onChangeText={(e) => setMessageUser(e)} 
            isDisabled={loadingAPI}
          />
          <TouchableOpacity onPress={() => {
            if(typeChat === 'questions'){
              sendMessageChatQuestions()
              return
            }
            sendMessageChatPlan()
          }}>
          <Feather name="send" size={26} color="black" />
        </TouchableOpacity>
        </View>
      </View>
    </View>
)
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: themes.colors.background
  },
  header:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 90,
    paddingTop: 28,
    paddingHorizontal: 24,
    borderBottomWidth: 1
  },
  iconBack:{
    position: 'absolute',
    marginLeft: 24,
    zIndex: 2,
    marginTop: 48
  },
  titleNewChat:{
    fontFamily: 'Roboto_700Bold',
    fontSize: 24,
    width: '70%',
    textAlign: 'center'
  },
  chatSpace:{
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    borderBottomWidth: 1,
    paddingBottom: 20
  },
  contentChatEmpty:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '75%',
  },
  titleChatEmpty:{
    fontFamily: 'Roboto_700Bold',
    fontSize: 24,
  },
  containerInput:{
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 50 : 40,
    backgroundColor: themes.colors.background,
    borderTopWidth: 1
  },
  contentContainerInput:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24
  },
})

const styleScaled = ScaledSheet.create({
  messageContainer:{
    maxWidth: '70%',
    padding: 12,
    marginBottom: 20,
    borderRadius: 12,
    marginHorizontal: moderateScale(width > 375 ? 16 : 12),
    backgroundColor: themes.colors.messageContainer,
  },
  messageText:{
    fontSize: moderateScale(width > 375 ? 16 : 12),
  },
  messageAiThinking:{
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: moderateScale(width > 375 ? 16 : 12)
  }
})