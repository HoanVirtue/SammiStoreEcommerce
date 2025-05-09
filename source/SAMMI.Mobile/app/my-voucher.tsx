import { getMyVouchers } from '@/services/voucher';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Clipboard,
    Dimensions,
    Platform,
    StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { format } from 'date-fns';
import { TicketIcon, CopyIcon, ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';

interface Voucher {
    id: number;
    code: string;
    name: string;
    discountTypeId: number;
    discountName: string | null;
    eventId: number;
    eventName: string | null;
    discountValue: number;
    usageLimit: number;
    usedCount: number;
    startDate: string;
    endDate: string;
    conditions: any | null;
    createdDate: string;
    updatedDate: string;
    createdBy: string;
    updatedBy: string;
    isActive: boolean;
    isDeleted: boolean;
    displayOrder: number;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 cards per row with spacing

const MyVouchersPage = () => {

    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchMyVouchers();
    }, []);

    const fetchMyVouchers = async () => {
        setLoading(true);
        try {
            const response = await getMyVouchers({ params: {} });
            if (response.isSuccess) {
                setVouchers(response.result);
            } else {
                setError(response.message || 'Lỗi khi lấy danh sách voucher');
            }
        } catch (err) {
            setError('Lỗi khi lấy danh sách voucher');
            console.error('Error fetching vouchers:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
        } catch (error) {
            return dateString;
        }
    };

    const getDiscountText = (voucher: Voucher) => {
        switch (voucher.discountTypeId) {
            case 1: 
                return `${voucher.discountValue}%`;
            case 2: 
                return `${voucher.discountValue.toLocaleString()}đ`;
            case 3: 
                return 'Miễn phí vận chuyển';
            default:
                return `${voucher.discountValue}`;
        }
    };

    const getVoucherStatus = (voucher: Voucher) => {
        const now = new Date();
        const endDate = new Date(voucher.endDate);
        const startDate = new Date(voucher.startDate);
        const oneDayFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        
        if (now > endDate) {
            return { label: 'Hết hạn', color: '#d32f2f' };
        }
        
        if (voucher.usedCount >= voucher.usageLimit) {
            return { label: 'Đã sử dụng hết', color: '#ed6c02' };
        }

        if (startDate <= oneDayFromNow && startDate > now) {
            return { label: 'Mới', color: '#2e7d32' };
        }
        
        return null;
    };

    const copyToClipboard = (code: string) => {
        Clipboard.setString(code);
        Toast.show({
            type: 'success',
            text1: 'Đã copy'
        });
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    if (vouchers.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <TicketIcon size={60} color="#666" />
                <Text style={styles.emptyText}>Bạn chưa có voucher nào</Text>
            </View>
        );
    }

    const renderVoucherCard = ({ item: voucher }: { item: Voucher }) => {
        const status = getVoucherStatus(voucher);
        
        return (
            <View style={styles.card}>
                {status && (
                    <View style={[styles.statusBadge, { backgroundColor: status.color }]}>
                        <Text style={styles.statusText}>{status.label}</Text>
                    </View>
                )}
                
                <View style={styles.cardContent}>
                    <View style={styles.headerRow}>
                        <TicketIcon size={24} color="#1976d2" />
                        <Text style={styles.voucherName} numberOfLines={2} ellipsizeMode="tail">{voucher.name}</Text>
                    </View>

                    <View style={styles.codeRow}>
                        <View style={styles.codeTextContainer}>
                            <Text style={styles.codeText} numberOfLines={1} ellipsizeMode="tail">{voucher.code}</Text>
                            <TouchableOpacity 
                                onPress={() => copyToClipboard(voucher.code)}
                                style={styles.copyButton}
                            >
                                <CopyIcon size={16} color="#666" />
                            </TouchableOpacity>
                        </View>
                        
                    </View>

                    <View style={styles.discountRow}>
                        <Text style={styles.label}>Giảm giá:</Text>
                        <Text style={styles.discountText}>{getDiscountText(voucher)}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.dateRow}>
                        <Text style={styles.label}>Ngày bắt đầu:</Text>
                        <Text style={styles.dateText}>{formatDate(voucher.startDate)}</Text>
                    </View>

                    <View style={styles.dateRow}>
                        <Text style={styles.label}>Ngày hết hạn:</Text>
                        <Text style={styles.dateText}>{formatDate(voucher.endDate)}</Text>
                    </View>

                    {voucher.conditions && (
                        <View style={styles.conditionsContainer}>
                            <Text style={styles.label}>Điều kiện:</Text>
                            <Text style={styles.conditionsText} numberOfLines={2} ellipsizeMode="tail">{voucher.conditions}</Text>
                        </View>
                    )}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.navbar}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <ArrowLeft size={24} color="#D81B60" />
                </TouchableOpacity>
                <Text style={styles.navTitle}>Voucher của tôi</Text>
                <View style={styles.placeholder} />
            </View>
            <View style={styles.container}>
                <FlatList
                    data={vouchers}
                    renderItem={renderVoucherCard}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF5F5', // Màu nền nhẹ nhàng, phù hợp với mỹ phẩm
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 16,
        paddingHorizontal: 16,
        color: colors.primary, // Màu hồng sang trọng
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        margin: 16,
        padding: 16,
        backgroundColor: '#FFEBEE',
        borderRadius: 12,
    },
    errorText: {
        color: '#D32F2F',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
    },
    listContainer: {
        paddingBottom: 16,
        paddingHorizontal: 8,
    },
    card: {
        width: CARD_WIDTH,
        margin: 8,
        backgroundColor: 'white',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#FFE4E1',
    },
    statusBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        zIndex: 1,
    },
    statusText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    cardContent: {
        padding: 16,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    voucherName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
        color: colors.primary,
        flexShrink: 1,
        flexWrap: 'wrap',
        maxWidth: '80%',
    },
    codeRow: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 8,
        backgroundColor: '#FFF0F5',
        padding: 2,
        borderRadius: 8,
        flexWrap: 'nowrap',
    },
    label: {
        fontSize: 14,
        color: '#666',
    },
    codeText: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 4,
        color: colors.primary,
        flexShrink: 1,
        maxWidth: 120,
    },
    copyButton: {
        marginLeft: 4,
        padding: 4,
    },
    discountRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    discountText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.primary,
        marginLeft: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#FFE4E1',
        marginVertical: 12,
    },
    dateRow: {
        flexDirection: 'column',
        marginBottom: 8,
    },
    dateText: {
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 4,
        color: '#666',
    },
    conditionsContainer: {
        marginTop: 8,
        backgroundColor: '#FFF0F5',
        padding: 8,
        borderRadius: 8,
    },
    conditionsText: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 4,
        color: '#666',
        flexShrink: 1,
        flexWrap: 'wrap',
    },
    codeTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: '#FFF5F5',
    },
    backButton: {
        padding: 8,
    },
    navTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary,
    },
    placeholder: {
        width: 40, // Để cân bằng với backButton
    },
});

export default MyVouchersPage;
