import React, { useState } from "react"
import { ScrollView, View, TouchableOpacity, StyleSheet, Text, Dimensions, Image } from "react-native"
import { styleShadow } from "../../../global/shadow"
import Feather from '@expo/vector-icons/Feather';
import { moderateScale, ScaledSheet } from "react-native-size-matters";

const { width } = Dimensions.get("window")

type ListPlanProps = {
  openPaymentSheet: (plan: 'standard' | 'premium') => void
}

export const ListPlans = ({ openPaymentSheet }: ListPlanProps) => {
  const [openingPaymentSheet, setOpeningPaymentSheet] = useState<boolean>(false)

  const selectPlan = async (plan: 'standard' | 'premium') => {
    setOpeningPaymentSheet(true)
    await openPaymentSheet(plan)
    setOpeningPaymentSheet(false)
  }

  return(
    <ScrollView contentContainerStyle={styles.containerPlans}>
      <View style={styles.plan}>
        <View style={[ styles.headerPlan, styleShadow.shadow ]}>
          <View>
            <Text style={styleScaled.titlePlan}>Plano Gratuito</Text>
            <Text style={styleScaled.pricePlan}>R$0,00/mês</Text>
          </View>
          <Feather name="gift" size={24} color="white" />
        </View>
        <View style={styles.containerPrice}>
          <Text style={styleScaled.textWahReceive}>O que você tem direito:</Text>
          <View style={styles.benefitsPlan}>
            <Image
              source={require('../../../assets/check.png')}
              style={styleScaled.imageCheck}
            />
            <Text style={styleScaled.textBenefitsPlan}> 
              5 Conversas com assistente
            </Text>
          </View>
          <View style={styles.benefitsPlan}>
            <Image
              source={require('../../../assets/check.png')}
              style={styleScaled.imageCheck}
            />
            <Text style={styleScaled.textBenefitsPlan}> 
              Acesso a planos de estudos definidos
            </Text>
          </View>
          <View style={styles.benefitsPlan}>
            <Image
              source={require('../../../assets/check.png')}
              style={styleScaled.imageCheck}
            />
            <Text style={styleScaled.textBenefitsPlan}> 
              Notificação de versículos diários
            </Text>
          </View>
          <TouchableOpacity style={styles.btnSelect}>
            <Text style={styleScaled.textBtnSelect}>Selecionar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.plan}>
        <View style={styles.morePopular}>
          <Text style={styleScaled.textMorePopular}>Mais popular</Text>
        </View>
        <View style={[ styles.headerPlan, styleShadow.shadow, { borderWidth: 2, borderColor: 'white' } ]}>
          <View>
            <Text style={styleScaled.titlePlan}>Plano Padrão</Text>
            <Text style={styleScaled.pricePlan}>R$9,90/mês</Text>
          </View>
          <Feather name="check-square" size={24} color="white" />
        </View>
        <View style={styles.containerPrice}>
          <Text style={styleScaled.textWahReceive}>O que você tem direito:</Text>
          <View style={styles.benefitsPlan}>
            <Image
              source={require('../../../assets/check.png')}
              style={styleScaled.imageCheck}
            />
            <Text style={styleScaled.textBenefitsPlan}> 
              12 Conversas com assistente
            </Text>
          </View>
          <View style={styles.benefitsPlan}>
            <Image
              source={require('../../../assets/check.png')}
              style={styleScaled.imageCheck}
            />
            <Text style={styleScaled.textBenefitsPlan}> 
              3 Planos de Estudos personalizados
            </Text>
          </View>
          <View style={styles.benefitsPlan}>
            <Image
              source={require('../../../assets/check.png')}
              style={styleScaled.imageCheck}
            />
            <Text style={styleScaled.textBenefitsPlan}> 
              Acesso a planos de estudos definidos
            </Text>
          </View>
          <View style={styles.benefitsPlan}>
            <Image
              source={require('../../../assets/check.png')}
              style={styleScaled.imageCheck}
            />
            <Text style={styleScaled.textBenefitsPlan}> 
              Notificação de versículos diários
            </Text>
          </View>
          <TouchableOpacity disabled={openingPaymentSheet} style={[styles.btnSelect, { opacity: openingPaymentSheet ? .4 : 1 }]} onPress={() => selectPlan('standard')}>
            <Text style={styleScaled.textBtnSelect}>{openingPaymentSheet ? 'Selecionando...' : 'Selecionar'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.plan}>
        <View style={[ styles.headerPlan, styleShadow.shadow ]}>
          <View>
            <Text style={styleScaled.titlePlan}>Plano Premium</Text>
            <Text style={styleScaled.pricePlan}>R$19,90/mês</Text>
          </View>
          <Feather name="target" size={24} color="white" />
        </View>
        <View style={styles.containerPrice}>
          <Text style={styleScaled.textWahReceive}>O que você tem direito:</Text>
          <View style={styles.benefitsPlan}>
            <Image
              source={require('../../../assets/check.png')}
              style={styleScaled.imageCheck}
            />
            <Text style={styleScaled.textBenefitsPlan}> 
              30 Conversas com assistente
            </Text>
          </View>
          <View style={styles.benefitsPlan}>
            <Image
              source={require('../../../assets/check.png')}
              style={styleScaled.imageCheck}
            />
            <Text style={styleScaled.textBenefitsPlan}> 
              8 Planos de Estudos personalizados
            </Text>
          </View>
          <View style={styles.benefitsPlan}>
            <Image
              source={require('../../../assets/check.png')}
              style={styleScaled.imageCheck}
            />
            <Text style={styleScaled.textBenefitsPlan}> 
              Acesso a planos de estudos definidos
            </Text>
          </View>
          <View style={styles.benefitsPlan}>
            <Image
              source={require('../../../assets/check.png')}
              style={styleScaled.imageCheck}
            />
            <Text style={styleScaled.textBenefitsPlan}> 
              Notificação de versículos diários
            </Text>
          </View>
          <TouchableOpacity style={[styles.btnSelect, { opacity: openingPaymentSheet ? .4 : 1 }]} onPress={() => selectPlan('premium')}>
            <Text style={styleScaled.textBtnSelect}>{openingPaymentSheet ? 'Selecionando...' : 'Selecionar'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  containerPlans:{
    display: 'flex',
    flexDirection: 'column',
    marginTop: 24,
    paddingHorizontal: 40,
    paddingBottom: 56,
    gap: 24
  },
  plan:{
    display: 'flex',
    flexDirection: 'column',
  },
  headerPlan:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    paddingHorizontal: 24,
    paddingTop: 20,
    height: 130,
    borderRadius: 12
  },
  containerPrice:{
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: 'white',
    marginTop: -40,
    borderRadius: 12,
    zIndex: 10,
    borderWidth: .5,
    paddingBottom: 16,
    paddingTop: 24,
    paddingHorizontal: 12,
    gap: 16
  },
  benefitsPlan:{
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: 6
  },
  btnSelect: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 12,
    width: '60%',
    height: 40,
    marginTop: 12
  },
  morePopular:{
    backgroundColor: 'white',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'center',
    marginBottom: -12,
    zIndex: 10
  }
})

const styleScaled = ScaledSheet.create({
  titlePlan: {
    fontFamily: 'Roboto_400Regular',
    color: 'white',
    fontSize: moderateScale(width > 375 ? 16 : 14)
  },
  pricePlan: {
    fontFamily: 'Roboto_700Bold',
    color: 'white',
    fontSize: moderateScale(width > 375 ? 20 : 16),
    marginTop: 6
  },
  textWahReceive:{
    fontFamily: 'Roboto_700Bold',
    alignSelf: 'flex-start',
    fontSize: moderateScale(width > 375 ? 16 : 14)
  },
  textBenefitsPlan:{
    fontFamily: 'Roboto_400Regular',
    fontSize: moderateScale(width > 375 ? 16 : 14)
  },
  imageCheck:{
    width: moderateScale(width > 375 ? 16 : 14),
    height: moderateScale(width > 375 ? 16 : 14)
  },
  textBtnSelect:{
    color: 'white',
    fontSize: moderateScale(width > 375 ? 14 : 12)
  },
  textMorePopular:{
    fontFamily: 'Roboto_700Bold',
    alignSelf: 'flex-start',
    fontSize: moderateScale(width > 375 ? 16 : 14)
  }
})