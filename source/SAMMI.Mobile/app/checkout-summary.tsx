import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { LoadingIndicator } from '@/presentation/components/LoadingIndicator';
import { getProductDetail } from '@/services/product';
import { TProduct } from '@/types/product';
import { formatPrice } from '@/utils';
import { ArrowLeft } from 'lucide-react-native';
interface CheckoutSummaryProps {
    totalPrice: number;
    shippingPrice: number;
    voucherDiscount: number;
    selectedProduct: Array<{
        productId: number;
        discount: number;
        quantity: number;
        price: number;
        productName: string;
        images?: Array<{ imageUrl: string }>;
    }>;
    loading?: boolean;
    onSubmit?: () => void;
}

export default function CheckoutSummary({
    totalPrice,
    shippingPrice,
    voucherDiscount,
    selectedProduct,
    loading,
    onSubmit
}: CheckoutSummaryProps) {
    const router = useRouter();
    const [productDetails, setProductDetails] = useState<Record<number, TProduct>>({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProductDetails = async () => {
            setIsLoading(true);
            const details: Record<number, TProduct> = {};
            for (const product of selectedProduct) {
                try {
                    const response = await getProductDetail(product.productId);
                    if (response?.result) {
                        details[product.productId] = response.result;
                    }
                } catch (error) {
                    console.error('Error fetching product details:', error);
                }
            }
            setProductDetails(details);
            setIsLoading(false);
        };

        if (selectedProduct?.length > 0) {
            fetchProductDetails();
        }
    }, [selectedProduct]);

    if (loading || isLoading) {
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
                        <Text style={styles.title}>Order Summary</Text>
                    </View>

                    <View style={styles.summaryContainer}>
                        {selectedProduct?.length > 0 && (
                            <>
                                {selectedProduct.map((product) => {
                                    const productDetail = productDetails[product.productId];
                                    return (
                                        <View key={product.productId} style={styles.productItem}>
                                            <Image
                                                source={{ uri: productDetail?.images?.[0]?.imageUrl || product.images?.[0]?.imageUrl }}
                                                style={styles.productImage}
                                            />
                                            <View style={styles.productInfo}>
                                                <Text style={styles.productName} numberOfLines={1}>
                                                    {product.productName}
                                                </Text>
                                                <Text style={styles.productPrice}>
                                                    {formatPrice(product.price)}
                                                </Text>
                                            </View>
                                            <Text style={styles.productQuantity}>
                                                x{product.quantity}
                                            </Text>
                                        </View>
                                    );
                                })}

                                <View style={styles.divider} />
                            </>
                        )}

                        <View style={styles.priceDetails}>
                            <View style={styles.priceRow}>
                                <Text style={styles.priceLabel}>Subtotal</Text>
                                <Text style={styles.priceValue}>{formatPrice(totalPrice)}</Text>
                            </View>

                            <View style={styles.priceRow}>
                                <Text style={styles.priceLabel}>Shipping Fee</Text>
                                <Text style={styles.priceValue}>+{formatPrice(shippingPrice)}</Text>
                            </View>

                            <View style={styles.priceRow}>
                                <Text style={styles.priceLabel}>Discount</Text>
                                <Text style={styles.priceValue}>-{formatPrice(voucherDiscount)}</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>
                                {formatPrice(Number(totalPrice) + Number(shippingPrice) - Number(voucherDiscount))}
                            </Text>
                        </View>

                        <Pressable
                            style={styles.placeOrderButton}
                            onPress={onSubmit}
                        >
                            <Text style={styles.placeOrderText}>Place Order</Text>
                        </Pressable>
                    </View>
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
    summaryContainer: {
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.border,
    },
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    productImage: {
        width: 64,
        height: 64,
        borderRadius: 8,
        backgroundColor: colors.background,
    },
    productInfo: {
        flex: 1,
        marginLeft: 16,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
    },
    productPrice: {
        fontSize: 14,
        color: colors.textSecondary,
        marginTop: 4,
    },
    productQuantity: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: 16,
    },
    priceDetails: {
        gap: 8,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    priceLabel: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    priceValue: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary,
    },
    placeOrderButton: {
        backgroundColor: colors.primary,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 24,
    },
    placeOrderText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
}); 