import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScaledSheet, moderateScale } from "react-native-size-matters";
import { useAuth } from "../../contexts/AuthContext";
import { useUserPlans } from "../../contexts/UserPlansContext";
import { styleShadow } from "../../global/shadow";
import { themes } from "../../global/themes";
import type { NavigatorRoutesProps } from "../../routes/routes";
import { addPlan } from "../../utils/addPlan";
import { ModalNewPlan } from "./components/ModalNewPlan";

const { width } = Dimensions.get("window")

type nameAndIdPlanProps = {
  name: string
  id?: 'evangelhos7dias' | 'versiculos-fe' | 'como-vencer-ansiedade'
}

export const NewPlan = () => {
  const [nameAndIdPlan, setNameAndIdPlan] = useState<nameAndIdPlanProps>({
    name: '',
  })
  const navigation = useNavigation<NavigatorRoutesProps>()
  const [plansIds, setPlansIds] = useState<string[]>([]);
  const [planAlreadyAdded, setPlanAlreadyAdded] = useState<boolean>(false)
  const [loadingAddPlan, setLoadingAddPlan] = useState<boolean>(false)
  const { plansUser, fetchPlans } = useUserPlans()
  const { user } = useAuth()

  useEffect(() => {
    const ids = Object.keys(plansUser)
    setPlansIds(ids);
  }, [plansUser]);

  const checksToAddPlan = async (planId: 'evangelhos7dias' | 'versiculos-fe' | 'como-vencer-ansiedade') => {
    const planNames = {
      "evangelhos7dias": "Evangelhos em 7 dias",
      "versiculos-fe": "Versículos sobre fé",
      "como-vencer-ansiedade": "Como vencer a ansiedade",
    } as const
  
    const name = planNames[planId as keyof typeof planNames]
    setNameAndIdPlan({
      name,
      id: planId
    })

    if(plansIds.includes(planId)) {
      setPlanAlreadyAdded(true)
      return
    }
    setPlanAlreadyAdded(false)
  }

  const addNewPlan = async () => {
    if(user?.uid && nameAndIdPlan.id){
      setLoadingAddPlan(true)
      await addPlan({ 
        userId: user.uid,
        planId: nameAndIdPlan.id
       })
      setLoadingAddPlan(false)
      setNameAndIdPlan({
        name: '',
        id: undefined
      })
      fetchPlans()
      navigation.navigate('dashboard')
    }
  }
  
  return(
    <View style={styles.container}>

      <ModalNewPlan 
        name={nameAndIdPlan.name}
        setNamePlan={setNameAndIdPlan}
        isPlanAlreadyAdded={planAlreadyAdded}
        fnAddPlan={addNewPlan}
        loadingAdd={loadingAddPlan}
      />

      <View style={styles.header}>
          <View style={styles.contentHeader}>
            <TouchableOpacity onPress={() => navigation.navigate('dashboard')}>
              <Ionicons 
                name="chevron-back" 
                size={24} 
                color="black"
              />
            </TouchableOpacity>
            <Text style={styleScaled.titleNewPlan}>Escolha seu plano</Text>
          </View>
      </View>

      <View style={styles.containerPlans}>
        <TouchableOpacity 
          style={[styles.plan, styleShadow.shadow]} 
          onPress={() => checksToAddPlan('evangelhos7dias')}
        >
          <Image 
            source={require('../../assets/book-icon.png')} 
            alt="book-icon"
            style={styleScaled.planIcon}
          />
          <Text style={styleScaled.textPlan}>Evangelhos em 7 dias</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.plan, styleShadow.shadow]}
          onPress={() => checksToAddPlan('versiculos-fe')}
        >
          <Image 
            source={require('../../assets/rezar-icon.png')} 
            alt="book-icon"
            style={styleScaled.planIcon}
          />
          <Text style={styleScaled.textPlan}>Versículos sobre fé</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.plan, styleShadow.shadow]}
          onPress={() => checksToAddPlan('como-vencer-ansiedade')}
        >
          <Image 
            source={require('../../assets/happy-icon.png')} 
            alt="book-icon"
            style={styleScaled.planIcon}
          />
          <Text style={styleScaled.textPlan}>Como vencer a ansiedade</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.plan, styleShadow.shadow]}
          onPress={() => navigation.navigate('chatPlanCustom')}
        >
          <Image 
            source={require('../../assets/logo-branca.png')} 
            alt="book-icon"
            style={styleScaled.planIcon}
          />
          <Text style={styleScaled.textPlan}>Criar plano personalizado</Text>
        </TouchableOpacity>
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
    width: '100%',
    paddingTop: 56,
    paddingHorizontal: 24
  },
  contentHeader:{
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    gap: '22%'
  },
  containerPlans:{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 56,
    paddingHorizontal: 24,
    gap: 24
  },
  plan:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: moderateScale(width > 375 ? 140 : 121),
    height: moderateScale(width > 375 ? 140 : 121),
    paddingVertical: 12,
    gap: 12,
    backgroundColor: 'white',
    borderRadius: 12
  }
})

const styleScaled = ScaledSheet.create({
  titleNewPlan:{
    fontFamily: 'Roboto_700Bold',
    fontSize: moderateScale(width > 375 ? 24 : 20)
  },
  planIcon:{
    width: moderateScale(width > 375 ? 70 : 66),
    height: moderateScale(width > 375 ? 70 : 66)
  },
  textPlan: {
    width: '60%',
    textAlign: 'center',
    fontFamily: 'Roboto_400Regular',
    fontSize: moderateScale(width > 375 ? 16 : 12)
  }
})