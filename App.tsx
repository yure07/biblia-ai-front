console.log('App iniciado')

import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './src/routes/routes';
import { navigationRef } from './src/utils/navigationService';

export default function App() {
  return (
    <NavigationContainer ref={navigationRef} onReady={() => null}>
      <Routes/>
    </NavigationContainer>
  );
}