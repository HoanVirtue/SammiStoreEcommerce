import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Image, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { Button } from '@/presentation/components/Button';
import { Camera, Image as ImageIcon, ArrowLeft } from 'lucide-react-native';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import { updateUser } from '@/services/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserDetail } from '@/services/user';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TParamsUpdateUser, TParamsUser } from '@/types/user';

export default function UpdateInfoScreen() {
  const [user, setUser] = useState<TParamsUser | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [birthday, setBirthday] = useState(new Date());
  const [gender, setGender] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
          router.replace('/(auth)/login' as any);
          return;
        }

        const userData = (await getUserDetail()).result as TParamsUser;
        setUser(userData);
        setFirstName(userData?.firstName || '');
        setLastName(userData?.lastName || '');
        setPhone(userData?.phone || '');
        setEmail(userData?.email || '');
        setAvatar(userData?.avatar || '');
        setBirthday(userData?.birthday ? new Date(userData.birthday) : new Date());
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
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
        id: user?.id,
        firstName,
        lastName,
        phone,
        email,
        avatar: avatar.startsWith('file://') ? avatar : undefined,
        gender,
        birthday: birthday.toISOString().split('T')[0]
      };

      await updateUser(updateData);
      Toast.show({
        type: 'success',
        text1: 'Cập nhật thành công',
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

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
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
                <ImageIcon size={48} color={colors.primaryLight} />
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
                style={[styles.genderButton, gender === true && styles.genderButtonActive]}
                onPress={() => setGender(true)}
              >
                <Text style={[styles.genderText, gender === true && styles.genderTextActive]}>Nam</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.genderButton, gender === false && styles.genderButtonActive]}
                onPress={() => setGender(false)}
              >
                <Text style={[styles.genderText, gender === false && styles.genderTextActive]}>Nữ</Text>
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
  }
});
