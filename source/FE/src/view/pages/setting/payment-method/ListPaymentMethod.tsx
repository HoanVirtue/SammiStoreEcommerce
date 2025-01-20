"use client"

//React
import React, { useEffect, useState } from 'react'

//Next
import { NextPage } from 'next'

//MUI
import { Grid, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/material'
import { GridColDef, GridRenderCellParams, GridRowSelectionModel, GridSortModel } from '@mui/x-data-grid'

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
import GridCreate from 'src/components/grid-create'
import SearchField from 'src/components/search-field'
import CreateUpdatePaymentMethod from './components/CreateUpdatePaymentMethod'
import Spinner from 'src/components/spinner'

//toast
import toast from 'react-hot-toast'
import ConfirmDialog from 'src/components/confirm-dialog'
import { OBJECT_TYPE_ROLE_ERROR } from 'src/configs/role'

//utils
import { hexToRGBA } from 'src/utils/hex-to-rgba'


import { usePermission } from 'src/hooks/usePermission'
import { deleteMultiplePaymentMethodsAsync, deletePaymentMethodAsync, getAllPaymentMethodsAsync } from 'src/stores/payment-method/action'
import { resetInitialState } from 'src/stores/payment-method'
import TableHeader from 'src/components/table-header'
import { formatDate } from 'src/utils'
import { PAYMENT_METHOD } from 'src/configs/payment'

type TProps = {}

const ListPaymentMethod: NextPage<TProps> = () => {

    const ObjectPaymentMethod: any = PAYMENT_METHOD()

    //States
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
    const [openCreateUpdatePaymentMethod, setOpenCreateUpdatePaymentMethod] = useState({
        open: false,
        id: ""
    });
    const [openDeletePaymentMethod, setOpenDeletePaymentMethod] = useState({
        open: false,
        id: ""
    });

    const [openDeleteMultiplePaymentMethods, setOpenDeleteMultiplePaymentMethods] = useState(false);

    const [sortBy, setSortBy] = useState("createdAt asc");
    const [searchBy, setSearchBy] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedRow, setSelectedRow] = useState<string[]>([]);

    //Translation
    const { t, i18n } = useTranslation();

    //hooks
    const { VIEW, CREATE, UPDATE, DELETE } = usePermission("SETTING.PAYMENT_METHOD", ["CREATE", "UPDATE", "DELETE", "VIEW"]);


    //Redux
    const { paymentMethods, isSuccessCreateUpdate, isErrorCreateUpdate, isLoading,
        errorMessageCreateUpdate, isSuccessDelete, isErrorDelete, errorMessageDelete, typeError, isSuccessDeleteMultiple, isErrorDeleteMultiple, errorMessageDeleteMultiple } = useSelector((state: RootState) => state.paymentMethod)
    const dispatch: AppDispatch = useDispatch();

    //Theme
    const theme = useTheme();

    //api 
    const handleGetListPaymentMethod = () => {
        const query = { params: { limit: pageSize, page: page, search: searchBy, order: sortBy } }
        dispatch(getAllPaymentMethodsAsync(query));
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

    const handleCloseCreateUpdatePaymentMethod = () => {
        setOpenCreateUpdatePaymentMethod({
            open: false,
            id: ""
        })
    }

    const handleCloseDeleteDialog = () => {
        setOpenDeletePaymentMethod({
            open: false,
            id: ""
        })
    }

    const handleCloseDeleteMultipleDialog = () => {
        setOpenDeleteMultiplePaymentMethods(false)
    }

    const handleDeletePaymentMethod = () => {
        dispatch(deletePaymentMethodAsync(openDeletePaymentMethod.id))
    }

    const handleDeleteMultiplePaymentMethod = () => {
        dispatch(deleteMultiplePaymentMethodsAsync({
            paymentMethodIds: selectedRow
        }))
    }

    const handleAction = (action: string) => {
        switch (action) {
            case "delete": {
                setOpenDeleteMultiplePaymentMethods(true)
            }
        }
    }

    const columns: GridColDef[] = [
        {
            field: 'payment_method_name',
            headerName: t('payment_method_name'),
            flex: 1,
            minWidth: 200,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography>{row?.name}</Typography>
                )
            }
        },
        {
            field: 'type',
            headerName: t('type'),
            minWidth: 200,
            maxWidth: 200,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography>{ObjectPaymentMethod?.[row.type]?.label}</Typography>
                )
            }
        },
        {
            field: 'created_at',
            headerName: t('created_at'),
            minWidth: 220,
            maxWidth: 220,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography>{formatDate(row?.createdAt, {dateStyle: "short", timeStyle: "short"})}</Typography>
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
                            onClick={() => setOpenCreateUpdatePaymentMethod({
                                open: true,
                                id: String(params.id)
                            })}
                        />
                        <GridDelete
                            disabled={!DELETE}
                            onClick={() => setOpenDeletePaymentMethod({
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
            rowLength={paymentMethods.total}
        />
    };

    useEffect(() => {
        handleGetListPaymentMethod();
    }, [sortBy, searchBy, page, pageSize]);

    /// create update PaymentMethod
    useEffect(() => {
        if (isSuccessCreateUpdate) {
            if (!openCreateUpdatePaymentMethod.id) {
                toast.success(t("create_payment_method_success"))
            } else {
                toast.success(t("update_payment_method_success"))
            }
            handleGetListPaymentMethod()
            handleCloseCreateUpdatePaymentMethod()
            dispatch(resetInitialState())
        } else if (isErrorCreateUpdate && errorMessageCreateUpdate && typeError) {
            const errConfig = OBJECT_TYPE_ROLE_ERROR[typeError]
            if (errConfig) {
                toast.error(t(errConfig))
            } else {
                if (openCreateUpdatePaymentMethod.id) {
                    toast.error(t("update_payment_method_error"))
                } else {
                    toast.error(t("create_payment_method_error"))
                }
            }
            dispatch(resetInitialState())
        }
    }, [isSuccessCreateUpdate, isErrorCreateUpdate, errorMessageCreateUpdate, typeError])

    //delete multiple PaymentMethods
    useEffect(() => {
        if (isSuccessDeleteMultiple) {
            toast.success(t("delete_multiple_payment_method_success"))
            handleGetListPaymentMethod()
            dispatch(resetInitialState())
            handleCloseDeleteMultipleDialog()
            setSelectedRow([])
        } else if (isErrorDeleteMultiple && errorMessageDeleteMultiple) {
            toast.error(t("delete_multiple_payment_method_error"))
            dispatch(resetInitialState())
        }
    }, [isSuccessDeleteMultiple, isErrorDeleteMultiple, errorMessageDeleteMultiple])

    //delete PaymentMethod
    useEffect(() => {
        if (isSuccessDelete) {
            toast.success(t("delete_payment_method_success"))
            handleGetListPaymentMethod()
            dispatch(resetInitialState())
            handleCloseDeleteDialog()
        } else if (isErrorDelete && errorMessageDelete) {
            toast.error(t(errorMessageDelete))
            dispatch(resetInitialState())
        }
    }, [isSuccessDelete, isErrorDelete, errorMessageDelete])

    return (
        <>{loading && <Spinner />}
            <ConfirmDialog
                open={openDeletePaymentMethod.open}
                onClose={handleCloseDeleteDialog}
                handleCancel={handleCloseDeleteDialog}
                handleConfirm={handleDeletePaymentMethod}
                title={"Xác nhận xóa phương thức thanh toán"}
                description={"Bạn có chắc xóa phương thức thanh toán này không?"}
            />
            <ConfirmDialog
                open={openDeleteMultiplePaymentMethods}
                onClose={handleCloseDeleteMultipleDialog}
                handleCancel={handleCloseDeleteMultipleDialog}
                handleConfirm={handleDeleteMultiplePaymentMethod}
                title={"Xác nhận xóa nhiều phương thức thanh toán"}
                description={"Bạn có chắc xóa các phương thức thanh toán này không?"}
            />
            <CreateUpdatePaymentMethod
                idPaymentMethod={openCreateUpdatePaymentMethod.id}
                open={openCreateUpdatePaymentMethod.open}
                onClose={handleCloseCreateUpdatePaymentMethod}
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
                    {!selectedRow?.length && (
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            mb: 4,
                            gap: 4,
                            width: '100%'
                        }}>
                            <Box sx={{
                                width: '200px',
                            }}>
                                <SearchField value={searchBy} onChange={(value: string) => setSearchBy(value)} />
                            </Box>
                            <GridCreate onClick={() => {
                                setOpenCreateUpdatePaymentMethod({ open: true, id: "" })
                            }}
                            />
                        </Box>
                    )}
                    {selectedRow.length > 0 && (
                        <TableHeader
                            selectedRowNumber={selectedRow?.length}
                            onClear={() => setSelectedRow([])}
                            actions={
                                [{
                                    label: t("delete"),
                                    value: "delete",
                                    disabled: !DELETE
                                }]
                            }
                            handleAction={handleAction}
                        />
                    )}
                    <CustomDataGrid
                        rows={paymentMethods.data}
                        columns={columns}
                        checkboxSelection
                        getRowId={(row) => row._id}
                        disableRowSelectionOnClick
                        autoHeight
                        sortingOrder={['desc', 'asc']}
                        sortingMode='server'
                        onSortModelChange={handleSort}
                        slots={{
                            pagination: PaginationComponent
                        }}
                        disableColumnFilter
                        disableColumnMenu
                        sx={{
                            ".selected-row": {
                                backgroundColor: `${hexToRGBA(theme.palette.primary.main, 0.08)} !important`,
                                color: `${theme.palette.primary.main} !important`
                            }
                        }}
                        onRowSelectionModelChange={(row: GridRowSelectionModel) => {
                            setSelectedRow(row as string[])
                        }}
                        rowSelectionModel={selectedRow}
                    />
                </Grid>
            </Box >
        </>
    )
}

export default ListPaymentMethod
