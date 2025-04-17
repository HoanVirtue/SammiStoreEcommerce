import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';
import { ROUTE_CONFIG } from '@/configs/route';
import { useLocalSearchParams } from 'expo-router';
import { formatPrice } from '@/utils';
import { CheckCircle } from 'lucide-react-native';

const PaymentSuccessScreen = () => {
    const navigation = useNavigation();
    const theme = useTheme();
    const params = useLocalSearchParams();

    const orderId = params.orderId as string;
    const totalPrice = Number(params.totalPrice) || 0;
    const paymentMethod = params.paymentMethod as string;

    const handleGoToHome = () => {
        navigation.navigate(ROUTE_CONFIG.HOME as never);
    };

    const handleGoToOrders = () => {
        navigation.navigate(ROUTE_CONFIG.ACCOUNT.MY_ORDER as never);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <CheckCircle size={80} color={theme.colors.primary} />
                </View>

                <Text style={[styles.title, { color: theme.colors.text }]}>
                    Đặt hàng thành công
                </Text>

                <Text style={[styles.description, { color: theme.colors.text }]}>
                    Chúc mừng quý khách hàng đã đặt hàng tại Sammi Stores. Nhân viên của chúng tôi sẽ liên hệ lại quý khách hàng khi đơn hàng được xác nhận. Quý khách hàng có thể theo dõi bằng cách đăng nhập và theo dõi đơn hàng trên ứng dụng của chúng tôi.
                </Text>

                <View style={styles.orderInfo}>
                    <Text style={[styles.orderLabel, { color: theme.colors.text }]}>
                        Mã đơn hàng:
                    </Text>
                    <Text style={[styles.orderValue, { color: theme.colors.text }]}>
                        {orderId}
                    </Text>
                </View>

                <View style={styles.orderInfo}>
                    <Text style={[styles.orderLabel, { color: theme.colors.text }]}>
                        Tổng tiền:
                    </Text>
                    <Text style={[styles.orderValue, { color: theme.colors.text }]}>
                        {formatPrice(totalPrice)}
                    </Text>
                </View>

                <View style={styles.orderInfo}>
                    <Text style={[styles.orderLabel, { color: theme.colors.text }]}>
                        Phương thức thanh toán:
                    </Text>
                    <Text style={[styles.orderValue, { color: theme.colors.text }]}>
                        {paymentMethod === 'vnpay' ? 'VNPay' : 'Thanh toán khi nhận hàng'}
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: theme.colors.primary }]}
                        onPress={handleGoToHome}
                    >
                        <Text style={styles.buttonText}>Trang chủ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: theme.colors.primary }]}
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
    orderInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 12,
        paddingHorizontal: 20,
    },
    orderLabel: {
        fontSize: 16,
        fontWeight: '500',
    },
    orderValue: {
        fontSize: 16,
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

export default PaymentSuccessScreen; 