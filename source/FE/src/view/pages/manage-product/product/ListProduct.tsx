"use client"

//React
import React, { useEffect, useMemo, useState } from 'react'

//Next
import { NextPage } from 'next'

//MUI
import { Chip, ChipProps, Grid, styled, Typography, useTheme } from '@mui/material'
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
import CreateUpdateProduct from './components/CreateUpdateProduct'
import Spinner from 'src/components/spinner'

//toast
import toast from 'react-hot-toast'
import ConfirmDialog from 'src/components/confirm-dialog'

//utils
import { hexToRGBA } from 'src/utils/hex-to-rgba'
import { formatDate, formatFilter } from 'src/utils'

import { usePermission } from 'src/hooks/usePermission'
import { deleteMultipleProductsAsync, deleteProductAsync, getAllProductsAsync } from 'src/stores/product/action'
import { resetInitialState } from 'src/stores/delivery-method'
import TableHeader from 'src/components/table-header'
import CustomSelect from 'src/components/custom-select'
import { OBJECT_PRODUCT_STATUS } from 'src/configs/product'
import { getAllProductCategories } from '../../../../services/product-category';
import { formatPrice } from '../../../../utils/index';

type TProps = {}

const StyledPublicProduct = styled(Chip)<ChipProps>(({ theme }) => ({
    backgroundColor: "#28c76f29",
    color: "#28c76f",
    fontSize: "14px",
    padding: "8px 4px",
    fontWeight: 600
}))

const StyledPrivateProduct = styled(Chip)<ChipProps>(({ theme }) => ({
    backgroundColor: "#da251d29",
    color: "#da251d",
    fontSize: "14px",
    padding: "8px 4px",
    fontWeight: 600
}))

const ListProduct: NextPage<TProps> = () => {
    //States
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
    const [openCreateUpdateProduct, setOpenCreateUpdateProduct] = useState({
        open: false,
        id: ""
    });
    const [openDeleteProduct, setOpenDeleteProduct] = useState({
        open: false,
        id: ""
    });

    const [openDeleteMultipleProducts, setOpenDeleteMultipleProducts] = useState(false);

    const [sortBy, setSortBy] = useState("createdAt asc");
    const [searchBy, setSearchBy] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedRow, setSelectedRow] = useState<string[]>([]);

    const [categoryOptions, setCategoryOptions] = useState<{ label: string, value: string }[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [statusOptions, setStatusOptions] = useState<{ label: string, value: string }[]>([])
    const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
    const [filterBy, setFilterBy] = useState<Record<string, string | string[]>>({});

    const PRODUCT_STATUS = OBJECT_PRODUCT_STATUS()


    //Translation
    const { t, i18n } = useTranslation();

    //hooks
    const { VIEW, CREATE, UPDATE, DELETE } = usePermission("MANAGE_PRODUCT.PRODUCT", ["CREATE", "UPDATE", "DELETE", "VIEW"]);


    //Redux
    const { products, isSuccessCreateUpdate, isErrorCreateUpdate, isLoading,
        errorMessageCreateUpdate, isSuccessDelete, isErrorDelete, errorMessageDelete, typeError, isSuccessDeleteMultiple, isErrorDeleteMultiple, errorMessageDeleteMultiple } = useSelector((state: RootState) => state.product)
    const dispatch: AppDispatch = useDispatch();

    //Theme
    const theme = useTheme();

    //api 
    const handleGetListProduct = () => {
        const query = { params: { limit: pageSize, page: page, search: searchBy, order: sortBy, ...formatFilter(filterBy) } }
        dispatch(getAllProductsAsync(query));
    }

    const fetchAllCategories = async () => {
        setLoading(true)
        await getAllProductCategories({ params: { limit: -1, page: -1, search: '', order: '' } }).then((res) => {
            const data = res?.data?.productTypes
            if (data) {
                setCategoryOptions(data?.map((item: { name: string, _id: string }) => ({
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

    const handleCloseCreateUpdateProduct = () => {
        setOpenCreateUpdateProduct({
            open: false,
            id: ""
        })
    }

    const handleCloseDeleteDialog = () => {
        setOpenDeleteProduct({
            open: false,
            id: ""
        })
    }

    const handleCloseDeleteMultipleDialog = () => {
        setOpenDeleteMultipleProducts(false)
    }

    const handleDeleteProduct = () => {
        dispatch(deleteProductAsync(openDeleteProduct.id))
    }

    const handleDeleteMultipleProduct = () => {
        dispatch(deleteMultipleProductsAsync({
            productIds: selectedRow
        }))
    }

    const handleAction = (action: string) => {
        switch (action) {
            case "delete": {
                setOpenDeleteMultipleProducts(true)
            }
        }
    }

    const columns: readonly GridColDef[] = useMemo(()=>{
    return [
        {
            field: 'product_name',
            headerName: t('product_name'),
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
            field: 'product_category',
            headerName: t('product_category'),
            minWidth: 200,
            maxWidth: 200,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    // <Typography>{row?.type?.name}</Typography>
                    <Typography>{row?.type}</Typography>
                )
            }
        },
        {
            field: 'price',
            headerName: t('price'),
            minWidth: 150,
            maxWidth: 150,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography>{`${formatPrice(row?.price)} VND`}</Typography>
                )
            }
        },
        {
            field: 'countInStock',
            headerName: t('count_in_stock'),
            minWidth: 100,
            maxWidth: 100,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography>{row?.countInStock}</Typography>
                )
            }
        },
        {
            field: 'discount',
            headerName: t('discount'),
            minWidth: 100,
            maxWidth: 100,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography>{row?.discount}</Typography>
                )
            }
        },
        {
            field: 'status',
            headerName: t('status'),
            flex: 1,
            minWidth: 140,
            maxWidth: 140,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <>
                        {row?.status ? (
                            <StyledPublicProduct label={t('public')} />
                        ) : (
                            <StyledPrivateProduct label={t('private')} />
                        )
                        }
                    </>
                )
            }
        },
        // {
        //     field: 'created_at',
        //     headerName: t('created_at'),
        //     minWidth: 150,
        //     maxWidth: 150,
        //     renderCell: (params: GridRenderCellParams) => {
        //         const { row } = params
        //         return (
        //             <Typography>{formatDate(row?.createdAt, { dateStyle: "short", timeStyle: "short" })}</Typography>
        //         )
        //     }
        // },
        {
            field: 'action',
            headerName: t('action'),
            width: 140,
            sortable: false,
            align: "left",
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <>
                        <GridUpdate
                            // disabled={!UPDATE}
                            onClick={() => setOpenCreateUpdateProduct({
                                open: true,
                                id: String(params.id)
                            })}
                        />
                        <GridDelete
                            // disabled={!DELETE}
                            onClick={() => setOpenDeleteProduct({
                                open: true,
                                id: String(params.id)
                            })}
                        />
                    </>
                )
            }
        },
    ] as const
    }, [t])
 

    const PaginationComponent = () => {
        return <CustomPagination
            pageSize={pageSize}
            pageSizeOptions={PAGE_SIZE_OPTIONS}
            onChangePagination={handleOnChangePagination}
            page={page}
            rowLength={products.total}
        />
    };

    useEffect(() => {
        handleGetListProduct();
    }, [sortBy, searchBy, page, pageSize, filterBy]);

    /// create update Product
    useEffect(() => {
        if (isSuccessCreateUpdate) {
            if (!openCreateUpdateProduct.id) {
                toast.success(t("create_product_success"))
            } else {
                toast.success(t("update_product_success"))
            }
            handleGetListProduct()
            handleCloseCreateUpdateProduct()
            dispatch(resetInitialState())
        } else if (isErrorCreateUpdate && errorMessageCreateUpdate && typeError) {
            if (openCreateUpdateProduct.id) {
                toast.error(errorMessageCreateUpdate)
            } else {
                toast.error(errorMessageCreateUpdate)
            }
            dispatch(resetInitialState())
        }
    }, [isSuccessCreateUpdate, isErrorCreateUpdate, errorMessageCreateUpdate, typeError])

    //delete multiple Products
    useEffect(() => {
        if (isSuccessDeleteMultiple) {
            toast.success(t("delete_multiple_product_success"))
            handleGetListProduct()
            dispatch(resetInitialState())
            handleCloseDeleteMultipleDialog()
            setSelectedRow([])
        } else if (isErrorDeleteMultiple && errorMessageDeleteMultiple) {
            toast.error(errorMessageDeleteMultiple)
            dispatch(resetInitialState())
        }
    }, [isSuccessDeleteMultiple, isErrorDeleteMultiple, errorMessageDeleteMultiple])

    //delete Product
    useEffect(() => {
        if (isSuccessDelete) {
            toast.success(t("delete_product_success"))
            handleGetListProduct()
            dispatch(resetInitialState())
            handleCloseDeleteDialog()
        } else if (isErrorDelete && errorMessageDelete) {
            toast.error(t(errorMessageDelete))
            dispatch(resetInitialState())
        }
    }, [isSuccessDelete, isErrorDelete, errorMessageDelete])

    useEffect(() => {
        fetchAllCategories()
    }, [])


    useEffect(() => {
        setFilterBy({ productType: selectedCategory, status: selectedStatus });
    }, [selectedCategory, selectedStatus]);

    return (
        <>
            {(loading || isLoading) && <Spinner />}
            <ConfirmDialog
                open={openDeleteProduct.open}
                onClose={handleCloseDeleteDialog}
                handleCancel={handleCloseDeleteDialog}
                handleConfirm={handleDeleteProduct}
                title={"Xác nhận xóa sản phẩm"}
                description={"Bạn có chắc xóa sản phẩm này không?"}
            />
            <ConfirmDialog
                open={openDeleteMultipleProducts}
                onClose={handleCloseDeleteMultipleDialog}
                handleCancel={handleCloseDeleteMultipleDialog}
                handleConfirm={handleDeleteMultipleProduct}
                title={"Xác nhận xóa nhiều sản phẩm"}
                description={"Bạn có chắc xóa các sản phẩm này không?"}
            />
            <CreateUpdateProduct
                idProduct={openCreateUpdateProduct.id}
                open={openCreateUpdateProduct.open}
                onClose={handleCloseCreateUpdateProduct}
            />

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
                            <Box sx={{ width: '200px', }}>
                                <CustomSelect
                                    fullWidth
                                    multiple
                                    value={selectedCategory}
                                    options={categoryOptions}
                                    onChange={(e) => setSelectedCategory(e.target.value as string[])}
                                    placeholder={t('product_category')}
                                />
                            </Box>
                            <Box sx={{ width: '200px', }}>
                                <CustomSelect
                                    fullWidth
                                    multiple
                                    value={selectedStatus}
                                    options={Object.values(PRODUCT_STATUS)}
                                    onChange={(e) => setSelectedStatus(e.target.value as string[])}
                                    placeholder={t('status')}
                                />
                            </Box>
                            <SearchField value={searchBy} onChange={(value: string) => setSearchBy(value)} />
                            <GridCreate onClick={() => {
                                setOpenCreateUpdateProduct({ open: true, id: "" })
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
                        rows={products.data}
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

export default ListProduct
