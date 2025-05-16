import { initPaymentSheet } from "@stripe/stripe-react-native";

type initializePaymentSheetProps = {
  plan: 'standard' | 'premium'
  name?: string | null
  email?: string | null
}

const fetchPaymentSheetParams = async ({ plan, name, email }: initializePaymentSheetProps) => {
  const response = await fetch('http://192.168.0.104:8080/create-subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ plan, name, email })
  });
  
  const { clientSecret, ephemeralKey, customer } = await response.json();

  return {
    clientSecret,
    ephemeralKey,
    customer,
  };
};

const initializePaymentSheet = async ({ plan, name, email }: initializePaymentSheetProps) => {
  const {
    clientSecret,
    ephemeralKey,
    customer,
  } = await fetchPaymentSheetParams({ plan, name, email });

  if(!name) return
  
  const { error: initError } = await initPaymentSheet({
    merchantDisplayName: "Biblia.AI",
    customerId: customer,
    customerEphemeralKeySecret: ephemeralKey,
    paymentIntentClientSecret: clientSecret,
    allowsDelayedPaymentMethods: true,
    defaultBillingDetails: {
      name: name ?? 'Usuário',
    },
  });
  if (initError) {
    console.log('Erro ao inicializar PaymentSheet', initError)
    return
  }
}

export { initializePaymentSheet }