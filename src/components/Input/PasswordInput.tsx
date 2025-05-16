import { useState } from "react";
import { View, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto'
import { themes } from "../../global/themes";
import { styles } from "./style";
import Loading from "../Loading";
import Ionicons from '@expo/vector-icons/Ionicons';

type InputPasswordProps = {
  value: string
  onChangeText: (text: string) => void
};

export const InputPassword = ({
  value,
  onChangeText,
}: InputPasswordProps) => {
  const [nameEmoticon, setNameEmoticon] = useState<'eye' | 'eye-off'>('eye-off')
  const [secureText, setSecureText] = useState<boolean>(true)
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
  })
  
  if(!fontsLoaded){
    return <Loading/>
  }

  const handleChange = () => {
    setNameEmoticon(prev => (prev === 'eye-off' ? 'eye' : 'eye-off'))
    setSecureText(prev => !prev)
  }
  
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Digite sua senha"
        secureTextEntry={secureText}
        style={styles.textInput}
        placeholderTextColor={themes.colors.placeholder}
      />
      <Ionicons 
        name={nameEmoticon as 'eye' | 'eye-off'} 
        size={20} 
        color={themes.colors.placeholder} 
        style={styles.emoticon}
        onPress={handleChange}
      />
      <StatusBar style="auto" />
    </View>
  );
}