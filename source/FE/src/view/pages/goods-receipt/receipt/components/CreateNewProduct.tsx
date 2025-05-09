import { useEffect, useState, lazy, Suspense, useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import {
    Box,
    Button,
    FormHelperText,
    Grid,
    IconButton,
    InputLabel,
    Tab,
    Tabs,
    Typography,
    Paper,
    Avatar,
    FormControlLabel,
    Switch,
    useTheme
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/stores";
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import React from "react";
import { ProductImage, TParamsCreateProduct } from "src/types/product";
import { convertBase64, convertHTMLToDraft } from "src/utils";
import { createProductAsync, updateProductAsync } from "src/stores/product/action";
import { getAllProductCategories } from "src/services/product-category";
import { TParamsGetAllProductCategories } from "src/types/product-category";
import { getAllBrands } from "src/services/brand";
import { TParamsGetAllBrands } from "src/types/brand";
import { getProductCode, getProductDetail } from "src/services/product";
import { toast } from "react-toastify";

const CustomTextField = lazy(() => import("src/components/text-field"));
const IconifyIcon = lazy(() => import("src/components/Icon"));
const Spinner = lazy(() => import("src/components/spinner"));
const FileUploadWrapper = lazy(() => import("src/components/file-upload-wrapper"));
const CustomAutocomplete = lazy(() => import("src/components/custom-autocomplete"));
const CustomEditor = lazy(() => import("src/components/custom-editor"));


const MemoizedCustomTextField = React.memo(CustomTextField);
const MemoizedCustomAutocomplete = React.memo(CustomAutocomplete);
const MemoizedCustomEditor = React.memo(CustomEditor);



interface TCreateNewProduct {
    id?: number;
    onClose: () => void;
}

type TDefaultValues = {
    code: string;
    name: string;
    stockQuantity: number;
    price: number;
    importPrice: number;
    discount?: string | null;
    ingredient: EditorState;
    uses: EditorState;
    usageGuide: EditorState;
    brandId: string;
    categoryId: string;
    status: number;
    startDate?: Date | null;
    endDate?: Date | null;
    images?: ProductImage[];
};

// Constants
const DEFAULT_PAGING_PARAMS = {
    take: -1,
    skip: 0,
    filters: '',
    orderBy: 'createdDate',
    dir: 'asc',
    paging: false,
    keywords: "''"
};


const CreateNewProduct = (props: TCreateNewProduct) => {

    const [loading, setLoading] = useState(false);
    const [categoryOptions, setCategoryOptions] = useState<{ label: string; value: string }[]>([]);
    const [brandOptions, setBrandOptions] = useState<{ label: string; value: string }[]>([]);
    const [productImages, setProductImages] = useState<ProductImage[]>([]);
    const [tabValue, setTabValue] = useState(0);
    const [isEditMode, setIsEditMode] = useState(false);
    const [productCode, setProductCode] = useState<string>("");

    // Hooks và context
    const { id, onClose } = props;
    const { t } = useTranslation();
    const theme = useTheme();
    const dispatch: AppDispatch = useDispatch();

    const statusOptions = [
        { label: t('private'), value: 0 },
        { label: t('public'), value: 1 },
        { label: t('pending'), value: 2 },
    ];

    // Schema validation cho form
    const schema = yup.object().shape({
        code: yup.string().required(t("required_product_code")),
        name: yup.string().required(t("required_product_name")),
        stockQuantity: yup.number().default(0),
        ingredient: yup.mixed<EditorState>().required(t('required_ingredient')),
        uses: yup.mixed<EditorState>().required(t('required_uses')),
        usageGuide: yup.mixed<EditorState>().required(t('required_usage_guide')),
        brandId: yup.string().required(t("required_brand")),
        categoryId: yup.string().required(t("required_product_category")),
        discount: yup.string().notRequired()
            .test('least_discount', t('at_least_discount'), (value, context) => {
                const startDate = context?.parent?.startDate;
                const endDate = context?.parent?.endDate;
                if (value) {
                    if (!startDate) setError('startDate', { message: t('required_discount_start_date'), type: 'required_start_discount' });
                    if (!endDate) setError('endDate', { message: t('required_discount_end_date'), type: 'required_end_discount' });
                } else {
                    clearErrors('startDate');
                    clearErrors('endDate');
                }
                return !value || Number(value) >= 1;
            }),
        startDate: yup.date().notRequired()
            .test('required_start_discount', t('required_discount_start_date'), (value, context) => {
                const discount = context?.parent?.discount;
                return !discount || (value && discount);
            })
            .test('less_start_discount', t('less_discount_start_date'), (value, context: any) => {
                const endDate = context?.parent?.endDate;
                if (value && endDate && endDate.getTime() > value?.getTime()) clearErrors("endDate");
                return !endDate || (endDate && value && endDate.getTime() > value?.getTime());
            }),
        endDate: yup.date().notRequired()
            .test('required_end_discount', t('required_discount_end_date'), (value, context: any) => {
                const startDate = context?.parent?.startDate;
                return !startDate || (startDate && value);
            })
            .test('greater_start_discount', t('greater_discount_start_date'), (value, context: any) => {
                const startDate = context?.parent?.startDate;
                if (value && startDate && startDate.getTime() < value?.getTime()) clearErrors("startDate");
                return !startDate || (startDate && value && startDate.getTime() < value?.getTime());
            }),
        status: yup.number().required(t('required_product_status')),
        price: yup.number().default(0),
        importPrice: yup.number().default(0),
        images: yup
            .array()
            .of(
                yup.object().shape({
                    imageBase64: yup.string().default(""),
                    imageUrl: yup.string().default(""),
                    publicId: yup.string().default(""),
                    typeImage: yup.string().default(""),
                    value: yup.string().default("main"),
                    id: yup.number().default(0),
                    displayOrder: yup.number().default(0),
                })
            )
            .min(1, t("images_required")),
    });


    const defaultValues: TDefaultValues = {
        code: productCode,
        name: "",
        stockQuantity: 0,
        price: 0,
        importPrice: 0,
        discount: "",
        ingredient: EditorState.createEmpty(),
        uses: EditorState.createEmpty(),
        usageGuide: EditorState.createEmpty(),
        brandId: "",
        categoryId: "",
        status: 0,
        startDate: null,
        endDate: null,
        images: [],
    };

    // Form control và validation
    const {
        handleSubmit,
        getValues,
        setError,
        clearErrors,
        control,
        formState: { errors },
        reset,
        setValue
    } = useForm<TDefaultValues>({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    console.log("errors", errors);

    const handleUploadProductImage = useCallback(async (file: File) => {
        try {
            const base64WithPrefix = await convertBase64(file);
            const base64 = base64WithPrefix.split(",")[1];

            const newImage: ProductImage = {
                imageUrl: "",
                imageBase64: base64,
                publicId: "''",
                typeImage: file.type.split("/")[1],
                value: "main",
                id: 0,
                displayOrder: productImages.length + 1,
            };

            // Cập nhật state và form value
            const updatedImages = [...productImages, newImage];
            setProductImages(updatedImages);
            setValue("images", updatedImages, { shouldValidate: true });
        } catch (error) {
            console.error('Error uploading image:', error);
            // Có thể thêm thông báo lỗi cho người dùng ở đây
        }
    }, [productImages, setValue]);

    const onSubmit: SubmitHandler<TDefaultValues> = useCallback(async (data) => {
        const preparedImages = productImages.map((img, index) => ({
            ...img,
            displayOrder: index + 1,
            value: index === 0 ? "main" : "sub"
        }));

        const payload: TParamsCreateProduct = {
            code: data.code,
            name: data.name,
            // stockQuantity: Number(data.stockQuantity),
            stockQuantity: 0,
            price: Number(data.price),
            importPrice: Number(data.importPrice),
            discount: data.discount ? Number(data.discount) : 0,
            ingredient: data?.ingredient ? draftToHtml(convertToRaw(data?.ingredient.getCurrentContent())) : "",
            uses: data?.uses ? draftToHtml(convertToRaw(data?.uses.getCurrentContent())) : "",
            usageGuide: data?.usageGuide ? draftToHtml(convertToRaw(data?.usageGuide.getCurrentContent())) : "",
            brandId: Number(data.brandId),
            categoryId: Number(data.categoryId),
            status: data.status,
            startDate: data.startDate ? data.startDate.toISOString() : undefined,
            endDate: data.endDate ? data.endDate.toISOString() : undefined,
            images: preparedImages,
        };
        if (id) {
            const result = await dispatch(updateProductAsync({ id: id, ...payload }));
            if (result?.payload?.result) {
                toast.success(t('update_product_success'));
                onClose();
              }
        } else {

            const result = await dispatch(createProductAsync(payload));
            if (result?.payload?.result) {
                toast.success(t('create_product_success'));
                onClose();
              }
        }
    }, [id, dispatch, productImages]);

    // Memoized handlers
    const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    }, []);

    // Memoized data fetching
    const fetchAllCategories = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getAllProductCategories({
                params: DEFAULT_PAGING_PARAMS as TParamsGetAllProductCategories,
            });
            const data = res?.result?.subset;
            if (data) {
                setCategoryOptions(data.map((item: { name: string; id: string }) => ({
                    label: item.name,
                    value: item.id
                })));
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchAllBrands = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getAllBrands({
                params: DEFAULT_PAGING_PARAMS as TParamsGetAllBrands,
            });
            const data = res?.result?.subset;
            if (data) {
                setBrandOptions(data.map((item: { name: string; id: string }) => ({
                    label: item.name,
                    value: item.id
                })));
            }
        } catch (error) {
            console.error('Error fetching brands:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchDetailProduct = async (productId: number) => {
        setLoading(true);
        try {
            const res = await getProductDetail(productId);
            const data = res?.result;
            if (data) {
                reset({
                    code: data.code,
                    name: data.name,
                    stockQuantity: 0,
                    price: data.price.toString(),
                    importPrice: data.importPrice.toString(),
                    discount: data.discount ? (data.discount * 100).toString() : '',
                    ingredient: data?.ingredient ? convertHTMLToDraft(data?.ingredient) : EditorState.createEmpty(),
                    uses: data?.uses ? convertHTMLToDraft(data?.uses) : EditorState.createEmpty(),
                    usageGuide: data?.usageGuide ? convertHTMLToDraft(data?.usageGuide) : EditorState.createEmpty(),
                    brandId: data.brandId,
                    categoryId: data.categoryId,
                    status: data.status,
                    startDate: data.startDate ? new Date(data.startDate) : null,
                    endDate: data.endDate ? new Date(data.endDate) : null,
                    images: data.images,
                });
                setProductImages(data.images || []);
            }
        } catch (error) {
            console.error('Error fetching product details:', error);
        } finally {
            setLoading(false);
        }
    };

    const getProductDefaultCode = async () => {
        const res = await getProductCode({
            params: { take: -1, skip: 0, filters: '', orderBy: 'createdDate', dir: 'asc', paging: false, keywords: "''" }
        });
        setProductCode(res?.result);
    };

    useEffect(() => {
        if (id) {
            setIsEditMode(true);
            fetchDetailProduct(id);
        } else {
            setIsEditMode(false);
            reset(defaultValues);
        }
    }, [id]);

    useEffect(() => {
        fetchAllCategories();
        fetchAllBrands();
        getProductDefaultCode();
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ p: 3 }}>
                <Suspense fallback={<Spinner />}>
                    {loading && <Spinner />}
                    <Paper
                        sx={{
                            p: 2,
                            maxHeight: '90vh',
                            '&::-webkit-scrollbar': {
                                width: '8px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: theme.palette.grey[100],
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: theme.palette.primary.main,
                                borderRadius: '4px',
                            },
                        }}
                    >
                        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
                            {/* Header */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h5">{isEditMode ? t("update_product") : t("create_product")}</Typography>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button variant="outlined" onClick={onClose}>
                                        {t("cancel")}
                                    </Button>
                                    <Button type="submit" variant="contained" color="primary" disabled={loading}>
                                        {isEditMode ? t("update") : t("create")}
                                    </Button>
                                </Box>
                            </Box>

                            {/* Image Upload Section */}
                            <Box sx={{ mb: 4 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{
                                        display: 'flex',
                                        gap: 2,
                                        flexWrap: 'wrap',
                                        justifyContent: 'center',
                                        maxWidth: '100%',
                                        '& > *': {
                                            flex: '0 0 auto',
                                            minWidth: '100px',
                                            maxWidth: '150px'
                                        }
                                    }}>
                                        {productImages.length > 0 ? (
                                            productImages.map((img, index) => (
                                                <Box key={index} sx={{ position: 'relative' }}>
                                                    <Avatar
                                                        src={img.imageBase64 ? `data:image/${img.typeImage};base64,${img.imageBase64}` : img.imageUrl}
                                                        sx={{
                                                            width: '100%',
                                                            height: 'auto',
                                                            aspectRatio: '1/1',
                                                            objectFit: 'cover'
                                                        }}
                                                        variant="rounded"
                                                        alt={`product-image-${index}`}
                                                    />
                                                    <IconButton
                                                        sx={{
                                                            position: 'absolute',
                                                            top: -8,
                                                            right: -8,
                                                            color: theme.palette.error.main,
                                                            backgroundColor: theme.palette.background.paper,
                                                            '&:hover': {
                                                                backgroundColor: theme.palette.background.paper
                                                            }
                                                        }}
                                                        onClick={() => {
                                                            const updatedImages = productImages.filter((_, i) => i !== index);
                                                            setProductImages(updatedImages);
                                                            setValue('images', updatedImages, { shouldValidate: true });
                                                        }}
                                                    >
                                                        <IconifyIcon icon='material-symbols:delete-rounded' />
                                                    </IconButton>
                                                </Box>
                                            ))
                                        ) : (
                                            <Avatar
                                                sx={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    aspectRatio: '1/1'
                                                }}
                                                variant="rounded"
                                                alt='default-product-image'
                                            >
                                                <IconifyIcon fontSize={40} icon='solar:cosmetic-outline' />
                                            </Avatar>
                                        )}
                                    </Box>
                                    <FileUploadWrapper
                                        uploadFile={handleUploadProductImage}
                                        objectAcceptedFile={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] }}
                                    >
                                        <Button variant="outlined" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <IconifyIcon icon="ph:camera-thin" />
                                            {t("upload_product_image")}
                                        </Button>
                                    </FileUploadWrapper>
                                    {errors.images && (
                                        <FormHelperText error>{errors.images.message}</FormHelperText>
                                    )}
                                </Box>
                            </Box>

                            {/* Basic Information */}
                            <Grid container spacing={4}>
                                {/* Left Column */}
                                <Grid item xs={12} md={6}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Controller
                                                name="code"
                                                control={control}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <MemoizedCustomTextField
                                                        fullWidth
                                                        required
                                                        label={t("product_code")}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value}
                                                        placeholder={productCode}
                                                        error={!!errors.code}
                                                        helperText={errors.code?.message}
                                                        disabled={isEditMode}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Controller
                                                name="stockQuantity"
                                                control={control}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <MemoizedCustomTextField
                                                        fullWidth
                                                        required
                                                        disabled
                                                        type="number"
                                                        label={t("stock_quantity")}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value}
                                                        placeholder={t("enter_product_stock_quantity")}
                                                        error={!!errors.stockQuantity}
                                                        helperText={errors.stockQuantity?.message}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Controller
                                                name="name"
                                                control={control}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <MemoizedCustomTextField
                                                        fullWidth
                                                        required
                                                        label={t("product_name")}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value}
                                                        placeholder={t("enter_product_name")}
                                                        error={!!errors.name}
                                                        helperText={errors.name?.message}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Controller
                                                name="status"
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <MemoizedCustomAutocomplete
                                                        options={statusOptions}
                                                        value={statusOptions.find(option => option.value === value) || null}
                                                        onChange={(newValue) => onChange(newValue?.value ?? 0)}
                                                        label={t("status")}
                                                        error={!!errors.status}
                                                        helperText={errors.status?.message}
                                                        placeholder={t("select_product_status")}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Controller
                                                name="discount"
                                                control={control}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <MemoizedCustomTextField
                                                        fullWidth
                                                        type="number"
                                                        label={t("discount")}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value}
                                                        placeholder={t("enter_product_discount")}
                                                        error={!!errors.discount}
                                                        helperText={errors.discount?.message}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>

                            

                                {/* Right Column */}
                                <Grid item xs={12} md={6}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Controller
                                                name="price"
                                                control={control}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <MemoizedCustomTextField
                                                        fullWidth
                                                        required
                                                        type="number"
                                                        label={t("price")}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value}
                                                        placeholder={t("enter_product_price")}
                                                        error={!!errors.price}
                                                        helperText={errors.price?.message}
                                                    />
                                                )}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Controller
                                                name="importPrice"
                                                control={control}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <MemoizedCustomTextField
                                                        fullWidth
                                                        required
                                                        type="number"
                                                        label={t("import_price")}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value}
                                                        placeholder={t("enter_product_import_price")}
                                                        error={!!errors.importPrice}
                                                        helperText={errors.importPrice?.message}
                                                    />
                                                )}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Controller
                                                name="categoryId"
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <MemoizedCustomAutocomplete
                                                        options={categoryOptions}
                                                        value={categoryOptions.find(option => option.value === value) || null}
                                                        onChange={(newValue) => onChange(newValue?.value || '')}
                                                        label={t("category")}
                                                        error={!!errors.categoryId}
                                                        helperText={errors.categoryId?.message}
                                                        placeholder={t("select_product_category")}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Controller
                                                name="brandId"
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <MemoizedCustomAutocomplete
                                                        options={brandOptions}
                                                        value={brandOptions.find(option => option.value === value) || null}
                                                        onChange={(newValue) => onChange(newValue?.value || '')}
                                                        label={t("brand")}
                                                        error={!!errors.brandId}
                                                        helperText={errors.brandId?.message}
                                                        placeholder={t("select_brand")}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Controller
                                                name="startDate"
                                                control={control}
                                                render={({ field }) => (
                                                    <DesktopDateTimePicker
                                                        label={t("discount_start_date")}
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        slotProps={{
                                                            textField: {
                                                                fullWidth: true,
                                                                size: "small",
                                                                error: !!errors.startDate,
                                                                helperText: errors.startDate?.message
                                                            }
                                                        }}
                                                        timezone="system"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Controller
                                                name="endDate"
                                                control={control}
                                                render={({ field }) => (
                                                    <DesktopDateTimePicker
                                                        label={t("discount_end_date")}
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        slotProps={{
                                                            textField: {
                                                                fullWidth: true,
                                                                size: "small",
                                                                error: !!errors.endDate,
                                                                helperText: errors.endDate?.message
                                                            }
                                                        }}
                                                        timezone="system"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>

                                </Grid>
                                {/* Tabs Section */}
                                <Box sx={{ width: '100%', mt: 4 }}>
                                    <Tabs value={tabValue} onChange={handleTabChange}>
                                        <Tab label={t("ingredient")} />
                                        <Tab label={t("uses")} />
                                        <Tab label={t("usage_guide")} />
                                    </Tabs>
                                </Box>

                                {/* Tab Panels */}
                                <Box sx={{ mt: 2 }}>
                                    {tabValue === 0 && (
                                        <Controller
                                            name="ingredient"
                                            control={control}
                                            render={({ field }) => (
                                                <MemoizedCustomEditor
                                                    editorState={field.value}
                                                    placeholder={t("enter_product_ingredient")}
                                                    onEditorStateChange={(state) => field.onChange(state)}
                                                    error={!!errors.ingredient}
                                                    helperText={errors.ingredient?.message}
                                                />
                                            )}
                                        />
                                    )}
                                    {tabValue === 1 && (
                                        <Controller
                                            name="uses"
                                            control={control}
                                            render={({ field }) => (
                                                <MemoizedCustomEditor
                                                    editorState={field.value}
                                                    placeholder={t("enter_product_uses")}
                                                    onEditorStateChange={(state) => field.onChange(state)}
                                                    error={!!errors.uses}
                                                    helperText={errors.uses?.message}
                                                />
                                            )}
                                        />
                                    )}
                                    {tabValue === 2 && (
                                        <Controller
                                            name="usageGuide"
                                            control={control}
                                            render={({ field }) => (
                                                <MemoizedCustomEditor
                                                    editorState={field.value}
                                                    placeholder={t("enter_product_usage_guide")}
                                                    onEditorStateChange={(state) => field.onChange(state)}
                                                    error={!!errors.usageGuide}
                                                    helperText={errors.usageGuide?.message}
                                                />
                                            )}
                                        />
                                    )}
                                </Box>
                            </Grid>
                        </form>
                    </Paper>
                </Suspense>
            </Box>
        </LocalizationProvider>
    );
};

// Memoize the entire component
export default React.memo(CreateNewProduct);