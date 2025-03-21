"use client"

//React
import React, { useEffect, useMemo, useState } from 'react'

//Next
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'

//MUI
import { Avatar, AvatarGroup, Chip, ChipProps, Grid, ListItem, Tooltip, Typography, useTheme } from '@mui/material'
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
import { deleteReviewAsync, getAllReviewsAsync } from 'src/stores/review/action'
import { FILTER_REVIEW_CMS } from 'src/configs/review'
import UpdateReview from './components/UpdateReview'


type TProps = {}

const ListReviewPage: NextPage<TProps> = () => {
    //States
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
    const [openUpdateReview, setOpenUpdateReview] = useState({
        open: false,
        id: ""
    });
    const [openDeleteReview, setOpenDeleteReview] = useState({
        open: false,
        id: ""
    });

    const [sortBy, setSortBy] = useState("createdAt asc");
    const [searchBy, setSearchBy] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedStar, setSelectedStar] = useState<string[]>([]);
    const [filterBy, setFilterBy] = useState<Record<string, string | string[]>>({});

    //Translation
    const { t, i18n } = useTranslation();


    //hooks
    const { VIEW, CREATE, UPDATE, DELETE } = usePermission("SYSTEM.MANAGE_ORDER.REVIEW", ["CREATE", "UPDATE", "DELETE", "VIEW"]);

    //router
    const router = useRouter();

    //Redux
    const { reviews, isSuccessUpdate, isErrorUpdate, isLoading,
        errorMessageUpdate, isSuccessDelete, isErrorDelete, errorMessageDelete, typeError } = useSelector((state: RootState) => state.review)
    const dispatch: AppDispatch = useDispatch();

    //Theme
    const theme = useTheme();

    const reviewOption = FILTER_REVIEW_CMS()

    //api 
    const handleGetListReview = () => {
        const query = {
            params: { limit: pageSize, page: page, search: searchBy, order: sortBy, ...formatFilter(filterBy) }
        }
        dispatch(getAllReviewsAsync(query));
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

    const handleCloseUpdateReview = () => {
        setOpenUpdateReview({
            open: false,
            id: ""
        })
    }

    const handleCloseDeleteDialog = () => {
        setOpenDeleteReview({
            open: false,
            id: ""
        })
    }


    const handleDeleteReview = () => {
        dispatch(deleteReviewAsync(openDeleteReview.id))
    }


    const columns: GridColDef[] = [
        {
            field: 'username',
            headerName: t('username'),
            minWidth: 200,
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                const fullName = toFullName(row?.user?.lastName || '', row?.user?.middleName || '', row?.user?.firstName || '', i18n.language)
                return (
                    <Typography sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '200px', width: '100%' }}>{fullName}</Typography>
                )
            }
        },
        {
            field: 'product_name',
            headerName: t('product_name'),
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '200px', width: '100%' }}>
                        <Tooltip title={row?.product?.name}>
                            {row?.product?.name}
                        </Tooltip>
                    </Typography>
                )
            }
        },
        {
            field: 'content',
            headerName: t('content'),
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '200px', width: '100%' }}>
                        <Tooltip title={row?.content}>
                            {row?.content}
                        </Tooltip>
                    </Typography>
                )
            }
        },
        {
            field: 'star',
            headerName: t('star'),
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography>{row?.star}</Typography>
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
                            onClick={() => setOpenUpdateReview({
                                open: true,
                                id: String(params.id)
                            })}
                        />
                        <GridDelete
                            disabled={!DELETE}
                            onClick={() => setOpenDeleteReview({
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
            rowLength={reviews.total}
        />
    };

    useEffect(() => {
        handleGetListReview();
    }, [sortBy, searchBy, i18n.language, page, pageSize, filterBy]);

    useEffect(() => {
        setFilterBy({ minStar: selectedStar });
    }, [selectedStar]);



    /// update Review
    useEffect(() => {
        if (isSuccessUpdate) {
            toast.success(t("update_review_success"))
            handleGetListReview()
            handleCloseUpdateReview()
            dispatch(resetInitialState())
        } else if (isErrorUpdate && errorMessageUpdate && typeError) {

            toast.error(t("update_review_error"))
            dispatch(resetInitialState())
        }
    }, [isSuccessUpdate, isErrorUpdate, errorMessageUpdate, typeError])


    //delete Review
    useEffect(() => {
        if (isSuccessDelete) {
            toast.success(t("delete_review_success"))
            handleGetListReview()
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
                open={openDeleteReview.open}
                onClose={handleCloseDeleteDialog}
                handleCancel={handleCloseDeleteDialog}
                handleConfirm={handleDeleteReview}
                title={"Xác nhận xóa đánh giá"}
                description={"Bạn có chắc xóa đánh giá này không?"}
            />

            <UpdateReview
                idReview={openUpdateReview.id}
                open={openUpdateReview.open}
                onClose={handleCloseUpdateReview}
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
                                value={selectedStar}
                                options={reviewOption}
                                onChange={(e) => setSelectedStar(e.target.value as string[])}
                                placeholder={t('star')}
                            />
                        </Box>
                        <Box sx={{
                            width: '200px',
                        }}>
                            <SearchField value={searchBy} onChange={(value: string) => setSearchBy(value)} />
                        </Box>
                    </Box>
                    <CustomDataGrid
                        rows={reviews.data}
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

export default ListReviewPage
