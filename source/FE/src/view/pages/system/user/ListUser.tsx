"use client"

//React
import React, { useEffect, useState } from 'react'

//Next
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'

//MUI
import { Grid, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/material'
import { GridColDef, GridRenderCellParams, GridRowClassNameParams, GridSortModel } from '@mui/x-data-grid'

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
import CreateUpdateUser from './components/CreateUpdateUser'
import Spinner from 'src/components/spinner'

//toast
import toast from 'react-hot-toast'
import ConfirmDialog from 'src/components/confirm-dialog'
import { OBJECT_TYPE_ROLE_ERROR } from 'src/configs/role'

//utils
import { toFullName } from 'src/utils'
import { hexToRGBA } from 'src/utils/hex-to-rgba'
import { usePermission } from 'src/hooks/usePermission'
import { deleteUserAsync, getAllUsersAsync } from 'src/stores/user/action'
import { getUserDetail } from 'src/services/user'
import { resetInitialState } from 'src/stores/user'

type TProps = {}

const ListUserPage: NextPage<TProps> = () => {
    //States
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
    const [openCreateUpdateUser, setOpenCreateUpdateUser] = useState({
        open: false,
        id: ""
    });
    const [openDeleteUser, setOpenDeleteUser] = useState({
        open: false,
        id: ""
    });
    const [sortBy, setSortBy] = useState("createdAt asc");
    const [searchBy, setSearchBy] = useState("");

    const [loading, setLoading] = useState(false);

    //hooks
    const { VIEW, CREATE, UPDATE, DELETE } = usePermission("SYSTEM.USER", ["CREATE", "UPDATE", "DELETE", "VIEW"]);

    //router
    const router = useRouter();

    //Translation
    const { t, i18n } = useTranslation();

    //Redux
    const { users, isSuccessCreateUpdate, isErrorCreateUpdate, isLoading,
        errorMessageCreateUpdate, isSuccessDelete, isErrorDelete, errorMessageDelete, typeError } = useSelector((state: RootState) => state.user)
    const dispatch: AppDispatch = useDispatch();

    //Theme
    const theme = useTheme();

    //api 
    const handleGetListUser = () => {
        dispatch(getAllUsersAsync({ params: { limit: -1, page: -1, search: searchBy, order: sortBy } }));
    }

    //handlers
    const handleOnChangePagination = (page: number, pageSize: number) => { }

    const handleSort = (sort: GridSortModel) => {
        const sortOption = sort[0]
        setSortBy(`${sortOption.field} ${sortOption.sort}`)
    }

    const handleCloseCreateUpdateUser = () => {
        setOpenCreateUpdateUser({
            open: false,
            id: ""
        })
    }

    const handleCloseDeleteDialog = () => {
        setOpenDeleteUser({
            open: false,
            id: ""
        })
    }

    const handleDeleteUser = () => {
        dispatch(deleteUserAsync(openDeleteUser.id))
    }

    // const handleGetUserDetail = async (id: string) => {
    //     setLoading(true)
    //     await getUserDetail(id).then((res) => {
    //         if (res?.data) {
    //         }
    //         setLoading(false)
    //     }).catch((e) => {
    //         setLoading(false)
    //     })
    // }

    const columns: GridColDef[] = [
        {
            field: 'fullName',
            headerName: t('full_name'),
            flex: 1,
            minWidth: 200,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                const fullName = toFullName(row?.lastName || "", row?.middleName || "", row?.firstName || "", i18n.language)
                return (
                    <Typography>{fullName}</Typography>
                )
            }
        },
        {
            field: 'email',
            headerName: t('email'),
            minWidth: 200,
            maxWidth: 200,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography>{row?.email}</Typography>
                )
            }
        },
        {
            field: 'role',
            headerName: t('role'),
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography>{row?.role?.name}</Typography>
                )
            }
        },
        {
            field: 'phoneNumber',
            headerName: t('phone_number'),
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography>{row?.phoneNumber}</Typography>
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
                    <Typography>{row?.city}</Typography>
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
                            onClick={() => setOpenCreateUpdateUser({
                                open: true,
                                id: String(params.id)
                            })}
                        />
                        <GridDelete
                            disabled={!DELETE}
                            onClick={() => setOpenDeleteUser({
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
            rowLength={users.total} />
    };
    useEffect(() => {
        handleGetListUser();
    }, [sortBy, searchBy])

    // useEffect(() => {
    //     if (selectedRow.id) {
    //         handleGetUserDetail(selectedRow.id)
    //     }
    // }, [selectedRow])

    useEffect(() => {
        if (isSuccessCreateUpdate) {
            if (!openCreateUpdateUser.id) {
                toast.success(t("create_user_success"))
            } else {
                toast.success(t("update_user_success"))
            }
            handleGetListUser()
            handleCloseCreateUpdateUser()
            dispatch(resetInitialState())
        } else if (isErrorCreateUpdate && errorMessageCreateUpdate && typeError) {
            const errConfig = OBJECT_TYPE_ROLE_ERROR[typeError]
            if (errConfig) {
                toast.error(t(errConfig))
            } else {
                if (openCreateUpdateUser.id) {
                    toast.error(t("update_user_error"))
                } else {
                    toast.error(t("create_user_error"))
                }
            }
            dispatch(resetInitialState())
        }
    }, [isSuccessCreateUpdate, isErrorCreateUpdate, errorMessageCreateUpdate, typeError])

    useEffect(() => {
        if (isSuccessDelete) {
            toast.success(t("delete_user_success"))
            handleGetListUser()
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
                open={openDeleteUser.open}
                onClose={handleCloseDeleteDialog}
                handleCancel={handleCloseDeleteDialog}
                handleConfirm={handleDeleteUser}
                title={"Xác nhận xóa người dùng"}
                description={"Bạn có chắc xóa người dùng này không?"}
            />
            <CreateUpdateUser
                idUser={openCreateUpdateUser.id}
                open={openCreateUpdateUser.open}
                onClose={handleCloseCreateUpdateUser}
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
                        <Box sx={{
                            width: '200px',
                        }}>
                            <SearchField value={searchBy} onChange={(value: string) => setSearchBy(value)} />
                        </Box>
                        <GridCreate onClick={() => {
                            setOpenCreateUpdateUser({ open: true, id: "" })
                        }}
                        />
                    </Box>
                    <CustomDataGrid
                        rows={users.data}
                        columns={columns}
                        pageSizeOptions={[5]}
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
                        onRowClick={row => {
                            setOpenCreateUpdateUser({ open: true, id: String(row.id) })
                        }}
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

export default ListUserPage
