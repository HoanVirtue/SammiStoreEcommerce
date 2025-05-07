"use client"

// React & Next
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { AppDispatch, RootState } from '@/stores';

// Services
import { getMyOrdersAsync } from '@/stores/order/action';

// Components
import OrderCard from '@/presentation/components/OrderCard';
import { useRouter } from 'expo-router';
import { resetInitialState } from '@/stores/order';
import Toast from 'react-native-toast-message';
import { OrderStatus } from '@/configs/order';
import { SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { TOrderItem } from '@/types/order';
import NoData from '@/components/NoData';
import { colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

const ORDER_STATUS_VI = {
    Pending: 'Chờ xác nhận',
    WaitingForPayment: 'Chờ thanh toán',
    Processing: 'Đang xử lý',
    Completed: 'Hoàn thành',
    Cancelled: 'Đã hủy',
};

// Debounce function for search
const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

// Custom Hooks
const useOrderList = () => {
    const [selectedStatus, setSelectedStatus] = useState<string>("all")
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [searchBy, setSearchBy] = useState("")
    const debouncedSearchTerm = useDebounce(searchBy, 500)

    const dispatch: AppDispatch = useDispatch()
    const { myOrders, isLoading, isErrorCancel, isSuccessCancel, errorMessageCancel } = useSelector((state: RootState) => state.order)

    const queryParams = useMemo(() => ({
        params: {
            take: pageSize,
            skip: (page - 1) * pageSize,
            paging: true,
            orderBy: "createdDate",
            dir: "desc",
            keywords: debouncedSearchTerm || "''",
            filters: selectedStatus === "all" ? "" : `orderStatus::${selectedStatus}::eq`
        }
    }), [pageSize, page, debouncedSearchTerm, selectedStatus]);

    const handleGetListOrder = useCallback(() => {
        dispatch(getMyOrdersAsync(queryParams))
    }, [queryParams, dispatch])

    const handleOnChangePagination = useCallback((page: number, pageSize: number) => {
        setPage(page)
        setPageSize(pageSize)
    }, [])

    const handleChangeStatus = useCallback((newValue: string) => {
        setSelectedStatus(newValue)
        setPage(1)
    }, [])

    const handleSearch = useCallback((value: string) => {
        setSearchBy(value)
        setPage(1)
    }, [])

    return {
        selectedStatus,
        page,
        pageSize,
        searchBy,
        myOrders,
        isLoading,
        isErrorCancel,
        isSuccessCancel,
        errorMessageCancel,
        handleGetListOrder,
        handleOnChangePagination,
        handleChangeStatus,
        handleSearch
    }
}

const MyOrderScreen = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const {
        selectedStatus,
        page,
        pageSize,
        searchBy,
        myOrders,
        isLoading,
        isErrorCancel,
        isSuccessCancel,
        errorMessageCancel,
        handleGetListOrder,
        handleOnChangePagination,
        handleChangeStatus,
        handleSearch
    } = useOrderList()

    const handleGoBack = useCallback(() => {
        try {
            router.push('/(tabs)/profile');
        } catch (error) {
            router.push('/(tabs)')
        }
    }, [router])

    useEffect(() => {
        handleGetListOrder()
        return () => {
            dispatch(resetInitialState())
        }
    }, [page, pageSize, selectedStatus, searchBy, handleGetListOrder, dispatch])

    useEffect(() => {
        if (isSuccessCancel) {
            Toast.show({
                type: 'success',
                text1: "Hủy đơn hàng thành công"
            })
            handleGetListOrder()
            dispatch(resetInitialState())
        } else if (isErrorCancel && errorMessageCancel) {
            Toast.show({
                type: 'error',
                text1: errorMessageCancel
            })
            dispatch(resetInitialState())
        }
    }, [isSuccessCancel, isErrorCancel, errorMessageCancel, dispatch, handleGetListOrder])

    const renderTabs = useMemo(() => (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabsContainer}
            contentContainerStyle={{ 
                alignItems: 'center',
            }}
        >
            <TouchableOpacity
                style={[styles.tab, selectedStatus === "all" && styles.activeTab]}
                onPress={() => handleChangeStatus("all")}
            >
                <Text style={[styles.tabText, selectedStatus === "all" && styles.activeTabText]}>
                    {"Tất cả"}
                </Text>
            </TouchableOpacity>
            {Object.entries(OrderStatus).map(([key, option]: any) => (
                <TouchableOpacity
                    key={option.label}
                    style={[styles.tab, selectedStatus === option.label && styles.activeTab]}
                    onPress={() => handleChangeStatus(option.label)}
                >
                    <Text style={[styles.tabText, selectedStatus === option.label && styles.activeTabText]}>
                        {ORDER_STATUS_VI[key as keyof typeof ORDER_STATUS_VI]}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    ), [selectedStatus, handleChangeStatus])

    const renderOrdersList = useMemo(() => {
        if (!myOrders?.data?.length) return null;

        return myOrders.data.map((item: TOrderItem, index: number) => (
            <OrderCard orderData={item} key={item.id || index} />
        ));
    }, [myOrders?.data]);

    const renderContent = useMemo(() => {
        if (isLoading) return <ActivityIndicator size="large" color={colors.primary} />

            return (
                <ScrollView style={styles.contentWrapper}>
                    <View style={styles.contentContainer}>
                        {renderOrdersList}
                    </View>
                    <View style={styles.paginationContainer}>
                        <View style={styles.paginationInfo}>
                            <Text style={styles.paginationText}>
                                {`Hiển thị ${((page - 1) * pageSize) + 1} - ${Math.min(page * pageSize, myOrders.total)} trên ${myOrders.total}`}
                            </Text>
                        </View>
                        <View style={styles.paginationControls}>
                            <TouchableOpacity 
                                style={[styles.paginationButton, page === 1 && styles.paginationButtonDisabled]}
                                onPress={() => page > 1 && handleOnChangePagination(page - 1, pageSize)}
                                disabled={page === 1}
                            >
                                <Ionicons name="chevron-back" size={24} color={page === 1 ? colors.textSecondary : colors.primary} />
                            </TouchableOpacity>
                            <Text style={styles.paginationPageText}>{page}</Text>
                            <TouchableOpacity 
                                style={[styles.paginationButton, page * pageSize >= myOrders.total && styles.paginationButtonDisabled]}
                                onPress={() => page * pageSize < myOrders.total && handleOnChangePagination(page + 1, pageSize)}
                                disabled={page * pageSize >= myOrders.total}
                            >
                                <Ionicons name="chevron-forward" size={24} color={page * pageSize >= myOrders.total ? colors.textSecondary : colors.primary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            )

        return (
            <View style={styles.emptyContainer}>
                <NoData
                    imageWidth={60}
                    imageHeight={60}
                    textNodata={"Không có đơn hàng"}
                />
            </View>
        )
    }, [isLoading, myOrders?.data?.length, renderOrdersList, page, pageSize, myOrders?.total, handleOnChangePagination])

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.headerRow}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={handleGoBack}
                >
                    <Ionicons name="arrow-back" size={24} color={colors.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Đơn hàng của tôi</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.tabsWrapper}>
                    {renderTabs}
                </View>
                {renderContent}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: '#fff',
        paddingHorizontal: 8,
    },
    headerTitle: {
        fontSize: 20,
        // fontWeight: 'bold',
        color: colors.primary,
        marginLeft: 8,
        marginBottom: 8
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 8,
    },
    backButton: {
        padding: 8,
        marginBottom: 8,
    },
    tabsWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        marginBottom: 16,
    },
    tabsContainer: {
        flexDirection: 'row',
    },
    tab: {
        minWidth: 100,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: 'transparent',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
        paddingHorizontal: 16,
        paddingVertical: 0,
        transitionProperty: 'border-bottom-color, background-color',
        transitionDuration: '200ms',
    },
    activeTab: {
        backgroundColor: '#fff',
        borderBottomColor: '#1976d2',
        zIndex: 2,
    },
    tabText: {
        color: '#333',
        fontWeight: '500',
        fontSize: 16,
    },
    activeTabText: {
        color: '#1976d2',
        fontWeight: '700',
    },
    contentWrapper: {
        flex: 1,
    },
    contentContainer: {
        padding: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 8,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        backgroundColor: colors.card,
        marginTop: 8,
    },
    paginationInfo: {
        flex: 1,
    },
    paginationText: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    paginationControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    paginationButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: colors.background,
    },
    paginationButtonDisabled: {
        opacity: 0.5,
    },
    paginationPageText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.primary,
        minWidth: 24,
        textAlign: 'center',
    },
})

export default React.memo(MyOrderScreen)