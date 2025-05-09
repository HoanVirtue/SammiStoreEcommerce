import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colors } from '@/constants/colors';
import { useRouter } from 'expo-router';
import { getTopVouchers, saveVoucher } from '@/services/voucher';
import Toast from 'react-native-toast-message';
import { TicketCheckIcon, TicketIcon } from 'lucide-react-native';


interface Voucher {
  id: number;
  code: string;
  name: string;
  discountValue: number;
  conditions: Array<{
    conditionType: string;
    conditionValue: string;
  }>;
  startDate: string;
  endDate: string;
}

export default function VoucherList() {
  const router = useRouter();
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchVouchers = async () => {
    try {
      setLoading(true);
      const response = await getTopVouchers({ numberTop: 10 });
      if (response.isSuccess) {
        setVouchers(response.result);
      }
    } catch (error) {
      console.error('Error fetching vouchers:', error);
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Không thể tải danh sách voucher',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveVoucher = async (voucherId: number) => {
    try {
      const response = await saveVoucher(voucherId);
      console.log('response', response);
      if (response.isSuccess) {
        Toast.show({
          type: 'success',
          text1: 'Thành công',
          text2: 'Đã lưu voucher thành công',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Lỗi',
          text2: response.message || 'Lưu voucher thất bại',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Lưu voucher thất bại',
      });
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Voucher khuyến mãi</Text>
        <Pressable onPress={() => router.push('/my-voucher' as any)}>
          <Text style={styles.viewAll}>Xem voucher của tôi</Text>
        </Pressable>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {vouchers.map((voucher, index) => (
          <View key={`voucher-${voucher.id}-${index}`} style={styles.voucherCard}>
            <View style={styles.voucherContent}>
              <View style={styles.voucherIcon}>
                <TicketIcon size={60} color={colors.primary} />
              </View>
              <View style={styles.voucherInfo}>
                <Text style={styles.code}>NHẬP MÃ: {voucher.code}</Text>
                <Text style={styles.description}>{voucher.name}</Text>
                <TouchableOpacity 
                  style={styles.saveButton} 
                  onPress={() => handleSaveVoucher(voucher.id)}
                >
                  <Text style={styles.saveButtonText}>Lưu voucher</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: colors.white,
    height: 180,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  viewAll: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  voucherCard: {
    width: 280,
    height: 100,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginRight: 12,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  voucherContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  voucherIcon: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voucherInfo: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 8,
  },
  code: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  saveButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 11,
  },
}); 