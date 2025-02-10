import React from "react";
import { View, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home/Home";
import Profile from "../screens/Profile";
import Test from "../screens/Test";
import MainStack from "./MainStack";
import DrawerContent from "../components/drawer/DrawerContent";
import { windowWidth } from "../utils/constants";

const DrawerNavigator = createDrawerNavigator();

const Drawer = () => {
  return (
    <DrawerNavigator.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: windowWidth,
        },
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <DrawerNavigator.Screen name={"MainStack"} component={MainStack} />
    </DrawerNavigator.Navigator>
  );
};

const styles = StyleSheet.create({});

export default Drawer;
