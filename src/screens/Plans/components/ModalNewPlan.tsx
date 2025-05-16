import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Modal } from "react-native"
import { moderateScale, ScaledSheet } from "react-native-size-matters"
import { themes } from "../../../global/themes"

const { width, height } = Dimensions.get('window')

type ModalNewPlanProps = {
  name: string
  setNamePlan: React.Dispatch<React.SetStateAction<{
    name: string,
    id?: 'evangelhos7dias' | 'versiculos-fe' | 'como-vencer-ansiedade'
  }>>
  isPlanAlreadyAdded: boolean
  fnAddPlan: () => void
  loadingAdd: boolean
}

export const ModalNewPlan = ({ name, setNamePlan, isPlanAlreadyAdded, fnAddPlan, loadingAdd }: ModalNewPlanProps) => {
  return(
    <Modal visible={name !== ''} animationType="fade" transparent>
      <View style={styles.containerOverlay}>
        <View style={styles.containerContent}>
          {isPlanAlreadyAdded ? (
            <View style={styles.containerPlanAlreadyAdded}>
              <Text style={styleScaled.textPlanAlreadyAdded}>Você já possui esse plano.</Text>
              <TouchableOpacity style={styleScaled.btnAdd} onPress={() => setNamePlan({ name: '' })}>
                <Text style={styleScaled.textBtn}>Ok</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={styleScaled.namePlan} numberOfLines={1}>{name}</Text>
              <Text style={styleScaled.wantAddPlan}>Deseja adicionar esse plano aos seus estudos?</Text>
              <Text style={styles.textCenter}>A cada dia será liberado um conteúdo</Text>
              <View style={styles.containerBtn}>
                <TouchableOpacity  
                  style={[styleScaled.btnAdd, { opacity: loadingAdd ? 0.4 : 1 }]} 
                  onPress={fnAddPlan} 
                  disabled={loadingAdd}
                >
                  <Text style={styleScaled.textBtn}>{loadingAdd ? 'Adicionando..' : 'Adicionar'}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styleScaled.btnCancel, { opacity: loadingAdd ? 0.4 : 1 }]} 
                  onPress={() => setNamePlan({ name: '' })} 
                  disabled={loadingAdd}
                >
                  <Text style={styleScaled.textBtn}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  containerOverlay:{
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2,
    position: 'absolute'
  },
  containerContent:{
    alignItems: 'center',
    width: '80%',
    height: 'auto',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 24
  },
  containerBtn:{
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    marginTop: 'auto'
  },
  textCenter:{
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontStyle: 'italic',
    marginVertical: 16
  },
  containerPlanAlreadyAdded: {
    alignItems: 'center',
    gap: 18
  },
})

const styleScaled = ScaledSheet.create({
  namePlan:{
    fontSize: moderateScale(width > 375 ? 20 : 16),
    fontFamily: 'Poppins_700Bold'
  },
  wantAddPlan:{
    fontSize: moderateScale(width > 375 ? 20 : 16),
    textAlign: 'center',
    marginTop: 8
  },
  btnAdd:{
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(width > 375 ? 100 : 80),
    height: moderateScale(width > 375 ? 30 : 25),
    borderRadius: 12,
    backgroundColor: themes.colors.success
  },
  textBtn:{
    color: 'white',
    fontSize: moderateScale(width > 375 ? 16 : 14)
  },
  btnCancel:{
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(width > 375 ? 100 : 80),
    height: moderateScale(width > 375 ? 30 : 25),
    borderRadius: 12,
    backgroundColor: themes.colors.danger
  },
  textPlanAlreadyAdded: {
    fontSize: moderateScale(width > 375 ? 20 : 16)
  }
})