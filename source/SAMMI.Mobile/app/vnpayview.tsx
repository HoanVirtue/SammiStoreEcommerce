import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, SafeAreaView, Text, TouchableOpacity, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { colors } from '@/constants/colors';
import { router } from 'expo-router';
import { ArrowLeft, RefreshCw, WifiOff } from 'lucide-react-native';

interface VNPayWebViewParams {
  paymentUrl: string;
  orderId?: number;
  totalPrice?: number;
}

const VNPayWebViewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { paymentUrl, orderId, totalPrice } = route.params as VNPayWebViewParams;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isConnected, setIsConnected] = useState(true);
  const MAX_RETRIES = 3;
  const TIMEOUT_DURATION = 30000; // 30 seconds

  // Validate payment URL
  useEffect(() => {
    if (!paymentUrl) {
      setError('URL thanh toán không hợp lệ');
      return;
    }

    try {
      const url = new URL(paymentUrl);
      if (!url.protocol.startsWith('http')) {
        setError('URL thanh toán không hợp lệ');
      }
    } catch (e) {
      setError('URL thanh toán không hợp lệ');
    }
  }, [paymentUrl]);

  // Check network connection
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const state = await NetInfo.fetch();
        setIsConnected(state.isConnected ?? false);
        if (!state.isConnected) {
          setError('Không có kết nối mạng');
        }
      } catch (error) {
        console.error('Network check error:', error);
      }
    };

    checkConnection();
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? false);
      if (!state.isConnected) {
        setError('Không có kết nối mạng');
      } else if (error === 'Không có kết nối mạng') {
        setError(null);
        handleRetry();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleRetry = useCallback(() => {
    if (!isConnected) {
      setError('Không có kết nối mạng');
      return;
    }

    if (retryCount < MAX_RETRIES) {
      setError(null);
      setRetryCount(prev => prev + 1);
      setLoading(true);
    } else {
      Alert.alert(
        'Lỗi kết nối',
        'Không thể kết nối đến trang thanh toán. Vui lòng thử lại sau.',
        [
          {
            text: 'Quay lại',
            onPress: () => router.back(),
            style: 'cancel',
          },
          {
            text: 'Thử lại',
            onPress: () => {
              setRetryCount(0);
              setError(null);
              setLoading(true);
            },
          },
        ]
      );
    }
  }, [retryCount, isConnected]);

  const handleNavigationStateChange = (navState: any) => {
    const { url } = navState;
    console.log("url: ", url);
    
    if (url.includes('payment-status') || url.includes('payment/success') || url.includes('error-message')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      console.log("urlParams: ", urlParams);
      const paymentStatus = urlParams.get('payment-status') === '1' ? 'success' : 'failed';
      const errorMessage = urlParams.get('error-message');

      router.push('payment/vnpay' as any);

      Toast.show({
        type: paymentStatus === 'success' ? 'success' : 'error',
        text1: paymentStatus === 'success' ? 'Thanh toán thành công' : 'Thanh toán thất bại',
        text2: paymentStatus === 'success' ? 'Đơn hàng của bạn đã được xử lý.' : errorMessage || 'Lỗi thanh toán',
      });
    }
  };

  const handleError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    console.error('WebView error: ', nativeEvent);
    
    let errorMessage = 'Lỗi tải trang thanh toán';
    if (nativeEvent.code === -1004) {
      errorMessage = 'Không thể kết nối đến máy chủ thanh toán. Vui lòng kiểm tra kết nối mạng và thử lại.';
    } else if (nativeEvent.code === -1009) {
      errorMessage = 'Không có kết nối mạng';
    } else if (nativeEvent.code === -1001) {
      errorMessage = 'Hết thời gian chờ kết nối';
    }
    
    setError(errorMessage);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thanh toán VNPay</Text>
        <View style={styles.placeholder} />
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          {!isConnected && <WifiOff size={48} color={colors.error} style={styles.errorIcon} />}
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={[styles.retryButton, !isConnected && styles.retryButtonDisabled]} 
            onPress={handleRetry}
            disabled={!isConnected}
          >
            <RefreshCw size={20} color={colors.white} />
            <Text style={styles.retryButtonText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <WebView
          source={{ uri: paymentUrl }}
          style={styles.webview}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onNavigationStateChange={handleNavigationStateChange}
          onError={handleError}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error('WebView HTTP error: ', nativeEvent);
            setError(`Lỗi HTTP: ${nativeEvent.statusCode}`);
            setLoading(false);
          }}
          timeout={TIMEOUT_DURATION}
        />
      )}

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  backButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorIcon: {
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonDisabled: {
    backgroundColor: colors.textSecondary,
    opacity: 0.7,
  },
  retryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default VNPayWebViewScreen;