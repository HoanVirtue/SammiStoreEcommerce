import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Spinner from 'src/components/spinner';
import { getReceiptDetail } from 'src/services/receipt';
import { formatDate, formatPrice } from 'src/utils';

interface ReceiptDetailProps {
    id: string;
    onClose: () => void;
}

const ReceiptDetail: React.FC<ReceiptDetailProps> = ({ id, onClose }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [receiptData, setReceiptData] = useState<any>(null);

    const fetchReceiptDetail = async (id: string) => {
        setLoading(true);
        try {
            const response = await getReceiptDetail(id);
            if (response?.result) {
                setReceiptData(response.result);
            }
        } catch (error) {
            console.error('Error fetching receipt detail:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchReceiptDetail(id);
        }
    }, [id]);

    return (
        <Box sx={{ p: 3, width: '100%' }}>
            {loading && <Spinner />}
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ mb: 3 }}>{t("receipt_detail")}</Typography>

                {receiptData && (
                    <>
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="subtitle1" fontWeight="bold">{t("receipt_code")}:</Typography>
                                <Typography variant="body1">{receiptData.code}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="subtitle1" fontWeight="bold">{t("receipt_date")}:</Typography>
                                <Typography variant="body1">{formatDate(receiptData.createdDate, { dateStyle: "medium", timeStyle: "short" })}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="subtitle1" fontWeight="bold">{t("supplier_name")}:</Typography>
                                <Typography variant="body1">{receiptData.supplierName}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="subtitle1" fontWeight="bold">{t("status")}:</Typography>
                                <Typography variant="body1">{receiptData.status}</Typography>
                            </Grid>
                        </Grid>

                        <Typography variant="h6" sx={{ mb: 2 }}>{t("receipt_items")}</Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{t("product_name")}</TableCell>
                                        <TableCell align="right">{t("quantity")}</TableCell>
                                        <TableCell align="right">{t("unit_price")}</TableCell>
                                        <TableCell align="right">{t("total")}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {receiptData.details?.map((item: any, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.productName}</TableCell>
                                            <TableCell align="right">{item.quantity}</TableCell>
                                            <TableCell align="right">{formatPrice(item.unitPrice)}</TableCell>
                                            <TableCell align="right">{formatPrice(item.quantity * item.unitPrice)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                            <Typography variant="h6" sx={{ mr: 2 }}>{t("total")}:</Typography>
                            <Typography variant="h6" color="primary">{formatPrice(receiptData.totalPrice)}</Typography>
                        </Box>
                    </>
                )}
            </Paper>
        </Box>
    );
};

export default ReceiptDetail; 