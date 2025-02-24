import React, { useState } from 'react';
import { GridColDef, GridSortModel } from '@mui/x-data-grid';
import useFetchData from 'src/hooks/useFetchData';
import SearchField from '../search-field';
import CustomSelect from '../custom-select';
import CustomDataGrid from '../custom-data-grid';
import CustomPagination from '../custom-pagination';
import TableHeader from '../table-header';
import { SelectChangeEvent } from '@mui/material';
import { PAGE_SIZE_OPTIONS } from 'src/configs/gridConfig';

interface GenericPageProps {
    endpoint: string; // API endpoint to fetch data
    columns: GridColDef[]; // Columns for the table
    filterOptions: {
        roles?: { label: string; value: string }[];
        statuses?: { label: string; value: string }[];
        cities?: { label: string; value: string }[];
    }; // Filter options
    createUpdateComponent: React.FC<{ id: string; open: boolean; onClose: () => void }>; // Component for create/update
    deleteComponent: React.FC<{ id: string; open: boolean; onClose: () => void }>; // Component for delete
}

const GenericPage: React.FC<GenericPageProps> = ({
    endpoint,
    columns,
    filterOptions,
    createUpdateComponent: CreateUpdateComponent,
    deleteComponent: DeleteComponent,
}) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
    const [sortModel, setSortModel] = useState<GridSortModel>([]);
    const [searchBy, setSearchBy] = useState('');
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [openCreateUpdate, setOpenCreateUpdate] = useState({ open: false, id: '' });
    const [openDelete, setOpenDelete] = useState({ open: false, id: '' });

    // Fetch data
    const { data, loading } = useFetchData(endpoint, {
        page,
        pageSize,
        sort: sortModel,
        search: searchBy,
        ...selectedFilters,
    },
        selectedFilters
    );

    // Handle page change
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    // Handle sorting
    const handleSortModelChange = (newSortModel: GridSortModel) => {
        setSortModel(newSortModel);
    };

    // Handle search
    const handleSearch = (value: string) => {
        setSearchBy(value);
    };

    // Handle filter change
    const handleFilterChange = (filterType: string, value: string[]) => {
        setSelectedFilters((prev) => ({ ...prev, [filterType]: value }));
    };

    const handleSelectChange = (filterType: string) => (event: SelectChangeEvent<unknown>) => {
        const selectedValue = event.target.value;
        const valueArray = Array.isArray(selectedValue) ? selectedValue : [selectedValue as string];
        handleFilterChange(filterType, valueArray);
    };

    // Handle actions (e.g., delete multiple)
    const handleAction = (action: string) => {
        if (action === 'delete') {
            setOpenDelete({ open: true, id: '' });
        }
    };

    return (
        <div>
            {/* Search and filter bar */}
            <div>
                <SearchField value={searchBy} onChange={handleSearch} />
                {filterOptions.roles && (
                    <CustomSelect
                        options={filterOptions.roles}
                        value={selectedFilters.role || []}
                        onChange={handleSelectChange('role')}
                        placeholder="Role"
                    />
                )}
                {filterOptions.statuses && (
                    <CustomSelect
                        options={filterOptions.statuses}
                        value={selectedFilters.status || []}
                        onChange={handleSelectChange('status')}
                        placeholder="Status"
                    />
                )}
                {filterOptions.cities && (
                    <CustomSelect
                        options={filterOptions.cities}
                        value={selectedFilters.city || []}
                        onChange={handleSelectChange('city')}
                        placeholder="City"
                    />
                )}
            </div>

            {/* Data grid */}
            <CustomDataGrid
                rows={data.rows}
                columns={columns}
                rowCount={data.total}
                checkboxSelection
                getRowId={(row) => row._id}
                disableRowSelectionOnClick
                onSortModelChange={handleSortModelChange}
                onRowSelectionModelChange={(rows) => setSelectedRows(rows)}
                rowSelectionModel={selectedRows}
            />

            {/* Pagination */}
            <CustomPagination
                page={page}
                pageSize={pageSize}
                rowLength={data.total}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                onChangePagination={handlePageChange}
            />

            {/* Create/Update component */}
            <CreateUpdateComponent
                id={openCreateUpdate.id}
                open={openCreateUpdate.open}
                onClose={() => setOpenCreateUpdate({ open: false, id: '' })}
            />

            {/* Delete component */}
            <DeleteComponent
                id={openDelete.id}
                open={openDelete.open}
                onClose={() => setOpenDelete({ open: false, id: '' })}
            />

            {/* Table header when rows are selected */}
            {selectedRows.length > 0 && (
                <TableHeader
                    selectedRowNumber={selectedRows.length}
                    onClear={() => setSelectedRows([])}
                    actions={[
                        { label: 'Delete', value: 'delete', disabled: false },
                    ]}
                    handleAction={handleAction}
                />
            )}
        </div>
    );
};

export default GenericPage;