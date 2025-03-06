"use client"

//React
import React, { useEffect, useMemo, useState } from 'react'

//Next
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'

//MUI
import { Chip, ChipProps, Grid, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/material'
import { GridColDef, GridRenderCellParams, GridRowClassNameParams, GridRowSelectionModel, GridSortModel } from '@mui/x-data-grid'

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
import CreateUpdateEmployee from './components/CreateUpdateEmployee'
import Spinner from 'src/components/spinner'

//toast
import toast from 'react-hot-toast'
import ConfirmDialog from 'src/components/confirm-dialog'
import { OBJECT_TYPE_ERROR } from 'src/configs/error'

//utils
import { formatFilter, toFullName } from 'src/utils'
import { hexToRGBA } from 'src/utils/hex-to-rgba'


import { usePermission } from 'src/hooks/usePermission'
import { deleteMultipleEmployeesAsync, deleteEmployeeAsync, getAllEmployeesAsync } from 'src/stores/employee/action'
import { resetInitialState } from 'src/stores/employee'
import TableHeader from 'src/components/table-header'
import { PERMISSIONS } from 'src/configs/permission'
import { styled } from '@mui/material'
import CustomSelect from 'src/components/custom-select'
import { useDebounce } from 'src/hooks/useDebounce'
import { TFilter } from 'src/configs/filter'


type TProps = {}

type TSelectedRow = {
    id: string,
    role: {
        name: string,
        permissions: string[]
    }
}

const StyledActiveEmployee = styled(Chip)<ChipProps>(({ theme }) => ({
    backgroundColor: "#28c76f29",
    color: "#28c76f",
    fontSize: "14px",
    padding: "8px 4px",
    fontWeight: 600
}))

const StyledInactiveEmployee = styled(Chip)<ChipProps>(({ theme }) => ({
    backgroundColor: "#da251d29",
    color: "#da251d",
    fontSize: "14px",
    padding: "8px 4px",
    fontWeight: 600
}))


const ListEmployeePage: NextPage<TProps> = () => {
    //States
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
    const [openCreateUpdateEmployee, setOpenCreateUpdateEmployee] = useState({
        open: false,
        id: ""
    });
    const [openDeleteEmployee, setOpenDeleteEmployee] = useState({
        open: false,
        id: ""
    });

    const [openDeleteMultipleEmployee, setOpenDeleteMultipleEmployee] = useState(false);


    const [sortBy, setSortBy] = useState<string>("createdDate asc");
    const [filters, setFilters] = useState<TFilter[]>([]);

    const debouncedFilters = useDebounce(filters, 500);


    const [loading, setLoading] = useState(false);
    const [selectedRow, setSelectedRow] = useState<TSelectedRow[]>([]);
    const [roleOptions, setRoleOptions] = useState<{ label: string, value: string }[]>([])
    const [cityOptions, setCityOptions] = useState<{ label: string, value: string }[]>([])
    const [selectedRole, setSelectedRole] = useState<string[]>([]);
    const [selectedCity, setSelectedCity] = useState<string[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
    const [filterBy, setFilterBy] = useState<Record<string, string | string[]>>({});

    //Translation
    const { t, i18n } = useTranslation();


    //hooks
    const { VIEW, CREATE, UPDATE, DELETE } = usePermission("USER.EMPLOYEE", ["CREATE", "UPDATE", "DELETE", "VIEW"]);

    //router
    const router = useRouter();

    //Redux
    const { employees, isSuccessCreateUpdate, isErrorCreateUpdate, isLoading,
        errorMessageCreateUpdate, isSuccessDelete, isErrorDelete, errorMessageDelete, typeError, isSuccessDeleteMultiple, isErrorDeleteMultiple, errorMessageDeleteMultiple } = useSelector((state: RootState) => state.employee)
    const dispatch: AppDispatch = useDispatch();

    //Theme
    const theme = useTheme();

    //api 
    const handleGetListEmployee = () => {
        const [orderByField, orderByDir] = sortBy.split(" ");
        const validFilters = debouncedFilters.filter(
            (f) => f.field && f.operator && (f.value || ["isnull", "isnotnull", "isempty", "isnotempty"].includes(f.operator))
        );
        const filterString = validFilters.length > 0
            ? validFilters.map((f) => `${f.field}::${f.value}::${f.operator}`).join("|")
            : "";
        const query = {
            params: {
                filters: filterString,
                take: pageSize,
                skip: (page - 1) * pageSize,
                orderBy: orderByField || "createdDate",
                dir: orderByDir || "asc",
                paging: true,
                keywords: debouncedFilters.length > 0 ? debouncedFilters[0].value || "''" : "''",
            },
        };
        dispatch(getAllEmployeesAsync(query));
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

    const handleCloseCreateUpdateEmployee = () => {
        setOpenCreateUpdateEmployee({
            open: false,
            id: ""
        })
    }

    const handleCloseDeleteDialog = () => {
        setOpenDeleteEmployee({
            open: false,
            id: ""
        })
    }

    const handleCloseDeleteMultipleDialog = () => {
        setOpenDeleteMultipleEmployee(false)
    }

    const handleDeleteEmployee = () => {
        dispatch(deleteEmployeeAsync(openDeleteEmployee.id))
    }

    const handleDeleteMultipleEmployee = () => {
        dispatch(deleteMultipleEmployeesAsync({
            employeeIds: selectedRow?.map((item: TSelectedRow) => item.id)
        }))
    }

    const handleAction = (action: string) => {
        switch (action) {
            case "delete": {
                setOpenDeleteMultipleEmployee(true)
            }
        }
    }

    const columns: GridColDef[] = [
        {
            field: i18n.language === "en" ? "firstName" : "lastName",
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
                    <Typography>{row?.city?.name}</Typography>
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
                        {row?.status ? (
                            <StyledActiveEmployee label={t('active')} />
                        ) : (
                            <StyledInactiveEmployee label={t('inactive')} />
                        )
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
                            onClick={() => setOpenCreateUpdateEmployee({
                                open: true,
                                id: String(params.id)
                            })}
                        />
                        <GridDelete
                            disabled={!DELETE}
                            onClick={() => setOpenDeleteEmployee({
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
            rowLength={employees.total}
        />
    };

    useEffect(() => {
        handleGetListEmployee();
    }, [sortBy, i18n.language, page, pageSize, filterBy]);

    useEffect(() => {
        setFilterBy({ roleId: selectedRole, status: selectedStatus, cityId: selectedCity });
    }, [selectedRole, selectedStatus, selectedCity]);


    /// create update Employee
    useEffect(() => {
        if (isSuccessCreateUpdate) {
            if (!openCreateUpdateEmployee.id) {
                toast.success(t("create_employee_success"))
            } else {
                toast.success(t("update_employee_success"))
            }
            handleGetListEmployee()
            handleCloseCreateUpdateEmployee()
            dispatch(resetInitialState())
        } else if (isErrorCreateUpdate && errorMessageCreateUpdate && typeError) {
            const errConfig = OBJECT_TYPE_ERROR[typeError]
            if (errConfig) {
                toast.error(t(errConfig))
            } else {
                if (openCreateUpdateEmployee.id) {
                    toast.error(t("update_employee_error"))
                } else {
                    toast.error(t("create_employee_error"))
                }
            }
            dispatch(resetInitialState())
        }
    }, [isSuccessCreateUpdate, isErrorCreateUpdate, errorMessageCreateUpdate, typeError])

    //delete multiple Employees
    useEffect(() => {
        if (isSuccessDeleteMultiple) {
            toast.success(t("delete_multiple_employee_success"))
            handleGetListEmployee()
            dispatch(resetInitialState())
            handleCloseDeleteMultipleDialog()
            setSelectedRow([])
        } else if (isErrorDeleteMultiple && errorMessageDeleteMultiple) {
            toast.error(t("delete_multiple_employee_error"))
            dispatch(resetInitialState())
        }
    }, [isSuccessDeleteMultiple, isErrorDeleteMultiple, errorMessageDeleteMultiple])

    const memoDisableDeleteEmployee = useMemo(() => {
        return selectedRow.some((item: TSelectedRow) => item?.role?.permissions?.includes(PERMISSIONS.ADMIN))
    }, [selectedRow])

    //delete Employee
    useEffect(() => {
        if (isSuccessDelete) {
            toast.success(t("delete_employee_success"))
            handleGetListEmployee()
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
                open={openDeleteEmployee.open}
                onClose={handleCloseDeleteDialog}
                handleCancel={handleCloseDeleteDialog}
                handleConfirm={handleDeleteEmployee}
                title={"Xác nhận xóa người dùng"}
                description={"Bạn có chắc xóa người dùng này không?"}
            />
            <ConfirmDialog
                open={openDeleteMultipleEmployee}
                onClose={handleCloseDeleteMultipleDialog}
                handleCancel={handleCloseDeleteMultipleDialog}
                handleConfirm={handleDeleteMultipleEmployee}
                title={"Xác nhận xóa nhiều người dùng"}
                description={"Bạn có chắc xóa các người dùng này không?"}
            />
            <CreateUpdateEmployee
                idEmployee={openCreateUpdateEmployee.id}
                open={openCreateUpdateEmployee.open}
                onClose={handleCloseCreateUpdateEmployee}
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
                            <GridCreate onClick={() => {
                                setOpenCreateUpdateEmployee({ open: true, id: "" })
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
                                    disabled: memoDisableDeleteEmployee || !DELETE
                                }]
                            }
                            handleAction={handleAction}
                        />
                    )}
                    <CustomDataGrid
                        rows={employees.data}
                        columns={columns}
                        checkboxSelection
                        getRowId={(row) => row.id}
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
                        //     setOpenCreateUpdateEmployee({ open: true, id: String(row.id) })
                        // }}
                        sx={{
                            ".selected-row": {
                                backgroundColor: `${hexToRGBA(theme.palette.primary.main, 0.08)} !important`,
                                color: `${theme.palette.primary.main} !important`
                            }
                        }}
                        onRowSelectionModelChange={(row: GridRowSelectionModel) => {
                            const formatedData: any = row.map((id) => {
                                const findRow: any = employees.data?.find((item: any) => item._id === id)
                                if (findRow) {
                                    return { id: findRow?._id, role: findRow?.role }
                                }
                            })
                            setSelectedRow(formatedData)
                        }}
                        rowSelectionModel={selectedRow?.map(item => item.id)}
                    />
                </Grid>
            </Box >
        </>
    )
}

export default ListEmployeePage
