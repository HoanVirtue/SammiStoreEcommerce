"use client"

//React
import React, { useEffect, useState } from 'react'

//Next
import { NextPage } from 'next'

//MUI
import { styled, Tab, Tabs, useTheme } from '@mui/material'
import { Box } from '@mui/material'

//Translate
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'

//Redux
import { AppDispatch, RootState } from 'src/stores'
import { useDispatch, useSelector } from 'react-redux'


//Other

import { useAuth } from 'src/hooks/useAuth'
import { TOrderItem } from 'src/types/order'
import NoData from 'src/components/no-data'
import { useRouter } from 'next/router'
import { PAGE_SIZE_OPTIONS } from 'src/configs/gridConfig'
import { getAllOrdersAsync } from 'src/stores/order/action'
import OrderCard from './components/OrderCard'
import CustomPagination from 'src/components/custom-pagination'
import { TabsProps } from '@mui/material'
import Spinner from 'src/components/spinner'
import SearchField from 'src/components/search-field'
import { toast } from 'react-toastify'
import { resetInitialState } from 'src/stores/order'

type TProps = {}

const STATUS_OPTION_VALUE = {
    ALL: 4,
    WAIT_PAYMENT: 0,
    WAIT_DELIVERY: 1,
    COMPLETED: 2,
    CANCELLED: 3,
}

const StyledTabs = styled(Tabs)<TabsProps>(({ theme }) => ({
    "&.MuiTabs-root": {
        borderBottom: "none"
    }
}))

const MyOrderPage: NextPage<TProps> = () => {
    //States
    const [selectedStatus, setSelectedStatus] = useState<number>(STATUS_OPTION_VALUE.ALL)
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
    const [searchBy, setSearchBy] = useState("");

    //hooks
    const { user } = useAuth()
    const { t } = useTranslation();
    const router = useRouter()

    //Theme
    const theme = useTheme();

    //Dispatch
    const dispatch: AppDispatch = useDispatch();
    const { orders, isLoading, isErrorCancel, isSuccessCancel, errorMessageCancel } = useSelector((state: RootState) => state.order)

    const STATUS_OPTION = [
        {
            label: t("all"),
            value: STATUS_OPTION_VALUE.ALL,
        },
        {
            label: t("wait_payment"),
            value: STATUS_OPTION_VALUE.WAIT_PAYMENT,
        },
        {
            label: t("wait_delivery"),
            value: STATUS_OPTION_VALUE.WAIT_DELIVERY,
        },
        {
            label: t("completed"),
            value: STATUS_OPTION_VALUE.COMPLETED,
        },
        {
            label: t("cancelled"),
            value: STATUS_OPTION_VALUE.CANCELLED,
        },
    ]

    //Fetch API
    const handleGetListOrder = () => {
        const query = {
            params: { limit: pageSize, page: page, status: selectedStatus === STATUS_OPTION_VALUE.ALL ? '' : selectedStatus, search: searchBy }
        }
        dispatch(getAllOrdersAsync(query));
    }

    const handleOnChangePagination = (page: number, pageSize: number) => {
        setPage(page)
        setPageSize(pageSize)
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setSelectedStatus(+newValue);
    };

    useEffect(() => {
        handleGetListOrder();
    }, [page, pageSize, selectedStatus, searchBy]);

    //cancel order
    useEffect(() => {
        if (isSuccessCancel) {
            toast.success(t("cancel_order_success"))
            handleGetListOrder()
            dispatch(resetInitialState())
        } else if (isErrorCancel && errorMessageCancel) {
            toast.error(errorMessageCancel)
            dispatch(resetInitialState())
        }
    }, [isSuccessCancel, isErrorCancel, errorMessageCancel])

    return (
        <>
            {isLoading && <Spinner />}
            <Box sx={{ ml: '2rem', mt: '1rem' }}>
                <StyledTabs
                    value={selectedStatus}
                    onChange={handleChange}
                    aria-label="wrapped label tabs example"
                >
                    {STATUS_OPTION.map((option) => {
                        return (
                            <Tab
                                key={option.value}
                                value={option.value}
                                label={option.label}
                                wrapped
                            />
                        )
                    })}
                </StyledTabs>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mr: '2rem' }}>
                <Box sx={{ width: '300px' }}>
                    <SearchField value={searchBy} placeholder={t('search_by_product_name')} onChange={(value: string) => setSearchBy(value)} />
                </Box>
            </Box>
            <Box sx={{}}>
                {orders?.data?.length > 0 ? (
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: "100%",
                        flexDirection: "column",
                        padding: '2rem',
                        paddingTop: '1rem',
                        gap: 6,
                    }}>
                        {orders?.data?.map((item: TOrderItem, index: number) => {
                            return (
                                <OrderCard orderData={item} key={item._id} />
                            )
                        })}
                        <CustomPagination
                            pageSize={pageSize}
                            pageSizeOptions={PAGE_SIZE_OPTIONS}
                            onChangePagination={handleOnChangePagination}
                            page={page}
                            rowLength={orders.total}
                            isHidden
                        />
                    </Box>
                ) : (
                    <Box sx={{
                        padding: "20px",
                        width: "100%",
                        height: "80vh",
                    }}>
                        <NoData imageWidth="60px" imageHeight="60px" textNodata={t("empty_cart")} />
                    </Box>
                )}
            </Box>
        </>
    )
}

export default MyOrderPage
