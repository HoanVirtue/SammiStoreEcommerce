"use client"

import { useAuth } from '@/hooks/useAuth'
import { createCartAsync, getCartsAsync } from '@/stores/cart/action'
import { TOrderDetail, TOrderItem } from '@/types/order'
import { useRouter } from 'expo-router'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/stores'
import { useDispatch } from 'react-redux'
import { colors } from '@/constants/colors'

//React
import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native'
import { cancelOrderAsync } from '@/stores/order/action'
import Toast from 'react-native-toast-message'
import { ROUTE_CONFIG } from '@/configs/route'
import { OrderStatus, PaymentStatus } from '@/configs/order'
import { formatPrice } from '@/utils'
import { createPayBackOrder } from '@/services/order'
import ConfirmDialog from './ConfirmModal'


type TProps = {
    orderData: TOrderItem
}

const OrderCard: React.FC<TProps> = ({ orderData }) => {
    const [openCancelDialog, setOpenCancelDialog] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const { user } = useAuth()
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()

    const { isSuccessCancel, isSuccessCreate, errorMessageCancel, errorMessageCreate } = useSelector((state: RootState) => state.order)
    const { isSuccessCreate: isSuccessCreateCart, errorMessageCreate: errorMessageCreateCart } = useSelector((state: RootState) => state.cart)

    const memoDisableBuyAgain = useMemo(() => {
        return orderData.details?.some((item: TOrderDetail) => !item.quantity)
    }, [orderData.details])

    const handleConfirm = useCallback(() => {
        dispatch(cancelOrderAsync(orderData.code))
        .then((res) => {
            console.log("res : ", res)
        })
    }, [dispatch, orderData.code])

    const handleBuyAgain = useCallback(async () => {
        let hasError = false
        for (const item of orderData.details || []) {
            try {
                await dispatch(
                    createCartAsync({
                        cartId: 0,
                        productId: item.productId,
                        quantity: item.quantity,
                        operation: 0,
                    })
                ).unwrap()

                if (isSuccessCreateCart) {
                    hasError = false
                    Toast.show({
                        type: 'success',
                        text1: 'Thêm sản phẩm vào giỏ hàng thành công'
                    })
                    break
                }
            } catch (error) {
                hasError = true
                Toast.show({
                    type: 'error',
                    text1: errorMessageCreateCart
                })
                break
            }
        }

        if (!hasError) {
            await dispatch(
                getCartsAsync({
                    params: {
                        take: -1,
                        skip: 0,
                        paging: false,
                        orderBy: 'name',
                        dir: 'asc',
                        keywords: "''",
                        filters: '',
                    },
                })
            )
            router.push('(tabs)/cart' as any)
        }
    }, [dispatch, orderData.details, isSuccessCreateCart, errorMessageCreateCart, router])

    const handleNavigateDetail = useCallback(() => {
        router.push(`/my-order/${orderData.code}?orderId=${orderData.id}` as any)
    }, [router, orderData.code, orderData.id])

    const handlePayment = useCallback(async () => {
        setLoading(true)
        try {
            const response = await createPayBackOrder({ orderCode: orderData.code })

            if (response?.isSuccess) {
                router.push({
                    pathname: 'vnpayview' as any,
                    params: {
                        paymentUrl: response?.result?.returnUrl,
                      }
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: response?.message || 'Thanh toán thất bại'
                })
            }
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: error?.message || 'Thanh toán thất bại'
            })
        } finally {
            setLoading(false)
        }
    }, [orderData.code, router])

    useEffect(() => {
        if (isSuccessCancel) {
            setOpenCancelDialog(false)
        }
    }, [isSuccessCancel])

    const renderOrderStatus = useMemo(() => {
        return (
            <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'flex-end' }}>
                {!!(orderData?.orderStatus === OrderStatus.Completed.label) && (
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        <Text style={{ color: 'green' }}>✓</Text>
                        <Text style={{ color: 'green' }}>Đơn hàng đã được giao | </Text>
                    </View>
                )}
                {!!(orderData?.paymentStatus === PaymentStatus.Paid.label) && (
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        <Text style={{ color: 'green' }}>✓</Text>
                        <Text style={{ color: 'green' }}>Đơn hàng đã thanh toán | </Text>
                    </View>
                )}
                <Text style={{ color: colors.primary }}>
                    {OrderStatus[orderData?.orderStatus as keyof typeof OrderStatus]?.title || 'Đang xử lý'}
                </Text>
            </View>
        )
    }, [orderData?.orderStatus, orderData?.paymentStatus])

    const renderOrderItems = useMemo(() => {
        return orderData?.details?.map((item: TOrderDetail, idx: number) => (
            <View key={item.productId + idx} style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 12,
                borderBottomWidth: idx === orderData.details.length - 1 ? 0 : 1,
                borderColor: '#f5f5f5',
                backgroundColor: '#fff',
            }}>
                <Image
                    source={{ uri: item?.imageUrl }}
                    style={{ width: 60, height: 60, borderRadius: 4, borderWidth: 1, borderColor: '#eee', backgroundColor: '#fafafa' }}
                    resizeMode="cover"
                />
                <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: '500' }}>{item?.productName}</Text>
                    {!!(item as any)?.variantName && (
                        <Text style={{ color: '#888', fontSize: 13, marginTop: 2 }}>{(item as any)?.variantName}</Text>
                    )}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
                        <Text style={{ color: colors.primary, fontWeight: 'bold' }}>{formatPrice(item?.price)}</Text>
                        <Text style={{ color: '#333' }}>x{item?.quantity}</Text>
                    </View>
                </View>
            </View>
        ))
    }, [orderData?.details])

    return (
        <>
            {loading && <ActivityIndicator />}
            <ConfirmDialog
                open={openCancelDialog}
                onClose={() => setOpenCancelDialog(false)}
                handleCancel={() => setOpenCancelDialog(false)}
                handleConfirm={handleConfirm}
                title={"Hủy đơn hàng"}
                description={"Bạn có chắc chắn muốn hủy đơn hàng này không?"}
            />
            <View style={{
                backgroundColor: '#fff',
                borderRadius: 8,
                marginBottom: 16,
                padding: 0,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
                borderWidth: 1,
                borderColor: '#f0f0f0',
            }}>
                {/* Header: Shop name + Status */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    padding: 12,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    borderBottomWidth: 1,
                    borderColor: '#f5f5f5',
                    backgroundColor: '#fff8f1',
                }}>
                    <Text style={{ color: orderData.orderStatus === OrderStatus.Completed.label ? '#43a047' : colors.primary, fontWeight: 'bold' }}>
                        {OrderStatus[orderData?.orderStatus as keyof typeof OrderStatus]?.title || 'Đang xử lý'}
                    </Text>
                </View>
                {/* Danh sách sản phẩm */}
                {renderOrderItems}
                {/* Tổng tiền */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    padding: 12,
                    borderTopWidth: 1,
                    borderColor: '#f5f5f5',
                    backgroundColor: '#fafbfc',
                }}>
                    <Text style={{ fontSize: 15 }}>Tổng số tiền ({orderData.details?.length} sản phẩm): </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.primary, marginLeft: 4 }}>
                        {formatPrice(orderData.totalPrice)}
                    </Text>
                </View>
                {/* Các nút chức năng */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    padding: 12,
                    gap: 8,
                    backgroundColor: '#fff',
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                }}>
                    {(orderData.orderStatus === OrderStatus.Pending.label
                        || orderData.orderStatus === OrderStatus.WaitingForPayment.label) &&
                        orderData.paymentStatus !== PaymentStatus.Paid.label
                        && orderData.paymentMethod === 'VNPay'
                        && (
                            <TouchableOpacity style={{
                                borderWidth: 1,
                                borderColor: colors.primary,
                                borderRadius: 4,
                                paddingVertical: 6,
                                paddingHorizontal: 16,
                                marginLeft: 8,
                            }}
                                onPress={handlePayment}
                            >
                                <Text style={{ color: colors.primary, fontWeight: '600' }}>Thanh toán</Text>
                            </TouchableOpacity>
                        )}

                    {(orderData.orderStatus === OrderStatus.WaitingForPayment.label || orderData.orderStatus === OrderStatus.Pending.label) &&
                        orderData.paymentMethod !== 'VNPay' && (
                            <TouchableOpacity
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#d32f2f',
                                    borderRadius: 4,
                                    paddingVertical: 6,
                                    paddingHorizontal: 16,
                                    marginLeft: 8,
                                }}
                                onPress={() => setOpenCancelDialog(true)}
                            >
                                <Text style={{ color: '#d32f2f', fontWeight: '600' }}>Hủy đơn</Text>
                            </TouchableOpacity>
                        )}
                    {
                        orderData.orderStatus === OrderStatus.Completed.label && (
                            <TouchableOpacity
                                style={{
                                    borderWidth: 1,
                                    borderColor: colors.primary,
                                    borderRadius: 4,
                                    paddingVertical: 6,
                                    paddingHorizontal: 16,
                                    marginLeft: 8,
                                    opacity: memoDisableBuyAgain ? 0.5 : 1,
                                }}
                                onPress={handleBuyAgain}
                                disabled={memoDisableBuyAgain}
                            >
                                <Text style={{ color: colors.primary, fontWeight: '600' }}>Mua lại</Text>
                            </TouchableOpacity>
                        )
                    }
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: colors.primary,
                            borderRadius: 4,
                            paddingVertical: 6,
                            paddingHorizontal: 16,
                            marginLeft: 8,
                        }}
                        onPress={handleNavigateDetail}
                    >
                        <Text style={{ color: colors.primary, fontWeight: '600' }}>Xem chi tiết</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default OrderCard
