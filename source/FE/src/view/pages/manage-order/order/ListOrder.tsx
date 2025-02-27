"use client"

//React
import React, { useEffect, useState } from 'react'

//Next
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'

//MUI
import { Avatar, AvatarGroup, Chip, ChipProps, Grid, ListItem, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/material'
import { GridColDef, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'

//translation
import { useTranslation } from 'react-i18next'

//configs
import { PAGE_SIZE_OPTIONS } from 'src/configs/gridConfig'

//components
import CustomDataGrid from 'src/components/custom-data-grid'
import CustomPagination from 'src/components/custom-pagination'
import GridUpdate from 'src/components/grid-update'
import GridDelete from 'src/components/grid-delete'
import SearchField from 'src/components/search-field'
import Spinner from 'src/components/spinner'

//toast
import toast from 'react-hot-toast'
import ConfirmDialog from 'src/components/confirm-dialog'
import { OBJECT_TYPE_ERROR } from 'src/configs/error'

//utils
import { formatFilter, toFullName } from 'src/utils'
import { hexToRGBA } from 'src/utils/hex-to-rgba'


import { usePermission } from 'src/hooks/usePermission'

import { resetInitialState } from 'src/stores/user'
import { styled } from '@mui/material'
import CustomSelect from 'src/components/custom-select'
import { getAllCities } from 'src/services/city'
import { deleteOrderAsync, getAllManageOrderAsync } from 'src/stores/order/action'
import { ORDER_STATUS } from 'src/configs/order'
import { TItemOrderProduct, TOrderItem } from 'src/types/order'
import UpdateOrder from './components/UpdateOrder'

type TProps = {}

interface TStatusChip extends ChipProps{
    background: string
}

const StyledOrderStatus = styled(Chip)<TStatusChip>(({ theme, background }) => ({
    backgroundColor: background,
    color: theme.palette.common.white,
    fontSize: "14px",
    padding: "8px 4px",
    fontWeight: 600
}))


const ListOrderPage: NextPage<TProps> = () => {
    //States
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
    const [openUpdateOrder, setOpenUpdateOrder] = useState({
        open: false,
        id: ""
    });
    const [openDeleteOrder, setOpenDeleteOrder] = useState({
        open: false,
        id: ""
    });

    const [sortBy, setSortBy] = useState("createdAt asc");
    const [searchBy, setSearchBy] = useState("");
    const [loading, setLoading] = useState(false);
    const [cityOptions, setCityOptions] = useState<{ label: string, value: string }[]>([])
    const [selectedCity, setSelectedCity] = useState<string[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
    const [filterBy, setFilterBy] = useState<Record<string, string | string[]>>({});

    //Translation
    const { t, i18n } = useTranslation();


    //hooks
    const { VIEW, CREATE, UPDATE, DELETE } = usePermission("SYSTEM.MANAGE_ORDER.ORDER", ["CREATE", "UPDATE", "DELETE", "VIEW"]);

    //router
    const router = useRouter();

    //Redux
    const { orderProducts, isSuccessUpdate, isErrorUpdate, isLoading,
        errorMessageUpdate, isSuccessDelete, isErrorDelete, errorMessageDelete, typeError } = useSelector((state: RootState) => state.order)
    const dispatch: AppDispatch = useDispatch();

    //Theme
    const theme = useTheme();

    const STYLED_ORDER_STATUS = {
        0: {
            label: 'wait_payment',
            background: "orange"
        },
        1: {
            label: 'wait_delivery',
            background: theme.palette.warning.main
        },
        2: {
            label: 'completed',
            background: theme.palette.success.main
        },
        3: {
            label: 'cancelled',
            background: theme.palette.error.main
        },
        4: {
            label: 'all',
            background: "white"
        },
    }


    //api 
    const handleGetListOrder = () => {
        const query = {
            params: { limit: pageSize, page: page, search: searchBy, order: sortBy, ...formatFilter(filterBy) }
        }
        dispatch(getAllManageOrderAsync(query));
    }

    const fetchAllCities = async () => {
        setLoading(true)
        await getAllCities({ params: { limit: -1, page: -1, search: '', order: '' } }).then((res) => {
            const data = res?.data?.cities
            if (data) {
                setCityOptions(data?.map((item: { name: string, _id: string }) => ({
                    label: item.name,
                    value: item._id
                })))
            }
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
        })
    }

    //handlers
    const handleOnChangePagination = (page: number, pageSize: number) => {
        setPage(page)
        setPageSize(pageSize)
    }

    const handleSort = (sort: GridSortModel) => {
        const sortOption = sort[0]
        if (sortOption) {
            setSortBy(`${sortOption.field} ${sortOption.sort}`)
        } else {
            setSortBy("createdAt asc")
        }
    }

    const handleCloseUpdateOrder = () => {
        setOpenUpdateOrder({
            open: false,
            id: ""
        })
    }

    const handleCloseDeleteDialog = () => {
        setOpenDeleteOrder({
            open: false,
            id: ""
        })
    }


    const handleDeleteOrder = () => {
        dispatch(deleteOrderAsync(openDeleteOrder.id))
    }


    const columns: GridColDef[] = [
        {
            field: 'product_image',
            headerName: t('product_image'),
            minWidth: 200,
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <AvatarGroup max={3} total={row?.orderItems?.length}>
                        {row?.orderItems?.map((item: TItemOrderProduct)=>{
                            return (
                                <Avatar alt={item?.slug} 
                                src={item.image}
                                key={item?.product}
                                  />
                            )
                        })}
                    </AvatarGroup>
                )
            }
        },
        {
            field: 'fullname',
            headerName: t('fullname'),
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography>{row?.shippingAddress?.fullName}</Typography>
                )
            }
        },
        {
            field: 'total_price',
            headerName: t('total_price'),
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography>{row?.totalPrice}</Typography>
                )
            }
        },
        {
            field: 'city',
            headerName: t('city'),
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography>{row?.shippingAddress?.city}</Typography>
                )
            }
        },
        {
            field: 'phone',
            headerName: t('phone'),
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography>{row?.shippingAddress?.phone}</Typography>
                )
            }
        },
        {
            field: 'status',
            headerName: t('status'),
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <>
                        {
                            <StyledOrderStatus 
                            background = {(STYLED_ORDER_STATUS as any)[row?.status]?.background}
                            label={t((STYLED_ORDER_STATUS as any)[row?.status]?.label)} />
                        }
                    </>
                )
            }
        },
        {
            field: 'action',
            headerName: t('action'),
            width: 150,
            sortable: false,
            align: "left",
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <>
                        <GridUpdate
                            disabled={!UPDATE}
                            onClick={() => setOpenUpdateOrder({
                                open: true,
                                id: String(params.id)
                            })}
                        />
                        <GridDelete
                            disabled={!DELETE}
                            onClick={() => setOpenDeleteOrder({
                                open: true,
                                id: String(params.id)
                            })}
                        />
                    </>
                )
            }
        },
    ];

    const PaginationComponent = () => {
        return <CustomPagination
            pageSize={pageSize}
            pageSizeOptions={PAGE_SIZE_OPTIONS}
            onChangePagination={handleOnChangePagination}
            page={page}
            rowLength={orderProducts.total}
        />
    };

    useEffect(() => {
        handleGetListOrder();
    }, [sortBy, searchBy, i18n.language, page, pageSize, filterBy]);

    useEffect(() => {
        setFilterBy({ status: selectedStatus, cityId: selectedCity });
    }, [selectedStatus, selectedCity]);

    useEffect(() => {
        fetchAllCities();
    }, []);

    /// create order
    useEffect(() => {
        if (isSuccessUpdate) {
            if (!openUpdateOrder.id) {
                toast.success(t("create_order_success"))
            } else {
                toast.success(t("update_order_success"))
            }
            handleGetListOrder()
            handleCloseUpdateOrder()
            dispatch(resetInitialState())
        } else if (isErrorUpdate && errorMessageUpdate && typeError) {
            const errConfig = OBJECT_TYPE_ERROR[typeError]
            if (errConfig) {
                toast.error(t(errConfig))
            } else {
                if (openUpdateOrder.id) {
                    toast.error(t("update_order_error"))
                } else {
                    toast.error(t("create_order_error"))
                }
            }
            dispatch(resetInitialState())
        }
    }, [isSuccessUpdate, isErrorUpdate, errorMessageUpdate, typeError])


    //delete order
    useEffect(() => {
        if (isSuccessDelete) {
            toast.success(t("delete_order_success"))
            handleGetListOrder()
            dispatch(resetInitialState())
            handleCloseDeleteDialog()
        } else if (isErrorDelete && errorMessageDelete) {
            toast.error(errorMessageDelete)
            dispatch(resetInitialState())
        }
    }, [isSuccessDelete, isErrorDelete, errorMessageDelete])

    return (
        <>{loading && <Spinner />}
            <ConfirmDialog
                open={openDeleteOrder.open}
                onClose={handleCloseDeleteDialog}
                handleCancel={handleCloseDeleteDialog}
                handleConfirm={handleDeleteOrder}
                title={"Xác nhận xóa đơn hàng"}
                description={"Bạn có chắc xóa đơn hàng này không?"}
            />
            
            <UpdateOrder
                idOrder={openUpdateOrder.id}
                open={openUpdateOrder.open}
                onClose={handleCloseUpdateOrder}
            />
            {isLoading && <Spinner />}
            <Box sx={{
                backgroundColor: theme.palette.background.paper,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                height: 'fit-content',
            }}>
                <Grid container sx={{ width: '100%', height: '100%' }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        mb: 4,
                        gap: 4,
                        width: '100%'
                    }}>
                        <Box sx={{ width: '200px', }}>
                            <CustomSelect
                                fullWidth
                                multiple
                                value={selectedCity}
                                options={cityOptions}
                                onChange={(e) => setSelectedCity(e.target.value as string[])}
                                placeholder={t('city')}
                            />
                        </Box>
                        <Box sx={{ width: '200px', }}>
                            <CustomSelect
                                fullWidth
                                multiple
                                value={selectedStatus}
                                options={Object.values(ORDER_STATUS)}
                                onChange={(e) => setSelectedStatus(e.target.value as string[])}
                                placeholder={t('status')}
                            />
                        </Box>
                        <Box sx={{
                            width: '200px',
                        }}>
                            <SearchField value={searchBy} onChange={(value: string) => setSearchBy(value)} />
                        </Box>
                    </Box>
                    <CustomDataGrid
                        rows={orderProducts.data}
                        columns={columns}
                        // checkboxSelection
                        getRowId={(row) => row._id}
                        disableRowSelectionOnClick
                        autoHeight
                        // hideFooter
                        sortingOrder={['desc', 'asc']}
                        sortingMode='server'
                        onSortModelChange={handleSort}
                        slots={{
                            pagination: PaginationComponent
                        }}
                        disableColumnFilter
                        disableColumnMenu
                        // onRowClick={row => {
                        //     setOpenUpdateOrder({ open: true, id: String(row.id) })
                        // }}
                        sx={{
                            ".selected-row": {
                                backgroundColor: `${hexToRGBA(theme.palette.primary.main, 0.08)} !important`,
                                color: `${theme.palette.primary.main} !important`
                            }
                        }}
                    />
                </Grid>
            </Box >
        </>
    )
}

export default ListOrderPage
