import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './navigation/AppNavigator';
import { ThemeProvider } from './theme/ThemeContext';
import { store } from './redux/store';
import { Provider } from 'react-redux';

// Wrapper component to handle Redux logic
const AppContent = () => {
  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar style="light" />
            <AppNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
