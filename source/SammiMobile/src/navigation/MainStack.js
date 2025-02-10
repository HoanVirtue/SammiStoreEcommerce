import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tab from "./Tab";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Payment from "../screens/Payment";
import Search from "../screens/Search";
import Test from "../screens/Test";
import Account from "../screens/account/Account";
import Intro from "../screens/Intro";
import InforUpdate from "../screens/account/InforUpdate";
import Level from "../screens/account/Level";
import History from "./../screens/account/History";
import DeliveryAddress from "../screens/account/DeliveryAddress";
import Details from "../screens/Details";
import Product from "../components/home/Product";
import { useGlobalContext } from "../store/contexts/GlobalContext";
import BarcodeScreen from "../screens/BarcodeScreen";

const Stack = createNativeStackNavigator();
const MainStack = () => {
  const { isLogin } = useGlobalContext();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isLogin ? "Tab" : "Login"}
    >
      {!isLogin && <Stack.Screen name="Login" component={Login} />}
      {isLogin && (
        <>
          <Stack.Screen name="Tab" component={Tab} />
          <Stack.Screen name="Intro" component={Intro} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="InforUpdate" component={InforUpdate} />
          <Stack.Screen name="Level" component={Level} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="DeliveryAddress" component={DeliveryAddress} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Product" component={Product} />
          <Stack.Screen name="BarcodeScreen" component={BarcodeScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default MainStack;
