import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import { useTranslation } from 'react-i18next';
import { formatPrice } from 'src/utils';
import Image from 'src/components/image';
import IconifyIcon from 'src/components/Icon';
import TextMaxLine from 'src/components/text-max-line';

type Props = {
    totalPrice: number;
    shippingPrice: number;
    voucherDiscount: number;
    selectedProduct: any[];
    loading?: boolean;
    onSubmit?: () => void;
};

export default function CheckoutSummary({
    totalPrice,
    shippingPrice,
    voucherDiscount,
    selectedProduct,
    loading,
    onSubmit
}: Props) {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <Stack
            spacing={3}
            sx={{
                p: 5,
                borderRadius: 2,
                border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{t('order_summary')}</Typography>

            {selectedProduct?.length > 0 && (
                <>
                    {selectedProduct.map((product) => (
                        <Stack key={product.productId} direction="row" alignItems="flex-start">
                            <Image
                                src={product.images?.[0]?.imageUrl}
                                sx={{
                                    mr: 2,
                                    width: 64,
                                    height: 64,
                                    flexShrink: 0,
                                    borderRadius: 1.5,
                                    bgcolor: 'background.neutral',
                                }}
                            />

                            <Stack flexGrow={1}>
                                <TextMaxLine variant="body2" line={1} sx={{ fontWeight: 'fontWeightMedium' }}>
                                    {product.name}
                                </TextMaxLine>

                                <Typography variant="subtitle2" sx={{ mt: 0.5, mb: 1.5 }}>
                                    {formatPrice(product.price * (100 - product.discount * 100) / 100)}đ
                                </Typography>
                            </Stack>
                            <Typography variant="subtitle2" sx={{ mt: 0.5, mb: 1.5 }}>
                                x{product.amount}
                            </Typography>
                        </Stack>
                    ))}

                    <Divider sx={{ borderStyle: 'dashed' }} />
                </>
            )}

            <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between" sx={{ typography: 'subtitle2' }}>
                    <Box component="span" sx={{ typography: 'body2' }}>
                        {t('subtotal')}
                    </Box>
                    {formatPrice(totalPrice)}đ
                </Stack>

                <Stack direction="row" justifyContent="space-between" sx={{ typography: 'subtitle2' }}>
                    <Box component="span" sx={{ typography: 'body2' }}>
                        {t('shipping_fee')}
                    </Box>
                    +{formatPrice(shippingPrice)}đ
                </Stack>

                <Stack direction="row" justifyContent="space-between" sx={{ typography: 'subtitle2' }}>
                    <Box component="span" sx={{ typography: 'body2' }}>
                        {t('discount')}
                    </Box>
                    -{formatPrice(voucherDiscount)}đ
                </Stack>
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Stack direction="row" justifyContent="space-between" sx={{ typography: 'h6' }}>
                <Box component="span" sx={{ fontWeight: 'bold' }}>{t('total')}</Box>
                <Box component="span" sx={{ fontWeight: 'bold' }} color={theme.palette.primary.main}>{formatPrice(Number(totalPrice) + Number(shippingPrice) - Number(voucherDiscount))}đ
                </Box>
            </Stack>

            <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={onSubmit}
            >
                {t('place_order')}
            </Button>
        </Stack>
    );
}
