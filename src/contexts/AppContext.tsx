import { StripeProvider } from "@stripe/stripe-react-native";
import Loading from "../components/Loading";
import { useAuth } from "./AuthContext";
import { ChatProvider } from "./ChatContext";
import { VerseProvider } from "./DailyVerseContext";
import { UserPlansProvider } from "./UserPlansContext";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useAuth()
  
  if(loading) return <Loading/>

  return (
    <StripeProvider publishableKey={'pk_test_51QVbseIHzf0xjKj5C1bRfxa6B5usTWDwW718yzjqEDGShfggPIEvM98AIaSHQPvcxIxr661xxJMGE7GlEHIrGjOx00AOeUeFGg'}>
      <UserPlansProvider>
        <VerseProvider>
          <ChatProvider>
            {children}
          </ChatProvider>
        </VerseProvider>
      </UserPlansProvider>
    </StripeProvider>
  );
}