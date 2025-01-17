"use client"

//React
import React, { useEffect, useState } from 'react'

//Next
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'

//MUI
import { Button, Grid, useTheme } from '@mui/material'
import { Box } from '@mui/material'
import { GridColDef, GridRowClassNameParams, GridSortModel } from '@mui/x-data-grid'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { resetInitialState } from 'src/stores/role'
import { deleteRoleAsync, getAllRolesAsync, updateRoleAsync } from 'src/stores/role/action'

//translation
import { useTranslation } from '../../../../../node_modules/react-i18next'

//configs
import { PAGE_SIZE_OPTIONS } from 'src/configs/gridConfig'

//components
import CustomDataGrid from 'src/components/custom-data-grid'
import CustomPagination from 'src/components/custom-pagination'
import GridUpdate from 'src/components/grid-update'
import GridDelete from 'src/components/grid-delete'
import GridCreate from 'src/components/grid-create'
import SearchField from 'src/components/search-field'
import CreateUpdateRole from './components/CreateUpdateRole'
import Spinner from 'src/components/spinner'

//toast
import toast from 'react-hot-toast'
import ConfirmDialog from 'src/components/confirm-dialog'
import IconifyIcon from 'src/components/Icon'
import { OBJECT_TYPE_ROLE_ERROR } from 'src/configs/role'
import TablePermission from './components/TablePermission'
import { getRoleDetail } from 'src/services/role'
import { PERMISSIONS } from 'src/configs/permission'
import { getAllValuesOfObject } from 'src/utils'
import { hexToRGBA } from 'src/utils/hex-to-rgba'
import { usePermission } from 'src/hooks/usePermission'


type TProps = {}

const ListRolePage: NextPage<TProps> = () => {
    //States
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
    const [openCreateUpdateRole, setOpenCreateUpdateRole] = useState({
        open: false,
        id: ""
    });
    const [openDeleteRole, setOpenDeleteRole] = useState({
        open: false,
        id: ""
    });
    const [sortBy, setSortBy] = useState("created asc");
    const [searchBy, setSearchBy] = useState("");
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const [selectedRow, setSelectedRow] = useState({
        id: "",
        name: ""
    });
    const [loading, setLoading] = useState(false);
    const [disablePermission, setDisablePermission] = useState(false);
    const { VIEW, CREATE, UPDATE, DELETE } = usePermission("SYSTEM.ROLE", ["CREATE", "UPDATE", "DELETE", "VIEW"]);

    //router
    const router = useRouter();

    //Translation
    const { t } = useTranslation();

    //Redux
    const { roles, isSuccessCreateUpdate, isErrorCreateUpdate, isLoading,
        errorMessageCreateUpdate, isSuccessDelete, isErrorDelete, errorMessageDelete, typeError } = useSelector((state: RootState) => state.role)
    const dispatch: AppDispatch = useDispatch();


    //Theme
    const theme = useTheme();


    //api 
    const handleGetListRole = () => {
        dispatch(getAllRolesAsync({ params: { limit: -1, page: -1, search: searchBy, order: sortBy } }));
    }

    const handleUpdateRole = () => {
        dispatch(updateRoleAsync({ name: selectedRow.name, id: selectedRow.id, permissions: selectedPermissions }));
    }

    //handlers

    const handleOnChangePagination = (page: number, pageSize: number) => { }

    const handleSort = (sort: GridSortModel) => {
        const sortOption = sort[0]
        console.log(sortOption)
        setSortBy(`${sortOption.field} ${sortOption.sort}`)
    }

    const handleCloseCreateUpdateRole = () => {
        setOpenCreateUpdateRole({
            open: false,
            id: ""
        })
    }

    const handleCloseDeleteDialog = () => {
        setOpenDeleteRole({
            open: false,
            id: ""
        })
    }

    const handleDeleteRole = () => {
        dispatch(deleteRoleAsync(openDeleteRole.id))
    }

    const handleGetRoleDetail = async (id: string) => {
        setLoading(true)
        await getRoleDetail(id).then((res) => {
            if (res?.data) {
                if (res?.data.permissions.includes(PERMISSIONS.ADMIN)) {
                    setDisablePermission(true)
                    setSelectedPermissions(getAllValuesOfObject(PERMISSIONS, [PERMISSIONS.ADMIN, PERMISSIONS.BASIC]))
                    console.log(selectedPermissions)
                } else if (res?.data.permissions.includes(PERMISSIONS.BASIC)) {
                    setDisablePermission(true)
                    setSelectedPermissions(PERMISSIONS.DASHBOARD)
                }
                else {
                    setDisablePermission(false)
                    setSelectedPermissions(res?.data?.permissions || [])
                }
            }
            setLoading(false)
        }).catch((e) => {
            setLoading(false)
        })
    }

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: t('name'),
            flex: 1
        },
        {
            field: 'action',
            headerName: t('action'),
            width: 150,
            sortable: false,
            align: "left",
            renderCell: (params) => {
                const { row } = params
                return (
                    <Box sx={{ width: "100%" }}>
                        {!row?.permissions?.some((per: string) => ['ADMIN.GRANTED', 'BASIC.PUBLIC']?.includes(per)) ? (
                            <>
                                <GridUpdate onClick={() => setOpenCreateUpdateRole({
                                    open: true,
                                    id: String(params.id)
                                })}
                                />
                                <GridDelete onClick={() => setOpenDeleteRole({
                                    open: true,
                                    id: String(params.id)
                                })} />
                            </>
                        ) : (
                            <Box sx={{ paddingLeft: "5px" }}>
                                <IconifyIcon icon="material-symbols-light:lock-outline" fontSize={30} />
                            </Box>
                        )}
                    </Box>
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
            rowLength={roles.total} />
    };

    useEffect(() => {
        handleGetListRole();
    }, [sortBy, searchBy])

    useEffect(() => {
        if (selectedRow.id) {
            handleGetRoleDetail(selectedRow.id)
        }
    }, [selectedRow])

    useEffect(() => {
        if (isSuccessCreateUpdate) {
            if (!openCreateUpdateRole.id) {
                toast.success(t("create_role_success"))
            } else {
                toast.success(t("update_role_success"))
            }
            handleGetListRole()
            handleCloseCreateUpdateRole()
            dispatch(resetInitialState())
        } else if (isErrorCreateUpdate && errorMessageCreateUpdate && typeError) {
            const errConfig = OBJECT_TYPE_ROLE_ERROR[typeError]
            if (errConfig) {
                toast.error(t(errConfig))
            } else {
                if (openCreateUpdateRole.id) {
                    toast.error(t("update_role_error"))
                } else {
                    toast.error(t("create_role_error"))
                }
            }
            dispatch(resetInitialState())
        }
    }, [isSuccessCreateUpdate, isErrorCreateUpdate, errorMessageCreateUpdate, typeError])

    useEffect(() => {
        if (isSuccessDelete) {
            toast.success(t("delete_role_success"))
            handleGetListRole()
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
                open={openDeleteRole.open}
                onClose={handleCloseDeleteDialog}
                handleCancel={handleCloseDeleteDialog}
                handleConfirm={handleDeleteRole}
                title={"Xác nhận xóa nhóm vai trò"}
                description={"Bạn có chắc xóa nhóm vai trò này không?"}
            />
            <CreateUpdateRole
                idRole={openCreateUpdateRole.id}
                open={openCreateUpdateRole.open}
                onClose={handleCloseCreateUpdateRole}
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
                <Grid container sx={{ width: '100%', height: '100%' }} spacing={5}>
                    <Grid item md={4} xs={12}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 2,
                        }}>
                            <Box sx={{
                                width: '200px',
                            }}>
                                <SearchField value={searchBy} onChange={(value: string) => setSearchBy(value)} />
                            </Box>
                            <GridCreate onClick={() => {
                                setOpenCreateUpdateRole({ open: true, id: "" })
                            }}
                            />
                        </Box>
                        <CustomDataGrid
                            rows={roles.data}
                            columns={columns}
                            pageSizeOptions={[5]}
                            // checkboxSelection
                            getRowId={(row) => row._id}
                            disableRowSelectionOnClick
                            autoHeight
                            hideFooter
                            sortingOrder={['desc', 'asc']}
                            sortingMode='server'
                            onSortModelChange={handleSort}
                            slots={{
                                pagination: PaginationComponent
                            }}
                            disableColumnFilter
                            disableColumnMenu
                            onRowClick={row => {
                                setSelectedRow({ id: String(row.id), name: row?.row?.name })
                                setOpenCreateUpdateRole({ open: false, id: String(row.id) })
                            }}
                            getRowClassName={(row: GridRowClassNameParams) => {
                                return row.id === selectedRow.id ? 'selected-row' : ''
                            }}
                            sx={{
                                ".selected-row": {
                                    backgroundColor: `${hexToRGBA(theme.palette.primary.main, 0.08)} !important`,
                                    color: `${theme.palette.primary.main} !important`
                                }
                            }}
                        />
                    </Grid>
                    <Grid item md={8} xs={12}>
                        {selectedRow?.id && (
                            <>
                                <Box>
                                    <TablePermission
                                        setSelectedPermissions={setSelectedPermissions}
                                        selectedPermissions={selectedPermissions}
                                        disabled={disablePermission}
                                    />
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button
                                            type='submit'
                                            disabled={disablePermission}
                                            variant='contained'
                                            sx={{ mt: 3, mb: 2 }}
                                            onClick={handleUpdateRole} >
                                            {t('update')}
                                        </Button>
                                    </Box>
                                </Box>
                            </>
                        )}
                    </Grid>
                </Grid>
            </Box >
        </>
    )
}

export default ListRolePage
