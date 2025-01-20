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
import CreateUpdateDeliveryMethod from './components/CreateUpdateDeliveryMethod'
import Spinner from 'src/components/spinner'

//toast
import toast from 'react-hot-toast'
import ConfirmDialog from 'src/components/confirm-dialog'
import { OBJECT_TYPE_ROLE_ERROR } from 'src/configs/role'

//utils
import { hexToRGBA } from 'src/utils/hex-to-rgba'


import { usePermission } from 'src/hooks/usePermission'
import { deleteMultipleDeliveryMethodsAsync, deleteDeliveryMethodAsync, getAllDeliveryMethodsAsync } from 'src/stores/delivery-method/action'
import { resetInitialState } from 'src/stores/delivery-method'
import TableHeader from 'src/components/table-header'
import { formatDate } from 'src/utils'

type TProps = {}

const ListDeliveryMethod: NextPage<TProps> = () => {
    //States
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
    const [openCreateUpdateDeliveryMethod, setOpenCreateUpdateDeliveryMethod] = useState({
        open: false,
        id: ""
    });
    const [openDeleteDeliveryMethod, setOpenDeleteDeliveryMethod] = useState({
        open: false,
        id: ""
    });

    const [openDeleteMultipleDeliveryMethods, setOpenDeleteMultipleDeliveryMethods] = useState(false);

    const [sortBy, setSortBy] = useState("createdAt asc");
    const [searchBy, setSearchBy] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedRow, setSelectedRow] = useState<string[]>([]);

    //Translation
    const { t, i18n } = useTranslation();

    //hooks
    const { VIEW, CREATE, UPDATE, DELETE } = usePermission("SETTING.DELIVERY_METHOD", ["CREATE", "UPDATE", "DELETE", "VIEW"]);


    //Redux
    const { deliveryMethods, isSuccessCreateUpdate, isErrorCreateUpdate, isLoading,
        errorMessageCreateUpdate, isSuccessDelete, isErrorDelete, errorMessageDelete, typeError, isSuccessDeleteMultiple, isErrorDeleteMultiple, errorMessageDeleteMultiple } = useSelector((state: RootState) => state.deliveryMethod)
    const dispatch: AppDispatch = useDispatch();

    //Theme
    const theme = useTheme();

    //api 
    const handleGetListDeliveryMethod = () => {
        const query = { params: { limit: pageSize, page: page, search: searchBy, order: sortBy } }
        dispatch(getAllDeliveryMethodsAsync(query));
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

    const handleCloseCreateUpdateDeliveryMethod = () => {
        setOpenCreateUpdateDeliveryMethod({
            open: false,
            id: ""
        })
    }

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDeliveryMethod({
            open: false,
            id: ""
        })
    }

    const handleCloseDeleteMultipleDialog = () => {
        setOpenDeleteMultipleDeliveryMethods(false)
    }

    const handleDeleteDeliveryMethod = () => {
        dispatch(deleteDeliveryMethodAsync(openDeleteDeliveryMethod.id))
    }

    const handleDeleteMultipleDeliveryMethod = () => {
        dispatch(deleteMultipleDeliveryMethodsAsync({
            deliveryMethodIds: selectedRow
        }))
    }

    const handleAction = (action: string) => {
        switch (action) {
            case "delete": {
                setOpenDeleteMultipleDeliveryMethods(true)
            }
        }
    }

    const columns: GridColDef[] = [
        {
            field: 'delivery_method_name',
            headerName: t('delivery_method_name'),
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
            field: 'delivery_method_price',
            headerName: t('delivery_method_price'),
            minWidth: 200,
            maxWidth: 200,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography>{row?.price}</Typography>
                )
            }
        },
        {
            field: 'created_at',
            headerName: t('created_at'),
            minWidth: 200,
            maxWidth: 200,
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
                            onClick={() => setOpenCreateUpdateDeliveryMethod({
                                open: true,
                                id: String(params.id)
                            })}
                        />
                        <GridDelete
                            disabled={!DELETE}
                            onClick={() => setOpenDeleteDeliveryMethod({
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
            rowLength={deliveryMethods.total}
        />
    };

    useEffect(() => {
        handleGetListDeliveryMethod();
    }, [sortBy, searchBy, page, pageSize]);

    /// create update DeliveryMethod
    useEffect(() => {
        if (isSuccessCreateUpdate) {
            if (!openCreateUpdateDeliveryMethod.id) {
                toast.success(t("create_delivery_method_success"))
            } else {
                toast.success(t("update_delivery_method_success"))
            }
            handleGetListDeliveryMethod()
            handleCloseCreateUpdateDeliveryMethod()
            dispatch(resetInitialState())
        } else if (isErrorCreateUpdate && errorMessageCreateUpdate && typeError) {
            const errConfig = OBJECT_TYPE_ROLE_ERROR[typeError]
            if (errConfig) {
                toast.error(t(errConfig))
            } else {
                if (openCreateUpdateDeliveryMethod.id) {
                    toast.error(t("update_delivery_method_error"))
                } else {
                    toast.error(t("create_delivery_method_error"))
                }
            }
            dispatch(resetInitialState())
        }
    }, [isSuccessCreateUpdate, isErrorCreateUpdate, errorMessageCreateUpdate, typeError])

    //delete multiple DeliveryMethods
    useEffect(() => {
        if (isSuccessDeleteMultiple) {
            toast.success(t("delete_multiple_delivery_method_success"))
            handleGetListDeliveryMethod()
            dispatch(resetInitialState())
            handleCloseDeleteMultipleDialog()
            setSelectedRow([])
        } else if (isErrorDeleteMultiple && errorMessageDeleteMultiple) {
            toast.error(t("delete_multiple_delivery_method_error"))
            dispatch(resetInitialState())
        }
    }, [isSuccessDeleteMultiple, isErrorDeleteMultiple, errorMessageDeleteMultiple])

    //delete DeliveryMethod
    useEffect(() => {
        if (isSuccessDelete) {
            toast.success(t("delete_delivery_method_success"))
            handleGetListDeliveryMethod()
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
                open={openDeleteDeliveryMethod.open}
                onClose={handleCloseDeleteDialog}
                handleCancel={handleCloseDeleteDialog}
                handleConfirm={handleDeleteDeliveryMethod}
                title={"Xác nhận xóa phương thức giao hàng"}
                description={"Bạn có chắc xóa phương thức giao hàng này không?"}
            />
            <ConfirmDialog
                open={openDeleteMultipleDeliveryMethods}
                onClose={handleCloseDeleteMultipleDialog}
                handleCancel={handleCloseDeleteMultipleDialog}
                handleConfirm={handleDeleteMultipleDeliveryMethod}
                title={"Xác nhận xóa nhiều phương thức giao hàng"}
                description={"Bạn có chắc xóa các phương thức giao hàng này không?"}
            />
            <CreateUpdateDeliveryMethod
                idDeliveryMethod={openCreateUpdateDeliveryMethod.id}
                open={openCreateUpdateDeliveryMethod.open}
                onClose={handleCloseCreateUpdateDeliveryMethod}
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
                                setOpenCreateUpdateDeliveryMethod({ open: true, id: "" })
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
                        rows={deliveryMethods.data}
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

export default ListDeliveryMethod
