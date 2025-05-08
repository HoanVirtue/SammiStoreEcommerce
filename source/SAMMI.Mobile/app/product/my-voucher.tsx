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
    Platform
} from 'react-native';
import Toast from 'react-native-toast-message';
import { format } from 'date-fns';
import { TicketIcon, CopyIcon } from 'lucide-react-native';

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
                        <Text style={styles.voucherName}>{voucher.name}</Text>
                    </View>

                    <View style={styles.codeRow}>
                        <Text style={styles.label}>Mã:</Text>
                        <Text style={styles.codeText}>{voucher.code}</Text>
                        <TouchableOpacity 
                            onPress={() => copyToClipboard(voucher.code)}
                            style={styles.copyButton}
                        >
                            <CopyIcon size={16} color="#666" />
                        </TouchableOpacity>
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
                            <Text style={styles.conditionsText}>{voucher.conditions}</Text>
                        </View>
                    )}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Voucher của tôi</Text>
            <FlatList
                data={vouchers}
                renderItem={renderVoucherCard}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        margin: 16,
        padding: 16,
        backgroundColor: '#ffebee',
        borderRadius: 8,
    },
    errorText: {
        color: '#d32f2f',
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
    },
    card: {
        width: CARD_WIDTH,
        margin: 8,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    statusBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        zIndex: 1,
    },
    statusText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
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
    },
    codeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        color: '#666',
    },
    codeText: {
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 4,
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
        fontSize: 14,
        fontWeight: '500',
        color: '#1976d2',
        marginLeft: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 12,
    },
    dateRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    dateText: {
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 4,
    },
    conditionsContainer: {
        marginTop: 8,
    },
    conditionsText: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 4,
    },
});

export default MyVouchersPage;
