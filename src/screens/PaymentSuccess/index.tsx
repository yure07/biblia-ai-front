import { StyleSheet, View, Image, Text, Dimensions, Touchable, TouchableOpacity } from "react-native"
import { moderateScale, ScaledSheet } from "react-native-size-matters"
import { styleShadow } from "../../global/shadow"
import { navigate } from "../../utils/navigationService"

const { width } = Dimensions.get("window")

export function PaymentSuccess () {
  return(
    <View style={styles.container}>
      <Text style={styleScaled.paymentSuccess}>Pagamento aprovado!</Text>
      <Image style={styles.img} source={require('../../assets/waving-hand.png')}/>
      <Text style={styleScaled.welcomeMessage}>Seja bem-vindo(a) ao Biblia.AI</Text>
      <Text style={styleScaled.welcomeMessage}>Aqui cada leitura transforma seu dia a dia!</Text>
      <TouchableOpacity style={[ styles.btnStart, styleShadow.shadow ]} onPress={() => navigate('dashboard')}>
        <Text style={styleScaled.textBtn}>Iniciar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: '80%',
    height: '40%'
  },
  btnStart:{
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    marginTop: 24,
    borderRadius: 8,
    backgroundColor: '#fff'
  }
})

const styleScaled = ScaledSheet.create({
  paymentSuccess:{
    fontFamily: 'Poppins_700Bold',
    fontSize: moderateScale(width > 375 ? 28: 20)
  },
  welcomeMessage:{
    textAlign: 'center',
    fontSize: moderateScale(width > 375 ? 16: 14)
  },
  textBtn:{
    fontSize: moderateScale(width > 375 ? 16: 14)
  }
})