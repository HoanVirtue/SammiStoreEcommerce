import React, { useMemo, useEffect, useState, createContext, useContext } from 'react';
import { Tabs } from 'expo-router';
import { colors } from '@/constants/colors';
import { Home, Search, Heart, User, ShoppingBag } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { getCarts } from '@/services/cart';
import { TParamsGetAllCarts } from '@/types/cart';

export const CartContext = createContext({
  cartData: [] as any[],
  refreshCart: () => { },
});

export const useCart = () => useContext(CartContext);

export default function TabLayout() {
  const [cartData, setCartData] = useState<any[]>([]);

  const fetchCartData = async () => {
    try {
      const params: TParamsGetAllCarts = {
        take: 100,
        skip: 0,
        paging: true,
        orderBy: 'createdAt',
        dir: 'desc',
        keywords: '',
        filters: ''
      };
      const response = await getCarts({ params });
      if (response?.result) {
        setCartData(response.result);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const refreshCart = () => {
    fetchCartData();
  };

  const totalItems = useMemo(() => {
    if (!cartData) return 0;
    return cartData.reduce((result: number, current: any) => {
      return result + current.quantity;
    }, 0);
  }, [cartData]);

  return (
    <CartContext.Provider value={{ cartData, refreshCart }}>
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
            tabBarIcon: ({ color, size }: { color: string; size: number }) => <Home size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Tìm kiếm',
            tabBarIcon: ({ color, size }: { color: string; size: number }) => <Search size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="wishlist"
          options={{
            title: 'Yêu thích',
            tabBarIcon: ({ color, size }: { color: string; size: number }) => <Heart size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Giỏ hàng',
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <View>
                <ShoppingBag size={size} color={color} />
                {totalItems > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {totalItems > 99 ? '99+' : totalItems}
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
            tabBarIcon: ({ color, size }: { color: string; size: number }) => <User size={size} color={color} />,
          }}
        />
      </Tabs>
    </CartContext.Provider>
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