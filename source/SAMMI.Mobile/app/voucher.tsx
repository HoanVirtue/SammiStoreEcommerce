import React, { useEffect, useState } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    ActivityIndicator,
    Platform,
    StatusBar
} from 'react-native';
import { useDispatch } from 'react-redux';

import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Ticket } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Button } from '@/presentation/components/Button';
import { applyVoucher, fetchListApplyVoucher } from '@/services/voucher';
import { TParamsVouchers } from '@/types/voucher';

type VoucherModalProps = {
    open: boolean;
    onClose: () => void;
    onSelectVoucher: (voucherId: number) => void;
    cartDetails?: Array<{
        productId: number;
        discount: number;
        quantity: number;
        price: number;
        productName: string;
    }>;
};

const VoucherModal = ({ open, onClose, onSelectVoucher, cartDetails }: VoucherModalProps) => {
    //Redux
    const dispatch = useDispatch();

    //State
    const [vouchers, setVouchers] = useState([]);
    const [selectedVoucher, setSelectedVoucher] = useState('');
    const [loading, setLoading] = useState(false);
    const [voucherCode, setVoucherCode] = useState('');
    const [applyLoading, setApplyLoading] = useState(false);

    const fetchVouchers = async () => {
        setLoading(true);
        const formattedDetails = {
            details: cartDetails?.map(item => ({
                cartId: 0,
                productId: Number(item.productId),
                productName: item.productName,
                price: Number(item.price),
                quantity: Number(item.quantity),
            })) || []
        };
        await fetchListApplyVoucher(formattedDetails)
            .then((res) => {
                const data = res?.result;
                if (data) {
                    setVouchers(data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchVouchers();
    }, []);

    const validVouchers = vouchers.filter((voucher: TParamsVouchers) => voucher.isValid);
    const invalidVouchers = vouchers.filter((voucher: TParamsVouchers) => !voucher.isValid);

    const handleApplyVoucher = async () => {
        if (!voucherCode.trim()) return;

        setApplyLoading(true);
        try {
            const formattedDetails = {
                details: cartDetails?.map(item => ({
                    cartId: 0,
                    productId: Number(item.productId),
                    productName: item.productName,
                    price: Number(item.price),
                    quantity: Number(item.quantity),
                })) || []
            };

            const response = await applyVoucher(voucherCode, formattedDetails);
            if (response?.isSuccess) {
                onSelectVoucher(Number(voucherCode));
                Toast.show({
                    type: 'success',
                    text1: 'Áp dụng mã giảm giá thành công'
                });
                fetchVouchers();
            } else {
                Toast.show({
                    type: 'error',
                    text1: response?.message || 'Có lỗi xảy ra khi áp dụng mã giảm giá'
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Có lỗi xảy ra khi áp dụng mã giảm giá'
            });
        } finally {
            setApplyLoading(false);
        }
    };

    return (
        <Modal
            visible={open}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <SafeAreaView style={styles.modalContainer}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Chọn mã giảm giá</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <X size={24} color={colors.text} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.content}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập mã giảm giá"
                                value={voucherCode}
                                onChangeText={setVoucherCode}
                            />
                            <Button
                                title={applyLoading ? 'Đang áp dụng...' : 'Áp dụng'}
                                onPress={handleApplyVoucher}
                                disabled={!voucherCode.trim() || applyLoading}
                                loading={applyLoading}
                                style={styles.applyButton}
                            />
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.voucherSection}>
                            <Text style={styles.sectionTitle}>Mã giảm giá SAMMI</Text>

                            {loading ? (
                                <ActivityIndicator size="large" color={colors.primary} />
                            ) : (
                                <>
                                    {/* Valid Vouchers */}
                                    {validVouchers.length > 0 && (
                                        <View style={styles.voucherList}>
                                            <Text style={[styles.voucherType, { color: colors.success }]}>
                                                Mã giảm giá hợp lệ
                                            </Text>
                                            {validVouchers.map((voucher: TParamsVouchers) => (
                                                <TouchableOpacity
                                                    key={voucher.id}
                                                    style={[
                                                        styles.voucherItem,
                                                        selectedVoucher === voucher.voucherId.toString() && styles.selectedVoucher
                                                    ]}
                                                    onPress={() => setSelectedVoucher(voucher.voucherId.toString())}
                                                >
                                                    <View style={styles.voucherContent}>
                                                        <Ticket size={40} color={colors.primary} />
                                                        <View style={styles.voucherInfo}>
                                                            <Text style={styles.voucherName}>{voucher.name}</Text>
                                                            <Text style={styles.voucherDetail}>
                                                                Đơn hàng tối thiểu: {voucher.discountValue}
                                                            </Text>
                                                            <Text style={styles.voucherDetail}>
                                                                Hết hạn: {new Date(voucher.endDate).toLocaleDateString()}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    )}

                                    {/* Invalid Vouchers */}
                                    {invalidVouchers.length > 0 && (
                                        <View style={styles.voucherList}>
                                            <Text style={[styles.voucherType, { color: colors.error }]}>
                                                Mã giảm giá không hợp lệ
                                            </Text>
                                            {invalidVouchers.map((voucher: TParamsVouchers) => (
                                                <View
                                                    key={voucher.id}
                                                    style={[styles.voucherItem, styles.invalidVoucher]}
                                                >
                                                    <View style={styles.voucherContent}>
                                                        <Ticket size={40} color={colors.textSecondary} />
                                                        <View style={styles.voucherInfo}>
                                                            <Text style={[styles.voucherName, styles.invalidText]}>
                                                                {voucher.name}
                                                            </Text>
                                                            <Text style={[styles.voucherDetail, styles.invalidText]}>
                                                                Đơn hàng tối thiểu: {voucher.discountValue}
                                                            </Text>
                                                            <Text style={[styles.voucherDetail, styles.invalidText]}>
                                                                Hết hạn: {new Date(voucher.endDate).toLocaleDateString()}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </>
                            )}
                        </View>
                    </ScrollView>

                    <View style={styles.footer}>
                        <Button
                            title="Hủy"
                            onPress={onClose}
                            variant="outline"
                            style={styles.footerButton}
                        />
                        <Button
                            title="Xác nhận"
                            onPress={() => {
                                onSelectVoucher(Number(selectedVoucher));
                                onClose();
                            }}
                            disabled={!selectedVoucher}
                            style={styles.footerButton}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        flex: 1,
        backgroundColor: colors.background,
        marginTop: Platform.OS === 'ios' ? 0 : 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
    },
    closeButton: {
        padding: 4,
    },
    content: {
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 16,
        gap: 8,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        paddingHorizontal: 12,
        color: colors.text,
    },
    applyButton: {
        minWidth: 100,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginHorizontal: 16,
    },
    voucherSection: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
        color: colors.text,
    },
    voucherList: {
        marginBottom: 16,
    },
    voucherType: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    voucherItem: {
        padding: 12,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        marginBottom: 8,
    },
    selectedVoucher: {
        borderColor: colors.primary,
    },
    invalidVoucher: {
        opacity: 0.5,
    },
    voucherContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    voucherInfo: {
        flex: 1,
    },
    voucherName: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text,
        marginBottom: 4,
    },
    voucherDetail: {
        fontSize: 12,
        color: colors.textSecondary,
    },
    invalidText: {
        color: colors.textSecondary,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        gap: 8,
    },
    footerButton: {
        flex: 1,
    },
});

export default VoucherModal;
