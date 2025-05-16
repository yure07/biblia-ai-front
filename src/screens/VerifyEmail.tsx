import { StyleSheet, View, Text, Image, Dimensions } from "react-native"
import { Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { ButtonComponent } from "../components/Button"
import Loading from "../components/Loading";
import { useNavigation } from "@react-navigation/native";
import type { NavigatorRoutesProps } from "../routes/routes";
import { useEffect, useRef, useState } from "react";
import { themes } from "../global/themes";
import { sendEmailVerification } from "firebase/auth";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { auth } from "../firebaseConnection";

const { width } = Dimensions.get("window")

export function VerifyEmail () {
  const [countTimeDisabled, setCountTimeDisabled] = useState<number>(30)
  const [disabled, setDisabled] = useState<boolean>(true)
  const [messageEmailSent, setMessageEmailSent] = useState<string>('')
  const [fontsLoaded] = useFonts({
    Poppins_700Bold
  })
  const navigation = useNavigation<NavigatorRoutesProps>();
  const { currentUser } = auth
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const hasNavigatedRef = useRef(false)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      checkEmailVerification();
    }, 5000)
  
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  useEffect(() => {
    if(countTimeDisabled === 0) {
      setMessageEmailSent('')
      setDisabled(false)
      return
    }

    const intervalId = setInterval(() => {
      setCountTimeDisabled((prevCount) => prevCount - 1)
    }, 1000)

    return () => clearInterval(intervalId)

  }, [countTimeDisabled])

  const checkEmailVerification = async () => {
    if (currentUser && !hasNavigatedRef.current) {
      await currentUser.reload()
      if (currentUser.emailVerified) {
        hasNavigatedRef.current = true // impede navegação repetida
        if (intervalRef.current) clearInterval(intervalRef.current);
        navigation.navigate("planApp");
      }
    }
  }

  const sendEmailAgain = async () => {
    setCountTimeDisabled(30)
    setDisabled(true)
    if (currentUser) {
      try {
        await sendEmailVerification(currentUser)
        setMessageEmailSent("E-mail de verificação reenviado! Verifique sua caixa de entrada.")
      } catch (error) {
        setMessageEmailSent("Erro ao reenviar e-mail.")
      }
    }
  }
  
  if(!fontsLoaded){
    return <Loading/>
  }
  
  return(
    <View style={styles.container}>
      <Text style={styleText.title}>Verifique o seu email</Text>
      <Text>Um e-mail de verificação foi enviado para:</Text>
      <Text style={styles.textEmail}>{currentUser?.email}</Text>
      <Text>Clique no link para ativar sua conta.</Text>
      <View style={styles.containerBtn}>
        <ButtonComponent 
          title="Reenviar E-mail" 
          bgColor='transparent' 
          bordColor="black" 
          isDisabled={disabled}
          textIsDisabled={`Reenviar E-mail - ${countTimeDisabled}s.`}
          width={moderateScale(width > 375 ? 280 : 240)}
          onPress={sendEmailAgain}
        />
      </View>
      {messageEmailSent !== '' && (
        <View style={styles.containerEmailSent}>
          <Image source={require('../assets/gmail-icon.png')} style={styles.icon}/>
          <Text>E-mail de verificação reenviado!</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: themes.colors.background
  },
  containerBtn:{
    marginTop: 18,
    marginBottom: 12
  },
  containerEmailSent:{
    display: 'flex',
    flexDirection: 'row',
    gap: 8
  },
  icon:{
    width: 14,
    height: 14
  },
  textEmail: {
    textAlign: 'center'
  }
})

const styleText = ScaledSheet.create({
  title:{
    fontFamily: 'Poppins_700Bold',
    fontSize: moderateScale(width > 375 ? 34 : 24),
    marginBottom: 12
  }
})