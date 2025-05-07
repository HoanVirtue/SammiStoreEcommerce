import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, SafeAreaView, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { colors } from '@/constants/colors';
import { router } from 'expo-router';

interface VNPayWebViewParams {
  paymentUrl: string;
  orderId: number;
  totalPrice: number;
}

const VNPayWebViewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { paymentUrl, orderId, totalPrice } = route.params as VNPayWebViewParams;
  const [loading, setLoading] = useState(true);

  // Xử lý thay đổi trạng thái điều hướng của WebView
  const handleNavigationStateChange = (navState: any) => {
    const { url } = navState;

    // Kiểm tra URL trả về từ VNPay để xác định trạng thái thanh toán
    if (url.includes('payment-status') || url.includes('payment/success') || url.includes('payment/failure')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      const paymentStatus = urlParams.get('vnp_TransactionStatus') === '00' ? 'success' : 'failed';

      // Quay lại màn hình trước và chuyển hướng đến màn hình trạng thái thanh toán
      router.push('payment/vnpay' as any);

      // Hiển thị thông báo dựa trên trạng thái thanh toán
      Toast.show({
        type: paymentStatus === 'success' ? 'success' : 'error',
        text1: paymentStatus === 'success' ? 'Thanh toán thành công' : 'Thanh toán thất bại',
        text2: paymentStatus === 'success' ? 'Đơn hàng của bạn đã được xử lý.' : 'Vui lòng thử lại.',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: paymentUrl }}
        style={styles.webview}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={handleNavigationStateChange}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error: ', nativeEvent);
          Toast.show({
            type: 'error',
            text1: 'Lỗi tải trang thanh toán',
            text2: 'Vui lòng kiểm tra kết nối mạng và thử lại.',
          });
        }}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Đang tải trang thanh toán...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.primary,
  },
});

export default VNPayWebViewScreen;