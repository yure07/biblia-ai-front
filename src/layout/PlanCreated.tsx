import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView, Image } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import { themes } from "../global/themes"
import { useNavigation } from "@react-navigation/native";
import type { NavigatorRoutesProps } from "../routes/routes";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { useState } from "react";
import { usePlanDetails } from "../contexts/PlanDetailContext";
import Loading from "../components/Loading";

const { width } = Dimensions.get("window")

type PlanDay = {
  explanation: string;
  gratitude: string;
  refletion: string[];
  title: string;
  verse: string;
};

type PlanDetails = {
  days: Record<string, PlanDay>;
  title: string;
}

export const PlanCreatedLayout = () => {
  const { planDetails, loading } = usePlanDetails()
  const [showContent, setShowContent] = useState<number>(-1)
  const navigation = useNavigation<NavigatorRoutesProps>()

  if(loading || !planDetails) return <Loading/>
  
  return(
    <View>
      <TouchableOpacity  
        onPress={() => navigation.navigate('dashboard')}
        style={styles.iconBack}
      >
        <Ionicons 
          name="chevron-back" 
          size={24} 
          color="black"
        />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styleScaled.titlePlanCreated} numberOfLines={1}>{planDetails.title}</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.containerPlans} 
        showsVerticalScrollIndicator={false}
      >
        {Object.entries(planDetails.days as Record<string, PlanDay>).map(([keyPlan, plan]) => (
          <TouchableOpacity 
            key={keyPlan}
            style={[styles.plan, showContent !== Number(keyPlan) && { borderBottomWidth: 1 }]} 
            onPress={() => setShowContent((prev) => prev === -1 ? Number(keyPlan) : -1)}
          >

            <View style={styles.headerPlan}>
              <Text style={styleScaled.dayPlan}>
                {Number(keyPlan) < 10 ? (
                  `Dia 0${keyPlan}`
                ) : (
                  `Dia ${keyPlan}`
                )}
              </Text>
              {showContent === Number(keyPlan) ? (
                <Entypo 
                  name="chevron-down" 
                  size={24} 
                  color="black"
                  style={styles.iconTogglePlan}
                />
              ) : (
                <Entypo 
                  name="chevron-right" 
                  size={24} 
                  color="black"
                  style={styles.iconTogglePlan}
                />
              )}
            </View>

            {showContent === Number(keyPlan) && (
              <View style={styles.containerContentPlan}>
              <View style={styles.layoutContent2}>
                <View style={styles.layoutContent1}>
                  <Image 
                    source={require('../assets/calendario-icon.png')} 
                    style={styleScaled.iconContent}
                    alt="calendar-icon"
                  />
                  <Text style={styleScaled.text}>
                  {Number(keyPlan) < 10 ? (
                    `Dia 0${keyPlan}`
                  ) : (
                    `Dia ${keyPlan}`
                  )}
                  </Text>
                </View>
                <Text style={styleScaled.subtext}>{plan.title}</Text>
              </View>
              <View style={styles.layoutContent2}>
                <View style={styles.layoutContent1}>
                  <Image 
                    source={require('../assets/poesia-icon.png')} 
                    style={styleScaled.iconContent}
                    alt="poesia-icon"
                  />
                  <Text style={styleScaled.text}>Versículo do dia:</Text>
                </View>
                <Text style={styleScaled.subtext}>{plan.verse}</Text>
              </View>
              <View style={styles.layoutContent2}>
                <View style={styles.layoutContent1}>
                  <Image 
                    source={require('../assets/notas-icon.png')} 
                    style={styleScaled.iconContent}
                    alt="notas-icon"
                  />
                  <Text style={styleScaled.text}>Explicação:</Text>
                </View>
                <Text style={styleScaled.subtext}>{plan.explanation}</Text>
              </View>
              <View style={styles.layoutContent2}>
                <View style={styles.layoutContent1}>
                  <Image 
                    source={require('../assets/lampada-icon.png')} 
                    style={styleScaled.iconContent}
                    alt="lampada-icon"
                  />
                  <Text style={styleScaled.text}>Reflexão:</Text>
                </View>
                <View style={styles.containerRefletion}>
                  {plan.refletion.map(refletion => (
                    <Text key={refletion} style={styleScaled.subtext}>{refletion}</Text>
                  ))}
                </View>
              </View>
              <View style={styles.layoutContent2}>
                <View style={styles.layoutContent1}>
                  <Image 
                    source={require('../assets/rezar-icon-2.png')} 
                    style={styleScaled.iconContent}
                    alt="rezar-icon"
                  />
                  <Text style={styleScaled.text}>Gratidão do dia:</Text>
                </View>
                <Text style={styleScaled.subtext}>{plan.gratitude}</Text>
              </View>
            </View>
            )}

          </TouchableOpacity>
        ))}

      </ScrollView>
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
    justifyContent: 'center',
    width: '100%',
    height: 90,
    paddingTop: 28,
    paddingHorizontal: 24,
    borderBottomWidth: 1
  },
  iconBack:{
    position: 'absolute',
    marginLeft: 24,
    zIndex: 2,
    marginTop: 48
  },
  containerPlans:{
    display: 'flex',
    width: '100%',
    paddingBottom: 100,
    overflow: 'scroll'
  },
  plan: {
    display: 'flex',
    paddingVertical: 24,
    paddingHorizontal: 32
  },
  headerPlan:{
    display: 'flex',
    flexDirection: 'row'
  },
  iconTogglePlan:{
    marginLeft: 'auto'
  },
  containerContentPlan:{
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 12,
    marginTop: 24,
    gap: 24
  },
  layoutContent1:{
    display: 'flex',
    flexDirection: 'row'
  },
  layoutContent2:{
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  containerRefletion:{
    gap: 6
  }
})

const styleScaled = ScaledSheet.create({
  titlePlanCreated:{
    fontFamily: 'Roboto_700Bold',
    fontSize: moderateScale(width > 375 ? 24 : 20),
    width: '70%',
    textAlign: 'center'
  },
  dayPlan:{
    fontFamily: 'Roboto_700Bold',
    fontSize: moderateScale(width > 375 ? 24 : 20)
  },
  text:{
    fontFamily: 'Roboto_700Bold',
    fontSize: moderateScale(width > 375 ? 18 : 16)
  },
  subtext:{
    fontFamily: 'Roboto_400Regular',
    fontSize: moderateScale(width > 375 ? 16 : 14),
    marginLeft: 32
  },
  iconContent:{
    width: moderateScale(width > 375 ? 16 : 14),
    height: moderateScale(width > 375 ? 16 : 14),
    marginRight: 12
  }
})