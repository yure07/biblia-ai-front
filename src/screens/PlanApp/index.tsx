import { StyleSheet, View, Text, Dimensions, Alert } from "react-native"
import { moderateScale, ScaledSheet } from "react-native-size-matters"
import { ListPlans } from "./components/ListPlans"
import { initializePaymentSheet } from "../../utils/subscription"
import { auth } from "../../firebaseConnection"
import { presentPaymentSheet } from "@stripe/stripe-react-native"
import { navigate } from "../../utils/navigationService"

const { width } = Dimensions.get("window")

export function PlanApp () {
  const { currentUser } = auth

  const openPaymentSheet = async (plan: 'standard' | 'premium') => {
    await initializePaymentSheet({ plan, name: currentUser?.displayName, email: currentUser?.email })
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert('Seu pagamento foi reprovado!')
    } else {
      navigate('paymentSuccess')
    }
  }

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styleScaled.titlePage} numberOfLines={1}>Selecione seu plano</Text>
      </View>
      <ListPlans openPaymentSheet={openPaymentSheet}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1
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
  }
})

const styleScaled = ScaledSheet.create({
  titlePage:{
    fontFamily: 'Roboto_700Bold',
    fontSize: moderateScale(width > 375 ? 24 : 20),
    width: '70%',
    textAlign: 'center'
  }
})