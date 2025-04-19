import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <>
      <Slot />
      <StatusBar style="auto" />
      <Toast />
    </>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

