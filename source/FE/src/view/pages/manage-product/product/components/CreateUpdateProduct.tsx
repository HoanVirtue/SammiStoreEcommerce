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

//services
import { getUserDetail } from "src/services/user"

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

interface TCreateUpdateProduct {
    open: boolean
    onClose: () => void
    idProduct?: string
}

type TDefaultValues = {
    name: string,
    category: string,
    discount?: string | null,
    price: string,
    description: EditorState,
    slug: string,
    countInStock: string,
    status: number,
    discountStartDate?: Date | null,
    discountEndDate?: Date | null,
}

const CreateUpdateProduct = (props: TCreateUpdateProduct) => {

    //state
    const [loading, setLoading] = useState(false)
    const [productImage, setProductImage] = useState("")
    const [categoryOptions, setCategoryOptions] = useState<{ label: string, value: string }[]>([])

    //props
    const { open, onClose, idProduct } = props

    //translation
    const { t, i18n } = useTranslation()

    //theme
    const theme = useTheme()

    //redux
    const dispatch: AppDispatch = useDispatch()

    const schema = yup.object().shape({
        name: yup.string().required("Product name is required"),
        slug: yup.string().required("Product slug is required"),
        category: yup.string().required("Product category is required"),
        countInStock: yup.string().required("countInStock is required")
            .test('least_count', t('at_least_count'), (value) => Number(value) >= 1),
        discount: yup.string().notRequired()
            .test('least_discount', t('at_least_discount'), (value, context) => {
                const discountStartDate = context?.parent?.discountStartDate
                const discountEndDate = context?.parent?.discountEndDate
                if (value) {
                    if (!discountStartDate) {
                        setError('discountStartDate', {
                            message: t('required_start_discount'),
                            type: 'required_start_discount'
                        })
                    }
                    if (!discountEndDate) {
                        setError('discountEndDate', {
                            message: t('required_end_discount'),
                            type: 'required_end_discount'
                        })
                    }
                } else {
                    clearErrors('discountStartDate')
                    clearErrors('discountEndDate')
                }

                return !value || Number(value) >= 1
            }),
        discountStartDate: yup.date().notRequired()
            .test('required_start_discount', t('required_start_discount'), (value, context) => {
                const discount = context?.parent?.discount
                return !discount || (value && discount)
            })
            .test('less_start_discount', t('less_start_discount'), (value, context: any) => {
                const discountEndDate = context?.parent?.discountEndDate
                if (value && discountEndDate && discountEndDate.getTime() > value?.getTime()) {
                    clearErrors("discountEndDate")
                }
                return !discountEndDate || (discountEndDate && value && discountEndDate.getTime() > value?.getTime())
            }),
        discountEndDate: yup.date().notRequired()
            .test('required_end_discount', t('required_end_discount'), (value, context: any) => {
                const discountStartDate = context?.parent?.discountStartDate
                return !discountStartDate || (discountStartDate && value)
            })
            .test('greater_start_discount', t('greater_start_discount'), (value, context: any) => {
                const discountStartDate = context?.parent?.discountStartDate
                if (value && discountStartDate && discountStartDate.getTime() < value?.getTime()) {
                    clearErrors("discountStartDate")
                }
                return !discountStartDate || (discountStartDate && value && discountStartDate.getTime() < value?.getTime())
            }),
        status: yup.number().required("Product status is required"),
        description: yup.mixed<EditorState>().required("Product description is required"),
        price: yup.string().required("Product price is required")
            .test('least_price', t('at_least_price'), (value) => Number(value) >= 1000),
    });

    const defaultValues: TDefaultValues = {
        name: '',
        category: '',
        discount: '',
        price: '',
        description: EditorState.createEmpty(),
        slug: '',
        countInStock: '',
        status: 0,
        discountStartDate: null,
        discountEndDate: null,
    }

    const { handleSubmit, getValues, setError, clearErrors, control, formState: { errors }, reset } = useForm<TDefaultValues>({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    });


    const onSubmit = (data: TDefaultValues) => {
        if (!Object.keys(errors)?.length) {
            if (idProduct) {
                //update
                dispatch(updateProductAsync({
                    id: idProduct,
                    name: data?.name,
                    type: data?.category,
                    discount: Number(data?.discount) || 0,
                    description: data?.description ? draftToHtml(convertToRaw(data?.description.getCurrentContent())) : "",
                    slug: data?.slug,
                    price: Number(data?.price),
                    countInStock: Number(data?.countInStock),
                    status: data?.status ? 1 : 0,
                    discountStartDate: data?.discountStartDate instanceof Date ? data.discountStartDate : null,
                    discountEndDate: data?.discountEndDate instanceof Date ? data.discountEndDate : null,
                    image: productImage
                }))
            } else {
                //create
                dispatch(createProductAsync({
                    name: data?.name,
                    type: data?.category,
                    discount: Number(data?.discount) || 0,
                    description: data?.description ? draftToHtml(convertToRaw(data?.description.getCurrentContent())) : "",
                    slug: data?.slug,
                    price: Number(data?.price),
                    countInStock: Number(data?.countInStock),
                    status: data?.status ? 1 : 0,
                    discountStartDate: data?.discountStartDate instanceof Date ? data.discountStartDate : null,
                    discountEndDate: data?.discountEndDate instanceof Date ? data.discountEndDate : null,
                    image: productImage
                }))
            }
        }
    }

    //handler
    const handleUploadProductImage = async (file: File) => {
        const base64 = await convertBase64(file)
        setProductImage(base64 as string)
    }

    const fetchDetailProduct = async (id: string) => {
        setLoading(true)
        await getProductDetail(id).then((res) => {
            const data = res?.data
            if (data) {
                reset({
                    name: data?.name,
                    category: data?.type,
                    discount: data?.discount || '',
                    price: data?.price,
                    description: data?.description ? convertHTMLToDraft(data?.description) : '',
                    slug: data?.slug,
                    countInStock: data?.countInStock,
                    status: data?.status,
                    discountStartDate: data?.discountStartDate ? new Date(data.discountStartDate) : null,
                    discountEndDate: data?.discountEndDate ? new Date(data.discountEndDate) : null,
                })
                setProductImage(data?.image)
            }
            setLoading(false)
        }).catch((e) => {
            setLoading(false)
        })
    }

    const fetchAllProductCategories = async () => {
        setLoading(true)
        await getAllProductCategories({ params: { limit: -1, page: -1, search: '', order: '' } }).then((res) => {
            const data = res?.data?.productTypes
            if (data) {
                setCategoryOptions(data?.map((item: { name: string, _id: string }) => ({
                    label: item.name,
                    value: item._id
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
            setProductImage("")
        } else {
            if (idProduct && open) {
                fetchDetailProduct(idProduct)
            }
        }
    }, [open, idProduct])

    useEffect(() => {
        fetchAllProductCategories()
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
                                                <Box sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    flexDirection: "column",
                                                    gap: 2,
                                                }}>
                                                    <Box sx={{
                                                        position: "relative",
                                                    }}>
                                                        {productImage && (
                                                            <IconButton
                                                                sx={{
                                                                    position: "absolute",
                                                                    bottom: -4,
                                                                    right: -6,
                                                                    zIndex: 2,
                                                                    color: theme.palette.error.main
                                                                }}
                                                                edge="start"
                                                                color="inherit"
                                                                aria-label="delete-avatar"
                                                                onClick={() => setProductImage('')}
                                                            >
                                                                <IconifyIcon icon="material-symbols:delete-rounded" />
                                                            </IconButton>
                                                        )}
                                                        {productImage ? (
                                                            <Avatar src={productImage} alt="productImage" sx={{ width: 100, height: 100 }}>
                                                                <IconifyIcon icon="fluent-mdl2:product-variant" fontSize={70} />
                                                            </Avatar>
                                                        ) : (
                                                            <Avatar alt="default-product-image" sx={{ width: 100, height: 100 }}>
                                                                <IconifyIcon icon="fluent-mdl2:product-variant" fontSize={70} />
                                                            </Avatar>
                                                        )}
                                                    </Box>
                                                    <FileUploadWrapper uploadFile={handleUploadProductImage} objectAcceptedFile={{
                                                        "image/jpeg": [".jpg", ".jpeg"],
                                                        "image/png": [".png"]
                                                    }}>
                                                        <Button variant="outlined" sx={{
                                                            width: "auto",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            gap: 1
                                                        }}>
                                                            <IconifyIcon icon="ph:camera-thin" />
                                                            {productImage ? t('change_product_image') : t('upload_product_image')}
                                                        </Button>
                                                    </FileUploadWrapper>
                                                </Box>
                                            </Grid>
                                            <Grid item md={12} xs={12} >
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            autoFocus
                                                            required
                                                            label={t('product_name')}
                                                            onChange={(e) => {
                                                                const value = e.target.value
                                                                const replacedValue = stringToSlug(value)
                                                                onChange(value)
                                                                reset({
                                                                    ...getValues(),
                                                                    slug: replacedValue
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
                                            <Grid item md={12} xs={12} >
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            autoFocus
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
                                            </Grid>
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
                                                    name='countInStock'
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            label={t('count_in_stock')}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value}
                                                            placeholder={t('enter_product_count_in_stock')}
                                                            helperText={errors.countInStock?.message}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12} >
                                                <Controller
                                                    control={control}
                                                    name='category'
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <Box>
                                                            <InputLabel sx={{
                                                                fontSize: "13px",
                                                                mb: "4px",
                                                                display: "block",
                                                                color: errors?.category ? theme.palette.error.main : `rgba(${theme.palette.customColors.main}, 0.68)`
                                                            }}>
                                                                {t('category')}
                                                            </InputLabel>
                                                            <CustomSelect
                                                                fullWidth
                                                                onChange={onChange}
                                                                onBlur={onBlur}
                                                                value={value}
                                                                options={categoryOptions}
                                                                placeholder={t('Select_product_category')}
                                                                error={errors.category ? true : false}
                                                            />
                                                            {errors?.category?.message && (
                                                                <FormHelperText sx={{
                                                                    color: errors?.category ? theme.palette.error.main : `rgba(${theme.palette.customColors.main}, 0.68)`
                                                                }}>
                                                                    {errors?.category?.message}
                                                                </FormHelperText>
                                                            )}
                                                        </Box>
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12} >
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            label={t('discount_percent')}
                                                            onChange={(e) => {
                                                                const numberValue = e.target.value.replace(/\D/g, '');
                                                                onChange(numberValue);
                                                            }}
                                                            onBlur={onBlur}
                                                            inputProps={{
                                                                inputMode: 'numeric',
                                                                pattern: '[0-9]*',
                                                                minLength: 1
                                                            }}
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
                                                            placeholder={t('Select_discount_start_date')}
                                                            error={errors.discountStartDate ? true : false}
                                                            helperText={errors.discountStartDate?.message}
                                                        />
                                                    )}
                                                    name='discountStartDate'
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
                                                            selectedDate={value && !isNaN(new Date(value).getTime()) ? new Date(value) : null}
                                                            placeholder={t('Select_discount_end_date')}
                                                            error={errors.discountEndDate ? true : false}
                                                            helperText={errors.discountEndDate?.message}
                                                        />
                                                    )}
                                                    name='discountEndDate'
                                                />
                                            </Grid>
                                            <Grid item md={12} xs={12} >
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomEditor
                                                            label={t('description')}
                                                            onBlur={onBlur}
                                                            editorState={value as EditorState}
                                                            placeholder={t('Enter_your_description')}
                                                            error={errors.description ? true : false}
                                                            helperText={errors.description?.message}
                                                            onEditorStateChange={onChange}
                                                        />
                                                    )}
                                                    name='description'
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>
                                {idProduct ? t('Update') : t('Create')}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </CustomModal>
        </>
    )
}

export default CreateUpdateProduct