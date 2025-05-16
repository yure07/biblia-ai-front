import type React from "react";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RoutesProps } from "../routes/routes";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RoutesProps>>();

  useEffect(() => {
    if (!loading && !user) {
      navigation.navigate('initial')
    }
  }, [user, loading, navigation]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <>{children}</>;
}
