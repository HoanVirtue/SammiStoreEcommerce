import React, { useMemo, useEffect, useState, createContext, useContext } from 'react';
import { Tabs } from 'expo-router';
import { colors } from '@/constants/colors';
import { Home, Search, Heart, User, ShoppingBag } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { RootState } from '@/stores';
import { AppDispatch } from '@/stores';
import { useSelector } from 'react-redux';
import { CartItem } from '@/domain/entities/CartItem';
import { getCartsAsync } from '@/stores/cart/action';
import { useAuth } from '@/hooks/useAuth';

export const CartContext = createContext({
  cartData: [] as any[],
  refreshCart: () => { },
});

export const useCart = () => useContext(CartContext);

export default function TabLayout() {
  const { carts } = useSelector((state: RootState) => state.cart)
  const { user } = useAuth()
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    if (user?.id) {
      dispatch(
        getCartsAsync({
          params: {
            take: -1,
            skip: 0,
            paging: false,
            orderBy: 'name',
            dir: 'asc',
            keywords: "''",
            filters: '',
          },
        })
      );
    }
  }, [dispatch, user?.id]);

  const totalItemsCart = useMemo(() => {
    if (!carts?.data) return 0;
    return carts.data.reduce((result: number, current: CartItem) => {
      return result + current.quantity;
    }, 0);
  }, [carts]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.border,
          elevation: 0,
          height: 60,
          paddingBottom: 8,
        },
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
          color: colors.text,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          headerShown: false,
          tabBarIcon: ({ color, size }: { color: string; size: number }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Tìm kiếm',
          headerShown: false,
          tabBarIcon: ({ color, size }: { color: string; size: number }) => <Search size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Giỏ hàng',
          headerShown: false,
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <View>
              <ShoppingBag size={size} color={color} />
              {totalItemsCart > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {totalItemsCart > 99 ? '99+' : totalItemsCart}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Tài khoản',
          headerShown: false,
          tabBarIcon: ({ color, size }: { color: string; size: number }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -6,
    top: -4,
    backgroundColor: colors.primary,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});