import { StyleSheet } from "react-native";

export const styleShadow = StyleSheet.create({
  shadow:{
    shadowColor: 'rgba(0, 0, 0, 0.25)', // Cor com 25% de opacidade
    shadowOffset: { width: 0, height: 8 }, // X: 0, Y: 4
    shadowOpacity: 0.75, // Opacidade
    shadowRadius: 4, // Equivalente ao blur

    // Sombras no Android
    elevation: 4, // Equivalente ao shadowOffset + shadowRadius
  }
})