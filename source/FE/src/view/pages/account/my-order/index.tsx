"use client"

//React
import React, { useEffect, useState } from 'react'

//Next
import { NextPage } from 'next'

//MUI
import { Stack, styled, Tab, Tabs, useTheme } from '@mui/material'
import { Box } from '@mui/material'

//Translate
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'

//Redux
import { AppDispatch, RootState } from 'src/stores'
import { useDispatch, useSelector } from 'react-redux'


//Other

import { useAuth } from 'src/hooks/useAuth'
import { TOrderItem, TParamsGetAllOrders } from 'src/types/order'
import NoData from 'src/components/no-data'
import { useRouter } from 'next/router'
import { PAGE_SIZE_OPTIONS } from 'src/configs/gridConfig'
import { getMyOrdersAsync } from 'src/stores/order/action'
import OrderCard from './components/OrderCard'
import CustomPagination from 'src/components/custom-pagination'
import { TabsProps } from '@mui/material'
import Spinner from 'src/components/spinner'
import SearchField from 'src/components/search-field'
import { toast } from 'react-toastify'
import { resetInitialState } from 'src/stores/order'
import { OrderStatus } from 'src/configs/order'
import { TFilter } from 'src/configs/filter'

type TProps = {}

const StyledTabs = styled(Tabs)<TabsProps>(({ theme }) => ({
    "&.MuiTabs-root": {
        borderBottom: "none"
    }
}))

const MyOrderPage: NextPage<TProps> = () => {
    //States
    const [selectedStatus, setSelectedStatus] = useState<string>("all")
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
    const [searchBy, setSearchBy] = useState("");
    const [sortBy, setSortBy] = useState<string>("createdDate asc");
    const [filters, setFilters] = useState<TFilter[]>([]);

    //hooks
    const { user } = useAuth()
    const { t } = useTranslation();
    const router = useRouter()

    //Theme
    const theme = useTheme();

    //Dispatch
    const dispatch: AppDispatch = useDispatch();
    const { myOrders, isLoading, isErrorCancel, isSuccessCancel, errorMessageCancel } = useSelector((state: RootState) => state.order)


    //Fetch API
    const handleGetListOrder = () => {
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
        dispatch(getMyOrdersAsync(query));
    }

    const handleOnChangePagination = (page: number, pageSize: number) => {
        setPage(page)
        setPageSize(pageSize)
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setSelectedStatus(newValue);
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
        <Box sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: "15px",
            py: 5, px: 4,
        }}>
            {isLoading && <Spinner />}
            <StyledTabs
                value={selectedStatus}
                onChange={handleChange}
                aria-label="wrapped label tabs example"
            >
                <Tab
                    key="all"
                    value="all"
                    label={t("all")}
                    wrapped
                />
                {Object.values(OrderStatus).map((option) => {
                    return (
                        <Tab
                            key={option.label}
                            value={option.label}
                            label={t(option.title)}
                            wrapped
                        />
                    )
                })}
            </StyledTabs>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mr: '2rem' }}>
                <Box sx={{ width: '300px' }}>
                    <SearchField value={searchBy} placeholder={t('search_by_product_name')} onChange={(value: string) => setSearchBy(value)} />
                </Box>
            </Box>
            <Box sx={{}}>
                {myOrders?.data?.length > 0 ? (
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: "100%",
                        flexDirection: "column",
                        padding: '2rem',
                        paddingTop: '1rem',
                        gap: 6,
                    }}>
                        {myOrders?.data?.map((item: TOrderItem, index: number) => {
                            return (
                                <OrderCard orderData={item} key={index} />
                            )
                        })}
                        <CustomPagination
                            pageSize={pageSize}
                            pageSizeOptions={PAGE_SIZE_OPTIONS}
                            onChangePagination={handleOnChangePagination}
                            page={page}
                            rowLength={myOrders.total}
                            isHidden
                        />
                    </Box>
                ) : (
                    <Stack sx={{
                        padding: "20px",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "30vh",
                    }}>
                        <NoData imageWidth="60px" imageHeight="60px" textNodata={t("empty_order")} />
                    </Stack>
                )}
            </Box>
        </Box>
    )
}

export default MyOrderPage
