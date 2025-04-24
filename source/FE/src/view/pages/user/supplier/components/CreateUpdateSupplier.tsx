import { useEffect, useState, lazy, Suspense, useMemo, useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import {
    Avatar,
    Box,
    Button,
    FormHelperText,
    Grid,
    IconButton,
    Typography,
    InputAdornment,
    FormControl,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/stores";
import { createSupplierAsync, updateSupplierAsync } from "src/stores/supplier/action";
import { EMAIL_REG, PASSWORD_REG } from "src/configs/regex";
import { convertBase64 } from "src/utils";
import { getAllWards, getWardDetail } from "src/services/ward";
import { getAllProvinces } from "src/services/province";
import { getAllDistricts } from "src/services/district";
import { AutocompleteOption } from "src/components/custom-autocomplete";
import { getSupplierDetail } from "src/services/supplier";
import FileUploadWrapper from "src/components/file-upload-wrapper";

const CustomModal = lazy(() => import("src/components/custom-modal"));
const IconifyIcon = lazy(() => import("src/components/Icon"));
const Spinner = lazy(() => import("src/components/spinner"));
const CustomTextField = lazy(() => import("src/components/text-field"));
const CustomAutocomplete = lazy(() => import("src/components/custom-autocomplete"));

interface TCreateUpdateSupplier {
    open: boolean;
    onClose: () => void;
    id?: number;
}

interface FormValues {
    roleId: number;
    code: string;
    type: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    streetAddress: string;
    wardId: number;
    wardName: string;
    username: string;
    password?: string;
    gender: number;
}

interface AutocompleteOptionNumber {
    label: string;
    value: number;
}

const CreateUpdateSupplier = (props: TCreateUpdateSupplier) => {
    // State quản lý loading và dữ liệu form
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState("");
    const [wardOptions, setWardOptions] = useState<AutocompleteOptionNumber[]>([]);
    const [provinceOptions, setProvinceOptions] = useState<AutocompleteOption[]>([]);
    const [districtOptions, setDistrictOptions] = useState<AutocompleteOption[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<AutocompleteOption | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<AutocompleteOption | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [avatarError, setAvatarError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Props và hooks
    const { open, onClose, id } = props;
    const { t } = useTranslation();
    const theme = useTheme();
    const dispatch: AppDispatch = useDispatch();

    // Validation schema cho form
    const schema = yup.object().shape({
        roleId: yup.number().required(t("required_code")),
        code: yup.string().required(t("required_code")),
        type: yup.string().required(t("required_type")),
        firstName: yup.string().required(t("required_first_name")),
        lastName: yup.string().required(t("required_last_name")),
        email: yup.string().required(t("required_email")).email().matches(EMAIL_REG, t("incorrect_email_format")),
        phone: yup.string().required(t("required_phone")).min(10, t("incorrect_phone_format")),
        streetAddress: yup.string().required(t("required_address")),
        wardId: yup.number().required(t("required_ward_id")),
        wardName: yup.string().required(t("required_ward_name")),
        username: yup.string().required(t("required_username")),
        password: id ? yup.string() : yup.string().required(t("required_password")).matches(PASSWORD_REG, t("incorrect_password_format")),
        gender: yup.number().required(t("required_gender")),
    });

    // Default values cho form
    const defaultValues: FormValues = {
        roleId: 0,
        code: "",
        type: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        streetAddress: "",
        wardId: 0,
        wardName: "",
        username: "",
        password: "",
        gender: 0,
    };

    // Form control
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
        setValue,
    } = useForm<FormValues>({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    /**
     * Xử lý submit form
     * @param {FormValues} data - Dữ liệu form
     */
    const onSubmit = (data: FormValues) => {
        if (!Object.keys(errors).length) {
            setIsSubmitting(true);
            const baseData = {
                roleId: data.roleId,
                code: data.code,
                identityGuid: "",
                type: data.type,
                firstName: data.firstName,
                lastName: data.lastName,
                fullName: "",
                email: data.email || "",
                phone: data.phone,
                streetAddress: data.streetAddress,
                wardId: Number(data.wardId),
                wardName: data.wardName,
                username: data.username,
                securityStamp: "",
                gender: data.gender,
            };

            if (id) {
                dispatch(updateSupplierAsync({
                    ...baseData,
                    id: Number(id),
                    roleId: data.roleId,
                    password: data.password || ""
                } as any))
                    .then((result) => {
                        if (result.meta.requestStatus === 'fulfilled') {
                            onClose();
                        }
                    })
                    .catch((error) => {
                        console.error('Error updating supplier:', error);
                    })
                    .finally(() => {
                        setIsSubmitting(false);
                    });
            } else {
                dispatch(createSupplierAsync({
                    ...baseData,
                    roleId: data.roleId,
                    password: data.password // Password required for create
                } as any))
                    .then((result) => {
                        if (result.meta.requestStatus === 'fulfilled') {
                            onClose();
                        }
                    })
                    .catch((error) => {
                        console.error('Error creating supplier:', error);
                    })
                    .finally(() => {
                        setIsSubmitting(false);
                    });
            }
        } else {
            console.log('Validation errors:', errors);
        }
    };

    // Memoized values và handlers
    const roleOptions = useMemo(() => [
        { label: "Admin", value: 1 },
        { label: "User", value: 2 },
    ], []);

    const genderOptions = useMemo(() => [
        { label: t('male'), value: 1 },
        { label: t('female'), value: 0 },
    ], [t]);

    /**
     * Xử lý upload avatar
     * @param {File} file - File ảnh được chọn
     */
    const handleUploadAvatar = useCallback(async (file: File) => {
        if (!file) {
            setAvatarError(t("required_avatar"));
            return;
        }
        const base64 = await convertBase64(file);
        setAvatar(base64 as string);
        setAvatarError("");
    }, [t]);

    /**
     * Xử lý khi thay đổi tỉnh/thành phố
     * @param {AutocompleteOption | null} value - Giá trị tỉnh/thành phố được chọn
     */
    const handleProvinceChange = useCallback((value: AutocompleteOption | null) => {
        setSelectedProvince(value);
        setDistrictOptions([]);
        setWardOptions([]);
        setSelectedDistrict(null);
        setValue("wardId", 0);
        setValue("wardName", "");
    }, [setValue]);

    /**
     * Xử lý khi thay đổi quận/huyện
     * @param {AutocompleteOption | null} newValue - Giá trị quận/huyện được chọn
     */
    const handleDistrictChange = useCallback((newValue: AutocompleteOption | null) => {
        setSelectedDistrict(newValue);
        setWardOptions([]);
        setValue("wardId", 0);
        setValue("wardName", "");
    }, [setValue]);

    /**
     * Xử lý khi thay đổi phường/xã
     * @param {AutocompleteOption | null} newValue - Giá trị phường/xã được chọn
     */
    const handleWardChange = useCallback((newValue: AutocompleteOption | null) => {
        if (newValue) {
            setValue("wardId", Number(newValue.value));
            setValue("wardName", newValue.label);
        } else {
            setValue("wardId", 0);
            setValue("wardName", "");
        }
    }, [setValue]);

    /**
     * Lấy danh sách tỉnh/thành phố
     */
    const fetchAllProvinces = useCallback(async () => {
        setLoading(true);
        try {
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
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchDistrictsByProvince = async (provinceId: number) => {
        setLoading(true);
        await getAllDistricts({
            params: {
                take: -1,
                skip: 0,
                paging: false,
                orderBy: "name",
                dir: "asc",
                keywords: "''",
                filters: `provinceId::${provinceId}::eq`,
            },
        })
            .then((res) => {
                const data = res?.result?.subset;
                if (data) {
                    setDistrictOptions(data.map((item: { name: string; id: string }) => ({
                        label: item.name,
                        value: item.id,
                    })));
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    const fetchWardsByDistrict = async (districtId: number) => {
        setLoading(true);
        await getAllWards({
            params: {
                take: -1,
                skip: 0,
                paging: false,
                orderBy: "name",
                dir: "asc",
                keywords: "''",
                filters: `districtId::${districtId}::eq`,
            },
        })
            .then((res) => {
                const data = res?.result?.subset;
                if (data) {
                    setWardOptions(data.map((item: { name: string; id: string }) => ({
                        label: item.name,
                        value: Number(item.id),
                    })));
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    const fetchWardDetail = async (wardId: number) => {
        await getWardDetail(wardId)
            .then((res) => {
                const ward = res?.result;
                if (ward) {
                    setSelectedProvince(ward.provinceId);
                    setSelectedDistrict(ward.districtId);
                }
            })
            .catch((err) => console.error(err));
    };

    const fetchDetailSupplier = async (id: number) => {
        setLoading(true);
        await getSupplierDetail(id)
            .then((res) => {
                console.log('Supplier detail:', res?.result); // Debug log
                const data = res?.result;
                if (data) {
                    reset({
                        roleId: data.roleId || 0,
                        code: data.code || "",
                        type: data.type || "",
                        firstName: data.firstName || "",
                        lastName: data.lastName || "",
                        email: data.email || "",
                        phone: data.phone || "",
                        streetAddress: data.streetAddress || "",
                        wardId: data.wardId || 0,
                        wardName: data.wardName || "",
                        username: data.username || "",
                        password: "",
                        gender: data.gender || 0,
                    });
                    setAvatar(data.avatar);
                    if (data.wardId) {
                        fetchWardDetail(data.wardId);
                    }
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching supplier:', err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchAllProvinces();
    }, [fetchAllProvinces]);

    useEffect(() => {
        if (selectedProvince) {
            fetchDistrictsByProvince(Number(selectedProvince.value));
            setDistrictOptions([]);
            setWardOptions([]);
            setSelectedDistrict(null);
            setValue("wardId", 0);
            setValue("wardName", "");
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            fetchWardsByDistrict(Number(selectedDistrict.value));
            setWardOptions([]);
            setValue("wardId", 0);
            setValue("wardName", "");
        }
    }, [selectedDistrict]);

    useEffect(() => {
        if (open) {
            if (id) fetchDetailSupplier(id);
        } else {
            reset(defaultValues);
            setAvatar("");
            setSelectedProvince(null);
            setSelectedDistrict(null);
            setProvinceOptions([]);
            setDistrictOptions([]);
            setWardOptions([]);
        }
    }, [open, id]);

    return (
        <>
            {loading && <Spinner />}
            <Suspense fallback={<Spinner />}>
                <CustomModal open={open} onClose={onClose}>
                    <Box
                        sx={{
                            backgroundColor: theme.palette.customColors.bodyBg,
                            padding: "20px",
                            borderRadius: "15px",
                            minWidth: { md: "800px", xs: "80vw" },
                            maxWidth: { md: "80vw", xs: "80vw" },
                            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: "20px" }}>
                            <Typography variant="h4" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                                {id ? t("update_supplier") : t("create_supplier")}
                            </Typography>
                            <IconButton sx={{ position: "absolute", right: "-10px", top: "-6px" }} onClick={onClose}>
                                <IconifyIcon icon="material-symbols-light:close-rounded" fontSize={"30px"} />
                            </IconButton>
                        </Box>

                        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
                            <Box
                                sx={{
                                    backgroundColor: theme.palette.background.paper,
                                    borderRadius: "15px",
                                    py: 5,
                                    px: 4,
                                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
                                }}
                            >
                                <Grid container spacing={4}>
                                    <Grid item md={12} xs={12}>
                                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 2 }}>
                                            <Box sx={{ position: "relative" }}>
                                                {avatar && (
                                                    <IconButton
                                                        sx={{
                                                            position: "absolute",
                                                            bottom: -4,
                                                            right: -6,
                                                            zIndex: 2,
                                                            color: theme.palette.error.main,
                                                            backgroundColor: theme.palette.background.paper,
                                                            borderRadius: "50%",
                                                        }}
                                                        onClick={() => {
                                                            setAvatar("");
                                                            setAvatarError(t("required_avatar"));
                                                        }}
                                                    >
                                                        <IconifyIcon icon="material-symbols:delete-rounded" />
                                                    </IconButton>
                                                )}
                                                <Avatar
                                                    src={avatar}
                                                    alt="avatar"
                                                    sx={{ width: 100, height: 100, border: `2px solid ${theme.palette.primary.main}` }}
                                                >
                                                    <IconifyIcon icon="ph:user" fontSize={70} />
                                                </Avatar>
                                            </Box>
                                            <FileUploadWrapper
                                                uploadFile={handleUploadAvatar}
                                                objectAcceptedFile={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] }}
                                            >
                                                <Button
                                                    variant="outlined"
                                                    sx={{ display: "flex", alignItems: "center", gap: 1, borderRadius: "8px", textTransform: "none" }}
                                                >
                                                    <IconifyIcon icon="ph:camera-thin" />
                                                    {avatar ? t("change_avatar") : t("upload_avatar")}
                                                </Button>
                                            </FileUploadWrapper>
                                            {avatarError && <FormHelperText error>{avatarError}</FormHelperText>}
                                        </Box>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>

                                            <Controller
                                                control={control}
                                                name="firstName"
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <CustomTextField
                                                        fullWidth
                                                        label={t("first_name")}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value}
                                                        placeholder={t("enter_first_name")}
                                                        error={!!errors.firstName}
                                                        helperText={errors.firstName?.message}
                                                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                                                    />
                                                )}
                                            />

                                            <Controller
                                                control={control}
                                                name="lastName"
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <CustomTextField
                                                        fullWidth
                                                        label={t("last_name")}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value}
                                                        placeholder={t("enter_last_name")}
                                                        error={!!errors.lastName}
                                                        helperText={errors.lastName?.message}
                                                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                                                    />
                                                )}
                                            />

                                            <Controller
                                                control={control}
                                                name="email"
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <CustomTextField
                                                        fullWidth
                                                        label={t("email")}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value}
                                                        placeholder={t("enter_email")}
                                                        error={!!errors.email}
                                                        helperText={errors.email?.message}
                                                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                                                    />
                                                )}
                                            />

                                            <Controller
                                                control={control}
                                                name="phone"
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <CustomTextField
                                                        fullWidth
                                                        label={t("phone")}
                                                        onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
                                                        onBlur={onBlur}
                                                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                                                        value={value}
                                                        placeholder={t("enter_phone")}
                                                        error={!!errors.phone}
                                                        helperText={errors.phone?.message}
                                                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                                                    />
                                                )}
                                            />

                                            <Controller
                                                control={control}
                                                name="gender"
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <Box>
                                                        <CustomAutocomplete
                                                            fullWidth
                                                            value={genderOptions.find(opt => opt.value === value) || null}
                                                            options={genderOptions}
                                                            label={t("gender")}
                                                            placeholder={t("select_gender")}
                                                            onChange={(newValue: AutocompleteOption | null) => {
                                                                onChange(newValue?.value || 0);
                                                            }}
                                                            onBlur={onBlur}
                                                            error={!!errors.gender}
                                                        />
                                                        {errors.gender && <FormHelperText error>{errors.gender.message}</FormHelperText>}
                                                    </Box>
                                                )}
                                            />

                                            <Controller
                                                control={control}
                                                name="roleId"
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <Box>
                                                        <CustomAutocomplete
                                                            fullWidth
                                                            value={roleOptions.find(opt => opt.value === value) || null}
                                                            options={roleOptions}
                                                            label={t("role_ids")}
                                                            placeholder={t("select_role_ids_name")}
                                                            onChange={(newValue: AutocompleteOption | null) => {
                                                                onChange(newValue?.value || 0);
                                                            }}
                                                            onBlur={onBlur}
                                                            error={!!errors.roleId}
                                                        />
                                                        {errors.roleId && <FormHelperText error>{errors.roleId.message}</FormHelperText>}
                                                    </Box>
                                                )}
                                            />

                                            <Controller
                                                control={control}
                                                name="code"
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <CustomTextField
                                                        fullWidth
                                                        label={t("supplier_code")}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value}
                                                        placeholder={t("enter_supplier_code")}
                                                        error={!!errors.code}
                                                        helperText={errors.code?.message}
                                                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                                                    />
                                                )}
                                            />

                                        </Box>
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>

                                            <Controller
                                                control={control}
                                                name="username"
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <CustomTextField
                                                        fullWidth
                                                        label={t("username")}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value}
                                                        placeholder={t("enter_username")}
                                                        error={!!errors.username}
                                                        helperText={errors.username?.message}
                                                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                                                    />
                                                )}
                                            />

                                            {!id && (
                                                <Controller
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomTextField
                                                            required
                                                            fullWidth
                                                            label={t("password")}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value}
                                                            placeholder={t("enter_password")}
                                                            helperText={errors.password?.message}
                                                            error={errors.password ? true : false}
                                                            type={showPassword ? 'text' : 'password'}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <IconButton
                                                                            aria-label={
                                                                                showPassword ? 'hide the password' : 'display the password'
                                                                            }
                                                                            edge="end"
                                                                            onClick={() => setShowPassword(!showPassword)}>
                                                                            {
                                                                                showPassword ?
                                                                                    <IconifyIcon icon='material-symbols:visibility-outline' />
                                                                                    :
                                                                                    <IconifyIcon icon='material-symbols:visibility-off-outline-rounded' />
                                                                            }
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                )
                                                            }}
                                                        />
                                                    )}
                                                    name='password'
                                                />
                                            )}

                                            <FormControl>
                                                <CustomAutocomplete
                                                    fullWidth
                                                    value={selectedProvince}
                                                    options={provinceOptions}
                                                    label={t("province")}
                                                    placeholder={t("select_province_name")}
                                                    onChange={handleProvinceChange}
                                                />
                                            </FormControl>

                                            <FormControl>
                                                <CustomAutocomplete
                                                    fullWidth
                                                    value={selectedDistrict}
                                                    options={districtOptions}
                                                    label={t("district")}
                                                    placeholder={t("select_district_name")}
                                                    onChange={handleDistrictChange}
                                                    disabled={!selectedProvince}
                                                />
                                            </FormControl>

                                            <Controller
                                                control={control}
                                                name="wardId"
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <Box>
                                                        <CustomAutocomplete
                                                            fullWidth
                                                            value={wardOptions.find(opt => opt.value === Number(value)) || null}
                                                            options={wardOptions}
                                                            label={t("ward")}
                                                            placeholder={t("select_ward_name")}
                                                            onChange={handleWardChange}
                                                            onBlur={onBlur}
                                                            error={!!errors.wardId}
                                                            disabled={!selectedDistrict}
                                                        />
                                                        {errors.wardId && <FormHelperText error>{errors.wardId.message}</FormHelperText>}
                                                    </Box>
                                                )}
                                            />

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

                                            <Controller
                                                control={control}
                                                name="type"
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <CustomTextField
                                                        fullWidth
                                                        label={t("type")}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value}
                                                        placeholder={t("enter_type")}
                                                        error={!!errors.type}
                                                        helperText={errors.type?.message}
                                                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                                                    />
                                                )}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 3 }}>
                                <Button
                                    variant="outlined"
                                    sx={{ mt: 3, mb: 2, ml: 2, py: 1.5 }}
                                    onClick={onClose}
                                    disabled={isSubmitting}
                                >
                                    {t("cancel")}
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, py: 1.5 }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <Spinner />
                                    ) : id ? t("update") : t("create")}
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </CustomModal>
            </Suspense>
        </>
    );
};

export default CreateUpdateSupplier;