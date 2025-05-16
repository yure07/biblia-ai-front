import Ionicons from '@expo/vector-icons/Ionicons';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScaledSheet, moderateScale } from "react-native-size-matters";
import { styleShadow } from "../../../global/shadow";
import { themes } from "../../../global/themes";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { NavigatorRoutesProps } from '../../../routes/routes';
import { useUserPlans } from '../../../contexts/UserPlansContext';
import Loading from '../../../components/Loading';

const { width } = Dimensions.get("window")

export const Plans = () => {
  const navigation = useNavigation<NavigatorRoutesProps>()
  const { plansUser, loading } = useUserPlans()

  const handleOpenPlan = (planId: string) => {
    console.log(planId)
    navigation.navigate('planCreated', { planId });
  }

  const images = {
    "evangelhos7dias": require('../../../assets/evangelhos7dias.png'),
    "versiculos-fe": require('../../../assets/versiculos-fe.png'),
    "como-vencer-ansiedade": require('../../../assets/como-vencer-ansiedade.png'),
  } as const

  if(!plansUser || loading) return <Loading/>

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styleScaled.text}>Planos: {Object.keys(plansUser).length}</Text>
        <TouchableOpacity style={styleScaled.btn} onPress={() => navigation.navigate('newPlan')}>
          <Ionicons 
            name="add-outline" 
            size={moderateScale(width > 375 ? 17 : 14)} 
            color="white" 
          />
          <Text style={styleScaled.textBtn}>Criar plano</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.containerPlans} showsVerticalScrollIndicator={false}>
        {Object.keys(plansUser).length === 0 ? (
          <Text style={styleScaled.textNoPlans}>Voce não possui planos de estudos ainda.</Text>
        ) : (
          Object.entries(plansUser).map(([keyPlan, plan]) => (
            <TouchableOpacity 
              key={keyPlan}
              style={[styles.plan, styleShadow.shadow]} 
              onPress={() => handleOpenPlan(keyPlan)}
            >
              <Image source={images[keyPlan as keyof typeof images] || require('../../../assets/logo-branca.png')} style={styleScaled.planIcon}/>
              <View style={styles.planContentContainer}>
                <Text style={styleScaled.titlePlan} numberOfLines={1}>{plan.title}</Text>
                <Text style={styleScaled.textProgressPlan}>
                  {plan.currentDay === plan.totalDays ? (
                    'Concluído'
                  ) : (
                    `Dia: ${plan.currentDay} de ${plan.totalDays}`
                  )}
                </Text>
              </View>
              <MaterialIcons 
                name="navigate-next" 
                size={moderateScale(width > 375 ? 35 : 30)} 
                color="black" 
                style={styles.nextPageIcon}
              />
            </TouchableOpacity>
          ))
        )}
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
  containerPlans:{
    display: 'flex',
    width: '100%',
    paddingBottom: 24,
    marginTop: 24,
    gap: 24,
    overflow: 'scroll'
  },
  plan:{
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 96,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  planContentContainer:{
    width: '70%',
    paddingLeft: 16,
    justifyContent: 'center',
    gap: 22
  },
  nextPageIcon:{
    alignSelf: 'center',
    marginLeft: 'auto'
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
    width: moderateScale(width > 375 ? 110 : 100),
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
  titlePlan:{
    width: '100%',
    fontFamily: 'Roboto_500Medium',
    fontSize: moderateScale(width > 375 ? 15 : 12)
  },
  textProgressPlan:{
    fontFamily: 'Roboto_400Regular',
    fontSize: moderateScale(width > 375 ? 15 : 12)
  },
  planIcon:{
    width: moderateScale(width > 375 ? 55 : 45),
    height: moderateScale(width > 375 ? 55 : 45)
  },
  textNoPlans: {
    fontSize: moderateScale(width > 375 ? 18 : 15),
    textAlign: 'center',
    marginTop: 16
  }
})