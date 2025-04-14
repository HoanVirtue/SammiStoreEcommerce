import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";
import { Provider } from 'react-redux';
import { store } from '@/stores';
import { AuthProvider } from '@/contexts/AuthContext';
import { AxiosInterceptor } from '@/helpers/axios';

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
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="product/[id]"
        options={{
          headerShown: false,
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="cart"
        options={{
          headerTitle: "Shopping Cart",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="checkout"
        options={{
          headerTitle: "Checkout",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
}