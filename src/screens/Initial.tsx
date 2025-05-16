import { Poppins_400Regular, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins'
import { useNavigation } from '@react-navigation/native'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'
import { ButtonComponent } from '../components/Button'
import Loading from '../components/Loading'
import { themes } from '../global/themes'
import type { NavigatorRoutesProps } from '../routes/routes'

const { width } = Dimensions.get("window")

export function Initial() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold
  })
  const navigation = useNavigation<NavigatorRoutesProps>();

  if(!fontsLoaded){
    return <Loading/>
  }

  return(
    <View style={styles.container}>
      <Image source={require('../assets/wave-widget.png')} style={styles.waveWidget}/>
      <View style={styles.containerTexts}>
        <Text style={styleText.title}>Biblia.AI</Text>
        <Text style={styleText.subtitle}>Seu assistente inteligente para o estudo das Escrituras.</Text>
      </View>
      <View style={styles.containerBtn}>
        <ButtonComponent 
          title='Entrar' 
          bgColor={themes.colors.primray} 
          width={moderateScale(width > 375 ? 280 : 240)}
          onPress={() => navigation.navigate("login")}
        />
        <ButtonComponent 
          title='Criar conta' 
          bgColor='transparent' 
          bordColor='black'
          width={moderateScale(width > 375 ? 280 : 240)}
          onPress={() => navigation.navigate("signUp")}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colors.background
  },
  waveWidget:{
    width: 400,
    height: 300
  },
  containerTexts:{
    alignItems: "center",
    alignSelf: "center",
  },
  containerBtn:{
    marginTop: "auto",
    gap: 20,
    marginBottom: 80,
    alignSelf: "center",
  }
})

const styleText = ScaledSheet.create({
  title:{
    fontFamily: "Poppins_700Bold",
    fontSize: moderateScale(width > 375 ? 64 : 48)
  },
  subtitle:{
    width: 290,
    fontFamily: "Poppins_400Regular",
    fontSize: moderateScale(width > 375 ? 22 : 14),
    textAlign: "center"
  }
})