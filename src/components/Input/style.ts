import { Dimensions, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const { width } = Dimensions.get("window")

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textInput: {
    color: "black",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 25,
    height: 55,
    width: moderateScale(width > 375 ? 280 : 240),
    padding: 16,
    fontFamily: 'Roboto_400Regular',
    fontSize: 14
  },
  emoticon: {
    marginTop: -38,
    marginLeft: 'auto',
    marginRight: 18
  }
});