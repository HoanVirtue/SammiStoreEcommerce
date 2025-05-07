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
import { CheckCircle, XCircle } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { LoadingIndicator } from '@/presentation/components/LoadingIndicator';

const VnPayScreen = () => {
    const router = useRouter();
    const theme = useTheme();

    const handleGoToHome = () => {
        router.replace('/(tabs)');
    };

    const handleGoToOrders = () => {
        router.replace('/my-order' as any);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <CheckCircle size={80} color={colors.success} />
                </View>
                <Text style={[styles.title, { color: theme.colors.text }]}>
                    Thanh toán thành công
                </Text>
                <Text style={[styles.description, { color: theme.colors.text }]}>
                    Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi. Đơn hàng của quý khách đã được xác nhận và đang được xử lý.
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