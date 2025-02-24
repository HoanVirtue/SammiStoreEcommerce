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
import CreateUpdateProductCategory from './components/CreateUpdateProductCategory'
import Spinner from 'src/components/spinner'

//toast
import toast from 'react-hot-toast'
import ConfirmDialog from 'src/components/confirm-dialog'
import { OBJECT_TYPE_ERROR } from 'src/configs/error'

//utils
import { hexToRGBA } from 'src/utils/hex-to-rgba'


import { usePermission } from 'src/hooks/usePermission'
import { deleteMultipleProductCategoriesAsync, deleteProductCategoryAsync, getAllProductCategoriesAsync } from 'src/stores/product-category/action'
import { resetInitialState } from 'src/stores/delivery-method'
import TableHeader from 'src/components/table-header'
import { formatDate } from 'src/utils'

type TProps = {}

const ListProductCategory: NextPage<TProps> = () => {
    //States
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
    const [openCreateUpdateProductCategory, setOpenCreateUpdateProductCategory] = useState({
        open: false,
        id: ""
    });
    const [openDeleteProductCategory, setOpenDeleteProductCategory] = useState({
        open: false,
        id: ""
    });

    const [openDeleteMultipleProductCategories, setOpenDeleteMultipleProductCategories] = useState(false);

    const [sortBy, setSortBy] = useState("createdAt asc");
    const [searchBy, setSearchBy] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedRow, setSelectedRow] = useState<string[]>([]);

    //Translation
    const { t, i18n } = useTranslation();

    //hooks
    const { VIEW, CREATE, UPDATE, DELETE } = usePermission("MANAGE_PRODUCT.PRODUCT_CATEGORY", ["CREATE", "UPDATE", "DELETE", "VIEW"]);


    //Redux
    const { productCategories, isSuccessCreateUpdate, isErrorCreateUpdate, isLoading,
        errorMessageCreateUpdate, isSuccessDelete, isErrorDelete, errorMessageDelete, typeError, isSuccessDeleteMultiple, isErrorDeleteMultiple, errorMessageDeleteMultiple } = useSelector((state: RootState) => state.productCategory)
    const dispatch: AppDispatch = useDispatch();

    //Theme
    const theme = useTheme();

    //api 
    const handleGetListProductCategory = () => {
        const query = { params: { limit: pageSize, page: page, search: searchBy, order: sortBy } }
        dispatch(getAllProductCategoriesAsync(query));
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

    const handleCloseCreateUpdateProductCategory = () => {
        setOpenCreateUpdateProductCategory({
            open: false,
            id: ""
        })
    }

    const handleCloseDeleteDialog = () => {
        setOpenDeleteProductCategory({
            open: false,
            id: ""
        })
    }

    const handleCloseDeleteMultipleDialog = () => {
        setOpenDeleteMultipleProductCategories(false)
    }

    const handleDeleteProductCategory = () => {
        dispatch(deleteProductCategoryAsync(openDeleteProductCategory.id))
    }

    const handleDeleteMultipleProductCategory = () => {
        dispatch(deleteMultipleProductCategoriesAsync({
            productTypeIds: selectedRow
        }))
    }

    const handleAction = (action: string) => {
        switch (action) {
            case "delete": {
                setOpenDeleteMultipleProductCategories(true)
            }
        }
    }

    const columns: GridColDef[] = [
        {
            field: 'product_category_name',
            headerName: t('product_category_name'),
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
            field: 'slug',
            headerName: t('slug'),
            minWidth: 200,
            maxWidth: 200,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography>{row?.slug}</Typography>
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
                    <Typography>{formatDate(row?.createdAt, { dateStyle: "short", timeStyle: "short" })}</Typography>
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
                            onClick={() => setOpenCreateUpdateProductCategory({
                                open: true,
                                id: String(params.id)
                            })}
                        />
                        <GridDelete
                            disabled={!DELETE}
                            onClick={() => setOpenDeleteProductCategory({
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
            rowLength={productCategories.total}
        />
    };

    useEffect(() => {
        handleGetListProductCategory();
    }, [sortBy, searchBy, page, pageSize]);

    /// create update ProductCategory
    useEffect(() => {
        if (isSuccessCreateUpdate) {
            if (!openCreateUpdateProductCategory.id) {
                toast.success(t("create_product_category_success"))
            } else {
                toast.success(t("update_product_category_success"))
            }
            handleGetListProductCategory()
            handleCloseCreateUpdateProductCategory()
            dispatch(resetInitialState())
        } else if (isErrorCreateUpdate && errorMessageCreateUpdate && typeError) {
            if (openCreateUpdateProductCategory.id) {
                toast.error(errorMessageCreateUpdate)
            } else {
                toast.error(errorMessageCreateUpdate)
            }
            dispatch(resetInitialState())
        }
    }, [isSuccessCreateUpdate, isErrorCreateUpdate, errorMessageCreateUpdate, typeError])

    //delete multiple ProductCategories
    useEffect(() => {
        if (isSuccessDeleteMultiple) {
            toast.success(t("delete_multiple_product_category_success"))
            handleGetListProductCategory()
            dispatch(resetInitialState())
            handleCloseDeleteMultipleDialog()
            setSelectedRow([])
        } else if (isErrorDeleteMultiple && errorMessageDeleteMultiple) {
            toast.error(errorMessageDeleteMultiple)
            dispatch(resetInitialState())
        }
    }, [isSuccessDeleteMultiple, isErrorDeleteMultiple, errorMessageDeleteMultiple])

    //delete ProductCategory
    useEffect(() => {
        if (isSuccessDelete) {
            toast.success(t("delete_product_category_success"))
            handleGetListProductCategory()
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
                open={openDeleteProductCategory.open}
                onClose={handleCloseDeleteDialog}
                handleCancel={handleCloseDeleteDialog}
                handleConfirm={handleDeleteProductCategory}
                title={"Xác nhận xóa loại sản phẩm"}
                description={"Bạn có chắc xóa loại sản phẩm này không?"}
            />
            <ConfirmDialog
                open={openDeleteMultipleProductCategories}
                onClose={handleCloseDeleteMultipleDialog}
                handleCancel={handleCloseDeleteMultipleDialog}
                handleConfirm={handleDeleteMultipleProductCategory}
                title={"Xác nhận xóa nhiều loại sản phẩm"}
                description={"Bạn có chắc xóa các loại sản phẩm này không?"}
            />
            <CreateUpdateProductCategory
                idProductCategory={openCreateUpdateProductCategory.id}
                open={openCreateUpdateProductCategory.open}
                onClose={handleCloseCreateUpdateProductCategory}
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
                                setOpenCreateUpdateProductCategory({ open: true, id: "" })
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
                        rows={productCategories.data}
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

export default ListProductCategory
