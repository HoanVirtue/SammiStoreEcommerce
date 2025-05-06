import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Linking,
    Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { CheckCircle, XCircle } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { LoadingIndicator } from '@/presentation/components/LoadingIndicator';

const VnPayScreen = () => {
    const router = useRouter();
    const theme = useTheme();
    const [paymentStatus, setPaymentStatus] = useState<'loading' | 'success' | 'failed'>('loading');
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        const handleDeepLink = async () => {
            try {
                // 1. Kiểm tra URL ban đầu khi app mở
                const initialUrl = await Linking.getInitialURL();
                if (initialUrl) {
                    console.log('Initial URL:', initialUrl);
                    processPaymentUrl(initialUrl);
                    return;
                }

                // 2. Lắng nghe deep link khi app đang mở
                const subscription = Linking.addEventListener('url', ({ url }) => {
                    console.log('Deep link received:', url);
                    processPaymentUrl(url);
                });

                return () => {
                    subscription.remove();
                };
            } catch (error) {
                console.error('Error in handleDeepLink:', error);
                setPaymentStatus('failed');
                setErrorMessage('Có lỗi xảy ra khi xử lý thanh toán');
            }
        };

        handleDeepLink();
    }, []);

    const processPaymentUrl = (url: string) => {
        try {
            // Parse URL để lấy các tham số
            const urlObj = new URL(url);
            const queryParams = Object.fromEntries(urlObj.searchParams);
            console.log('Payment params:', queryParams);

            // Xử lý kết quả thanh toán
            const vnpResponseCode = queryParams['vnp_ResponseCode'];
            const vnpTxnRef = queryParams['vnp_TxnRef'];
            const vnpAmount = queryParams['vnp_Amount'];

            if (vnpResponseCode === '00') {
                setPaymentStatus('success');
                // TODO: Gọi API cập nhật trạng thái đơn hàng
                setTimeout(() => {
                    router.replace('/(tabs)');
                }, 2000);
            } else {
                setPaymentStatus('failed');
                setErrorMessage('Thanh toán không thành công');
                setTimeout(() => {
                    router.replace('/(tabs)');
                }, 2000);
            }
        } catch (error) {
            console.error('Error processing payment URL:', error);
            setPaymentStatus('failed');
            setErrorMessage('Có lỗi xảy ra khi xử lý thanh toán');
            setTimeout(() => {
                router.replace('/(tabs)');
            }, 2000);
        }
    };

    const handleGoToHome = () => {
        router.replace('/(tabs)');
    };

    const handleGoToOrders = () => {
        router.replace('/my-order' as any);
    };

    const renderContent = () => {
        switch (paymentStatus) {
            case 'loading':
                return (
                    <>
                        <LoadingIndicator />
                        <Text style={[styles.statusText, { color: theme.colors.text }]}>
                            Đang xử lý thanh toán...
                        </Text>
                    </>
                );
            case 'success':
                return (
                    <>
                        <View style={styles.iconContainer}>
                            <CheckCircle size={80} color={colors.success} />
                        </View>
                        <Text style={[styles.title, { color: theme.colors.text }]}>
                            Thanh toán thành công
                        </Text>
                        <Text style={[styles.description, { color: theme.colors.text }]}>
                            Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi. Đơn hàng của quý khách đã được xác nhận và đang được xử lý.
                        </Text>
                    </>
                );
            case 'failed':
                return (
                    <>
                        <View style={styles.iconContainer}>
                            <XCircle size={80} color={colors.error} />
                        </View>
                        <Text style={[styles.title, { color: theme.colors.text }]}>
                            Thanh toán không thành công
                        </Text>
                        <Text style={[styles.description, { color: theme.colors.text }]}>
                            {errorMessage || 'Vui lòng thử lại sau'}
                        </Text>
                    </>
                );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {renderContent()}

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: colors.primary }]}
                        onPress={handleGoToHome}
                    >
                        <Text style={styles.buttonText}>Trang chủ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: colors.primary }]}
                        onPress={handleGoToOrders}
                    >
                        <Text style={styles.buttonText}>Đơn mua</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 24,
    },
    statusText: {
        fontSize: 16,
        marginTop: 16,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 32,
        paddingHorizontal: 20,
    },
    button: {
        flex: 1,
        marginHorizontal: 8,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default VnPayScreen; 