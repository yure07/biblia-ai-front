import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { Chat } from "../screens/Chat/NewChat";
import { ChatCreated } from "../screens/Chat/ChatCreated";
import { Dashboard } from "../screens/Dashboard";
import { ChatNewPlan } from "../screens/Plans/ChatNewPlan";
import { NewPlan } from "../screens/Plans/NewPlan";
import { PlanCreated } from "../screens/Plans/PlanCreated";
import { PlanApp } from "../screens/PlanApp";

type AuthRoutes = {
  dashboard: undefined
  newChat: undefined
  chatCreated: { chatId: string; }
  newPlan: undefined
  chatPlanCustom: undefined
  planCreated: { planId: string }
  planApp: undefined
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="newChat" component={Chat}/>
      <Screen name="dashboard" component={Dashboard} />
      <Screen name="newPlan" component={NewPlan}/>
      <Screen name="chatPlanCustom" component={ChatNewPlan}/>
      <Screen name="chatCreated" component={ChatCreated}/>
      <Screen name="planCreated" component={PlanCreated}/>
      <Screen name="planApp" component={PlanApp}/>
    </Navigator>
  );
}