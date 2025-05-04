import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Switch, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCESS_TOKEN } from '@/configs/auth';
import { ROUTE_CONFIG } from '@/configs/route';

import {
  User,
  Bell,
  Moon,
  CreditCard,
  MapPin,
  HelpCircle,
  LogOut,
  ChevronRight,
  Heart,
  ShoppingBag,
  Settings
} from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import LoginScreen from '../login';

export default function ProfileScreen() {

  const { logout } = useAuth();
  const router = useRouter();
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);
  const [hasToken, setHasToken] = useState<boolean | null>(null);
  const {user} = useAuth();


  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN);
      setHasToken(!!token);
    };
    checkAuth();
  }, [user]);

  if (hasToken === null) {
    return null; // or a loading spinner
  }

  if (!hasToken) {
    return <LoginScreen />;
  }

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const toggleNotifications = () => setNotifications(prev => !prev);

  const handleSignOut = async () => {
    try {
      await logout();
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      // Reset navigation stack và chuyển về login
      router.replace('/login' as any);
      // Xóa toàn bộ navigation stack
      while (router.canGoBack()) {
        router.back();
      }
    } catch (error) {
      console.error('Error during logout:', error);
      // Nếu có lỗi khi gọi API, vẫn xóa token và chuyển về login
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      router.replace('/login' as any);
      while (router.canGoBack()) {
        router.back();
      }
    }
  };

  const handleProfile = () => {
    router.replace('/update-info' as any);
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            {/* {user?.imageUrl ? (
            <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
          ) : (
            <User size={40} color={colors.primary} />
          )} */}
          </View>
          <Text style={styles.username}>{user?.fullName}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tài khoản của tôi</Text>

          <Pressable style={styles.menuItem} onPress={handleProfile}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primaryLight }]}>
                <User size={18} color={colors.primary} />
              </View>
              <Text style={styles.menuItemText}>Chỉnh sửa thông tin</Text>
            </View>
            <ChevronRight size={16} color={colors.textSecondary} />
          </Pressable>

          <Pressable style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.secondaryLight }]}>
                <Heart size={18} color={colors.secondary} />
              </View>
              <Text style={styles.menuItemText}>Sản phẩm yêu thích</Text>
            </View>
            <ChevronRight size={16} color={colors.textSecondary} />
          </Pressable>

          <Pressable style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#E8F5E9' }]}>
                <ShoppingBag size={18} color="#4CAF50" />
              </View>
              <Text style={styles.menuItemText}>Đơn hàng của tôi</Text>
            </View>
            <ChevronRight size={16} color={colors.textSecondary} />
          </Pressable>

          <Pressable style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
                <MapPin size={18} color="#2196F3" />
              </View>
              <Text style={styles.menuItemText}>Quản lý địa chỉ nhận</Text>
            </View>
            <ChevronRight size={16} color={colors.textSecondary} />
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sở thích</Text>

          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#EDE7F6' }]}>
                <Moon size={18} color="#673AB7" />
              </View>
              <Text style={styles.menuItemText}>Chế độ tối</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>

          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#FCE4EC' }]}>
                <Bell size={18} color={colors.primary} />
              </View>
              <Text style={styles.menuItemText}>Thông báo</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={toggleNotifications}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>

          <Pressable style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#E0F7FA' }]}>
                <Settings size={18} color="#00BCD4" />
              </View>
              <Text style={styles.menuItemText}>Cài đặt</Text>
            </View>
            <ChevronRight size={16} color={colors.textSecondary} />
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hỗ trợ</Text>

          <Pressable style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#F1F8E9' }]}>
                <HelpCircle size={18} color="#8BC34A" />
              </View>
              <Text style={styles.menuItemText}>Trợ giúp & Hỗ trợ</Text>
            </View>
            <ChevronRight size={16} color={colors.textSecondary} />
          </Pressable>

          <Pressable style={styles.menuItem} onPress={handleSignOut}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.iconContainer, { backgroundColor: '#FFEBEE' }]}>
                <LogOut size={18} color={colors.error} />
              </View>
              <Text style={[styles.menuItemText, { color: colors.error }]}>Đăng xuất</Text>
            </View>
          </Pressable>
        </View>

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 16,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  username: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: colors.text,
  },
  version: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 16,
    marginBottom: 32,
  },
});