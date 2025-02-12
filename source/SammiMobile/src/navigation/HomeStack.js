import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";

const HomeStackNavigator = createNativeStackNavigator();

const HomeStack = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <HomeStackNavigator.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <HomeStackNavigator.Screen name="Home" component={Home} />
    </HomeStackNavigator.Navigator>
  );
};

const styles = StyleSheet.create({});

export default HomeStack;
