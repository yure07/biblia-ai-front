import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { Initial } from "../screens/Initial";
import { Login } from "../screens/Login";
import { SignUp } from "../screens/SignUp";
import { VerifyEmail } from "../screens/VerifyEmail";

type AuthRoutes = {
  initial: undefined;
  login: undefined;
  signUp: undefined;
  verify_email: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="login" component={Login} />
      <Screen name="signUp" component={SignUp} />
      <Screen name="initial" component={Initial} />
      <Screen name="verify_email" component={VerifyEmail} />
    </Navigator>
  );
}