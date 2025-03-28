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
import { TParamsAddresses, TParamsGetAllAddresses } from 'src/types/address';
import { getCurrentAddress } from 'src/services/address';
import VoucherModal from './components/VoucherModal';
import { createVNPayPaymentUrl } from 'src/services/payment';
import { PAYMENT_METHOD } from 'src/configs/payment';
import { getVoucherDetail } from 'src/services/voucher';

// ----------------------------------------------------------------------

type TProps = {};

interface PaymentOption {
    label: string;
    value: string;
    type: string;
    id: string;
}

const CheckoutPage: NextPage<TProps> = () => {
    // States
    const [loading, setLoading] = useState<boolean>(false);
    const [paymentOptions, setPaymentOptions] = useState<PaymentOption[]>([]);
    const [deliveryOptions, setDeliveryOptions] = useState<{ label: string; value: string; price: string }[]>([]);
    const [selectedPayment, setSelectedPayment] = useState<string>('');
    const [selectedDelivery, setSelectedDelivery] = useState<string>('');
    const [openWarning, setOpenWarning] = useState(false)
    const [openAddress, setOpenAddress] = useState(false)
    const [address, setAddress] = useState<TParamsAddresses>()
    const [openVoucher, setOpenVoucher] = useState(false)

    const [selectedVoucherId, setSelectedVoucherId] = useState<string>('');
    const [voucherDiscount, setVoucherDiscount] = useState<number>(0);

    const PAYMENT_DATA = PAYMENT_METHOD()

    // Hooks
    const { user } = useAuth();
    const { i18n, t } = useTranslation();
    const router = useRouter();
    const theme = useTheme();
    const dispatch: AppDispatch = useDispatch();
    const { isLoading, isSuccessCreate, isErrorCreate, errorMessageCreate, orderItems } = useSelector(
        (state: RootState) => state.order
    );
    const { addresses } = useSelector((state: RootState) => state.address);

    const breadcrumbItems = [
        { label: t('home'), href: '/', icon: <IconifyIcon color="primary" icon="healthicons:home-outline" /> },
        { label: t('checkout'), href: '/checkout' },
    ];

    const deliveryOption = [
        {
            label: t('fast_delivery'),
            value: 'fast_delivery',
            price: 10000,
        },
    ]

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

    const currentAddress = async () => {
        await getCurrentAddress()
    }

    const memoShippingPrice = useMemo(() => {
        const shippingPrice = deliveryOption.find((item) => item.value === selectedDelivery)?.price ?? 0;
        return shippingPrice ? Number(shippingPrice) : 0;
    }, [selectedDelivery]);

    const memoAddressDefault = useMemo(() => {
        const findAddress = addresses?.data?.find((item: TParamsAddresses) => item.isDefault)

        return findAddress as TParamsAddresses | undefined
    }, [addresses])

    const memoVoucherDiscountPrice = useMemo(() => {
        let discountPrice = 0;

        if (selectedVoucherId) {
            getVoucherDetail(selectedVoucherId).then(res => {
                const discountPercent = res?.result?.discountValue || 0;
                discountPrice = (Number(memoQueryProduct.totalPrice) * Number(discountPercent)) / 100;
                setVoucherDiscount(discountPrice);
            });
        }

        return discountPrice;
    }, [selectedVoucherId, memoQueryProduct.totalPrice]);

    // Fetch API
    const getListPaymentMethod = async () => {
        setLoading(true);
        await getAllPaymentMethods({
            params: {
                take: -1,
                skip: 0,
                paging: false,
                orderBy: "name",
                dir: "asc",
                keywords: "''",
                filters: ""
            }
        })
            .then((res) => {
                if (res?.result?.subset) {
                    setPaymentOptions(
                        res?.result?.subset.map((item: { name: string; id: string; type: string }) => ({
                            label: item.name,
                            value: item.id,
                            type: item.type,
                            id: item.id
                        }))
                    );
                    setSelectedPayment(res?.result?.subset[0]?.id);
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
                        res.data.deliveryTypes.map((item: { name: string; id: string; price: string }) => ({
                            label: item.name,
                            value: item.id,
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

    const handlePaymentVNPay = async (data: { orderId: string; totalPrice: number }) => {
        setLoading(true)
        await createVNPayPaymentUrl({
            totalPrice: data.totalPrice,
            orderId: data?.orderId,
            language: i18n.language === 'vi' ? 'vn' : i18n.language
        }).then(res => {
            if (res?.result) {
                window.open(res?.result, '_blank')
            }
            setLoading(false)
        })
            .catch(() => setLoading(false))
    }

    const handlePaymentTypeOrder = (id: string, data: { orderId: string; totalPrice: number }) => {
        switch (id) {
            case PAYMENT_DATA.VN_PAYMENT.value: {
                handlePaymentVNPay(data)
                break
            }
            default:
                break
        }
    }

    const handlePlaceOrder = () => {
        const subtotal = Number(memoQueryProduct.totalPrice);
        const shipping = Number(memoShippingPrice);
        const totalPrice = Number(subtotal) + Number(shipping) - Number(voucherDiscount);

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
                displayOrder: 0,
                customerId: user ? user.id : 0,
                code: '1',
                paymentStatus: 'pending',
                orderStatus: 'pending',
                shippingStatus: 'pending',
                voucherId: Number(selectedVoucherId),
                wardId: 20,
                customerAddress: `${memoAddressDefault?.streetAddress}, ${memoAddressDefault?.wardName}, ${memoAddressDefault?.districtName}, ${memoAddressDefault?.provinceName}`,
                costShip: memoShippingPrice,
                trackingNumber: '',
                estimatedDeliveryDate: '2025-03-20T11:40:42.001Z',
                actualDeliveryDate: '2025-03-20T11:40:42.001Z',
                shippingCompanyId: 0,
                details: orderDetails,
                totalAmount: totalPrice,
                totalQuantity: 2,
                discountAmount: voucherDiscount,
                isBuyNow: false,
                paymentMethodId: Number(selectedPayment),
            })
        ).then(res => {
            // Check if there's a returnUrl in the response
            const returnUrl = res?.payload?.result?.returnUrl;
            if (returnUrl) {
                window.location.href = returnUrl;
            } else {
                router.push(ROUTE_CONFIG.PAYMENT)
            }
        });
    };

    useEffect(() => {
        getListPaymentMethod();
        // getListDeliveryMethod();
        currentAddress()
    }, []);

    useEffect(() => {
        const data: any = router.query
        if (!data?.selectedProduct) {
            setOpenWarning(true)
        }
    }, [router.query])

    // useEffect(() => {
    //     if (isSuccessCreate) {
    //         Swal.fire({
    //             title: t('congratulation!'),
    //             text: t('create_order_success'),
    //             icon: 'success',
    //             confirmButtonText: t('confirm'),
    //             background: theme.palette.background.paper,
    //             color: theme.palette.customColors.main,
    //         }).then(() => router.push(ROUTE_CONFIG.MY_ORDER));
    //         dispatch(resetInitialState());
    //     } else if (isErrorCreate && errorMessageCreate) {
    //         Swal.fire({
    //             title: t('opps!'),
    //             text: t(errorMessageCreate),
    //             icon: 'error',
    //             confirmButtonText: t('confirm'),
    //             background: theme.palette.background.paper,
    //             color: theme.palette.customColors.main,
    //         });
    //         dispatch(resetInitialState());
    //     }
    // }, [isSuccessCreate, isErrorCreate, errorMessageCreate]);


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
            <VoucherModal
                open={openVoucher}
                onClose={() => setOpenVoucher(false)}
                onSelectVoucher={(voucherId) => {
                    setSelectedVoucherId(voucherId);
                }}
                cartDetails={memoQueryProduct.selectedProduct}
            />

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
                                            {user?.fullName} {user?.phone}
                                        </Typography>
                                        <Typography sx={{ fontWeight: 'bold', fontSize: { xs: '16px', md: '18px' } }}>
                                            {memoAddressDefault?.streetAddress}, {memoAddressDefault?.wardName}, {memoAddressDefault?.districtName}, {memoAddressDefault?.provinceName}
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
                                    {deliveryOption.map((delivery) => (
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
                                    value={selectedPayment}
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

                            {/* Step 4: Voucher */}
                            <Box>
                                <StepLabel title={t('voucher')} step="4" />
                                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <IconifyIcon icon="pepicons-pencil:ticket" color={theme.palette.customColors.main} />
                                        <Typography variant="subtitle1" sx={{ flexGrow: 1, ml: 1 }}>
                                            {t('sammi_voucher')}
                                        </Typography>
                                    </Stack>
                                    <Button variant="outlined" size="small"
                                        onClick={() => setOpenVoucher(true)}>
                                        {t('select_voucher')}
                                    </Button>
                                </Stack>
                            </Box>
                        </Stack>
                    </Grid>

                    {/* Order Summary */}
                    <Grid item xs={12} md={4}>
                        <CheckoutSummary
                            totalPrice={memoQueryProduct.totalPrice}
                            shippingPrice={memoShippingPrice}
                            voucherDiscount={voucherDiscount}
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