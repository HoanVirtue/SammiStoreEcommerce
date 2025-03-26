import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Stack,
    Typography,
    IconButton,
    Button,
    Box,
    TextField,
    Divider,
    useTheme,
    DialogActions,
    Radio,
    RadioGroup
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import IconifyIcon from 'src/components/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVouchersAsync } from 'src/stores/voucher/action';
import { RootState } from 'src/stores';
import { getAllVouchers, getMyVouchers } from 'src/services/voucher';
import { TParamsVouchers } from 'src/types/voucher';

type VoucherModalProps = {
    open: boolean;
    onClose: () => void;
    onSelectVoucher: (voucherId: string) => void;
};

const VoucherModal = ({ open, onClose, onSelectVoucher }: VoucherModalProps) => {

    //Hook
    const { t } = useTranslation();
    const theme = useTheme();

    //Redux
    const dispatch = useDispatch();

    //State
    const [vouchers, setVouchers] = useState([]);
    const [selectedVoucher, setSelectedVoucher] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchVouchers = async () => {
        setLoading(true);
        await getMyVouchers({
            params: {
                take: -1,
                skip: 0,
                paging: false,
                orderBy: "name",
                dir: "asc",
                keywords: "''",
                filters: "",
            },
        })
            .then((res) => {
                const data = res?.result
                if (data) {
                    setVouchers(data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchVouchers();
    }, []);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6">{t('select_voucher')}</Typography>
                    <IconButton onClick={onClose}>
                        <IconifyIcon icon="material-symbols:close" />
                    </IconButton>
                </Stack>
            </DialogTitle>

            <DialogContent>
                <Stack spacing={3}>
                    {/* Voucher Input */}
                    <Stack direction="row" spacing={1}>
                        <TextField
                            fullWidth
                            placeholder={t('enter_voucher_code')}
                            size="small"
                        />
                        <Button variant="contained" sx={{ textWrap: 'nowrap' }}>
                            {t('apply_voucher')}
                        </Button>
                    </Stack>

                    <Divider />

                    {/* Available Vouchers */}
                    <Stack spacing={2}>
                        <Typography variant="subtitle1">{t('sammi_voucher')}</Typography>

                        <RadioGroup
                            value={selectedVoucher}
                            onChange={(e) => setSelectedVoucher(e.target.value)}
                        >
                            {vouchers.map((voucher: TParamsVouchers) => (
                                <Box
                                    key={voucher.id}
                                    sx={{
                                        p: 2,
                                        border: `1px solid ${theme.palette.divider}`,
                                        borderRadius: 1,
                                        cursor: 'pointer',
                                        '&:hover': {
                                            borderColor: theme.palette.primary.main,
                                        }
                                    }}
                                >
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <IconifyIcon
                                            icon="pepicons-pencil:ticket"
                                            width={40}
                                            color={theme.palette.primary.main}
                                        />
                                        <Stack spacing={0.5} flex={1}>
                                            <Typography variant="subtitle2">
                                                {voucher.name}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {t('minimum_order')}: {voucher.discountValue}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {t('end_date')}: {new Date(voucher.endDate).toLocaleDateString()}
                                            </Typography>
                                        </Stack>
                                        <Radio value={voucher.id} />
                                    </Stack>
                                </Box>
                            ))}
                        </RadioGroup>

                    </Stack>
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} variant="outlined" color="inherit">
                    {t('cancel')}
                </Button>
                <Button variant="contained" disabled={!selectedVoucher}
                    onClick={() => {
                        onSelectVoucher(selectedVoucher);
                        onClose();
                    }}>
                    {t('confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default VoucherModal;
