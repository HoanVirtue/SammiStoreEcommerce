import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    styled,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface ReceiptItem {
    id: number;
    description: string;
    unit: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    cost: number;
    total: number;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    padding: theme.spacing(1),
    '& .MuiTextField-root': {
        margin: 0,
        width: '100%',
    },
}));

const CreateUpdateReceipt: React.FC = () => {
    const [receiptDate, setReceiptDate] = useState<Date | null>(new Date());
    const [items, setItems] = useState<ReceiptItem[]>([
        { id: 1, description: '', unit: '', quantity: 0, unitPrice: 0, discount: 0, cost: 0, total: 0 },
        { id: 2, description: '', unit: '', quantity: 0, unitPrice: 0, discount: 0, cost: 0, total: 0 },
        { id: 3, description: '', unit: '', quantity: 0, unitPrice: 0, discount: 0, cost: 0, total: 0 },
    ]);

    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 2 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5">NHẬP KHO</Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button variant="contained" color="primary">
                            Lưu lại
                        </Button>
                        <Button variant="outlined">Xem phiếu</Button>
                        <Button variant="contained" color="success">
                            Thêm mới
                        </Button>
                        <Button variant="contained" color="error">
                            Xóa phiếu
                        </Button>
                    </Box>
                </Box>

                {/* Form Fields */}
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Số phiếu"
                            placeholder="Số PHIẾU TỰ ĐỘNG"
                            disabled
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label="Ngày nhập *"
                                value={receiptDate}
                                onChange={(newValue) => setReceiptDate(newValue)}
                                slotProps={{ textField: { size: 'small', fullWidth: true } }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextField
                                fullWidth
                                label="Nhà cung cấp *"
                                placeholder="Nhập mã | tên NCC | ĐT | MST"
                                size="small"
                            />
                            <IconButton color="primary" sx={{ border: 1, borderColor: 'primary.main' }}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Người giao hàng"
                            placeholder="Người giao hàng (nếu có)"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Diễn giải"
                            placeholder="Diễn giải"
                            size="small"
                        />
                    </Grid>
                </Grid>

                {/* Items Table */}
                <TableContainer sx={{ mt: 3 }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Hàng hóa nhập</TableCell>
                                <TableCell>ĐVT</TableCell>
                                <TableCell>SL</TableCell>
                                <TableCell>Đơn giá nhập</TableCell>
                                <TableCell>CK (%)</TableCell>
                                <TableCell>Giá vốn</TableCell>
                                <TableCell>Thành tiền</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item, index) => (
                                <TableRow key={item.id}>
                                    <StyledTableCell>{index + 1}</StyledTableCell>
                                    <StyledTableCell>
                                        <TextField
                                            size="small"
                                            placeholder="Nhập mã hoặc tên hàng hóa"
                                            variant="outlined"
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <TextField size="small" variant="outlined" />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <TextField type="number" size="small" variant="outlined" />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <TextField type="number" size="small" variant="outlined" />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <TextField type="number" size="small" variant="outlined" />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <TextField type="number" size="small" variant="outlined" disabled />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <TextField type="number" size="small" variant="outlined" disabled />
                                    </StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Footer */}
                <Box sx={{
                    mt: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Tổng cộng:
                        </Typography>
                        <Typography variant="h6" color="primary">
                            0
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default CreateUpdateReceipt;
