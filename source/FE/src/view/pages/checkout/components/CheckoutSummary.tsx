import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import { formatPrice } from 'src/utils';
import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';
import { useEffect, useState } from 'react';
import { getProductDetail } from 'src/services/product';
import { TProduct } from 'src/types/product';

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
    const [productDetails, setProductDetails] = useState<Record<number, TProduct>>({});

    useEffect(() => {
        const fetchProductDetails = async () => {
            const details: Record<number, TProduct> = {};
            for (const product of selectedProduct) {
                try {
                    const response = await getProductDetail(product.productId);
            
                    if (response?.result) {
                        details[product.productId] = response.result;
                    }
                } catch (error) {
                    console.error('Error fetching product details:', error);
                }
            }
            setProductDetails(details);
        };

        if (selectedProduct?.length > 0) {
            fetchProductDetails();
        }
    }, [selectedProduct]);
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
                    {selectedProduct.map((product) => {
                        const productDetail = productDetails[product.productId];
                        return (
                            <Stack key={product.productId} direction="row" alignItems="flex-start">
                                <Image
                                    src={productDetail?.images?.[0]?.imageUrl || product.images?.[0]?.imageUrl}
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
                                        {formatPrice(product.price)}
                                    </Typography>
                                </Stack>
                                <Typography variant="subtitle2" sx={{ mt: 0.5, mb: 1.5 }}>
                                    x{product.quantity}
                                </Typography>
                            </Stack>
                        );
                    })}

                    <Divider sx={{ borderStyle: 'dashed' }} />
                </>
            )}

            <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between" sx={{ typography: 'subtitle2' }}>
                    <Box component="span" sx={{ typography: 'body2' }}>
                        {t('subtotal')}
                    </Box>
                    {formatPrice(totalPrice)}
                </Stack>

                <Stack direction="row" justifyContent="space-between" sx={{ typography: 'subtitle2' }}>
                    <Box component="span" sx={{ typography: 'body2' }}>
                        {t('shipping_fee')}
                    </Box>
                    +{formatPrice(shippingPrice)}
                </Stack>

                <Stack direction="row" justifyContent="space-between" sx={{ typography: 'subtitle2' }}>
                    <Box component="span" sx={{ typography: 'body2' }}>
                        {t('discount')}
                    </Box>
                    -{formatPrice(voucherDiscount)}
                </Stack>
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Stack direction="row" justifyContent="space-between" sx={{ typography: 'h6' }}>
                <Box component="span" sx={{ fontWeight: 'bold' }}>{t('total')}</Box>
                <Box component="span" sx={{ fontWeight: 'bold' }} color={theme.palette.primary.main}>{formatPrice(Number(totalPrice) + Number(shippingPrice) - Number(voucherDiscount))}
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
