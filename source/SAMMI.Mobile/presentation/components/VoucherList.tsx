import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { useRouter } from 'expo-router';

interface Voucher {
  id: string;
  code: string;
  discount: number;
  minPurchase: number;
  expiryDate: string;
  description: string;
}

const mockVouchers: Voucher[] = [
  {
    id: '1',
    code: 'BEAUTY20',
    discount: 20,
    minPurchase: 500000,
    expiryDate: '2024-12-31',
    description: 'Giảm 20% cho đơn hàng từ 500.000đ'
  },
  {
    id: '2',
    code: 'NEWUSER15',
    discount: 15,
    minPurchase: 300000,
    expiryDate: '2024-12-31',
    description: 'Giảm 15% cho khách hàng mới'
  },
  {
    id: '3',
    code: 'SUMMER25',
    discount: 25,
    minPurchase: 1000000,
    expiryDate: '2024-12-31',
    description: 'Giảm 25% cho đơn hàng từ 1.000.000đ'
  }
];

export default function VoucherList() {
  const router = useRouter();

  const handleVoucherPress = (voucher: Voucher) => {
    // Xử lý khi người dùng nhấn vào voucher
    console.log('Selected voucher:', voucher);
  };

  const handleSaveVoucher = (voucher: Voucher) => {
    // Xử lý lưu voucher
    alert(`Đã lưu voucher: ${voucher.code}`);
  };

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
        {mockVouchers.map((voucher) => (
          <View key={voucher.id} style={styles.voucherCard}>
            <View style={styles.voucherContent}>
              <Text style={styles.discount}>{voucher.discount}%</Text>
              <Text style={styles.code}>{voucher.code}</Text>
              <Text style={styles.description}>{voucher.description}</Text>
              <Text style={styles.minPurchase}>
                Áp dụng cho đơn hàng từ {voucher.minPurchase.toLocaleString('vi-VN')}đ
              </Text>
              <Text style={styles.expiryDate}>
                HSD: {new Date(voucher.expiryDate).toLocaleDateString('vi-VN')}
              </Text>
              <TouchableOpacity style={styles.saveButton} onPress={() => handleSaveVoucher(voucher)}>
                <Text style={styles.saveButtonText}>Lưu voucher</Text>
              </TouchableOpacity>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  viewAll: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  voucherCard: {
    width: 280,
    height: 160,
    backgroundColor: colors.primary,
    borderRadius: 12,
    marginRight: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  voucherContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  discount: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.white,
  },
  code: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: colors.white,
    marginTop: 4,
  },
  minPurchase: {
    fontSize: 12,
    color: colors.white,
    marginTop: 8,
  },
  expiryDate: {
    fontSize: 12,
    color: colors.white,
    marginTop: 4,
  },
  saveButton: {
    marginTop: 8,
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  saveButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 15,
  },
}); 