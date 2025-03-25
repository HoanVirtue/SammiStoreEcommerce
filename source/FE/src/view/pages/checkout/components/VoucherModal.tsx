import React from 'react';
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

type VoucherModalProps = {
    open: boolean;
    onClose: () => void;
};

const VoucherModal = ({ open, onClose }: VoucherModalProps) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const [selectedVoucher, setSelectedVoucher] = React.useState('');

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
                            {/* Voucher Item */}
                            <Box
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
                                            Giảm 50K
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Đơn tối thiểu 500K
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            HSD: 31/12/2023
                                        </Typography>
                                    </Stack>
                                    <Radio value="voucher2" />
                                </Stack>
                            </Box>
                            <Box
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
                                            Giảm 50K
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Đơn tối thiểu 500K
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            HSD: 31/12/2023
                                        </Typography>
                                    </Stack>
                                    <Radio value="voucher1" />
                                </Stack>
                            </Box>
                        </RadioGroup>

                    </Stack>
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} variant="outlined" color="inherit">
                    {t('cancel')}
                </Button>
                <Button variant="contained" disabled={!selectedVoucher}>
                    {t('confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default VoucherModal;
