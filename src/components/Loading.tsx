import { View, ActivityIndicator, StyleSheet } from "react-native";
import { themes } from "../global/themes";

export default function Loading() {
  return (
    <ActivityIndicator
      color={themes.colors.primray}
      size={60}
      style={styles.container}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'themes.colors.background',
  },
});