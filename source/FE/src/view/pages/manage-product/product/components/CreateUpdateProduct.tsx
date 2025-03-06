//react
import { useEffect, useState } from "react"

//form
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import * as yup from 'yup';

//Mui
import { Avatar, Box, Button, FormHelperText, Grid, IconButton, InputAdornment, Typography } from "@mui/material"
import { useTheme } from "@mui/material"
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

//components
import CustomModal from "src/components/custom-modal"
import IconifyIcon from "src/components/Icon"
import Spinner from "src/components/spinner"
import CustomTextField from "src/components/text-field"

//translation
import { useTranslation } from "react-i18next"

//redux
import { useDispatch } from "react-redux"
import { AppDispatch } from "src/stores"
import FileUploadWrapper from "src/components/file-upload-wrapper";
import { convertBase64, convertHTMLToDraft, stringToSlug } from "src/utils";
import { InputLabel } from "@mui/material";
import CustomSelect from "src/components/custom-select";
import { createProductAsync, updateProductAsync } from "src/stores/product/action";
import { getAllProductCategories } from "src/services/product-category";
import CustomDatePicker from "src/components/custom-date-picker";
import CustomEditor from "src/components/custom-editor";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { getProductDetail } from "src/services/product";
import { getAllCities } from "src/services/city";
import { ProductImage, TParamsCreateProduct } from "src/types/product";
import { TParamsGetAllProductCategories } from "src/types/product-category";

interface TCreateUpdateProduct {
    open: boolean
    onClose: () => void
    idProduct?: string
}

type TDefaultValues = {
    code: string;
    name: string;
    stockQuantity: string;
    price: string;
    discount?: string | null;
    ingredient: string;
    uses: string;
    usageGuide: string;
    brandId: string;
    categoryId: string;
    status: number;
    startDate?: Date | null;
    endDate?: Date | null;
    images?: ProductImage[];
};
const CreateUpdateProduct = (props: TCreateUpdateProduct) => {

    //state
    const [loading, setLoading] = useState(false)
    const [categoryOptions, setCategoryOptions] = useState<{ label: string, value: string }[]>([])

    const [productImages, setProductImages] = useState<ProductImage[]>([]);

    //props
    const { open, onClose, idProduct } = props

    //translation
    const { t, i18n } = useTranslation()

    //theme
    const theme = useTheme()

    const brandOption = [
        {
            label: '9',
            value: '9'
        },
        {
            label: 'Brand 2',
            value: 'b2'
        },
    ]

    //redux
    const dispatch: AppDispatch = useDispatch()
    const schema = yup.object().shape({
        code: yup.string().required(t("required_product_code")),
        name: yup.string().required(t("required_product_name")),
        stockQuantity: yup
            .string()
            .required(t("required_product_count_in_stock"))
            .matches(/^\d+$/, t("must_be_number"))
            .test("least_count", t("at_least_count_product"), (value) => Number(value) >= 1),
        ingredient: yup.string().required(t("required_ingredient")),
        uses: yup.string().required(t("required_uses")),
        usageGuide: yup.string().required(t("required_usage_guide")),
        brandId: yup.string().required(t("required_brand")),
        categoryId: yup.string().required(t("required_product_category")),
        discount: yup.string().notRequired()
            .test('least_discount', t('at_least_discount'), (value, context) => {
                const startDate = context?.parent?.startDate
                const endDate = context?.parent?.endDate
                if (value) {
                    if (!startDate) {
                        setError('startDate', {
                            message: t('required_start_discount_date'),
                            type: 'required_start_discount'
                        })
                    }
                    if (!endDate) {
                        setError('endDate', {
                            message: t('required_end_discount_date'),
                            type: 'required_end_discount'
                        })
                    }
                } else {
                    clearErrors('startDate')
                    clearErrors('endDate')
                }

                return !value || Number(value) >= 1
            }),
        startDate: yup.date().notRequired()
            .test('required_start_discount', t('required_start_discount_date'), (value, context) => {
                const discount = context?.parent?.discount
                return !discount || (value && discount)
            })
            .test('less_start_discount', t('less_start_discount_date'), (value, context: any) => {
                const endDate = context?.parent?.endDate
                if (value && endDate && endDate.getTime() > value?.getTime()) {
                    clearErrors("endDate")
                }
                return !endDate || (endDate && value && endDate.getTime() > value?.getTime())
            }),
        endDate: yup.date().notRequired()
            .test('required_end_discount', t('required_end_discount_date'), (value, context: any) => {
                const startDate = context?.parent?.startDate
                return !startDate || (startDate && value)
            })
            .test('greater_start_discount', t('greater_start_discount_date'), (value, context: any) => {
                const startDate = context?.parent?.startDate
                if (value && startDate && startDate.getTime() < value?.getTime()) {
                    clearErrors("startDate")
                }
                return !startDate || (startDate && value && startDate.getTime() < value?.getTime())
            }),
        status: yup.number().required(t('required_product_status')),
        price: yup.string().required("required_product_price")
            .test('least_price', t('at_least_price_product'), (value) => Number(value) >= 1000),
        images: yup
            .array()
            .of(
                yup.object().shape({
                    imageBase64: yup.string().required(t("required_image")),
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
        code: "",
        name: "",
        stockQuantity: "",
        price: "",
        discount: "",
        ingredient: "",
        uses: "",
        usageGuide: "",
        brandId: "",
        categoryId: "",
        status: 0,
        startDate: null,
        endDate: null,
        images: [],
    };

    const { handleSubmit, getValues, setError, setValue, clearErrors, control, formState: { errors }, reset } = useForm<TDefaultValues>({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    });


    const onSubmit = (data: TDefaultValues) => {
        const payload: TParamsCreateProduct = {
            code: data.code,
            name: data.name,
            stockQuantity: Number(data.stockQuantity),
            price: Number(data.price),
            discount: data.discount ? Number(data.discount) : 0,
            ingredient: data.ingredient,
            uses: data.uses,
            usageGuide: data.usageGuide,
            brandId: Number(data.brandId),
            categoryId: Number(data.categoryId),
            status: data.status,
            startDate: data.startDate ? data.startDate.toISOString() : new Date().toISOString(),
            endDate: data.endDate ? data.endDate.toISOString() : new Date().toISOString(),
            images: productImages,
        }
        if (idProduct) {
            dispatch(updateProductAsync({ id: idProduct, ...payload }));
        } else {
            dispatch(createProductAsync(payload));
        }
    }

    //handler
    const handleUploadProductImage = async (file: File) => {
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
        const updatedImages = [...productImages, newImage];
        setProductImages(updatedImages);
        setValue("images", updatedImages);
    };

    const fetchDetailProduct = async (id: string) => {
        setLoading(true);
        try {
            const res = await getProductDetail(id);
            const data = res?.data;
            if (data) {
                reset({
                    code: data.code,
                    name: data.name,
                    stockQuantity: data.stockQuantity.toString(),
                    price: data.price.toString(),
                    discount: data.discount.toString(),
                    ingredient: data.ingredient,
                    uses: data.uses,
                    usageGuide: data.usageGuide,
                    brandId: data.brandId.toString(),
                    categoryId: data.categoryId.toString(),
                    status: data.status,
                    startDate: data.startDate ? new Date(data.startDate) : null,
                    endDate: data.endDate ? new Date(data.endDate) : null,
                    images: data.images,
                });
                setProductImages(data.images);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    const fetchAllCategories = async () => {
        setLoading(true)
        await getAllProductCategories({
            params: {
                take: -1,
                skip: 0,
                filters: '',
                orderBy: 'createdDate',
                dir: 'asc',
                paging: false,
                keywords: "''",
            } as TParamsGetAllProductCategories,
        }).then((res) => {
            const data = res?.result?.subset
            if (data) {
                setCategoryOptions(data?.map((item: { name: string, id: string }) => ({
                    label: item.name,
                    value: item.id
                })))
            }
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
        })
    }


    useEffect(() => {
        if (!open) {
            reset({
                ...defaultValues
            })
            setProductImages([])
        } else {
            if (idProduct && open) {
                fetchDetailProduct(idProduct)
            }
        }
    }, [open, idProduct])

    useEffect(() => {
        fetchAllCategories()
    }, [])

    return (
        <>
            {loading && <Spinner />}
            <CustomModal open={open} onClose={onClose}>
                <Box
                    sx={{
                        backgroundColor: theme.palette.customColors.bodyBg,
                        padding: '20px',
                        borderRadius: '15px',
                    }}
                    minWidth={{ md: '800px', xs: '80vw' }}
                    maxWidth={{ md: '80vw', xs: '80vw' }}
                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        paddingBottom: '20px'
                    }}>
                        <Typography variant="h4" sx={{ fontWeight: 600 }}>
                            {idProduct ? t('update_product') : t('create_product')}
                        </Typography>
                        <IconButton sx={{
                            position: 'absolute',
                            right: "-10px",
                            top: "-6px",
                        }}>
                            <IconifyIcon
                                icon="material-symbols-light:close-rounded"
                                fontSize={"30px"}
                                onClick={onClose}
                            />
                        </IconButton>
                    </Box>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate >
                        <Box
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: "15px",
                                py: 5, px: 4
                            }}>
                            <Grid container
                                spacing={4}
                            >
                                <Grid container item md={6} xs={12}>
                                    <Box sx={{
                                        width: "100%",
                                        height: "100%",
                                    }}>
                                        <Grid container spacing={4}>
                                            <Grid item md={12} xs={12}>
                                                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                                                    {productImages.length > 0 && (
                                                        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                                                            {productImages.map((img, index) => (
                                                                <Box key={index} sx={{ position: "relative" }}>
                                                                    <Avatar
                                                                        src={`data:image/${img.typeImage};base64,${img.imageBase64}`}
                                                                        sx={{ width: 100, height: 100 }}
                                                                        alt={`product-image-${index}`}
                                                                    />
                                                                    <IconButton
                                                                        sx={{ position: "absolute", bottom: -4, right: -6, color: theme.palette.error.main }}
                                                                        onClick={() => setProductImages((prev) => prev.filter((_, i) => i !== index))}
                                                                    >
                                                                        <IconifyIcon icon="material-symbols:delete-rounded" />
                                                                    </IconButton>
                                                                </Box>
                                                            ))}
                                                        </Box>
                                                    )}
                                                    <FileUploadWrapper
                                                        uploadFile={handleUploadProductImage}
                                                        objectAcceptedFile={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] }}
                                                    >
                                                        <Button variant="outlined" sx={{ width: "auto", display: "flex", alignItems: "center", gap: 1 }}>
                                                            <IconifyIcon icon="ph:camera-thin" />
                                                            {t("upload_product_image")}
                                                        </Button>
                                                    </FileUploadWrapper>
                                                </Box>
                                            </Grid>

                                            <Grid item md={12} xs={12}>
                                                <Controller
                                                    control={control}
                                                    name="code"
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            required
                                                            label={t("product_code")}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value}
                                                            placeholder={t('enter_product_code')}
                                                            error={errors.code ? true : false}
                                                            helperText={errors.code?.message}
                                                        />
                                                    )}
                                                />
                                            </Grid>

                                            <Grid item md={12} xs={12} >
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            required
                                                            label={t('product_name')}
                                                            onChange={(e) => {
                                                                const value = e.target.value
                                                                const replacedValue = stringToSlug(value)
                                                                onChange(value)
                                                                reset({
                                                                    ...getValues(),
                                                                    // slug: replacedValue
                                                                })
                                                            }}
                                                            onBlur={onBlur}
                                                            value={value}
                                                            placeholder={t('enter_product_name')}
                                                            error={errors.name ? true : false}
                                                            helperText={errors.name?.message}
                                                        />
                                                    )}
                                                    name='name'
                                                />
                                            </Grid>

                                            {/* <Grid item md={12} xs={12} >
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomTextField
                                                            fullWidth

                                                            disabled
                                                            required
                                                            label={t('slug')}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value}
                                                            placeholder={t('enter_slug')}
                                                            error={errors.slug ? true : false}
                                                            helperText={errors.slug?.message}
                                                        />
                                                    )}
                                                    name='slug'
                                                />
                                            </Grid> */}

                                            <Grid item md={6} xs={12} >
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => {
                                                        return (
                                                            <Box sx={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: 4
                                                            }}>
                                                                <InputLabel sx={{
                                                                    fontSize: "13px",
                                                                    mb: "4px",
                                                                    display: "block",
                                                                    color: `rgba(${theme.palette.customColors.main}, 0.42)`
                                                                }}>
                                                                    {t('status')}
                                                                </InputLabel>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={Boolean(value)}
                                                                            value={value}
                                                                            onChange={
                                                                                (e) => onChange(e.target.checked ? 1 : 0)
                                                                            }
                                                                            sx={{
                                                                                '& .MuiSwitch-switchBase': {
                                                                                    color: theme.palette.common.white,
                                                                                },
                                                                                '& .MuiSwitch-switchBase.Mui-checked': {
                                                                                },
                                                                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                                                    backgroundColor: theme.palette.primary.main,
                                                                                },
                                                                                '& .MuiSwitch-track': {
                                                                                    backgroundColor: theme.palette.grey[400],
                                                                                },
                                                                            }}
                                                                        />
                                                                    }
                                                                    label={Boolean(value) ? t('public') : t('private')}
                                                                    sx={{
                                                                        '& .MuiFormControlLabel-label': {
                                                                            color: theme.palette.text.primary,
                                                                        }
                                                                    }}
                                                                />
                                                            </Box>
                                                        )
                                                    }}
                                                    name='status'
                                                />
                                            </Grid>

                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid container item md={6} xs={12} >
                                    <Box>
                                        <Grid container spacing={5}>

                                            <Grid item md={6} xs={12} >
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            required
                                                            label={t('price')}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value}
                                                            placeholder={t('enter_product_price')}
                                                            error={errors.price ? true : false}
                                                            helperText={errors.price?.message}
                                                        />
                                                    )}
                                                    name='price'
                                                />
                                            </Grid>

                                            <Grid item md={6} xs={12} >
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            required
                                                            label={t('discount')}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value}
                                                            placeholder={t('enter_product_discount')}
                                                            error={errors.discount ? true : false}
                                                            helperText={errors.discount?.message}
                                                        />
                                                    )}
                                                    name='discount'
                                                />
                                            </Grid>

                                            <Grid item md={6} xs={12} >
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomDatePicker
                                                            required
                                                            onChange={(date: Date | null) => {
                                                                onChange(date);
                                                            }}
                                                            label={t('discount_start_date')}
                                                            onBlur={onBlur}
                                                            minDate={new Date()}
                                                            selectedDate={value && !isNaN(new Date(value).getTime()) ? new Date(value) : null}
                                                            placeholder={t('select_discount_start_date')}
                                                            error={errors.startDate ? true : false}
                                                            helperText={errors.startDate?.message}
                                                        />
                                                    )}
                                                    name='startDate'
                                                />
                                            </Grid>

                                            <Grid item md={6} xs={12} >
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomDatePicker
                                                            required
                                                            onChange={(date: Date | null) => {
                                                                onChange(date);
                                                            }}
                                                            label={t('discount_end_date')}
                                                            onBlur={onBlur}
                                                            minDate={new Date()}
                                                            selectedDate={value && !isNaN(new Date(value).getTime()) ? new Date(value) : null}
                                                            placeholder={t('select_discount_start_date')}
                                                            error={errors.endDate ? true : false}
                                                            helperText={errors.endDate?.message}
                                                        />
                                                    )}
                                                    name='endDate'
                                                />
                                            </Grid>

                                            <Grid item md={6} xs={12} >
                                                <Controller
                                                    control={control}
                                                    name='stockQuantity'
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            label={t('stock_quantity')}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value}
                                                            placeholder={t('enter_product_stock_quantity')}
                                                            helperText={errors.stockQuantity?.message}
                                                        />
                                                    )}
                                                />
                                            </Grid>

                                            <Grid item md={6} xs={12} >
                                                <Controller
                                                    control={control}
                                                    name='categoryId'
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <Box>
                                                            <InputLabel sx={{
                                                                fontSize: "13px",
                                                                mb: "4px",
                                                                display: "block",
                                                                color: errors?.categoryId ? theme.palette.error.main : `rgba(${theme.palette.customColors.main}, 0.68)`
                                                            }}>
                                                                {t('category')}
                                                            </InputLabel>
                                                            <CustomSelect
                                                                fullWidth
                                                                onChange={onChange}
                                                                onBlur={onBlur}
                                                                value={value}
                                                                options={categoryOptions}
                                                                placeholder={t('select_product_category')}
                                                                error={errors.categoryId ? true : false}
                                                            />
                                                            {errors?.categoryId?.message && (
                                                                <FormHelperText sx={{
                                                                    color: errors?.categoryId ? theme.palette.error.main : `rgba(${theme.palette.customColors.main}, 0.68)`
                                                                }}>
                                                                    {errors?.categoryId?.message}
                                                                </FormHelperText>
                                                            )}
                                                        </Box>
                                                    )}
                                                />
                                            </Grid>

                                            <Grid item md={6} xs={12} >
                                                <Controller
                                                    control={control}
                                                    name='brandId'
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <Box>
                                                            <InputLabel sx={{
                                                                fontSize: "13px",
                                                                mb: "4px",
                                                                display: "block",
                                                                color: errors?.brandId ? theme.palette.error.main : `rgba(${theme.palette.customColors.main}, 0.68)`
                                                            }}>
                                                                {t('brand')}
                                                            </InputLabel>
                                                            <CustomSelect
                                                                fullWidth
                                                                onChange={onChange}
                                                                onBlur={onBlur}
                                                                value={value}
                                                                options={brandOption}
                                                                placeholder={t('select_product_category')}
                                                                error={errors.brandId ? true : false}
                                                            />
                                                            {errors?.brandId?.message && (
                                                                <FormHelperText sx={{
                                                                    color: errors?.brandId ? theme.palette.error.main : `rgba(${theme.palette.customColors.main}, 0.68)`
                                                                }}>
                                                                    {errors?.brandId?.message}
                                                                </FormHelperText>
                                                            )}
                                                        </Box>
                                                    )}
                                                />
                                            </Grid>

                                            <Grid item md={6} xs={12} >
                                                <Controller
                                                    control={control}
                                                    name='ingredient'
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            label={t('ingredient')}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value}
                                                            placeholder={t('enter_product_ingredient')}
                                                            helperText={errors.ingredient?.message}
                                                        />
                                                    )}
                                                />
                                            </Grid>

                                            <Grid item md={6} xs={12} >
                                                <Controller
                                                    control={control}
                                                    name='uses'
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            label={t('uses')}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value}
                                                            placeholder={t('enter_product_uses')}
                                                            helperText={errors.uses?.message}
                                                        />
                                                    )}
                                                />
                                            </Grid>

                                            <Grid item md={6} xs={12} >
                                                <Controller
                                                    control={control}
                                                    name='usageGuide'
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            label={t('usageGuide')}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value}
                                                            placeholder={t('enter_product_usageGuide')}
                                                            helperText={errors.usageGuide?.message}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>
                                {idProduct ? t('update') : t('create')}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </CustomModal>
        </>
    )
}

export default CreateUpdateProduct