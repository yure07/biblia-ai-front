import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  type ImageSourcePropType,
} from "react-native";
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto'
import Loading from "./Loading";
import { LoadingIcon } from "../icons/Loading";

type ButtonComponentProps = {
  title: string
  bgColor: string
  bordColor?: string
  srcImg?: ImageSourcePropType
  isDisabled?: boolean
  textIsDisabled?: string
  width: number
  onPress: () => void
}

export const ButtonComponent = ({
  title, 
  bgColor, 
  bordColor, 
  srcImg, 
  isDisabled, 
  textIsDisabled, 
  width,
  ...rest
}: ButtonComponentProps) => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
  })
  
  if(!fontsLoaded){
    return <Loading/>
  }

  return(
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.btn, {backgroundColor: bgColor}, {borderColor: bordColor || 'transparent'}, {opacity: isDisabled ? 0.4 : 1}, {width: width}]} 
        {...rest}
        disabled={isDisabled}
      >
        {srcImg && (
          <Image source={srcImg} style={styles.img}/>
        )}
        {isDisabled && textIsDisabled ? (
          <View style={styles.contentDisabled}>
            <LoadingIcon size={18}/>
            <Text style={styles.textBtn}>
              {textIsDisabled}
            </Text>
          </View>
        ) : (
          <Text style={styles.textBtn}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    color: "white",
    alignItems: "center",
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 25,
    height: 50,
    padding: 15,
    shadowColor: 'rgba(0, 0, 0, 0.25)', // Cor com 25% de opacidade
    shadowOffset: { width: 0, height: 8 }, // X: 0, Y: 4
    shadowOpacity: 0.75, // Opacidade
    shadowRadius: 4, // Equivalente ao blur

    // Sombras no Android
    elevation: 4, // Equivalente ao shadowOffset + shadowRadius
  },
  textBtn: {
    color: "black",
    fontSize: 16,
    fontFamily: "Roboto_400Regular"
  },
  img:{
    width: 20,
    height: 20
  },
  contentDisabled:{
    display: 'flex',
    flexDirection: 'row',
    gap: 18
  }
})