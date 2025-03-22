'use client';

// React
import React, { useEffect, useMemo, useState } from 'react';

// Next
import { NextPage } from 'next';

// MUI
import { alpha, Box, Button, Grid, Radio, RadioGroup, Typography, useTheme, Divider } from '@mui/material';
import { Container, Stack } from '@mui/material';
import FormControlLabel, { formControlLabelClasses } from '@mui/material/FormControlLabel';

// Translate
import { useTranslation } from 'react-i18next';

// Redux
import { AppDispatch, RootState } from 'src/stores';
import { useDispatch, useSelector } from 'react-redux';

// Other
import { useAuth } from 'src/hooks/useAuth';
import { formatPrice, toFullName } from 'src/utils';
import IconifyIcon from 'src/components/Icon';
import Spinner from 'src/components/spinner';
import Swal from 'sweetalert2';
import { getAllPaymentMethods } from 'src/services/payment-method';
import { getAllDeliveryMethods } from 'src/services/delivery-method';
import { createOrderAsync } from 'src/stores/order/action';
import { ROUTE_CONFIG } from 'src/configs/route';
import { useRouter } from 'next/router';
import CheckoutSummary from './components/CheckoutSummary';
import CustomBreadcrumbs from 'src/components/custom-breadcrum';
import { TItemOrderProduct } from 'src/types/order';
import { resetInitialState } from 'src/stores/order';
import WarningModal from './components/WarningModal';
import AddressModal from './components/AddressModal';

// ----------------------------------------------------------------------

type TProps = {};

const CheckoutPage: NextPage<TProps> = () => {
    // States
    const [loading, setLoading] = useState<boolean>(false);
    const [paymentOptions, setPaymentOptions] = useState<{ label: string; value: string; type: string }[]>([]);
    const [deliveryOptions, setDeliveryOptions] = useState<{ label: string; value: string; price: string }[]>([]);
    const [selectedPayment, setSelectedPayment] = useState<string>('');
    const [selectedDelivery, setSelectedDelivery] = useState<string>('');
    const [openWarning, setOpenWarning] = useState(false)
    const [openAddress, setOpenAddress] = useState(false)

    // Hooks
    const { user } = useAuth();
    const { i18n, t } = useTranslation();
    const router = useRouter();
    const theme = useTheme();
    const dispatch: AppDispatch = useDispatch();
    const { isLoading, isSuccessCreate, isErrorCreate, errorMessageCreate, orderItems } = useSelector(
        (state: RootState) => state.order
    );

    const breadcrumbItems = [
        { label: t('home'), href: '/', icon: <IconifyIcon color="primary" icon="healthicons:home-outline" /> },
        { label: t('checkout'), href: '/checkout' },
    ];

    const handleFormatProductData = (items: any) => {
        const objectMap: Record<string, TItemOrderProduct> = {};
        orderItems.forEach((order: any) => {
            objectMap[order.productId] = order;
        });
        return items.map((item: any) => ({
            ...objectMap[item.productId],
            amount: item.amount,
        }));
    };

    // Memo
    const memoQueryProduct = useMemo(() => {
        const result = { totalPrice: 0, selectedProduct: [] };
        const data: any = router.query;
        if (data) {
            result.totalPrice = data.totalPrice || 0;
            result.selectedProduct = data.selectedProduct ? handleFormatProductData(JSON.parse(data.selectedProduct)) : [];
        }
        return result;
    }, [router.query, orderItems]);

    const memoShippingPrice = useMemo(() => {
        const shippingPrice = deliveryOptions.find((item) => item.value === selectedDelivery)?.price ?? 0;
        return shippingPrice ? Number(shippingPrice) : 0;
    }, [selectedDelivery]);

    // Fetch API
    const getListPaymentMethod = async () => {
        setLoading(true);
        await getAllPaymentMethods({ params: { limit: -1, page: -1, search: '', order: '' } })
            .then((res) => {
                if (res?.data) {
                    setPaymentOptions(
                        res.data.paymentTypes.map((item: { name: string; _id: string; type: string }) => ({
                            label: item.name,
                            value: item._id,
                            type: item.type,
                        }))
                    );
                    setSelectedPayment(res.data.paymentTypes[0]?._id);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    const getListDeliveryMethod = async () => {
        setLoading(true);
        await getAllDeliveryMethods({ params: { limit: -1, page: -1, search: '', order: '' } })
            .then((res) => {
                if (res?.data) {
                    setDeliveryOptions(
                        res.data.deliveryTypes.map((item: { name: string; _id: string; price: string }) => ({
                            label: item.name,
                            value: item._id,
                            price: item.price,
                        }))
                    );
                    setSelectedDelivery(res.data.deliveryTypes[0]?._id);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    // Handlers
    const onChangeDelivery = (value: string) => setSelectedDelivery(value);
    const onChangePayment = (value: string) => setSelectedPayment(value);


    const handlePlaceOrder = () => {
        const totalPrice = Number(memoShippingPrice)
            ? Number(memoQueryProduct.totalPrice) + Number(memoShippingPrice)
            : Number(memoQueryProduct.totalPrice);
        const orderDetails = memoQueryProduct.selectedProduct.map((item: TItemOrderProduct) => ({
            orderId: 0,
            productId: Number(item.productId),
            quantity: item.amount,
            tax: 0,
            id: 0,
            amount: item.price * item.amount * (item.discount ? (100 - item.discount) / 100 : 1),
        }));
        dispatch(
            createOrderAsync({
                id: 0,
                displayOrder: 0,
                customerId: user ? user.id : 0,
                code: '1',
                paymentStatus: 'pending',
                orderStatus: 'pending',
                shippingStatus: 'pending',
                voucherId: 0,
                wardId: 20,
                customerAddress: '',
                costShip: memoShippingPrice,
                trackingNumber: '',
                estimatedDeliveryDate: '2025-03-20T11:40:42.001Z',
                actualDeliveryDate: '2025-03-20T11:40:42.001Z',
                shippingCompanyId: 0,
                details: orderDetails,
                totalAmount: totalPrice,
                totalQuantity: 2,
                discountAmount: 0,
                isBuyNow: false,
                paymentMethodId: Number(selectedPayment),
            })
        );
    };

    useEffect(() => {
        getListPaymentMethod();
        getListDeliveryMethod();
    }, []);

    useEffect(() => {
        const data: any = router.query
        if (!data?.selectedProduct) {
            setOpenWarning(true)
        }
    }, [router.query])

    useEffect(() => {
        if (isSuccessCreate) {
            Swal.fire({
                title: t('congratulation!'),
                text: t('create_order_success'),
                icon: 'success',
                confirmButtonText: t('confirm'),
                background: theme.palette.background.paper,
                color: theme.palette.customColors.main,
            }).then(() => router.push(ROUTE_CONFIG.MY_ORDER));
            dispatch(resetInitialState());
        } else if (isErrorCreate && errorMessageCreate) {
            Swal.fire({
                title: t('opps!'),
                text: t(errorMessageCreate),
                icon: 'error',
                confirmButtonText: t('confirm'),
                background: theme.palette.background.paper,
                color: theme.palette.customColors.main,
            });
            dispatch(resetInitialState());
        }
    }, [isSuccessCreate, isErrorCreate, errorMessageCreate]);

    return (
        <Box sx={{
            maxWidth: '1440px',
            margin: '0 auto',
            width: '100%',
            py: { xs: 2, sm: 1, md: 2, lg: 8 },
            px: { xs: 2, sm: 2, md: 4, lg: 8 },
        }}
        >
            {loading || (isLoading && <Spinner />)}
            <WarningModal open={openWarning} onClose={() => setOpenAddress(false)} />
            <AddressModal open={openAddress} onClose={() => setOpenAddress(false)} />

            {/* Breadcrumbs */}
            <Box sx={{ mb: { xs: 1, sm: 2, md: 4 } }}>
                <CustomBreadcrumbs items={breadcrumbItems} />
            </Box>
            {/* Main Content */}

            <Stack spacing={3} sx={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: { xs: 4, sm: 4, md: 4, lg: 8 },
                borderRadius: '15px',
                width: '100% !important',
                backgroundColor: theme.palette.background.paper,
            }}>
                {loading || isLoading ? <Spinner /> : null}
                <Grid container>
                    <Grid item xs={12} md={8} sx={{
                        pr: { xs: 0, sm: 0, md: 4, lg: 8 },
                    }}>
                        <Stack spacing={4} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
                            {/* Step 1: Shipping Address */}
                            <Box>
                                <StepLabel title={t('shipping_info')} step="1" />
                                {user ? (
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Typography sx={{ fontWeight: 'bold', fontSize: { xs: '16px', md: '18px' } }}>
                                           addr
                                        </Typography>
                                        <Typography sx={{ fontSize: { xs: '14px', md: '18px' } }}>
                                            user
                                        </Typography>
                                        <Button variant="outlined" size="small"
                                            onClick={() => setOpenAddress(true)}>
                                            {t('change_address')}
                                        </Button>
                                    </Stack>
                                ) : (
                                    <Button variant="outlined" size="small"
                                        onClick={() => setOpenAddress(true)}>
                                        {t('add_address')}
                                    </Button>
                                )}
                            </Box>

                            {/* Step 2: Delivery Method */}
                            <Box>
                                <StepLabel title={t('delivery_method')} step="2" />
                                <RadioGroup
                                    aria-labelledby="radio-delivery-group"
                                    name="radio-delivery-group"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeDelivery(e.target.value)}
                                    sx={{
                                        rowGap: 2,
                                        columnGap: 2,
                                        display: 'grid',
                                        gridTemplateColumns: {
                                            xs: 'repeat(1, 1fr)',
                                            sm: 'repeat(2, 1fr)',
                                        },
                                    }}
                                >
                                    {deliveryOptions.map((delivery) => (
                                        <FormControlLabel
                                            key={delivery.value}
                                            value={delivery.value}
                                            control={
                                                <Radio
                                                    disableRipple
                                                    checked={selectedDelivery === delivery.value}
                                                    checkedIcon={<IconifyIcon icon="carbon:checkmark-outline" />}
                                                    sx={{ mx: 1 }}
                                                />
                                            }
                                            label={
                                                <Stack spacing={0.5} sx={{ width: 1 }}>
                                                    <Stack direction="row" alignItems="center">
                                                        <IconifyIcon icon="carbon:delivery" width={24} />
                                                        <Typography variant="subtitle1" sx={{ flexGrow: 1, ml: 1 }}>
                                                            {delivery.label}
                                                        </Typography>
                                                        <Typography variant="h6">{formatPrice(Number(delivery.price))}đ</Typography>
                                                    </Stack>
                                                </Stack>
                                            }
                                            sx={{
                                                m: 0,
                                                py: 2,
                                                pr: 2,
                                                borderRadius: 1,
                                                border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
                                                ...(selectedDelivery === delivery.value && {
                                                    boxShadow: (theme) => `0 0 0 2px ${theme.palette.text.primary}`,
                                                }),
                                                [`& .${formControlLabelClasses.label}`]: { width: 1 },
                                            }}
                                        />
                                    ))}
                                </RadioGroup>
                            </Box>

                            {/* Step 3: Payment Method */}
                            <Box>
                                <StepLabel title={t('payment_method')} step="3" />
                                <RadioGroup
                                    aria-labelledby="radio-payment-group"
                                    name="radio-payment-group"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangePayment(e.target.value)}
                                    sx={{
                                        rowGap: 2,
                                        columnGap: 2,
                                        display: 'grid',
                                        gridTemplateColumns: {
                                            xs: 'repeat(1, 1fr)', // 1 column on mobile
                                            sm: 'repeat(2, 1fr)', // 2 columns on larger screens
                                        },
                                    }}
                                >
                                    {paymentOptions.map((payment) => (
                                        <FormControlLabel
                                            key={payment.value}
                                            value={payment.value}
                                            control={
                                                <Radio
                                                    disableRipple
                                                    checked={selectedPayment === payment.value}
                                                    checkedIcon={<IconifyIcon icon="carbon:checkmark-outline" />}
                                                    sx={{ mx: 1 }}
                                                />
                                            }
                                            label={
                                                <Stack spacing={0.5} sx={{ width: 1 }}>
                                                    <Stack direction="row" alignItems="center">
                                                        <IconifyIcon
                                                            icon={payment.type === 'VNPAY' ? 'carbon:wallet' : 'carbon:money'}
                                                            width={24}
                                                        />
                                                        <Typography variant="subtitle1" sx={{ flexGrow: 1, ml: 1 }}>
                                                            {payment.label}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            }
                                            sx={{
                                                m: 0,
                                                py: 2,
                                                pr: 2,
                                                borderRadius: 1,
                                                border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
                                                ...(selectedPayment === payment.value && {
                                                    boxShadow: (theme) => `0 0 0 2px ${theme.palette.text.primary}`,
                                                }),
                                                [`& .${formControlLabelClasses.label}`]: { width: 1 },
                                            }}
                                        />
                                    ))}
                                </RadioGroup>
                            </Box>
                        </Stack>
                    </Grid>

                    {/* Order Summary */}
                    <Grid item xs={12} md={4}>
                        <CheckoutSummary
                            totalPrice={memoQueryProduct.totalPrice}
                            shippingPrice={memoShippingPrice}
                            selectedProduct={memoQueryProduct.selectedProduct}
                            onSubmit={handlePlaceOrder}
                        />
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    );
};

// ----------------------------------------------------------------------

type StepLabelProps = {
    step: string;
    title: string;
};

function StepLabel({ step, title }: StepLabelProps) {
    return (
        <Stack direction="row" alignItems="center" sx={{ mb: 3, typography: 'h6' }}>
            <Box
                sx={{
                    mr: 1.5,
                    width: 28,
                    height: 28,
                    flexShrink: 0,
                    display: 'flex',
                    typography: 'h6',
                    borderRadius: '50%',
                    alignItems: 'center',
                    bgcolor: 'primary.main',
                    justifyContent: 'center',
                    color: 'primary.contrastText',
                }}
            >
                {step}
            </Box>
            {title}
        </Stack>
    );
}

export default CheckoutPage;