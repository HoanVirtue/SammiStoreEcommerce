import React, { useEffect, useState, useRef } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import {
    Box,
    Button,
    Typography,
    Paper,
    Grid,
    styled,
    useTheme,
    TableCell,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    IconButton,
    Avatar,
    FormHelperText,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useTranslation } from 'react-i18next';
import CustomTextField from 'src/components/text-field';
import CustomAutocomplete from 'src/components/custom-autocomplete';
import Spinner from 'src/components/spinner';
import { useDispatch } from 'react-redux';
import { createEventAsync, updateEventAsync } from 'src/stores/event/action';
import { useRouter } from 'next/router';
import { AppDispatch } from 'src/stores';
import { getEventDetail } from 'src/services/event';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { getAllProvinces } from 'src/services/province';
import { getAllProducts } from 'src/services/product';
import IconifyIcon from 'src/components/Icon';
import FileUploadWrapper from 'src/components/file-upload-wrapper';
import { convertBase64 } from 'src/utils';
import { TParamsCreateEvent, TParamsUpdateEvent } from 'src/types/event';
// import { EVENT_TYPE } from 'src/configs/event';

// Enum definitions
enum PromotionEventType {
    DirectDiscount = 0,       // Giảm giá trực tiếp
    OrderBasedPromotion = 1,  // Ưu đãi theo đơn hàng
    FlashSale = 2,            // Flash Sale & Giờ vàng
    SpecialOccasion = 3,      // Khuyến mãi theo dịp đặc biệt
}

enum DiscountTypeEnum {
    Percentage = 0,       // Giảm giá theo %
    FixedAmount = 1,      // Giảm giá số tiền cố định
    FreeShipping = 2,     // Miễn phí vận chuyển
}

enum ConditionTypeEnum {
    MinOrderValue = 0,     // đơn hàng tối thiểu
    MaxDiscountAmount = 1, // Giảm tối đa
    RequiredQuantity = 2,  // Mua ít nhất
    AllowedRegions = 3,    // Chỉ áp dụng cho tại địa chỉ cụ thể
    RequiredProducts = 4,  // Chỉ áp dụng khi mua sản phẩm ID 101,102,..
}

interface ImageCommand {
    imageUrl: string;
    imageBase64: string;
    publicId: string;
    typeImage: string;
    value: string;
    displayOrder: number;
}

interface VoucherCondition {
    voucherId: number;
    conditionType: number;
    conditionValue: number;
}

interface VoucherCommand {
    id?: number;
    code: string;
    name: string;
    eventId: number;
    discountTypeId: number;
    discountValue: number;
    usageLimit: number;
    startDate: Date;
    endDate: Date;
    conditions: VoucherCondition[];
}

interface EventImage {
    imageUrl: string;
    imageBase64: string;
    publicId: string;
    typeImage: string;
    value: string;
    displayOrder: number;
}

type EventFormData = {
    code: string;
    name: string;
    startDate: Date;
    endDate: Date;
    eventType: number;
    imageCommand: EventImage;
    imageId: number;
    description?: string;
    voucherCommands: VoucherCommand[];
};

interface VoucherFormErrors {
    code?: { message?: string };
    name?: { message?: string };
    discountTypeId?: { message?: string };
    discountValue?: { message?: string };
    usageLimit?: { message?: string };
    startDate?: { message?: string };
    endDate?: { message?: string };
    conditions?: {
        conditionType?: { message?: string };
        conditionValue?: { message?: string };
    };
}

interface CreateUpdateEventProps {
    id?: number;
    onClose: () => void;
}

// Add a styled component for table cells similar to the receipt component
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    padding: theme.spacing(1),
    '& .MuiTextField-root': {
        margin: 0,
        width: '100%',
    },
}));

const CreateUpdateEvent: React.FC<CreateUpdateEventProps> = ({ id, onClose }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const dispatch: AppDispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [previewImage, setPreviewImage] = useState<string>("");
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);
    const [voucherCommands, setVoucherCommands] = useState<VoucherCommand[]>([
        {
            id: 0,
            code: '',
            name: '',
            eventId: 0,
            discountTypeId: 0,
            discountValue: 0,
            usageLimit: 0,
            startDate: new Date(),
            endDate: new Date(),
            conditions: [
                {
                    voucherId: 0,
                    conditionType: 0,
                    conditionValue: 0
                }
            ]
        }
    ]);

    // State for provinces and products
    const [provinces, setProvinces] = useState<{ label: string, value: number }[]>([]);
    const [products, setProducts] = useState<{ label: string, value: number }[]>([]);
    const [loadingProvinces, setLoadingProvinces] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(false);

    // Create options for autocomplete fields
    const eventTypeOptions = [
        { label: t("direct_discount"), value: PromotionEventType.DirectDiscount },
        { label: t("order_based_promotion"), value: PromotionEventType.OrderBasedPromotion },
        { label: t("flash_sale"), value: PromotionEventType.FlashSale },
        { label: t("special_occasion"), value: PromotionEventType.SpecialOccasion },
    ];

    const discountTypeOptions = [
        { label: t("percentage_discount"), value: DiscountTypeEnum.Percentage },
        { label: t("fixed_amount"), value: DiscountTypeEnum.FixedAmount },
        { label: t("free_shipping"), value: DiscountTypeEnum.FreeShipping },
    ];

    const conditionTypeOptions = [
        { label: t("min_order_value"), value: ConditionTypeEnum.MinOrderValue },
        { label: t("max_discount_amount"), value: ConditionTypeEnum.MaxDiscountAmount },
        { label: t("required_quantity"), value: ConditionTypeEnum.RequiredQuantity },
        { label: t("allowed_regions"), value: ConditionTypeEnum.AllowedRegions },
        { label: t("required_products"), value: ConditionTypeEnum.RequiredProducts },
    ];

    const schema = yup.object().shape({
        code: yup.string().required(t("event_code_required")),
        name: yup.string().required(t("event_name_required")),
        startDate: yup.date().required(t("start_date_required")),
        endDate: yup.date().required(t("end_date_required")),
        eventType: yup.number().required(t("event_type_required")),
        imageCommand: yup.object().shape({
            imageUrl: yup.string(),
            imageBase64: yup.string(),
            publicId: yup.string(),
            typeImage: yup.string(),
            value: yup.string(),
            displayOrder: yup.number()
        }),
        description: yup.string(),
        voucherCommands: yup.array().of(
            yup.object().shape({
                code: yup.string().required(t("voucher_code_required")),
                name: yup.string().required(t("voucher_name_required")),
                eventId: yup.number(),
                discountTypeId: yup.number().required(t("discount_type_required")),
                discountValue: yup.number().required(t("discount_value_required")),
                usageLimit: yup.number().required(t("usage_limit_required")),
                startDate: yup.date().required(t("voucher_start_date_required")),
                endDate: yup.date().required(t("voucher_end_date_required")),
                conditions: yup.array().of(
                    yup.object().shape({
                        voucherId: yup.number(),
                        conditionType: yup.number().required(t("condition_type_required")),
                        conditionValue: yup.number().required(t("condition_value_required"))
                    })
                )
            })
        )
    });

    const defaultValues: EventFormData = {
        code: '',
        name: '',
        startDate: new Date(),
        endDate: new Date(),
        eventType: 0,
        imageCommand: {
            imageUrl: '',
            imageBase64: '',
            publicId: '',
            typeImage: '',
            value: '',
            displayOrder: 0
        },
        imageId: 0,
        description: '',
        voucherCommands: [{
            id: 0,
            code: '',
            name: '',
            eventId: isEditMode && id ? id : 0,
            discountTypeId: 0,
            discountValue: 0,
            usageLimit: 0,
            startDate: new Date(),
            endDate: new Date(),
            conditions: [{
                voucherId: isEditMode && id ? id : 0,
                conditionType: 0,
                conditionValue: 0
            }]
        }]
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        watch,
    } = useForm<EventFormData>({
        defaultValues,
        mode: 'onChange',
        // resolver: yupResolver(schema) as any,
    });

    const watchedVoucherCommands = watch('voucherCommands');

    const handleUploadImage = async (file: File) => {
        const base64WithPrefix = await convertBase64(file);
        const base64 = base64WithPrefix.split(",")[1];
        const imageObject = {
            imageUrl: '',
            imageBase64: base64,
            publicId: "''",
            typeImage: '',
            value: '',
            displayOrder: 0,
        };
        setValue("imageCommand", imageObject, { shouldValidate: true });
        setPreviewImage(base64WithPrefix);
    };

    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    const fetchEventDetail = async (eventId: number) => {
        setLoading(true);
        try {
            const res = await getEventDetail(eventId);
            if (res?.result) {
                const data = res.result;
                setValue('code', data.code);
                setValue('name', data.name);
                setValue('startDate', new Date(data.startDate));
                setValue('endDate', new Date(data.endDate));
                setValue('eventType', data.eventType);

                // Handle image data
                if (data.imageCommand) {
                    // Ensure typeImage is a number
                    const imageCommand = {
                        ...data.imageCommand,
                        typeImage: typeof data.imageCommand.typeImage === 'string' ? data.imageCommand.typeImage : 0
                    };
                    setValue('imageCommand', imageCommand);

                    let imageToPreview = '';
                    if (imageCommand.imageBase64) {
                        imageToPreview = imageCommand.imageBase64.startsWith("data:")
                            ? imageCommand.imageBase64
                            : `data:image/jpeg;base64,${imageCommand.imageBase64}`;
                    } else if (imageCommand.imageUrl) {
                        imageToPreview = imageCommand.imageUrl;
                    }
                    setPreviewImage(imageToPreview);
                }

                setValue('description', data.description);

                if (data.voucherCommands && data.voucherCommands.length > 0) {
                    setValue('voucherCommands', data.voucherCommands);
                    setVoucherCommands(data.voucherCommands);
                }
            }
        } catch (err) {
            console.error('Error fetching event detail:', err);
            toast.error(t('error_fetching_event_detail'));
        } finally {
            setLoading(false);
        }
    };

    const fetchAllProvinces = async () => {
        setLoading(true);
        try {
            const res = await getAllProvinces({
                params: { take: -1, skip: 0, filters: '', orderBy: 'createdDate', dir: 'asc', paging: false, keywords: "''" },
            });
            const data = res?.result?.subset;
            if (data) {
                setProvinces(data.map((item: { name: string; id: string }) => ({ label: item.name, value: item.id })));
            }
        } catch (error) {
            console.error('Error fetching provinces:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllProducts = async () => {
        setLoading(true);
        try {
            const res = await getAllProducts({
                params: { take: -1, skip: 0, filters: '', orderBy: 'createdDate', dir: 'asc', paging: false, keywords: "''" },
            });
            const data = res?.result?.subset;
            if (data) {
                setProducts(data.map((item: { name: string; id: string }) => ({ label: item.name, value: item.id })));
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllProvinces();
        fetchAllProducts();
    }, []);

    useEffect(() => {
        if (id) {
            setIsEditMode(true);
            fetchEventDetail(id);
        } else {
            setIsEditMode(false);
            reset(defaultValues);
        }
    }, [id]);

    const handleCreateEvent = async (data: EventFormData) => {
        const result = await dispatch(createEventAsync(data));
        if (!result?.payload?.result) {
            throw new Error(t('create_event_failed'));
        }
    };

    const handleUpdateEvent = async (data: TParamsUpdateEvent) => {
        if (!id) {
            throw new Error(t('invalid_event_id'));
        }
        const result = await dispatch(updateEventAsync({ ...data, id }));
        if (!result?.payload?.result) {
            throw new Error(t('update_event_failed'));
        }
    };

    const onSubmit = async (data: EventFormData) => {
        try {
            const eventData = {
                ...data,
                imageId: data.imageId || 0,
                voucherCommands: data.voucherCommands.map(voucher => ({
                    code: voucher.code,
                    name: voucher.name,
                    eventId: isEditMode && id ? id : 0,
                    discountTypeId: voucher.discountTypeId,
                    discountValue: voucher.discountValue,
                    usageLimit: voucher.usageLimit,
                    startDate: voucher.startDate,
                    endDate: voucher.endDate,
                    conditions: voucher.conditions.map(condition => ({
                        voucherId: isEditMode && id ? id : 0,
                        conditionType: condition.conditionType,
                        conditionValue: condition.conditionValue
                    }))
                }))
            };

            if (isEditMode && id) {
                await handleUpdateEvent({ ...eventData, id });
            } else {
                await handleCreateEvent(eventData);
            }
            onClose();
        } catch (error) {
            console.error('Error submitting event:', error);
            toast.error(t("error_submitting_event"));
        }
    };

    const handleAddVoucher = () => {
        const newVoucher: VoucherCommand = {
            id: voucherCommands.length + 1,
            code: '',
            name: '',
            eventId: 0,
            discountTypeId: 0,
            discountValue: 0,
            usageLimit: 0,
            startDate: new Date(),
            endDate: new Date(),
            conditions: [
                {
                    voucherId: voucherCommands.length + 1,
                    conditionType: 0,
                    conditionValue: 0
                }
            ]
        };

        const updatedVouchers = [...voucherCommands, newVoucher];
        setVoucherCommands(updatedVouchers);

        // Update form value with all vouchers
        setValue('voucherCommands', updatedVouchers);
    };

    const handleAddCondition = (voucherIndex: number) => {
        const updatedVouchers = [...voucherCommands];
        const voucher = updatedVouchers[voucherIndex];

        // Create a new condition
        const newCondition: VoucherCondition = {
            voucherId: voucher.id || 0,
            conditionType: 0,
            conditionValue: 0
        };

        // Add the new condition to the voucher
        voucher.conditions = [...voucher.conditions, newCondition];

        setVoucherCommands(updatedVouchers);
        setValue('voucherCommands', updatedVouchers);
    };

    const handleRemoveCondition = (voucherIndex: number, conditionIndex: number) => {
        const updatedVouchers = [...voucherCommands];
        const voucher = updatedVouchers[voucherIndex];

        // Remove the condition at the specified index
        voucher.conditions = voucher.conditions.filter((_, index) => index !== conditionIndex);

        // If this was the last condition, add a default one
        if (voucher.conditions.length === 0) {
            voucher.conditions = [{
                voucherId: voucher.id || 0,
                conditionType: 0,
                conditionValue: 0
            }];
        }

        setVoucherCommands(updatedVouchers);

        // Update form value with all vouchers
        setValue('voucherCommands', updatedVouchers);
    };

    const handleRemoveVoucher = (index: number) => {
        // If there's only one voucher, reset it instead of removing
        if (voucherCommands.length === 1) {
            const resetVoucher = {
                id: 0,
                code: '',
                name: '',
                eventId: 0,
                discountTypeId: 0,
                discountValue: 0,
                usageLimit: 0,
                startDate: new Date(),
                endDate: new Date(),
                conditions: [{
                    voucherId: 0,
                    conditionType: 0,
                    conditionValue: 0
                }]
            };
            setVoucherCommands([resetVoucher]);
            setValue('voucherCommands', [resetVoucher]);
        } else {
            // Remove the voucher at the specified index
            const updatedVouchers = voucherCommands.filter((_, i) => i !== index);
            setVoucherCommands(updatedVouchers);
            setValue('voucherCommands', updatedVouchers);
        }
    };

    const handleVoucherChange = (index: number, field: string, value: any) => {
        const updatedVouchers = [...voucherCommands];
        updatedVouchers[index] = {
            ...updatedVouchers[index],
            [field]: value
        };
        setVoucherCommands(updatedVouchers);
        setValue('voucherCommands', updatedVouchers);
    };

    const handleConditionChange = (voucherIndex: number, conditionIndex: number, field: string, value: any) => {
        const updatedVouchers = [...voucherCommands];
        const voucher = updatedVouchers[voucherIndex];

        // Create a new array of conditions with the updated condition
        const updatedConditions = [...voucher.conditions];
        updatedConditions[conditionIndex] = {
            ...updatedConditions[conditionIndex],
            [field]: value
        };

        // Update the voucher with the new conditions
        updatedVouchers[voucherIndex] = {
            ...voucher,
            conditions: updatedConditions
        };

        setVoucherCommands(updatedVouchers);
        setValue('voucherCommands', updatedVouchers);
    };

    // Render condition value field based on condition type
    const renderConditionValueField = (voucher: VoucherCommand, condition: any, voucherIndex: number, conditionIndex: number) => {
        const conditionType = condition.conditionType;

        if (conditionType === ConditionTypeEnum.AllowedRegions) {
            return (
                <Box>
                    <CustomAutocomplete
                        options={provinces}
                        value={provinces.find(option => option.value === condition.conditionValue) || null}
                        onChange={(newValue) => {
                            handleConditionChange(voucherIndex, conditionIndex, 'conditionValue', newValue?.value || 0);
                        }}
                        loading={loadingProvinces}
                        error={!!(errors.voucherCommands as VoucherFormErrors)?.conditions?.conditionValue}
                        helperText={(errors.voucherCommands as VoucherFormErrors)?.conditions?.conditionValue?.message}
                        placeholder={t("enter_province")}
                        size="small"
                    />
                </Box>
            );
        } else if (conditionType === ConditionTypeEnum.RequiredProducts) {
            return (
                <Box>
                    <CustomAutocomplete
                        options={products}
                        value={products.find(option => option.value === condition.conditionValue) || null}
                        onChange={(newValue) => {
                            handleConditionChange(voucherIndex, conditionIndex, 'conditionValue', newValue?.value || 0);
                        }}
                        loading={loadingProducts}
                        error={!!(errors.voucherCommands as VoucherFormErrors)?.conditions?.conditionValue}
                        helperText={(errors.voucherCommands as VoucherFormErrors)?.conditions?.conditionValue?.message}
                        placeholder={t("enter_product")}
                        size="small"
                    />
                </Box>
            );
        } else {
            return (
                <CustomTextField
                    fullWidth
                    required
                    type="number"
                    value={condition.conditionValue}
                    onChange={(e) => handleConditionChange(voucherIndex, conditionIndex, 'conditionValue', parseFloat(e.target.value) || 0)}
                    error={!!(errors.voucherCommands as VoucherFormErrors)?.conditions?.conditionValue}
                    helperText={(errors.voucherCommands as VoucherFormErrors)?.conditions?.conditionValue?.message}
                    placeholder={t("enter_condition_value")}
                    size="small"
                />
            );
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ p: 3 }}>
                {loading && <Spinner />}
                <Paper sx={{ p: 2 }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Header */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h5">{isEditMode ? t("update_event") : t("create_event")}</Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button variant="outlined" onClick={onClose}>
                                    {t("cancel")}
                                </Button>
                                <Button type="submit" variant="contained" color="primary">
                                    {isEditMode ? t("update") : t("create")}
                                </Button>
                            </Box>
                        </Box>

                        {/* Form Fields */}
                        <Grid container spacing={2}>
                            {/* Image Upload Field */}
                            <Grid item xs={12} mb={3}>
                                <Controller
                                    control={control}
                                    name="imageCommand"
                                    render={({ field: { value } }) => (
                                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                                            <Box sx={{ position: "relative" }}>
                                                {previewImage && (
                                                    <img
                                                        ref={imageRef}
                                                        src={previewImage}
                                                        style={{ display: "none" }}
                                                        onLoad={handleImageLoad}
                                                        onError={() => setIsImageLoaded(false)}
                                                        alt="preload"
                                                    />
                                                )}
                                                {loading || (previewImage && !isImageLoaded) ? (
                                                    <Avatar alt="loading-avatar" sx={{ width: 100, height: 100 }}>
                                                        <IconifyIcon icon="eos-icons:loading" fontSize={70} />
                                                    </Avatar>
                                                ) : previewImage && isImageLoaded ? (
                                                    <Avatar
                                                        src={previewImage}
                                                        sx={{ width: 100, height: 100 }}
                                                        alt="event-image"
                                                    />
                                                ) : (
                                                    <Avatar alt="default-avatar" sx={{ width: 100, height: 100 }}>
                                                        <IconifyIcon icon="solar:gift-outline" fontSize={70} />
                                                    </Avatar>
                                                )}
                                                {previewImage && (
                                                    <IconButton
                                                        sx={{ position: "absolute", bottom: -4, right: -6, color: theme.palette.error.main }}
                                                        onClick={() => {
                                                            setValue("imageCommand", {
                                                                imageUrl: '',
                                                                imageBase64: '',
                                                                publicId: '',
                                                                typeImage: '',
                                                                value: '',
                                                                displayOrder: 0,
                                                            }, { shouldValidate: true });
                                                            setPreviewImage("");
                                                        }}
                                                    >
                                                        <IconifyIcon icon="material-symbols:delete-rounded" />
                                                    </IconButton>
                                                )}
                                            </Box>
                                            <FileUploadWrapper
                                                uploadFile={handleUploadImage}
                                                objectAcceptedFile={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] }}
                                            >
                                                <Button
                                                    variant="outlined"
                                                    sx={{ width: "auto", display: "flex", alignItems: "center", gap: 1 }}
                                                >
                                                    <IconifyIcon icon="ph:camera-thin" />
                                                    {t("upload_event_image")}
                                                </Button>
                                            </FileUploadWrapper>
                                            {errors.imageCommand && (
                                                <FormHelperText sx={{ color: theme.palette.error.main }}>
                                                    {errors.imageCommand.message}
                                                </FormHelperText>
                                            )}
                                        </Box>
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="code"
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomTextField
                                            fullWidth
                                            required
                                            label={t("event_code")}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder={t("enter_event_code")}
                                            error={!!errors.code}
                                            helperText={errors.code?.message}
                                            disabled={isEditMode}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomTextField
                                            fullWidth
                                            required
                                            label={t("event_name")}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder={t("enter_event_name")}
                                            error={!!errors.name}
                                            helperText={errors.name?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Controller
                                    name="eventType"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <CustomAutocomplete
                                            options={eventTypeOptions}
                                            value={eventTypeOptions.find(option => option.value === value) || null}
                                            onChange={(newValue) => {
                                                onChange(newValue?.value || 0);
                                            }}
                                            label={t("event_type")}
                                            error={!!errors.eventType}
                                            helperText={errors.eventType?.message}
                                            placeholder={t("select_event_type")}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Controller
                                    name="startDate"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <DateTimePicker
                                            value={value}
                                            onChange={(newValue) => onChange(newValue)}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    size: "small",
                                                    label: t("start_date"),
                                                    placeholder: t("select_start_date"),
                                                    error: !!errors.startDate,
                                                    helperText: errors.startDate?.message,
                                                }
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Controller
                                    name="endDate"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <DateTimePicker
                                            value={value}
                                            onChange={(newValue) => onChange(newValue)}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    size: "small",
                                                    label: t("end_date"),
                                                    placeholder: t("select_end_date"),
                                                    error: !!errors.endDate,
                                                    helperText: errors.endDate?.message,
                                                }
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomTextField
                                            fullWidth
                                            multiline
                                            rows={4}
                                            label={t("description")}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder={t("enter_description")}
                                            error={!!errors.description}
                                            helperText={errors.description?.message}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>

                        {/* Voucher Commands Table */}
                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6">{t("list_voucher")}</Typography>
                            <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleAddVoucher}
                            >
                                {t("add_voucher")}
                            </Button>
                        </Box>

                        <Box sx={{ width: '100%', overflowX: 'auto' }}>
                            <TableContainer sx={{ mt: 2 }}>
                                <Table size="small" sx={{ minWidth: 1000 }}>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell width="5%">#</StyledTableCell>
                                            <StyledTableCell width="13%">{t("voucher_code")}</StyledTableCell>
                                            <StyledTableCell width="20%">{t("voucher_name")}</StyledTableCell>
                                            <StyledTableCell width="17%">{t("discount_type")}</StyledTableCell>
                                            <StyledTableCell width="8%">{t("discount_value")}</StyledTableCell>
                                            <StyledTableCell width="8%">{t("usage_limit")}</StyledTableCell>
                                            <StyledTableCell width="12%">{t("start_date")}</StyledTableCell>
                                            <StyledTableCell width="12%">{t("end_date")}</StyledTableCell>
                                            <StyledTableCell width="5%">
                                                <IconButton color="primary" onClick={handleAddVoucher} size="small">
                                                    <AddIcon fontSize="small" />
                                                </IconButton>
                                            </StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {voucherCommands.map((voucher, voucherIndex) => (
                                            <TableRow key={voucher.id}>
                                                <StyledTableCell>{voucherIndex + 1}</StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomTextField
                                                        fullWidth
                                                        required
                                                        value={voucher.code}
                                                        onChange={(e) => handleVoucherChange(voucherIndex, 'code', e.target.value)}
                                                        error={!!(errors.voucherCommands as VoucherFormErrors)?.code}
                                                        helperText={(errors.voucherCommands as VoucherFormErrors)?.code?.message}
                                                        placeholder={t("enter_voucher_code")}
                                                        size="small"
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomTextField
                                                        fullWidth
                                                        required
                                                        value={voucher.name}
                                                        onChange={(e) => handleVoucherChange(voucherIndex, 'name', e.target.value)}
                                                        error={!!(errors.voucherCommands as VoucherFormErrors)?.name}
                                                        helperText={(errors.voucherCommands as VoucherFormErrors)?.name?.message}
                                                        placeholder={t("enter_voucher_name")}
                                                        size="small"
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <Box>
                                                        <CustomAutocomplete
                                                            options={discountTypeOptions}
                                                            value={discountTypeOptions.find(option => option.value === voucher.discountTypeId) || null}
                                                            onChange={(newValue) => {
                                                                handleVoucherChange(voucherIndex, 'discountTypeId', newValue?.value || 0);
                                                            }}
                                                            error={!!(errors.voucherCommands as VoucherFormErrors)?.discountTypeId}
                                                            helperText={(errors.voucherCommands as VoucherFormErrors)?.discountTypeId?.message}
                                                            placeholder={t("select_discount_type")}
                                                            size="small"
                                                        />
                                                    </Box>
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomTextField
                                                        fullWidth
                                                        required
                                                        type="number"
                                                        value={voucher.discountValue}
                                                        onChange={(e) => handleVoucherChange(voucherIndex, 'discountValue', parseFloat(e.target.value) || 0)}
                                                        error={!!(errors.voucherCommands as VoucherFormErrors)?.discountValue}
                                                        helperText={(errors.voucherCommands as VoucherFormErrors)?.discountValue?.message}
                                                        placeholder={t("enter_discount_value")}
                                                        size="small"
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <CustomTextField
                                                        fullWidth
                                                        required
                                                        type="number"
                                                        value={voucher.usageLimit}
                                                        onChange={(e) => handleVoucherChange(voucherIndex, 'usageLimit', parseInt(e.target.value) || 0)}
                                                        error={!!(errors.voucherCommands as VoucherFormErrors)?.usageLimit}
                                                        helperText={(errors.voucherCommands as VoucherFormErrors)?.usageLimit?.message}
                                                        placeholder={t("enter_usage_limit")}
                                                        size="small"
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <DateTimePicker
                                                        value={voucher.startDate}
                                                        onChange={(newValue) => handleVoucherChange(voucherIndex, 'startDate', newValue)}
                                                        slotProps={{
                                                            textField: {
                                                                fullWidth: true,
                                                                size: "small",
                                                                error: !!(errors.voucherCommands as VoucherFormErrors)?.startDate,
                                                                helperText: (errors.voucherCommands as VoucherFormErrors)?.startDate?.message,
                                                            }
                                                        }}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <DateTimePicker
                                                        value={voucher.endDate}
                                                        onChange={(newValue) => handleVoucherChange(voucherIndex, 'endDate', newValue)}
                                                        slotProps={{
                                                            textField: {
                                                                fullWidth: true,
                                                                size: "small",
                                                                error: !!(errors.voucherCommands as VoucherFormErrors)?.endDate,
                                                                helperText: (errors.voucherCommands as VoucherFormErrors)?.endDate?.message,
                                                            }
                                                        }}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => handleRemoveVoucher(voucherIndex)}
                                                        size="small"
                                                    >
                                                        <RemoveIcon fontSize="small" />
                                                    </IconButton>
                                                </StyledTableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

                        {/* Voucher Conditions Table */}
                        {voucherCommands.length > 0 && (
                            <>
                                <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>{t("voucher_conditions")}</Typography>
                                <Box sx={{ width: '100%', overflowX: 'auto' }}>
                                    <TableContainer>
                                        <Table size="small" sx={{ minWidth: 800 }}>
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell width="5%">#</StyledTableCell>
                                                    <StyledTableCell width="35%">{t("voucher_name")}</StyledTableCell>
                                                    <StyledTableCell width="20%">{t("condition_type")}</StyledTableCell>
                                                    <StyledTableCell width="30%">{t("condition_value")}</StyledTableCell>
                                                    <StyledTableCell width="10%"></StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {voucherCommands.map((voucher, voucherIndex) => (
                                                    voucher.conditions.map((condition, conditionIndex) => (
                                                        <TableRow key={`condition-${voucher.id}-${condition.voucherId}`}>
                                                            {conditionIndex === 0 && (
                                                                <StyledTableCell rowSpan={voucher.conditions.length}>{voucherIndex + 1}</StyledTableCell>
                                                            )}
                                                            {conditionIndex === 0 && (
                                                                <StyledTableCell rowSpan={voucher.conditions.length}>{voucher.name}</StyledTableCell>
                                                            )}
                                                            {conditionIndex !== 0 && <StyledTableCell style={{ display: 'none' }} />}
                                                            {conditionIndex !== 0 && <StyledTableCell style={{ display: 'none' }} />}
                                                            <StyledTableCell>
                                                                <Box>
                                                                    <CustomAutocomplete
                                                                        options={conditionTypeOptions}
                                                                        value={conditionTypeOptions.find(option => option.value === condition.conditionType) || null}
                                                                        onChange={(newValue) => {
                                                                            handleConditionChange(voucherIndex, conditionIndex, 'conditionType', newValue?.value || 0);
                                                                        }}
                                                                        error={!!(errors.voucherCommands as VoucherFormErrors)?.conditions?.conditionType}
                                                                        helperText={(errors.voucherCommands as VoucherFormErrors)?.conditions?.conditionType?.message}
                                                                        placeholder={t("enter_condition_type")}
                                                                        size="small"
                                                                    />
                                                                </Box>
                                                            </StyledTableCell>
                                                            <StyledTableCell>
                                                                {renderConditionValueField(voucher, condition, voucherIndex, conditionIndex)}
                                                            </StyledTableCell>
                                                            <StyledTableCell>
                                                                <Box sx={{ display: 'flex' }}>
                                                                    {voucher.conditions.length > 1 && (
                                                                        <IconButton
                                                                            color="error"
                                                                            onClick={() => handleRemoveCondition(voucherIndex, conditionIndex)}
                                                                            size="small"
                                                                        >
                                                                            <RemoveIcon fontSize="small" />
                                                                        </IconButton>
                                                                    )}
                                                                    {conditionIndex === voucher.conditions.length - 1 && (
                                                                        <IconButton
                                                                            color="primary"
                                                                            onClick={() => handleAddCondition(voucherIndex)}
                                                                            size="small"
                                                                        >
                                                                            <AddIcon fontSize="small" />
                                                                        </IconButton>
                                                                    )}
                                                                </Box>
                                                            </StyledTableCell>
                                                        </TableRow>
                                                    ))
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </>
                        )}
                    </form>
                </Paper>
            </Box>
        </LocalizationProvider>
    );
};

export default CreateUpdateEvent;
