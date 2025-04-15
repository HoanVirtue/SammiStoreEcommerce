"use client"

// React & Next
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'

// MUI
import { Stack, styled, Tab, Tabs, useTheme, Box, TabsProps } from '@mui/material'

// i18n
import { useTranslation } from 'react-i18next'

// Redux
import { AppDispatch, RootState } from 'src/stores'
import { useDispatch, useSelector } from 'react-redux'

// Hooks & Types
import { useAuth } from 'src/hooks/useAuth'
import { TOrderItem, TParamsGetAllOrders } from 'src/types/order'
import { TFilter } from 'src/configs/filter'

// Configs
import { PAGE_SIZE_OPTIONS } from 'src/configs/gridConfig'
import { OrderStatus } from 'src/configs/order'

// Dynamic Imports - Tối ưu bundle size
const NoData = dynamic(() => import('src/components/no-data'), { ssr: false })
const Spinner = dynamic(() => import('src/components/spinner'), { ssr: false })
const SearchField = dynamic(() => import('src/components/search-field'), { ssr: false })
const CustomPagination = dynamic(() => import('src/components/custom-pagination'), { ssr: false })
const OrderCard = dynamic(() => import('./components/OrderCard'), { ssr: false })

// Actions
import { resetInitialState } from 'src/stores/order'
import { getMyOrdersAsync } from 'src/stores/order/action'
// Utils
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

// Styled Components
const StyledTabs = styled(Tabs)<TabsProps>(({ theme }) => ({
    "&.MuiTabs-root": {
        borderBottom: "none"
    }
}))

// Custom Hooks
const useOrderList = () => {
    const [selectedStatus, setSelectedStatus] = useState<string>("all")
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0])
    const [searchBy, setSearchBy] = useState("")
    const [sortBy, setSortBy] = useState<string>("createdDate asc")
    const [filters, setFilters] = useState<TFilter[]>([])

    const dispatch: AppDispatch = useDispatch()
    const { myOrders, isLoading, isErrorCancel, isSuccessCancel, errorMessageCancel } = useSelector((state: RootState) => state.order)

    const handleGetListOrder = useCallback(() => {
        const query = {
            params: {
                take: pageSize,
                skip: (page - 1) * pageSize,
                paging: true,
                orderBy: "createdDate",
                dir: "desc",
                keywords: searchBy || "''",
                filters: selectedStatus === "all" ? "" : `orderStatus::${selectedStatus}::eq`
            }
        }
        dispatch(getMyOrdersAsync(query))
    }, [page, pageSize, searchBy, selectedStatus, dispatch])


    const handleOnChangePagination = useCallback((page: number, pageSize: number) => {
        setPage(page)
        setPageSize(pageSize)
    }, [])

    const handleChangeStatus = useCallback((event: React.SyntheticEvent, newValue: string) => {
        setSelectedStatus(newValue)
    }, [])

    const handleSearch = useCallback((value: string) => {
        setSearchBy(value)
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

const MyOrderPage: NextPage = () => {
    // Hooks
    const { t } = useTranslation()
    const theme = useTheme()
    const router = useRouter()
    const dispatch = useDispatch()

    // Custom Hook
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

    // Effects
    useEffect(() => {
        handleGetListOrder()
    }, [page, pageSize, selectedStatus, searchBy, handleGetListOrder])

    useEffect(() => {
        if (isSuccessCancel) {
            toast.success(t("cancel_order_success"))
            handleGetListOrder()
            dispatch(resetInitialState())
        } else if (isErrorCancel && errorMessageCancel) {
            toast.error(errorMessageCancel)
            dispatch(resetInitialState())
        }
    }, [isSuccessCancel, isErrorCancel, errorMessageCancel, dispatch, handleGetListOrder, t])

    // Memoized Components
    const renderTabs = useMemo(() => (
        <StyledTabs
            value={selectedStatus}
            onChange={handleChangeStatus}
            aria-label="wrapped label tabs example"
        >
            <Tab
                key="all"
                value="all"
                label={t("all")}
                wrapped
            />
            {Object.values(OrderStatus).map((option) => (
                <Tab
                    key={option.label}
                    value={option.label}
                    label={t(option.title)}
                    wrapped
                />
            ))}
        </StyledTabs>
    ), [selectedStatus, handleChangeStatus, t])

    const renderSearch = useMemo(() => (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mr: '2rem' }}>
            <Box sx={{ width: '300px' }}>
                <SearchField
                    value={searchBy}
                    placeholder={t('search_by_product_name')}
                    onChange={handleSearch}
                />
            </Box>
        </Box>
    ), [searchBy, handleSearch, t])

    const renderContent = useMemo(() => {
        if (isLoading) return <Spinner />

        if (myOrders?.data?.length > 0) {
            return (
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: "100%",
                    flexDirection: "column",
                    padding: '2rem',
                    paddingTop: '1rem',
                    gap: 6,
                }}>
                    {myOrders?.data?.map((item: TOrderItem, index: number) => (
                        <OrderCard orderData={item} key={index} />
                    ))}
                    <CustomPagination
                        pageSize={pageSize}
                        pageSizeOptions={PAGE_SIZE_OPTIONS}
                        onChangePagination={handleOnChangePagination}
                        page={page}
                        rowLength={myOrders.total}
                        isHidden
                    />
                </Box>
            )
        }

        return (
            <Stack sx={{
                padding: "20px",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "30vh",
            }}>
                <NoData
                    imageWidth="60px"
                    imageHeight="60px"
                    textNodata={t("empty_order")}
                />
            </Stack>
        )
    }, [isLoading, myOrders, pageSize, page, handleOnChangePagination, t])

    return (
        <Box sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: "15px",
            py: 5,
            px: 4,
        }}>
            {renderTabs}
            {renderSearch}
            {renderContent}
        </Box>
    )
}

export default React.memo(MyOrderPage)
