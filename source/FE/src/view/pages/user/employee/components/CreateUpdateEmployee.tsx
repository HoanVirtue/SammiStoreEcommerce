import { useEffect, useState } from "react";
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
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material";
import CustomModal from "src/components/custom-modal";
import IconifyIcon from "src/components/Icon";
import Spinner from "src/components/spinner";
import CustomTextField from "src/components/text-field";
import FileUploadWrapper from "src/components/file-upload-wrapper";
import { getEmployeeDetail } from "src/services/employee";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/stores";
import { createEmployeeAsync, updateEmployeeAsync } from "src/stores/employee/action";
import { EMAIL_REG, PASSWORD_REG } from "src/configs/regex";
import { convertBase64 } from "src/utils";

interface TCreateUpdateEmployee {
    open: boolean;
    onClose: () => void;
    id?: string;
}

type TDefaultValues = {
    roleIds: number[];
    code: string;
    identityGuid: string;
    type: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phone: string;
    streetAddress: string;
    wardId: number;
    wardName: string;
    username: string;
    password: string;
    gender: number;
    securityStamp: string;
};

const CreateUpdateEmployee = (props: TCreateUpdateEmployee) => {
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState("");

    const { open, onClose, id } = props;
    const { t } = useTranslation();
    const theme = useTheme();
    const dispatch: AppDispatch = useDispatch();

    // Schema validation với Yup
    const schema = yup.object().shape({
        roleIds: yup.array().of(yup.number().required()).required(t("required_code")),
        code: yup.string().required(t("required_code")),
        identityGuid: yup.string().required(t("required_identity_guid")),
        type: yup.string().required(t("required_type")),
        firstName: yup.string().required(t("required_first_name")),
        lastName: yup.string().required(t("required_last_name")),
        fullName: yup.string().required(t("required_full_name")),
        email: yup.string().required(t("required_email")).email().matches(EMAIL_REG, t("incorrect_email_format")),
        phone: yup.string().required(t("required_phone")).min(10, t("incorrect_phone_format")),
        streetAddress: yup.string().required(t("required_address")),
        wardId: yup.number().required(t("required_ward_id")),
        wardName: yup.string().required(t("required_ward_name")),
        username: yup.string().required(t("required_username")),
        password: yup.string().required(t("required_password")),
        securityStamp: yup.string().required(t("required_security_stamp")),
        gender: yup.number().required(t("required_gender")),
    });

    const defaultValues: TDefaultValues = {
        roleIds: [],
        code: "",
        identityGuid: "",
        type: "",
        firstName: "",
        lastName: "",
        fullName: "",
        email: "",
        phone: "",
        streetAddress: "",
        wardId: 0,
        wardName: "",
        username: "",
        password: "",
        securityStamp: "",
        gender: 0,
    };

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    // Xử lý submit form
    const onSubmit = (data: TDefaultValues) => {
        if (!Object.keys(errors).length) {
            const finalData = {
                roleIds: data?.roleIds as number[],
                code: data.code,
                identityGuid: data?.identityGuid,
                type: data?.type,
                firstName: data?.firstName,
                lastName: data?.lastName,
                fullName: data?.fullName,
                email: data?.email || "",
                phone: data?.phone,
                streetAddress: data?.streetAddress,
                wardId: data?.wardId,
                wardName: data?.wardName,
                username: data?.username,
                password: data?.password,
                securityStamp: data?.securityStamp,
                gender: data?.gender,
            };
            if (id) {
                dispatch(updateEmployeeAsync({
                    ...finalData,
                    id: id,
                }));
            } else {
                dispatch(createEmployeeAsync({ ...finalData }));
            }
        }
    };

    // Upload avatar
    const handleUploadAvatar = async (file: File) => {
        const base64 = await convertBase64(file);
        setAvatar(base64 as string);
    };

    const fetchDetailEmployee = async (id: string) => {
        setLoading(true);
        await getEmployeeDetail(id)
            .then((res) => {
                const data = res?.result;
                if (data) {
                    const wardIdNumber = Number(data.wardId);
                    const roleIds = data.roleIds as number[];
                    reset({
                        ...data,
                        roleIds: roleIds.length ? roleIds : [],
                        wardId: isNaN(wardIdNumber) ? 0 : wardIdNumber,
                        email: data.email ?? "",
                        streetAddress: data.streetAddress ?? "",
                    });
                    setAvatar(data.avatar);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        if (open) {
            if (id) fetchDetailEmployee(id);
        } else {
            reset(defaultValues);
            setAvatar("");
        }
    }, [open, id]);

    const roleOptions = [
        { label: "Admin", value: 1 },
        { label: "User", value: 2 },
    ];

    return (
        <>
            {loading && <Spinner />}
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
                            {id ? t("update_Employee") : t("create_Employee")}
                        </Typography>
                        <IconButton sx={{ position: "absolute", right: "-10px", top: "-6px" }} onClick={onClose}>
                            <IconifyIcon icon="material-symbols-light:close-rounded" fontSize={"30px"} />
                        </IconButton>
                    </Box>

                    {/* Form */}
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
                                {/* Cột trái */}
                                <Grid item md={6} xs={12}>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                        {/* Avatar */}
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                flexDirection: "column",
                                                gap: 2,
                                            }}
                                        >
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
                                                        onClick={() => setAvatar("")}
                                                    >
                                                        <IconifyIcon icon="material-symbols:delete-rounded" />
                                                    </IconButton>
                                                )}
                                                <Avatar
                                                    src={avatar}
                                                    alt="avatar"
                                                    sx={{
                                                        width: 100,
                                                        height: 100,
                                                        border: `2px solid ${theme.palette.primary.main}`,
                                                    }}
                                                >
                                                    <IconifyIcon icon="ph:Employee-thin" fontSize={70} />
                                                </Avatar>
                                            </Box>
                                            <FileUploadWrapper
                                                uploadFile={handleUploadAvatar}
                                                objectAcceptedFile={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] }}
                                            >
                                                <Button
                                                    variant="outlined"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        borderRadius: "8px",
                                                        textTransform: "none",
                                                    }}
                                                >
                                                    <IconifyIcon icon="ph:camera-thin" />
                                                    {avatar ? t("change_avatar") : t("upload_avatar")}
                                                </Button>
                                            </FileUploadWrapper>
                                        </Box>

                                        {/* RoleIds */}
                                        <Controller
                                            control={control}
                                            name="roleIds"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <Box>
                                                    <InputLabel
                                                        sx={{
                                                            fontSize: "13px",
                                                            mb: "4px",
                                                            color: errors.roleIds ? theme.palette.error.main : theme.palette.text.primary,
                                                        }}
                                                    >
                                                        {t("roles")}{" "}
                                                        <span
                                                            style={{
                                                                color: errors.roleIds ? theme.palette.error.main : theme.palette.text.primary,
                                                            }}
                                                        >
                                                            *
                                                        </span>
                                                    </InputLabel>
                                                    <Select
                                                        multiple
                                                        fullWidth
                                                        value={value || []}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        error={!!errors.roleIds}
                                                        renderValue={(selected) =>
                                                            selected
                                                                .map((id) => roleOptions.find((opt) => opt.value === id)?.label)
                                                                .join(", ")
                                                        }
                                                        sx={{ borderRadius: "8px" }}
                                                    >
                                                        {roleOptions.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    {errors.roleIds && <FormHelperText error>{errors.roleIds.message}</FormHelperText>}
                                                </Box>
                                            )}
                                        />

                                        {/* Code */}
                                        <Controller
                                            control={control}
                                            name="code"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <CustomTextField
                                                    fullWidth
                                                    label={t("code")}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    placeholder={t("enter_code")}
                                                    error={!!errors.code}
                                                    helperText={errors.code?.message}
                                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                                                />
                                            )}
                                        />

                                        {/* IdentityGuid */}
                                        <Controller
                                            control={control}
                                            name="identityGuid"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <CustomTextField
                                                    fullWidth
                                                    label={t("identity_guid")}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    placeholder={t("enter_identity_guid")}
                                                    error={!!errors.identityGuid}
                                                    helperText={errors.identityGuid?.message}
                                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                                                />
                                            )}
                                        />

                                        {/* Type */}
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

                                {/* Cột phải */}
                                <Grid item md={6} xs={12}>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                        {/* FirstName */}
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

                                        {/* LastName */}
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

                                        {/* FullName */}
                                        <Controller
                                            control={control}
                                            name="fullName"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <CustomTextField
                                                    fullWidth
                                                    label={t("full_name")}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    placeholder={t("enter_full_name")}
                                                    error={!!errors.fullName}
                                                    helperText={errors.fullName?.message}
                                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                                                />
                                            )}
                                        />

                                        {/* Email */}
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

                                        {/* Phone */}
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

                                        {/* StreetAddress */}
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

                                        {/* WardId */}
                                        <Controller
                                            control={control}
                                            name="wardId"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <CustomTextField
                                                    fullWidth
                                                    type="number"
                                                    label={t("ward_id")}
                                                    onChange={(e) => onChange(Number(e.target.value))}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    placeholder={t("enter_ward_id")}
                                                    error={!!errors.wardId}
                                                    helperText={errors.wardId?.message}
                                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                                                />
                                            )}
                                        />

                                        {/* WardName */}
                                        <Controller
                                            control={control}
                                            name="wardName"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <CustomTextField
                                                    fullWidth
                                                    label={t("ward_name")}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    placeholder={t("enter_ward_name")}
                                                    error={!!errors.wardName}
                                                    helperText={errors.wardName?.message}
                                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                                                />
                                            )}
                                        />

                                        {/* Username */}
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

                                        {/* Password */}
                                        <Controller
                                            control={control}
                                            name="password"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <CustomTextField
                                                    fullWidth
                                                    label={t("password")}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    placeholder={t("enter_password")}
                                                    error={!!errors.password}
                                                    helperText={errors.password?.message}
                                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                                                />
                                            )}
                                        />

                                        {/* SecurityStamp */}
                                        <Controller
                                            control={control}
                                            name="securityStamp"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <CustomTextField
                                                    fullWidth
                                                    label={t("security_stamp")}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    placeholder={t("enter_security_stamp")}
                                                    error={!!errors.securityStamp}
                                                    helperText={errors.securityStamp?.message}
                                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                                                />
                                            )}
                                        />

                                        {/* Gender */}
                                        <Controller
                                            control={control}
                                            name="gender"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <Box>
                                                    <InputLabel
                                                        sx={{
                                                            fontSize: "13px",
                                                            mb: "4px",
                                                            color: errors.gender ? theme.palette.error.main : theme.palette.text.primary,
                                                        }}
                                                    >
                                                        {t("gender")}{" "}
                                                        <span
                                                            style={{
                                                                color: errors.gender ? theme.palette.error.main : theme.palette.text.primary,
                                                            }}
                                                        >
                                                            *
                                                        </span>
                                                    </InputLabel>
                                                    <Select
                                                        fullWidth
                                                        value={value}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        error={!!errors.gender}
                                                        sx={{ borderRadius: "8px" }}
                                                    >
                                                        <MenuItem value={0}>{t("male")}</MenuItem>
                                                        <MenuItem value={1}>{t("female")}</MenuItem>
                                                    </Select>
                                                    {errors.gender && <FormHelperText error>{errors.gender.message}</FormHelperText>}
                                                </Box>
                                            )}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>

                        {/* Nút hành động */}
                        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 3 }}>
                            <Button variant="outlined" sx={{ mt: 3, mb: 2, ml: 2, py: 1.5 }} onClick={onClose}>
                                {t("cancel")}
                            </Button>
                            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>
                                {id ? t("update") : t("create")}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </CustomModal>
        </>
    );
};

export default CreateUpdateEmployee;