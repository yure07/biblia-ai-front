import { StatusBar } from "expo-status-bar";
import { View, TextInput } from "react-native";
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto'
import { styles } from "./style";
import Loading from "../Loading";
import { themes } from "../../global/themes";

type InputNameProps = {
  value: string
  onChangeText: (text: string) => void
};

export const InputName = ({ value, onChangeText }: InputNameProps) => {
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
        placeholder="Digite seu primeiro nome"
        style={styles.textInput}
        placeholderTextColor={themes.colors.placeholder}
      />
      <StatusBar style="auto" />
    </View>
  );
}