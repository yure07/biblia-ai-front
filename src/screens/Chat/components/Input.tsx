import { StyleSheet, TextInput } from "react-native";
import { themes } from "../../../global/themes";

type InputChatProps = {
  value: string
  onChangeText?: (text: string) => void
  isDisabled: boolean
  isStudyPlan: boolean
}

export const ChatInput = ({ value, onChangeText, isDisabled, isStudyPlan }: InputChatProps) => {
  return(
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={isStudyPlan ? "Digite aqui" : "Pergunte alguma coisa"}
      style={styles.textInput}
      placeholderTextColor={themes.colors.placeholder}
      editable={!isDisabled}
      selectTextOnFocus={!isDisabled}
    />
  )
}

const styles = StyleSheet.create({
  textInput:{
    color: "black",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 25,
    width: '70%',
    height: 50,
    padding: 16,
    fontFamily: 'Roboto_400Regular',
    fontSize: 14
  }
})