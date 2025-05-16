import { Poppins_400Regular, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { useState, } from 'react';
import { Dimensions, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { ButtonComponent } from '../components/Button';
import { InputEmail } from '../components/Input/EmailInput';
import { InputPassword } from '../components/Input/PasswordInput';
import { InputName } from '../components/Input/SignUpInput';
import Loading from '../components/Loading';
import { themes } from '../global/themes';
import type { NavigatorRoutesProps } from "../routes/routes";
import { auth } from '../firebaseConnection';

type DataSignUpUserProps = {
  name: string
  email: string
  password: string
}

const { width } = Dimensions.get("window")

export function SignUp() {
  const [dataSignUpUser, setDataSignUpUser] = useState<DataSignUpUserProps>({
    name: '',
    email: '',
    password: ''
  })
  const [invalidInputs, setInvalidInputs] = useState<boolean>(false)
  const [invalidEmail, setInavlidEmail] = useState<boolean>(false)
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false)
  const [registeringUser, setRegisteringUser] = useState<boolean>(false)
  const navigation = useNavigation<NavigatorRoutesProps>()
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold
  })

  if(!fontsLoaded){
    return <Loading/>
  }

  const handleRegister = async () => {
    if(dataSignUpUser.password === '' || dataSignUpUser.email === '' || dataSignUpUser.password === ''){
      setInvalidInputs(true)
      return
    }
    if(!dataSignUpUser.email.includes('@') || !dataSignUpUser.email.includes('.com')){
      setInavlidEmail(true)
      return
    }
    if(dataSignUpUser.password.length < 8){
      setInvalidPassword(true)
      return
    }
    setRegisteringUser(true)
    
    await createUserWithEmailAndPassword(auth, dataSignUpUser.email, dataSignUpUser.password)
    .then(async (userCredentials) => {
      const user = userCredentials.user
      await updateProfile(user, { displayName: dataSignUpUser.name })
      return user
    })
    .then((user) => {
      try {
        sendEmailVerification(user)
        console.log('email enviado com sucesso')
      } catch (error) {
        console.log('erro ao enviar: ', error)
      }
    })
    .then(() => {
      navigation.navigate('verify_email')
      setRegisteringUser(false)
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
          <Text style={styleText.title}>Criar conta</Text>
          <Text style={styleText.subTitle}>Insira seus dados</Text>
        </View>
        <View style={styles.containerTextField}>
          <InputName
            value={dataSignUpUser.name}
            onChangeText={(e) => setDataSignUpUser({...dataSignUpUser, name: e})}
          />
          <InputEmail 
            value={dataSignUpUser.email} 
            onChangeText={(e) => setDataSignUpUser({...dataSignUpUser, email: e})}
          />
          <InputPassword 
            value={dataSignUpUser.password}
            onChangeText={(e) => setDataSignUpUser({...dataSignUpUser, password: e})}
          />
          {invalidEmail && (
            <Text style={styles.textError}>Email inválido.</Text>
          )}
          {invalidPassword && (
            <Text style={styles.textError}>A senha deve ter pelo menos 8 caracteres.</Text>
          )}
          {invalidInputs && (
            <Text style={styles.textError}>Preencha todos os campos.</Text>
          )}
        </View>
        <ButtonComponent 
          title="Cadastrar" 
          bgColor={themes.colors.primray} 
          onPress={handleRegister}
          isDisabled={registeringUser}
          width={moderateScale(width > 375 ? 280 : 240)}
          textIsDisabled='Cadastrando...'
        />
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
    marginTop: 32,
  },
  containerTextField:{
    display: 'flex',
    width: 300,
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: 32,
    height: 230
  },
  textContainerBtn:{
    textAlign: 'center',
    margin: 16,
    fontSize: 16
  },
  textError:{
    alignSelf: 'flex-start',
    color: 'red',
    marginLeft: 12,
    marginTop: -8
  }
})

const styleText = ScaledSheet.create({
  title:{
    fontFamily: 'Poppins_700Bold',
    fontSize: moderateScale(width > 375 ? 42 : 32),
    textAlign: 'center'
  },
  subTitle:{
    fontFamily: 'Poppins_400Regular',
    fontSize: moderateScale(width > 375 ? 20 : 14),
    textAlign: 'center',
    marginTop: -6
  }
})