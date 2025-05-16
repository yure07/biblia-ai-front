import { StatusBar } from "expo-status-bar";
import { View, TextInput } from "react-native";
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto'
import { styles } from "./style";
import Loading from "../Loading";
import { themes } from "../../global/themes";

type InputEmailProps = {
  value: string
  onChangeText: (text: string) => void
};

export const InputEmail = ({ value, onChangeText }: InputEmailProps) => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
  })
  
  if(!fontsLoaded){
    return <Loading/>
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Digite seu email"
        keyboardType="email-address"
        style={styles.textInput}
        placeholderTextColor={themes.colors.placeholder}
      />
      <StatusBar style="auto" />
    </View>
  );
}