import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Image, StatusBar, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { Button } from '@/presentation/components/Button';
import { Camera, Image as ImageIcon, ArrowLeft, User } from 'lucide-react-native';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import { updateAvatar, updateUser } from '@/services/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserDetail } from '@/services/user';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TParamsUpdateUser, TParamsUser } from '@/types/user';
import { useAuth } from '@/hooks/useAuth';

export default function UpdateInfoScreen() {
  const [userUpdate, setUserUpdate] = useState<TParamsUpdateUser | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [birthday, setBirthday] = useState(new Date());
  const [gender, setGender] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { user, setUser } = useAuth();

  useEffect(() => {
    const fetchUserInfo = () => {
      try {
        if (!user) {
          router.replace('/login' as any);
          return;
        }
        
        setFirstName(user?.firstName || '');
        setLastName(user?.lastName || '');
        setPhone(user?.phone || '');
        setEmail(user?.email || '');
        setAvatar(user?.avatar || '');
        setBirthday(user?.birthday ? new Date(user.birthday) : new Date());
        setGender(user?.gender === 0 ? 0 : 1);
      } catch (error) {
        console.error('Error fetching user:', error);
        Toast.show({
          type: 'error',
          text1: 'Lỗi tải thông tin',
          text2: 'Vui lòng thử lại sau',
        });
      }
    };

    fetchUserInfo();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Toast.show({
        type: 'error',
        text1: 'Permission denied',
        text2: 'Sorry, we need camera roll permissions to make this work!',
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      await handleUpdateAvatar(result.assets[0].base64 || '');
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthday(selectedDate);
    }
  };

  const handleUpdate = async () => {
    if (!firstName || !lastName || !phone || !email) {
      Toast.show({
        type: 'error',
        text1: 'Vui lòng điền đầy đủ thông tin',
      });
      return;
    }

    setIsLoading(true);
    try {
      const updateData = {
        firstName,
        lastName,
        email,
        phone,
        gender: gender ? 1 : 0,
        birthday: birthday.toISOString().split('T')[0]
      } as TParamsUpdateUser;

      const updateResponse = await updateUser(updateData);
      if(!updateResponse.isSuccess) {
        Toast.show({
          type: 'error',
          text1: 'Cập nhật thông tin thất bại',
          text2: updateResponse.message,
        });
        return;
      }
      setUser({...updateResponse.result});
      console.log(updateResponse);
      Toast.show({
        type: 'success',
        text1: 'Cập nhật thông tin thành công',
      });
      router.push('/(tabs)/profile');
    } catch (error) {
      console.error('Error updating user:', error);
      Toast.show({
        type: 'error',
        text1: 'Cập nhật thất bại',
        text2: 'Vui lòng thử lại sau',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateAvatar = async (imageBase64: string) => {
    try {
      setIsLoading(true);
      
      const response = await updateAvatar(imageBase64);

      if (!response?.isSuccess) {
        Toast.show({
          type: 'error',
          text1: 'Cập nhật ảnh thất bại',
          text2: response?.message,
        });
        return;
      }

      setAvatar(response?.result.imageUrl);
      if (user?.id) {
        setUser({...user, avatar: response?.result.imageUrl});
      }
      Toast.show({
        type: 'success',
        text1: 'Cập nhật ảnh thành công',
      });
    } catch (error) {
      console.error('Error updating avatar:', error);
      Toast.show({
        type: 'error',
        text1: 'Cập nhật ảnh thất bại',
        text2: 'Vui lòng thử lại sau',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)/profile')}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Cập nhật thông tin cá nhân</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.form}>
          <View style={styles.avatarContainer}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <User size={48} color={colors.primaryLight} />
              </View>
            )}
            <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
              <Camera size={24} color={colors.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Họ và tên đệm</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Nhập họ và tên đệm"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tên</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Nhập tên"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Số điện thoại</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Nhập số điện thoại"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Nhập email"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Giới tính</Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[styles.genderButton, gender === 1 && styles.genderButtonActive]}
                onPress={() => setGender(1)}
              >
                <Text style={[styles.genderText, gender === 1 && styles.genderTextActive]}>Nam</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.genderButton, gender === 0 && styles.genderButtonActive]}
                onPress={() => setGender(0)}
              >
                <Text style={[styles.genderText, gender === 0 && styles.genderTextActive]}>Nữ</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ngày sinh</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>
                {birthday.toLocaleDateString('vi-VN')}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={birthday}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
                maximumDate={new Date()}
                locale="vi-VN"
              />
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Cập nhật"
          onPress={handleUpdate}
          style={styles.updateButton}
          loading={isLoading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
    marginTop: StatusBar.currentHeight || 0,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  form: {
    padding: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primaryLight,
    borderStyle: 'dashed',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
  updateButton: {
    backgroundColor: colors.primary,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  genderButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  genderButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  genderText: {
    fontSize: 16,
    color: colors.text,
  },
  genderTextActive: {
    color: colors.white,
  },
  dateInput: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateText: {
    fontSize: 16,
    color: colors.text,
  },
  loadingOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 999,
  },
});