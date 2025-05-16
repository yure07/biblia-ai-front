import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useFonts, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { themes } from "../../../global/themes";
import Loading from "../../../components/Loading";
import Ionicons from '@expo/vector-icons/Ionicons';
import { styleShadow } from "../../../global/shadow";
import { useNavigation } from "@react-navigation/native";
import type { NavigatorRoutesProps } from "../../../routes/routes";
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import type { Timestamp } from "firebase/firestore";
import { useChat } from "../../../contexts/ChatContext";
import { formatTimestampToDate } from "../../../utils/formatTimestamp";

const { width } = Dimensions.get("window")

export const Chats = () => {
  const { chats, loading } = useChat()
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium
  })
  const navigation = useNavigation<NavigatorRoutesProps>();

  const handleOpenChat = (chatId: string) => {
    navigation.navigate("chatCreated", { chatId });
  }

  if(!fontsLoaded || loading){
    return <Loading/>
  }

  return(
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styleScaled.text}>Conversas criadas: {chats.length}</Text>
        <TouchableOpacity style={styleScaled.btn} onPress={() => navigation.navigate('newChat')}>
          <Ionicons 
            name="add-outline" 
            size={moderateScale(width > 375 ? 17 : 14)} 
            color="white" 
          />
          <Text style={styleScaled.textBtn}>Nova conversa</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.containerChats} showsVerticalScrollIndicator={false}>
        {chats.length === 0 ? (
          <Text style={styleScaled.textNoChats}>Voce não possui conversas ainda.</Text>
        ) : (
          chats.map((chat) => (
            <TouchableOpacity 
              key={chat.chatId} 
              style={[styles.chat, styleShadow.shadow]}
              onPress={() => handleOpenChat(chat.chatId)}
            >
              <Text style={styleScaled.titleChat} numberOfLines={1}>{chat.messages[0].text.content}</Text>
              <Text>Conversa iniciada em: {formatTimestampToDate(chat.createdAt)}</Text>
            </TouchableOpacity>
          ))
        )}

        <View style={[styles.chat, styleShadow.shadow]}>
          <Text style={styleScaled.titleChat} numberOfLines={1}>Por que Deus destruiu Sodoma e Gomorra? ssssssssss</Text>
          <Text>Perguntas disponíveis: 2</Text>
          <Text>Conversa iniciada em: 11/03/2025</Text>
        </View>
      </ScrollView>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 40,
    paddingVertical: 12,
  },
  header:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  containerChats:{
    display: 'flex',
    width: '100%',
    paddingBottom: 24,
    marginTop: 24,
    gap: 24,
    overflow: 'scroll'
  },
  chat:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: 96,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12
  }
})

const styleScaled = ScaledSheet.create({
  text:{
    fontFamily: 'Roboto_400Regular',
    fontSize: moderateScale(width > 375 ? 16 : 12)
  },
  btn:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(width > 375 ? 130 : 110),
    height: 32,
    gap: 4,
    backgroundColor: themes.colors.success,
    borderRadius: 6
  },
  textBtn:{
    color: 'white',
    fontFamily: 'Roboto_400Regular',
    fontSize: moderateScale(width > 375 ? 15 : 12)
  },
  titleChat:{
    fontFamily: 'Roboto_500Medium',
    fontSize: moderateScale(width > 375 ? 15 : 12)
  },
  textNoChats: {
    fontSize: moderateScale(width > 375 ? 18 : 15),
    textAlign: 'center',
    marginTop: 16
  }
})