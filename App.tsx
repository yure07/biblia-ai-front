console.log('App iniciado')

import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './src/routes/routes';
import { navigationRef } from './src/utils/navigationService';

import { OneSignal, LogLevel } from 'react-native-onesignal';
import { useEffect } from 'react';

export default function App() {
  // Initialize OneSignal in useEffect to ensure it runs only once
  useEffect(() => {
    // Enable verbose logging for debugging (remove in production)
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    // Initialize with your OneSignal App ID
    OneSignal.initialize('66cda191-1e39-4331-8e8a-567ed412ba86');
    // Use this method to prompt for push notifications.
    // We recommend removing this method after testing and instead use In-App Messages to prompt for notification permission.
    OneSignal.Notifications.requestPermission(true);
  }, []); // Ensure this only runs once on app mount

  return (
    <NavigationContainer ref={navigationRef} onReady={() => null}>
      <Routes/>
    </NavigationContainer>
  );
}