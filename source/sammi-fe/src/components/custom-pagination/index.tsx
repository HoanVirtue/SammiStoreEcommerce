import * as React from 'react';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { PaginationProps, Select, styled } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Pagination } from '@mui/material';


type TProps = {
    page: number,
    pageSize: number,
    rowLength: number,
    pageSizeOptions: number[],
    onChangePagination: (page: number, pageSize: number) => void
}

const StyledPagination = styled(Pagination)<PaginationProps>(({ theme }) => ({
    "& .MuiDataGrid-footerContainer": {
        ".MuiBox-root": {
            flex: 1,
            width: "100% !important"
        }
    }
}))

const CustomPagination = React.forwardRef((props: TProps, ref: React.Ref<any>) => {
    const { page, pageSize, rowLength, pageSizeOptions, onChangePagination, ...rests } = props

    const { t } = useTranslation();
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: "100%",
            paddingLeft: "8px"
        }}>
            <Box>
                <span>{t('Đang hiển thị')}</span>
                <span className='font-bold'>
                    {page === 1 ? page : 1 + pageSize}
                    {' - '}
                </span>
                <span className='font-bold'>
                    {page * pageSize}
                </span>
                <span>trên</span>
                <span className='font-bold'>{rowLength}</span>
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    <span>Số dòng hiển thị</span>
                    <Select
                        size='small'
                        sx={{
                            width: '80px',
                            padding: 0,
                            '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input MuiInputBase-inputSizeSmall': {
                                minWidth: 'unset !important',
                                padding: "8.5px 12px 8.5px 24px !important"
                            }
                        }}
                        value={pageSize}
                        onChange={e => onChangePagination(1, +e.target.value)}
                    >
                        {pageSizeOptions.map((opt) => {
                            return (
                                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                            )
                        })}
                    </Select>
                </Box>
                <StyledPagination color='primary' {...rests} />
            </Box>
        </Box>
    );
})

export default CustomPagination