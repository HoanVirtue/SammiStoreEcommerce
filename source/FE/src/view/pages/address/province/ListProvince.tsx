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
import CreateUpdateProvince from './components/CreateUpdateProvince'
import Spinner from 'src/components/spinner'

//toast
import toast from 'react-hot-toast'
import ConfirmDialog from 'src/components/confirm-dialog'
import { OBJECT_TYPE_ROLE_ERROR } from 'src/configs/role'

//utils
import { hexToRGBA } from 'src/utils/hex-to-rgba'


import { usePermission } from 'src/hooks/usePermission'
import { deleteMultipleProvincesAsync, deleteProvinceAsync, getAllProvincesAsync } from 'src/stores/province/action'
import { resetInitialState } from 'src/stores/province'
import TableHeader from 'src/components/table-header'
import { formatDate } from 'src/utils'

type TProps = {}

const ListProvincePage: NextPage<TProps> = () => {
    //States
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
    const [openCreateUpdateProvince, setOpenCreateUpdateProvince] = useState({
        open: false,
        id: ""
    });
    const [openDeleteProvince, setOpenDeleteProvince] = useState({
        open: false,
        id: ""
    });

    const [openDeleteMultipleProvince, setOpenDeleteMultipleProvince] = useState(false);

    const [sortBy, setSortBy] = useState("createdAt asc");
    const [searchBy, setSearchBy] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedRow, setSelectedRow] = useState<string[]>([]);
    const [filterBy, setFilterBy] = useState<Record<any, any>>({});

    //Translation
    const { t, i18n } = useTranslation();

    //hooks
    const { VIEW, CREATE, UPDATE, DELETE } = usePermission("SETTING.PROVINCE", ["CREATE", "UPDATE", "DELETE", "VIEW"]);

    //Redux
    const { provinces, isSuccessCreateUpdate, isErrorCreateUpdate, isLoading,
        errorMessageCreateUpdate, isSuccessDelete, isErrorDelete, errorMessageDelete, typeError, isSuccessDeleteMultiple, isErrorDeleteMultiple, errorMessageDeleteMultiple } = useSelector((state: RootState) => state.province)
    const dispatch: AppDispatch = useDispatch();

    //Theme
    const theme = useTheme();

    //api 
    const handleGetListProvince = () => {
        const query = {
            params: {
                filters: '',
                take: 100,
                orderBy: '', 
                dir: 'asc', 
                paging: true,
                keywords: 'name',
                propertyFilterModels: [
                    { field: '', operator: '', filterValue: '' }
                ]
            }
        }
        dispatch(getAllProvincesAsync(query));
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

    const handleCloseCreateUpdateProvince = () => {
        setOpenCreateUpdateProvince({
            open: false,
            id: ""
        })
    }

    const handleCloseDeleteDialog = () => {
        setOpenDeleteProvince({
            open: false,
            id: ""
        })
    }

    const handleCloseDeleteMultipleDialog = () => {
        setOpenDeleteMultipleProvince(false)
    }

    const handleDeleteProvince = () => {
        dispatch(deleteProvinceAsync(openDeleteProvince.id))
    }

    const handleDeleteMultipleProvince = () => {
        dispatch(deleteMultipleProvincesAsync({
            provinceIds: selectedRow
        }))
    }

    const handleAction = (action: string) => {
        switch (action) {
            case "delete": {
                setOpenDeleteMultipleProvince(true)
            }
        }
    }

    const columns: GridColDef[] = [
        {
            field: 'province_name',
            headerName: t('province_name'),
            flex: 1,
            minWidth: 200,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography>{row?.name}</Typography>
                )
            }
        },
        // {
        //     field: 'created_at',
        //     headerName: t('created_at'),
        //     minWidth: 200,
        //     maxWidth: 200,
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
            width: 150,
            sortable: false,
            align: "left",
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <>
                        <GridUpdate
                            // disabled={!UPDATE}
                            onClick={() => setOpenCreateUpdateProvince({
                                open: true,
                                id: String(row.id)
                            })}
                        />
                        <GridDelete
                            // disabled={!DELETE}
                            onClick={() => setOpenDeleteProvince({
                                open: true,
                                id: String(row.id)
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
            rowLength={provinces.total}
        />
    };

    useEffect(() => {
        handleGetListProvince();
    }, [sortBy, searchBy, page, pageSize]);

    /// create update Province
    useEffect(() => {
        if (isSuccessCreateUpdate) {
            if (!openCreateUpdateProvince.id) {
                toast.success(t("create_province_success"))
            } else {
                toast.success(t("update_province_success"))
            }
            handleGetListProvince()
            handleCloseCreateUpdateProvince()
            dispatch(resetInitialState())
        } else if (isErrorCreateUpdate && errorMessageCreateUpdate && typeError) {
            const errConfig = OBJECT_TYPE_ROLE_ERROR[typeError]
            if (errConfig) {
                toast.error(t(errConfig))
            } else {
                if (openCreateUpdateProvince.id) {
                    toast.error(t("update_province_error"))
                } else {
                    toast.error(t("create_province_error"))
                }
            }
            dispatch(resetInitialState())
        }
    }, [isSuccessCreateUpdate, isErrorCreateUpdate, errorMessageCreateUpdate, typeError])

    //delete multiple Provinces
    useEffect(() => {
        if (isSuccessDeleteMultiple) {
            toast.success(t("delete_multiple_province_success"))
            handleGetListProvince()
            dispatch(resetInitialState())
            handleCloseDeleteMultipleDialog()
            setSelectedRow([])
        } else if (isErrorDeleteMultiple && errorMessageDeleteMultiple) {
            toast.error(t("delete_multiple_province_error"))
            dispatch(resetInitialState())
        }
    }, [isSuccessDeleteMultiple, isErrorDeleteMultiple, errorMessageDeleteMultiple])

    //delete Province
    useEffect(() => {
        if (isSuccessDelete) {
            toast.success(t("delete_province_success"))
            handleGetListProvince()
            dispatch(resetInitialState())
            handleCloseDeleteDialog()
        } else if (isErrorDelete && errorMessageDelete) {
            toast.error(t(errorMessageDelete))
            dispatch(resetInitialState())
        }
    }, [isSuccessDelete, isErrorDelete, errorMessageDelete])

    console.log(provinces, "provinces");

    return (
        <>{loading && <Spinner />}
            <ConfirmDialog
                open={openDeleteProvince.open}
                onClose={handleCloseDeleteDialog}
                handleCancel={handleCloseDeleteDialog}
                handleConfirm={handleDeleteProvince}
                title={"Xác nhận xóa tỉnh"}
                description={"Bạn có chắc xóa tỉnh này không?"}
            />
            <ConfirmDialog
                open={openDeleteMultipleProvince}
                onClose={handleCloseDeleteMultipleDialog}
                handleCancel={handleCloseDeleteMultipleDialog}
                handleConfirm={handleDeleteMultipleProvince}
                title={"Xác nhận xóa nhiều thành phố"}
                description={"Bạn có chắc xóa các thành phố này không?"}
            />
            <CreateUpdateProvince
                idProvince={openCreateUpdateProvince.id}
                open={openCreateUpdateProvince.open}
                onClose={handleCloseCreateUpdateProvince}
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
                                setOpenCreateUpdateProvince({ open: true, id: "" })
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
                        rows={provinces.data}
                        columns={columns}
                        checkboxSelection
                        getRowId={(row) => row.id}
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

export default ListProvincePage
