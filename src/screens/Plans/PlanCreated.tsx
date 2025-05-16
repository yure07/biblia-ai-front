import { useRoute } from "@react-navigation/native";
import { PlanCreatedLayout } from "../../layout/PlanCreated"
import { PlanDetailsProvider } from "../../contexts/PlanDetailContext";
import { useUserPlans } from "../../contexts/UserPlansContext";

export const PlanCreated = () => {
  const route = useRoute();
  const { planId } = route.params as { planId: string }
  const { plansUser } = useUserPlans()
  const currentDay = plansUser[planId]?.currentDay || 1

  return(
    <PlanDetailsProvider planId={planId} currentDay={currentDay}>
      <PlanCreatedLayout/>
    </PlanDetailsProvider>
  )
}