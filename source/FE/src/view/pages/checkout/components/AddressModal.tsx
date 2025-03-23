// AddressModal.tsx
import { Fragment, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';
import { Box, Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, IconButton, Typography, RadioGroup, Radio } from "@mui/material";
import { useTheme } from "@mui/material";
import CustomModal from "src/components/custom-modal";
import IconifyIcon from "src/components/Icon";
import Spinner from "src/components/spinner";
import CustomTextField from "src/components/text-field";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/stores";
import { getAllCities } from "src/services/city";
import NoData from "src/components/no-data";
import toast from "react-hot-toast";
import { resetInitialState } from "src/stores/auth";
import { createAddressAsync, getAllAddressesAsync, getCurrentAddressAsync, updateAddressAsync } from "src/stores/address/action";


interface TAddressModal {
    open: boolean;
    onClose: () => void;
}

interface TDefaultValues {
    streetAddress: string;
    wardId: number;
}

interface Address {
    id: string;
    streetAddress: string;
    wardId: number;
    isDefault: boolean;
}

const AddressModal = (props: TAddressModal) => {
    const [loading, setLoading] = useState(false);
    const [cityOptions, setCityOptions] = useState<{ label: string, value: string }[]>([]);
    const [activeTab, setActiveTab] = useState(1);
    const [isEdit, setIsEdit] = useState({ isEdit: false, index: 0 });

    const { open, onClose } = props;
    const { t } = useTranslation();
    const theme = useTheme();
    const dispatch: AppDispatch = useDispatch();
    const {
        addresses,
        isLoading,
        isSuccessCreate,
        isErrorCreate,
        errorMessageCreate,
        isSuccessUpdate,
        isErrorUpdate,
        errorMessageUpdate
    } = useSelector((state: RootState) => state.address);

    const schema = yup.object().shape({
        streetAddress: yup.string().required(t("required_street_address")),
        wardId: yup.number().required(t("required_ward_id")),
    });

    const defaultValues: TDefaultValues = {
        streetAddress: '',
        wardId: 0
    };

    const { handleSubmit, control, formState: { errors }, reset, setValue } = useForm<TDefaultValues>({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const fetchAllCities = async () => {
        setLoading(true);
        try {
            const res = await getAllCities({ params: { limit: -1, page: -1, search: '', order: '' } });
            const data = res?.data?.cities;
            if (data) {
                setCityOptions(data.map((item: { name: string, _id: string }) => ({
                    label: item.name,
                    value: item._id
                })));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = (data: TDefaultValues) => {
        if (!Object.keys(errors)?.length) {
            if (isEdit.isEdit) {
                const address = addresses.data[isEdit.index] as Address;
                dispatch(updateAddressAsync({
                    id: address.id,
                    streetAddress: data.streetAddress,
                    wardId: data.wardId,
                    isDefault: address.isDefault
                }));
            } else {
                dispatch(createAddressAsync({
                    streetAddress: data.streetAddress,
                    wardId: data.wardId,
                    isDefault: !addresses.data.some((addr: Address) => addr.isDefault)
                }));
            }
        }
    };

    const onChangeAddress = (index: number) => {
        const addressList = addresses.data as Address[];
        const updatedAddresses = addressList.map((addr, i) => ({
            ...addr,
            isDefault: i === index
        }));
        const selectedAddress = updatedAddresses[index];

        dispatch(updateAddressAsync({
            id: selectedAddress.id,
            streetAddress: selectedAddress.streetAddress,
            wardId: selectedAddress.wardId,
            isDefault: true
        }));
    };

    useEffect(() => {
        if (open) {
            fetchAllCities();
            dispatch(getAllAddressesAsync())
        } else {
            reset(defaultValues);
            setActiveTab(1);
            setIsEdit({ isEdit: false, index: 0 });
        }
    }, [open]);

    useEffect(() => {
        if (activeTab === 2 && isEdit.isEdit) {
            const address = addresses.data[isEdit.index] as Address;
            if (address) {
                setValue('streetAddress', address.streetAddress);
                setValue('wardId', address.wardId);
            }
        }
    }, [activeTab, isEdit, addresses.data]);

    useEffect(() => {
        if (isSuccessCreate || isSuccessUpdate) {
            toast.success(t(isSuccessCreate ? "create_address_success" : "update_address_success"));
            setActiveTab(1);
            reset(defaultValues);
            dispatch(getAllAddressesAsync());
        } else if (isErrorCreate && errorMessageCreate) {
            toast.error(errorMessageCreate);
        } else if (isErrorUpdate && errorMessageUpdate) {
            toast.error(errorMessageUpdate);
        }
        dispatch(resetInitialState());
    }, [isSuccessCreate, isErrorCreate, isSuccessUpdate, isErrorUpdate]);

    return (
        <>
            {(isLoading || loading) && <Spinner />}
            <CustomModal open={open} onClose={onClose}>
                <Box sx={{
                    backgroundColor: theme.palette.customColors.bodyBg,
                    padding: '20px',
                    borderRadius: '15px',
                    minWidth: { md: '800px', xs: '80vw' },
                    maxWidth: { md: '80vw', xs: '80vw' }
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        paddingBottom: '20px'
                    }}>
                        <Typography variant="h4" sx={{ fontWeight: 600 }}>
                            {activeTab === 1 ? t('shipping_address') : t('add_address')}
                        </Typography>
                        <IconButton sx={{ position: 'absolute', right: "-10px", top: "-6px" }} onClick={onClose}>
                            <IconifyIcon icon="material-symbols-light:close-rounded" fontSize={"30px"} />
                        </IconButton>
                    </Box>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
                        <Box sx={{ backgroundColor: theme.palette.background.paper, borderRadius: "15px", py: 5, px: 4 }}>
                            {activeTab === 1 ? (
                                <Box>
                                    {addresses.data.length > 0 ? (
                                        <FormControl>
                                            <FormLabel sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
                                                {t("address")}
                                            </FormLabel>
                                            <RadioGroup
                                                sx={{ gap: 4 }}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeAddress(Number(e.target.value))}
                                            >
                                                {(addresses.data as Address[]).map((address, index) => (
                                                    <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                                        <FormControlLabel
                                                            value={index}
                                                            control={<Radio checked={address.isDefault} />}
                                                            label={`${address.streetAddress}, Ward ${address.wardId}`}
                                                        />
                                                        <Button
                                                            variant="outlined"
                                                            onClick={() => {
                                                                setActiveTab(2);
                                                                setIsEdit({ isEdit: true, index });
                                                            }}
                                                            sx={{ py: 1.5 }}
                                                        >
                                                            {t('change_address')}
                                                        </Button>
                                                    </Box>
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    ) : (
                                        <NoData imageWidth="60px" imageHeight="60px" textNodata={t("no_shipping_address")} />
                                    )}
                                    <Button
                                        variant="outlined"
                                        disabled={addresses.data.length >= 3}
                                        onClick={() => setActiveTab(2)}
                                        sx={{ mt: 3, mb: 2, py: 1.5 }}
                                    >
                                        {t('add_address')}
                                    </Button>
                                </Box>
                            ) : (
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={6}>
                                        <Controller
                                            control={control}
                                            name='streetAddress'
                                            render={({ field }) => (
                                                <CustomTextField
                                                    fullWidth
                                                    label={t('street_address')}
                                                    {...field}
                                                    placeholder={t('enter_your_street_address')}
                                                    error={!!errors.streetAddress}
                                                    helperText={errors.streetAddress?.message}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Controller
                                            control={control}
                                            name='wardId'
                                            render={({ field }) => (
                                                <CustomTextField
                                                    fullWidth
                                                    type="number"
                                                    label={t('ward_id')}
                                                    {...field}
                                                    placeholder={t('enter_ward_id')}
                                                    error={!!errors.wardId}
                                                    helperText={errors.wardId?.message}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 4 }}>
                            {activeTab === 2 && (
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setActiveTab(1);
                                        setIsEdit({ isEdit: false, index: 0 });
                                    }}
                                    sx={{ mt: 3, mb: 2, py: 1.5 }}
                                >
                                    {t('cancel')}
                                </Button>
                            )}
                            <Button type={activeTab === 2 ? "submit" : "button"} variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>
                                {activeTab === 1 ? t('update') : t('confirm')}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </CustomModal>
        </>
    );
};

export default AddressModal;