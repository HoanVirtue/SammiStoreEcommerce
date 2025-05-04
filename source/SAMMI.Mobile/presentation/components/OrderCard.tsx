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
    }, [dispatch, orderData.code])

    const handleAddProductToCart = useCallback(async (item: TOrderDetail) => {
        if (!user?.id) return

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
            } else {
                Toast.show({
                    type: 'error',
                    text1: errorMessageCreateCart
                })
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: errorMessageCreateCart
            })
        }
    }, [dispatch, user?.id, isSuccessCreateCart, errorMessageCreateCart])

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

                if (!isSuccessCreateCart) {
                    hasError = true
                    Toast.show({
                        type: 'error',
                        text1: errorMessageCreateCart
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
        router.push(`/my-order/${orderData.code}` as any)
    }, [router, orderData.code])

    const handlePayment = useCallback(async () => {
        setLoading(true)
        try {
            const response = await createPayBackOrder({orderCode: orderData.code})

            if (response?.isSuccess) {
                if (response?.result?.returnUrl) {
                    router.push('(tabs)/payment' as any)
                } else {
                    router.push('(tabs)/payment' as any)
                }
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
        return orderData?.details?.map((item: TOrderDetail) => (
            <View key={item.productId} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ borderWidth: 1, borderColor: '#e0e0e0', height: 80 }}>
                    <Image 
                        source={{ uri: item?.imageUrl }} 
                        style={{ width: 80, height: 80 }} 
                        resizeMode="cover"
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, width: '100%' }}>
                    <View>
                        <View style={{ width: '80%' }}>
                            <Text style={{ fontSize: 14 }}>{item?.productName}</Text>
                        </View>
                        <View>
                            <Text style={{
                                color: '#1976d2',
                                fontWeight: 'bold',
                                fontSize: 14
                            }}>
                                {formatPrice(item?.price)}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontSize: 16 }}>x{item?.quantity}</Text>
                    </View>
                </View>
            </View>
        ))
    }, [orderData?.details])

    return (
        <>
            {loading && <ActivityIndicator />}
            <View style={{
                backgroundColor: '#ffffff',
                padding: 32,
                borderRadius: 15,
                width: '100%',
            }}>
                {renderOrderStatus}
                <View style={{ height: 1, backgroundColor: '#e0e0e0', marginVertical: 16 }} />
                <ScrollView style={{ marginVertical: 16, gap: 16 }}>
                    {renderOrderItems}
                </ScrollView>
                <View style={{ height: 1, backgroundColor: '#e0e0e0', marginVertical: 16 }} />
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end', marginTop: 12, gap: 8 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                        Tổng tiền:
                    </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: colors.primary }}>
                        {formatPrice(orderData.totalPrice)}
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    padding: 0,
                    gap: 16,
                    marginTop: 16
                }}>
                    {(orderData.orderStatus === OrderStatus.Pending.label
                        || orderData.orderStatus === OrderStatus.WaitingForPayment.label) &&
                        orderData.paymentStatus !== PaymentStatus.Paid.label
                        && orderData.paymentMethod === 'VNPay'
                        && (
                            <TouchableOpacity
                                style={{
                                    backgroundColor: colors.primary,
                                    height: 40,
                                    marginTop: 12,
                                    paddingVertical: 6,
                                    paddingHorizontal: 16,
                                    borderRadius: 4,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 8
                                }}
                                onPress={handlePayment}
                            >
                                <Text style={{ color: 'white', fontWeight: '600' }}>Thanh toán</Text>
                            </TouchableOpacity>
                        )}
                    {(orderData.orderStatus === OrderStatus.WaitingForPayment.label || orderData.orderStatus === OrderStatus.Pending.label) &&
                        orderData.paymentMethod !== 'VNPay' &&
                        (
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#d32f2f',
                                    height: 40,
                                    marginTop: 12,
                                    paddingVertical: 6,
                                    paddingHorizontal: 16,
                                    borderRadius: 4,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 8
                                }}
                                onPress={() => setOpenCancelDialog(true)}
                            >
                                <Text style={{ color: 'white', fontWeight: '600' }}>Hủy đơn hàng</Text>
                            </TouchableOpacity>
                        )}
                    <TouchableOpacity
                        style={{
                            backgroundColor: colors.primary,
                            height: 40,
                            marginTop: 12,
                            paddingVertical: 6,
                            paddingHorizontal: 16,
                            borderRadius: 4,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                            opacity: memoDisableBuyAgain ? 0.5 : 1
                        }}
                        onPress={handleBuyAgain}
                        disabled={memoDisableBuyAgain}
                    >
                        <Text style={{ color: 'white', fontWeight: '600' }}>Mua lại</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: colors.primary,
                            height: 40,
                            marginTop: 12,
                            paddingVertical: 6,
                            paddingHorizontal: 16,
                            borderRadius: 4,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8
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
