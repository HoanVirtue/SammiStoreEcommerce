import { AppDispatch, RootState } from "@/stores"
import { PAYMENT_METHOD } from "@/configs/payment"
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '@/hooks/useAuth';
import { getMyOrderDetail } from '@/services/order';
import { PaymentStatus, ShippingStatus, OrderStatus } from '@/configs/order';
import { TOrderDetail, TOrderItem } from '@/types/order';
import { createVNPayPaymentUrl } from '@/services/payment';

import { resetInitialState } from '@/stores/order';
import Toast from "react-native-toast-message";
import { formatPrice } from "@/utils";
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from "@/constants/colors";
import WriteReviewModal from "@/presentation/components/WriteReviewModal";


type TProps = {}

const getPaymentStatus = (status: string) => {
    switch (status) {
        case PaymentStatus.Pending.label:
            return 'Chờ thanh toán';
        case PaymentStatus.Paid.label:
            return 'Đã thanh toán';
        case PaymentStatus.Failed.label:
            return 'Thanh toán thất bại';
        default:
            return '';
    }
}

const getShippingStatus = (status: string) => {
    switch (status) {
        case ShippingStatus.NotShipped.label:
            return 'Chưa giao hàng';
        case ShippingStatus.Processing.label:
            return 'Đang xử lý';
        case ShippingStatus.Delivered.label:
            return 'Đã giao hàng';
        case ShippingStatus.Lost.label:
            return 'Mất hàng';
        default:
            return '';
    }
}

const getOrderStatus = (status: string) => {
    switch (status) {
        case OrderStatus.Pending.label:
            return 'Chờ xử lý';
        case OrderStatus.WaitingForPayment.label:
            return 'Chờ thanh toán';
        case OrderStatus.Processing.label:
            return 'Đang xử lý';
        case OrderStatus.Completed.label:
            return 'Hoàn thành';
        case OrderStatus.Cancelled.label:
            return 'Đã hủy';
        default:
            return '';
    }
}

const MyOrderDetailPage: React.FC<TProps> = () => {
    //States
    const [orderData, setOrderData] = useState<TOrderItem>({} as any)
    const [isLoading, setIsLoading] = useState(false)
    const [openReview, setOpenReview] = useState({
        open: false,
        userId: 0,
        productId: 0
    })
    const [openCancelDialog, setOpenCancelDialog] = useState<boolean>(false)
    const paymentData = PAYMENT_METHOD()

    //hooks
    const { user } = useAuth()
    const router = useRouter()
    const params = useLocalSearchParams();
    const orderId = typeof params.orderId === 'string' ? +params.orderId : 0
    const orderCode = typeof params.orderCode === 'string' ? params.orderCode : ''

    console.log("orderId", orderId)
    console.log("orderCode", orderCode)

    //Dispatch
    const dispatch: AppDispatch = useDispatch()
    const { isSuccessCancel, isErrorCancel, errorMessageCancel } = useSelector((state: RootState) => state.order)
    const { isSuccessCreate, isErrorCreate, errorMessageCreate } = useSelector((state: RootState) => state.review)

    //Fetch API
    const handleGetOrderDetail = async () => {
        setIsLoading(true)
        await getMyOrderDetail(orderCode).then((res) => {
            setIsLoading(false)
            setOrderData(res?.result)
        })
    }

    const handlePaymentMethod = (type: string) => {
        switch (type) {
            case paymentData.VN_PAYMENT.value: {
                handlePaymentVNPay()
                break
            }
            default:
                break
        }
    }

    const handlePaymentVNPay = async () => {
        setIsLoading(true)
        await createVNPayPaymentUrl({
            totalPrice: orderData.totalPrice,
            orderId: orderData.id,
            language: "vn"
        }).then((res) => {
            if (res.data) {
                // Handle opening payment URL in React Native
                // You might want to use Linking from react-native
                // Linking.openURL(res.data);
            }
            setIsLoading(false)
        })
    }

    useEffect(() => {
        if (orderCode) {
            handleGetOrderDetail()
        }
    }, [orderCode])

    useEffect(() => {
        if (isSuccessCancel) {
            Toast.show({
                type: 'success',
                text1: "Hủy đơn hàng thành công"
            })
            handleGetOrderDetail()
            dispatch(resetInitialState())
        } else if (isErrorCancel && errorMessageCancel) {
            Toast.show({
                type: 'error',
                text1: errorMessageCancel
            })
            dispatch(resetInitialState())
        }
    }, [isSuccessCancel, isErrorCancel, errorMessageCancel])

    useEffect(() => {
        if (isSuccessCreate) {
            Toast.show({
                type: 'success',
                text1: "Đánh giá sản phẩm thành công"
            })
            handleGetOrderDetail()
            dispatch(resetInitialState())
            setOpenReview({ open: false, userId: 0, productId: 0 })
        } else if (isErrorCreate && errorMessageCreate) {
            Toast.show({
                type: 'error',
                text1: errorMessageCreate
            })
            dispatch(resetInitialState())
        }
    }, [isSuccessCreate, isErrorCreate, errorMessageCreate])

    return (
        <View style={styles.container}>
            <WriteReviewModal
                open={openReview.open}
                orderId={orderId}
                orderDetails={orderData?.details || []}
                onClose={() => setOpenReview({ open: false, userId: 0, productId: 0 })}
            />
            <ScrollView style={styles.scrollView}>
                {/* Order Status Stepper */}
                
                {/* Customer Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Tên khách hàng:</Text>
                        <Text style={styles.value}>{orderData?.customerName}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Số điện thoại:</Text>
                        <Text style={styles.value}>{orderData?.phoneNumber}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Địa chỉ:</Text>
                        <Text style={[styles.value, styles.addressText]}>{orderData?.customerAddress}</Text>
                    </View>
                </View>

                {/* Order Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Thông tin đơn hàng</Text>
                    {orderData?.details?.map((item: TOrderDetail, index: number) => (
                        <View key={index} style={styles.orderItem}>
                            <Image
                                source={{ uri: item.imageUrl || '/public/svgs/placeholder.svg' }}
                                style={styles.productImage}
                            />
                            <View style={styles.productInfo}>
                                <TouchableOpacity onPress={() => router.push(`/product/${item.productId}`)}>
                                    <Text style={styles.productName}>{item.productName}</Text>
                                </TouchableOpacity>
                                <Text style={styles.quantity}>x{item.quantity}</Text>
                            </View>
                            <Text style={styles.price}>{formatPrice(item.price)}</Text>
                        </View>
                    ))}

                    <View style={styles.divider} />

                    <View style={styles.priceSummary}>
                        <View style={styles.priceRow}>
                            <Text style={styles.priceLabel}>Tạm tính</Text>
                            <Text style={styles.priceValue}>{formatPrice(orderData?.totalPrice)}</Text>
                        </View>
                        <View style={styles.priceRow}>
                            <Text style={styles.priceLabel}>Phí vận chuyển</Text>
                            <Text style={styles.priceValue}>{formatPrice(orderData?.costShip || 0)}</Text>
                        </View>
                        <View style={styles.priceRow}>
                            <Text style={styles.priceLabel}>Giảm giá</Text>
                            <Text style={styles.priceValue}>{formatPrice(orderData?.discount || 0)}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.priceRow}>
                            <Text style={styles.totalLabel}>Tổng cộng</Text>
                            <Text style={styles.totalValue}>
                                {formatPrice(orderData?.totalPrice + (orderData?.costShip || 0) - (orderData?.discount || 0))}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Payment & Delivery Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Thông tin thanh toán & giao hàng</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Phương thức thanh toán:</Text>
                        <Text style={styles.value}>{orderData?.paymentMethod}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Trạng thái thanh toán:</Text>
                        <Text style={styles.value}>{getPaymentStatus(orderData?.paymentStatus)}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Phương thức giao hàng:</Text>
                        <Text style={styles.value}>{orderData?.deliveryMethod || 'GHN'}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Trạng thái giao hàng:</Text>
                        <Text style={styles.value}>{getShippingStatus(orderData?.shippingStatus)}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Trạng thái đơn hàng:</Text>
                        <Text style={styles.value}>{getOrderStatus(orderData?.orderStatus)}</Text>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    {(orderData?.orderStatus === OrderStatus.Pending.label
                        || orderData?.orderStatus === OrderStatus.WaitingForPayment.label) &&
                        orderData?.paymentStatus !== PaymentStatus.Paid.label
                        && orderData?.paymentMethod === 'VNPay' && (
                            <TouchableOpacity
                                style={[styles.button, styles.paymentButton]}
                                onPress={() => handlePaymentMethod(orderData.paymentMethod)}
                            >
                                <MaterialIcons name="payment" size={20} color="#fff" />
                                <Text style={styles.buttonText}>Thanh toán</Text>
                            </TouchableOpacity>
                        )}
                    {(orderData?.orderStatus === OrderStatus.WaitingForPayment.label || orderData?.orderStatus === OrderStatus.Pending.label) &&
                        orderData?.paymentMethod !== 'VNPay' && (
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={() => setOpenCancelDialog(true)}
                            >
                                <MaterialIcons name="cancel" size={20} color="#fff" />
                                <Text style={styles.buttonText}>Hủy đơn hàng</Text>
                            </TouchableOpacity>
                        )}
                    {orderData?.orderStatus === OrderStatus.Completed.label && (
                        <TouchableOpacity
                            style={[styles.button, styles.reviewButton]}
                            onPress={() => setOpenReview({
                                open: true,
                                userId: user?.id || 0,
                                productId: orderData?.details?.[0]?.productId || 0
                            })}
                        >
                            <MaterialIcons name="star" size={20} color="#fff" />
                            <Text style={styles.buttonText}>Đánh giá sản phẩm</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollView: {
        flex: 1,
        padding: 16,
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 8,
        minWidth: 100,
    },
    value: {
        fontSize: 14,
        color: '#666',
        flex: 1,
    },
    addressText: {
        flexWrap: 'wrap',
    },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    productImage: {
        width: 64,
        height: 64,
        borderRadius: 8,
        marginRight: 12,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        marginBottom: 4,
    },
    quantity: {
        fontSize: 14,
        color: '#666',
    },
    price: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 12,
    },
    priceSummary: {
        marginTop: 8,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    priceLabel: {
        fontSize: 14,
        color: '#666',
    },
    priceValue: {
        fontSize: 14,
        color: '#333',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    totalValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
        marginTop: 16,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        gap: 8,
    },
    paymentButton: {
        backgroundColor: '#f44336',
    },
    cancelButton: {
        backgroundColor: '#f44336',
    },
    reviewButton: {
        backgroundColor: colors.primary,
        marginBottom: 36
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
});

export default MyOrderDetailPage;
