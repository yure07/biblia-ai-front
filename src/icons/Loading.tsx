import React, { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

type LoadingIconProps = {
  size: number
}

export const LoadingIcon = ({ size }: LoadingIconProps) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true, // Usa a camada nativa para melhor performance
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Animated.View style={{ transform: [{ rotate: spin }], position: "absolute" }}>
        <AntDesign name="loading1" size={size} color="black" />
      </Animated.View>
    </View>
  );
};
