import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Provider } from 'react-redux';
import { store } from '@/stores';
import { AuthProvider } from '@/contexts/AuthContext';
import { AxiosInterceptor } from '@/helpers/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize AsyncStorage
AsyncStorage.setItem('initialized', 'true').catch(error => {
  console.error('Error initializing AsyncStorage:', error);
});

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <AuthProvider>
        <AxiosInterceptor>
          <RootLayoutNav />
        </AxiosInterceptor>
      </AuthProvider>
    </Provider>
  );
}

function RootLayoutNav() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AxiosInterceptor>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            <Stack.Screen name="product/[id]" options={{ presentation: 'card' }} />
            <Stack.Screen name="article/[id]" options={{ presentation: 'card' }} />
            <Stack.Screen name="checkout" options={{ presentation: 'card' }} />
          </Stack>
        </AxiosInterceptor>
      </AuthProvider>
    </Provider>
  );
}