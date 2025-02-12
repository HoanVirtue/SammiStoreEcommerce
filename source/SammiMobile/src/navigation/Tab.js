import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import Cart from "../screens/Cart";
import Profile from "../screens/Profile";
import { Icon } from "@ui-kitten/components";
import { bottomTabHeight } from "../utils/constants";
import Account from "../screens/account/Account";
import useOrderContext from "../store/contexts/OrderContext";
import { Text } from "react-native";
import Payment from "../screens/Payment";

const TabNavigator = createBottomTabNavigator();

const Tab = () => {
  const { listOrders } = useOrderContext();
  return (
    <TabNavigator.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: "#ddd",
          borderTopWidth: 1,
          height: bottomTabHeight,
        },
      }}
      initialRouteName="HomeStack"
    >
      <TabNavigator.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="grid-outline"
              fill={color}
              style={{
                width: 32,
                height: 32,
              }}
            />
          ),
          tabBarLabel: "Sản phẩm",
        }}
      />

      <TabNavigator.Screen
        name="Promotion"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="gift-outline"
              fill={color}
              style={{
                width: 32,
                height: 32,
              }}
            />
          ),
          tabBarLabel: "Khuyến mãi",
        }}
      />
      {/* <TabNavigator.Screen
        name="Notification"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="person-outline"
              fill={color}
              style={{
                width: 32,
                height: 32,
              }}
            />
          ),
          tabBarLabel: "Thông báo",
        }}
      /> */}

      <TabNavigator.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="shopping-cart-outline"
              fill={color}
              style={{
                width: 32,
                height: 32,
              }}
            />
          ),
          tabBarLabel: "Giỏ hàng",
        }}
      />
      <TabNavigator.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="person-outline"
              fill={color}
              style={{
                width: 32,
                height: 32,
              }}
            />
          ),
          tabBarLabel: "Tài khoản",
        }}
      />
    </TabNavigator.Navigator>
  );
};

const styles = StyleSheet.create({});

export default Tab;
