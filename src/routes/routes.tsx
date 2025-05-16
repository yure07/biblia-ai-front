import {
  type NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import React from "react";

import { Chat } from "../screens/Chat/NewChat";
import { ChatCreated } from "../screens/Chat/ChatCreated";
import { Dashboard } from "../screens/Dashboard";
import { Initial } from "../screens/Initial";
import { Login } from "../screens/Login";
import { SignUp } from "../screens/SignUp";
import { VerifyEmail } from "../screens/VerifyEmail";
import { ChatNewPlan } from "../screens/Plans/ChatNewPlan";
import { NewPlan } from "../screens/Plans/NewPlan";
import { PlanCreated } from "../screens/Plans/PlanCreated";
import { PlanApp } from "../screens/PlanApp";
import { PaymentSuccess } from "../screens/PaymentSuccess";

import { AuthProvider } from "../contexts/AuthContext";
import { AppProvider } from "../contexts/AppContext";

export type RoutesProps = {
  signUp: undefined
  login: undefined
  initial: undefined
  verify_email: undefined
  dashboard: undefined
  newChat: undefined
  chatCreated: { chatId: string; }
  newPlan: undefined
  chatPlanCustom: undefined
  planCreated: { planId: string }
  planApp: undefined
  paymentSuccess: undefined
};

export type NavigatorRoutesProps = NativeStackNavigationProp<RoutesProps>;

const { Navigator, Screen } = createNativeStackNavigator<RoutesProps>();

export function Routes() {
  return (
    <AuthProvider>
      <AppProvider>
        <Navigator screenOptions={{ headerShown: false }}>
          <Screen name="initial" component={Initial} />
          <Screen name="signUp" component={SignUp} />
          <Screen name="login" component={Login} />
          <Screen name="verify_email" component={VerifyEmail} />
          <Screen name="newChat" component={Chat}/>
          <Screen name="dashboard" component={Dashboard} />
          <Screen name="newPlan" component={NewPlan}/>
          <Screen name="chatPlanCustom" component={ChatNewPlan}/>
          <Screen name="chatCreated" component={ChatCreated}/>
          <Screen name="planCreated" component={PlanCreated}/>
          <Screen name="planApp" component={PlanApp}/>
          <Screen name="paymentSuccess" component={PaymentSuccess}/>
        </Navigator>
      </AppProvider>
    </AuthProvider>
  );
}