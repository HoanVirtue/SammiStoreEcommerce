import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { ROUTE_CONFIG } from '@/configs/route';
import { useLocalSearchParams } from 'expo-router';
import { formatPrice } from '@/utils';
import { CheckCircle } from 'lucide-react-native';
import { colors } from '@/constants/colors';

const VnPayScreen = () => {
    const router = useRouter();
    const theme = useTheme();
    const params = useLocalSearchParams();

    const paymentMethod = params.paymentMethod as string;

    const handleGoToHome = () => {
        router.push('/' as never);
    };

    const handleGoToOrders = () => {
        router.push('/my-order' as never);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <CheckCircle size={80} color={colors.primary} />
                </View>

                <Text style={[styles.title, { color: theme.colors.text }]}>
                    Đặt hàng thành công
                </Text>

                <Text style={[styles.description, { color: theme.colors.text }]}>
                    Chúc mừng quý khách hàng đã đặt hàng tại Sammi Stores. Nhân viên của chúng tôi sẽ liên hệ lại quý khách hàng khi đơn hàng được xác nhận. Quý khách hàng có thể theo dõi bằng cách đăng nhập và theo dõi đơn hàng trên ứng dụng của chúng tôi.
                </Text>


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

export default VnPayScreen; 