// AddressModal.tsx
import { Fragment, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';
import { Box, Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, IconButton, Typography, RadioGroup, Radio, Stack } from "@mui/material";
import { useTheme } from "@mui/material";
import CustomModal from "src/components/custom-modal";
import IconifyIcon from "src/components/Icon";
import Spinner from "src/components/spinner";
import CustomTextField from "src/components/text-field";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/stores";
import NoData from "src/components/no-data";
import toast from "react-hot-toast";
import { resetInitialState } from "src/stores/address";
import { createAddressAsync, getAllAddressesAsync, updateAddressAsync } from "src/stores/address/action";
import CustomSelect from "src/components/custom-select";
import { getAllProvinces } from "src/services/province";
import { getAllDistricts } from "src/services/district";
import { getAllWards } from "src/services/ward";
import { TParamsAddresses } from "src/types/address";

interface TAddressModal {
    open: boolean;
    onClose: () => void;
}

interface TDefaultValues {
    streetAddress: string;
    wardName: string;
    districtName: string;
    provinceName: string;
    wardId: string;
}

interface Address {
    id: string;
    streetAddress: string;
    wardId: number;
    isDefault: boolean;
    wardName: string;
    districtName: string;
    provinceName: string;
}

const AddressModal = (props: TAddressModal) => {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(1);
    const [isEdit, setIsEdit] = useState({ isEdit: false, index: 0 });
    const [wardOptions, setWardOptions] = useState<{ label: string; value: string }[]>([]);
    const [provinceOptions, setProvinceOptions] = useState<{ label: string; value: string }[]>([]);
    const [districtOptions, setDistrictOptions] = useState<{ label: string; value: string }[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<string>("");
    const [selectedDistrict, setSelectedDistrict] = useState<string>("");
    const [addresses, setAddresses] = useState<{ data: Address[] }>({ data: [] });
    const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null);

    const { open, onClose } = props;
    const { t } = useTranslation();
    const theme = useTheme();
    const dispatch: AppDispatch = useDispatch();
    const {
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
        wardId: yup.string().required(t("required_ward_id")),
        provinceName: yup.string().required(t("required_province_name")),
        districtName: yup.string().required(t("required_district_name")),
        wardName: yup.string().required(t("required_ward_name")),
    });

    const defaultValues: TDefaultValues = {
        streetAddress: '',
        wardId: '',
        wardName: '',
        districtName: '',
        provinceName: ''
    };

    const { handleSubmit, control, formState: { errors }, reset, setValue, watch } = useForm<TDefaultValues>({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const fetchAllProvinces = async () => {
        try {
            setLoading(true);
            const res = await getAllProvinces({
                params: {
                    take: -1,
                    skip: 0,
                    paging: false,
                    orderBy: "name",
                    dir: "asc",
                    keywords: "''",
                    filters: "",
                },
            });
            const data = res?.result?.subset;
            if (data) {
                setProvinceOptions(data.map((item: { name: string; id: string }) => ({
                    label: item.name,
                    value: item.id,
                })));
            }
        } catch (error) {
            console.error('Error fetching provinces:', error);
            toast.error(t('error_fetching_provinces'));
        } finally {
            setLoading(false);
        }
    };

    const fetchDistrictsByProvince = async (provinceId: string) => {
        try {
            setLoading(true);
            const res = await getAllDistricts({
                params: {
                    take: -1,
                    skip: 0,
                    paging: false,
                    orderBy: "name",
                    dir: "asc",
                    keywords: "''",
                    filters: `provinceId::${provinceId}::eq`,
                },
            });
            const data = res?.result?.subset;
            if (data) {
                setDistrictOptions(data.map((item: { name: string; id: string }) => ({
                    label: item.name,
                    value: item.id,
                })));
            }
        } catch (error) {
            console.error('Error fetching districts:', error);
            toast.error(t('error_fetching_districts'));
        } finally {
            setLoading(false);
        }
    };

    const fetchWardsByDistrict = async (districtId: string) => {
        try {
            setLoading(true);
            const res = await getAllWards({
                params: {
                    take: -1,
                    skip: 0,
                    paging: false,
                    orderBy: "name",
                    dir: "asc",
                    keywords: "''",
                    filters: `districtId::${districtId}::eq`,
                },
            });
            const data = res?.result?.subset;
            if (data) {
                setWardOptions(data.map((item: { name: string; id: string }) => ({
                    label: item.name,
                    value: item.id,
                })));
            }
        } catch (error) {
            console.error('Error fetching wards:', error);
            toast.error(t('error_fetching_wards'));
        } finally {
            setLoading(false);
        }
    };

    const handleAddressSubmit = () => {
        if (selectedAddressIndex !== null) {
            const selectedAddress = addresses.data[selectedAddressIndex];
            dispatch(updateAddressAsync({
                id: selectedAddress.id,
                streetAddress: selectedAddress.streetAddress,
                wardId: selectedAddress.wardId,
                isDefault: true
            }));
        }
        onClose();
    };

    const onSubmit = async (data: TDefaultValues) => {
        try {
            if (isEdit.isEdit) {
                const address = addresses.data[isEdit.index];
                await dispatch(updateAddressAsync({
                    id: address.id,
                    streetAddress: data.streetAddress,
                    wardId: parseInt(data.wardId),
                    isDefault: address.isDefault
                })).unwrap();
            } else {
                await dispatch(createAddressAsync({
                    streetAddress: data.streetAddress,
                    wardId: parseInt(data.wardId),
                    isDefault: !addresses.data.some((addr: Address) => addr.isDefault)
                })).unwrap();
            }

            // Refresh address list
            const response = await dispatch(getAllAddressesAsync()).unwrap();
            if (response.result) {
                setAddresses({ data: response.result });
            }

            setIsEdit({ isEdit: false, index: 0 });
            setActiveTab(1);
            reset(defaultValues);
        } catch (error) {
            console.error('Error submitting address:', error);
            toast.error(t('error_submitting_address'));
        }
    };

    const onChangeAddress = (index: number) => {
        setSelectedAddressIndex(index);
    };

    useEffect(() => {
        if (open) {
            dispatch(getAllAddressesAsync()).then((response) => {
                if (response.payload.result) {
                    setAddresses({ data: response.payload.result });
                    // Set initial selected address to default one
                    const defaultIndex = response.payload.result.findIndex((addr: Address) => addr.isDefault);
                    if (defaultIndex !== -1) {
                        setSelectedAddressIndex(defaultIndex);
                    }
                }
            });
        } else {
            reset(defaultValues);
            setActiveTab(1);
            setIsEdit({ isEdit: false, index: 0 });
            setSelectedProvince("");
            setSelectedDistrict("");
            setSelectedAddressIndex(null);
            setProvinceOptions([]);
            setDistrictOptions([]);
            setWardOptions([]);
        }
    }, [open]);

    useEffect(() => {
        fetchAllProvinces();
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            fetchDistrictsByProvince(selectedProvince);
            setDistrictOptions([]);
            setWardOptions([]);
            setSelectedDistrict("");
            setValue("wardId", '');
            setValue("wardName", "");
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            fetchWardsByDistrict(selectedDistrict);
            setWardOptions([]);
            setValue("wardId", '');
            setValue("wardName", "");
        }
    }, [selectedDistrict]);

    useEffect(() => {
        if (activeTab === 2 && isEdit.isEdit) {
            const address = addresses.data[isEdit.index];
            if (address) {
                setValue('provinceName', address.provinceName);
                setValue('districtName', address.districtName);
                setValue('wardName', address.wardName);
                setValue('streetAddress', address.streetAddress);
                setValue('wardId', address.wardId.toString());
            }
        }
    }, [activeTab, isEdit, addresses.data]);

    useEffect(() => {
        if (isSuccessCreate || isSuccessUpdate) {
            toast.success(isSuccessCreate ? t("create_address_success") : t("update_address_success"));
            dispatch(getAllAddressesAsync()).then((response) => {
                if (response.payload.result) {
                    setAddresses({ data: response.payload.result });
                }
            });
            dispatch(resetInitialState());
        } else if ((isErrorCreate && errorMessageCreate) || (isErrorUpdate && errorMessageUpdate)) {
            toast.error(isErrorCreate ? errorMessageCreate : errorMessageUpdate);
            dispatch(resetInitialState());
        }
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
                            {activeTab === 1 ? t('shipping_address') : (isEdit.isEdit ? t('update_address') : t('add_address'))}
                        </Typography>
                        <IconButton sx={{ position: 'absolute', right: "-10px", top: "-6px" }} onClick={onClose}>
                            <IconifyIcon icon="material-symbols-light:close-rounded" fontSize={"30px"} />
                        </IconButton>
                    </Box>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
                        <Box sx={{ backgroundColor: theme.palette.background.paper, borderRadius: "15px", py: 5, px: 4 }}>
                            {activeTab === 1 ? (
                                <Stack direction="column" >
                                    {addresses.data.length > 0 ? (
                                        <FormControl>
                                            <FormLabel sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
                                                {t("address")}
                                            </FormLabel>
                                            <RadioGroup
                                                sx={{ gap: 4 }}
                                                value={selectedAddressIndex}
                                                onChange={(e) => onChangeAddress(Number(e.target.value))}
                                            >
                                                {addresses.data.map((address, index) => (
                                                    <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                                        <FormControlLabel
                                                            value={index}
                                                            control={<Radio checked={address.isDefault} />}
                                                            label={`${address.streetAddress}, 
                                                            ${address.wardName}, 
                                                            ${address.districtName} ,
                                                            ${address.provinceName}`}
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
                                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                                            <NoData imageWidth="60px" imageHeight="60px" textNodata={t("no_shipping_address")} />
                                        </Box>
                                    )}
                                    <Button
                                        variant="outlined"
                                        disabled={addresses.data.length >= 3}
                                        onClick={() => {
                                            setActiveTab(2);
                                            setIsEdit({ isEdit: false, index: 0 });
                                        }}
                                        sx={{ mt: 3, mb: 2, py: 1.5, width: "fit-content" }}
                                    >
                                        {t('add_address')}
                                    </Button>
                                </Stack>
                            ) : (
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth>
                                            <CustomSelect
                                                fullWidth
                                                value={selectedProvince}
                                                options={provinceOptions}
                                                label={t("province")}
                                                placeholder={t("select_province_name")}
                                                onChange={(e) => {
                                                    setSelectedProvince(e.target.value as string);
                                                    const selectedProv = provinceOptions.find(opt => opt.value === e.target.value);
                                                    if (selectedProv) {
                                                        setValue("provinceName", selectedProv.label);
                                                    }
                                                }}
                                                sx={{ borderRadius: "8px" }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth>
                                            <CustomSelect
                                                id="select-district"
                                                fullWidth
                                                value={selectedDistrict}
                                                options={districtOptions}
                                                label={t("district")}
                                                placeholder={t("select_district_name")}
                                                onChange={(e) => {
                                                    setSelectedDistrict(e.target.value as string);
                                                    const selectedDist = districtOptions.find(opt => opt.value === e.target.value);
                                                    if (selectedDist) {
                                                        setValue("districtName", selectedDist.label);
                                                    }
                                                }}
                                                disabled={!selectedProvince}
                                                sx={{ borderRadius: "8px" }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth>
                                            <Controller
                                                control={control}
                                                name="wardId"
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <Box>
                                                        <CustomSelect
                                                            fullWidth
                                                            onChange={(e) => {
                                                                const selectedWard = wardOptions.find((opt) => opt.value === e.target.value);
                                                                if (selectedWard) {
                                                                    onChange(selectedWard.value);
                                                                    setValue("wardName", selectedWard.label);
                                                                } else {
                                                                    onChange("");
                                                                    setValue("wardName", "");
                                                                }
                                                            }}
                                                            onBlur={onBlur}
                                                            value={value || ""}
                                                            options={wardOptions}
                                                            label={t("ward")}
                                                            placeholder={t("select_ward_name")}
                                                            error={!!errors.wardId}
                                                            disabled={!selectedDistrict}
                                                        />
                                                        {errors.wardId?.message && <FormHelperText error>{errors.wardId.message}</FormHelperText>}
                                                    </Box>
                                                )}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth>
                                            <Controller
                                                control={control}
                                                name="streetAddress"
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <CustomTextField
                                                        fullWidth
                                                        label={t("street_address")}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value}
                                                        placeholder={t("enter_street_address")}
                                                        error={!!errors.streetAddress}
                                                        helperText={errors.streetAddress?.message}
                                                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                                                    />
                                                )}
                                            />
                                        </FormControl>
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
                            <Button 
                                type={activeTab === 2 ? "submit" : "button"} 
                                variant="contained" 
                                sx={{ mt: 3, mb: 2, py: 1.5 }}
                                onClick={() => activeTab === 1 && handleAddressSubmit()}
                            >
                                {activeTab === 2 ? (isEdit.isEdit ? t('save') : t('add')) : t('confirm')}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </CustomModal>
        </>
    );
};

export default AddressModal;