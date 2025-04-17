import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { LoadingIndicator } from '@/presentation/components/LoadingIndicator';

import { applyVoucher, fetchListApplyVoucher } from '@/services/voucher';
import Toast from 'react-native-toast-message';
import { ArrowLeft, Check, Ticket } from 'lucide-react-native';

interface Voucher {
    id: string;
    name: string;
    discountValue: number;
    endDate: string;
    isValid: boolean;
}

interface VoucherScreenProps {
    cartDetails?: Array<{
        productId: number;
        discount: number;
        quantity: number;
        price: number;
        productName: string;
    }>;
    onSelectVoucher?: (voucherId: string) => void;
}

export default function VoucherScreen({ cartDetails, onSelectVoucher }: VoucherScreenProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [selectedVoucher, setSelectedVoucher] = useState<string>('');
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
        try {
            const res = await fetchListApplyVoucher(formattedDetails);
            if (res?.result) {
                setVouchers(res.result);
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error fetching vouchers',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVouchers();
    }, []);

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
                onSelectVoucher?.(voucherCode);
                Toast.show({
                    type: 'success',
                    text1: 'Voucher applied successfully',
                });
                fetchVouchers();
            } else {
                Toast.show({
                    type: 'error',
                    text1: response?.message,
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error applying voucher',
            });
        } finally {
            setApplyLoading(false);
        }
    };

    const validVouchers = vouchers.filter(voucher => voucher.isValid);
    const invalidVouchers = vouchers.filter(voucher => !voucher.isValid);

    if (loading) {
        return <LoadingIndicator fullScreen />;
    }

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Pressable onPress={() => router.back()}>
                            <ArrowLeft size={24} color={colors.text} />
                        </Pressable>
                        <Text style={styles.title}>Select Voucher</Text>
                    </View>

                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Enter voucher code"
                            value={voucherCode}
                            onChangeText={setVoucherCode}
                        />
                        <Pressable
                            style={styles.applyButton}
                            onPress={handleApplyVoucher}
                            disabled={!voucherCode.trim() || applyLoading}
                        >
                            <Text style={styles.applyButtonText}>
                                {applyLoading ? 'Applying...' : 'Apply'}
                            </Text>
                        </Pressable>
                    </View>

                    <View style={styles.voucherList}>
                        <Text style={styles.sectionTitle}>Available Vouchers</Text>

                        {validVouchers.length > 0 && (
                            <View style={styles.voucherSection}>
                                <Text style={styles.validTitle}>Valid Vouchers</Text>
                                {validVouchers.map((voucher) => (
                                    <Pressable
                                        key={voucher.id}
                                        style={[
                                            styles.voucherItem,
                                            selectedVoucher === voucher.id && styles.selectedVoucher
                                        ]}
                                        onPress={() => setSelectedVoucher(voucher.id)}
                                    >
                                        <View style={styles.voucherInfo}>
                                            <Ticket size={40} color={colors.primary} />
                                            <View style={styles.voucherDetails}>
                                                <Text style={styles.voucherName}>{voucher.name}</Text>
                                                <Text style={styles.voucherValue}>
                                                    Minimum order: {voucher.discountValue}
                                                </Text>
                                                <Text style={styles.voucherDate}>
                                                    End date: {new Date(voucher.endDate).toLocaleDateString()}
                                                </Text>
                                            </View>
                                            <View style={styles.radioButton}>
                                                {selectedVoucher === voucher.id && (
                                                    <Check size={20} color={colors.primary} />
                                                )}
                                            </View>
                                        </View>
                                    </Pressable>
                                ))}
                            </View>
                        )}

                        {invalidVouchers.length > 0 && (
                            <View style={styles.voucherSection}>
                                <Text style={styles.invalidTitle}>Invalid Vouchers</Text>
                                {invalidVouchers.map((voucher) => (
                                    <View key={voucher.id} style={[styles.voucherItem, styles.invalidVoucher]}>
                                        <View style={styles.voucherInfo}>
                                            <Ticket size={40} color={colors.overlay} />
                                            <View style={styles.voucherDetails}>
                                                <Text style={styles.voucherName}>{voucher.name}</Text>
                                                <Text style={styles.voucherValue}>
                                                    Minimum order: {voucher.discountValue}
                                                </Text>
                                                <Text style={styles.voucherDate}>
                                                    End date: {new Date(voucher.endDate).toLocaleDateString()}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>

                    <Pressable
                        style={styles.confirmButton}
                        disabled={!selectedVoucher}
                        onPress={() => {
                            onSelectVoucher?.(selectedVoucher);
                            router.back();
                        }}
                    >
                        <Text style={styles.confirmButtonText}>Confirm</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text,
        marginLeft: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 24,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: colors.text,
    },
    applyButton: {
        backgroundColor: colors.primary,
        padding: 12,
        borderRadius: 8,
        justifyContent: 'center',
    },
    applyButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
    voucherList: {
        gap: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 16,
    },
    voucherSection: {
        gap: 16,
    },
    validTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.success,
    },
    invalidTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.error,
    },
    voucherItem: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        padding: 16,
    },
    selectedVoucher: {
        borderColor: colors.primary,
        backgroundColor: colors.background,
    },
    invalidVoucher: {
        opacity: 0.5,
    },
    voucherInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    voucherDetails: {
        flex: 1,
        gap: 4,
    },
    voucherName: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
    },
    voucherValue: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    voucherDate: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmButton: {
        backgroundColor: colors.primary,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 24,
    },
    confirmButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
}); 