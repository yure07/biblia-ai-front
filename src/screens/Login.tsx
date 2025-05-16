import { Poppins_400Regular, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Dimensions, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { ButtonComponent } from "../components/Button";
import { InputEmail } from "../components/Input/EmailInput";
import { InputPassword } from "../components/Input/PasswordInput";
import Loading from "../components/Loading";
import { themes } from "../global/themes";
import type { NavigatorRoutesProps } from "../routes/routes";
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConnection';

const { width } = Dimensions.get("window")

type DataLoginUserProps = {
  email: string
  password: string
}

export function Login() {
  const [loggingUser, setLoggingUser] = useState<boolean>(false)
  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false)
  const [dataLoginUser, setDataLoginUser] = useState<DataLoginUserProps>({
    email: '',
    password: ''
  })

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold
  })
  const navigation = useNavigation<NavigatorRoutesProps>();

  if(!fontsLoaded){
    return <Loading/>
  }

  const handleLogin = async () => {
    setLoggingUser(true)
    await signInWithEmailAndPassword(auth, dataLoginUser.email, dataLoginUser.password).
    then(() => {
      navigation.navigate('dashboard')
      setLoggingUser(false)
    })
    .catch((error) => {
      if(error.code === 'auth/invalid-email' || error.code === 'auth/invalid-credential'){
        setInvalidCredentials(true)
        setDataLoginUser({
          email: '',
          password: ''
        })
      }
      setLoggingUser(false)
    })
  }
  
  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Ionicons 
          name="chevron-back" 
          size={24} 
          color="black" 
          onPress={() => navigation.navigate("initial")} 
          style={{ paddingLeft: 32 }}
        />
        <View style={styles.containerText}>
          <Text style={styleText.title}>Bem vindo de volta!</Text>
          <Text style={styleText.title}>Feliz em ver você,</Text>
          <Text style={styleText.title}>Novamente!</Text>
        </View>
        <View style={styles.containerTextField}>
          <InputEmail 
            value={dataLoginUser.email} 
            onChangeText={(e) => setDataLoginUser({...dataLoginUser, email: e})}
          />
          <InputPassword 
            value={dataLoginUser.password}
            onChangeText={(e) => setDataLoginUser({...dataLoginUser, password: e})}
          />
          {invalidCredentials && (
            <Text style={styles.textError}>Credenciais inválidas.</Text>
          )}
        </View>
        <View style={styles.containerBtn}>
          <ButtonComponent 
            title="Entrar" 
            bgColor={themes.colors.primray} 
            onPress={handleLogin}
            isDisabled={loggingUser}
            width={moderateScale(width > 375 ? 280 : 240)}
            textIsDisabled='Entrando...'
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 56,
    backgroundColor: themes.colors.background
  },
  containerText:{
    marginTop: 40,
    paddingLeft: 40,
    textAlign: 'left'
  },
  containerTextField:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    height: 150
  },
  containerBtn:{
    marginTop: 12
  },
  textContainerBtn:{
    textAlign: 'center',
    margin: 16,
    fontSize: 16
  },
  textError:{
    width: 300,
    paddingLeft: 6,
    color: 'red'
  }
})

const styleText = ScaledSheet.create({
  title:{
    fontFamily: 'Poppins_700Bold',
    fontSize: moderateScale(width > 375 ? 32 : 24)
  }
})