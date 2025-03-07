//react
import { useEffect, useState } from "react"

//form
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import * as yup from 'yup';

//Mui
import { Box, Button, FormHelperText, Grid, IconButton, Typography } from "@mui/material"
import { useTheme } from "@mui/material"

//components
import CustomModal from "src/components/custom-modal"
import IconifyIcon from "src/components/Icon"
import Spinner from "src/components/spinner"
import CustomTextField from "src/components/text-field"

//services
import { getAllProductCategories, getProductCategoryDetail } from "src/services/product-category"

//translation
import { useTranslation } from "react-i18next"
//redux
import { useDispatch } from "react-redux"
import { AppDispatch } from "src/stores"
import { createProductCategoryAsync, updateProductCategoryAsync } from "src/stores/product-category/action"
import { stringToSlug } from "src/utils";
import { InputLabel } from "@mui/material";
import CustomSelect from "src/components/custom-select";

interface TCreateUpdateProductCategory {
    open: boolean
    onClose: () => void
    id?: string
}

type TDefaultValues = {
    name: string,
    code: string,
    parentId: string,
    parentName: string,
    level: number
    // slug: string
}

const CreateUpdateProductCategory = (props: TCreateUpdateProductCategory) => {

    //state
    const [loading, setLoading] = useState(false)
    const [parentOptions, setParentOptions] = useState<{ label: string, value: string }[]>([])

    //props
    const { open, onClose, id } = props

    //translation
    const { t, i18n } = useTranslation()

    //theme
    const theme = useTheme()

    //redux
    const dispatch: AppDispatch = useDispatch()

    const schema = yup.object().shape({
        name: yup.string().required(t("required_product_category_name")),
        code: yup.string().required(t("required_product_category_code")),
        parentId: yup.string().required(t("required_product_category_parent_code")),
        parentName: yup.string().required(t("required_product_category_parent")),
        level: yup.number().required(t("required_product_category_level")),
        // slug: yup.string().required("Product category slug is required")
    });

    const defaultValues: TDefaultValues = {
        name: '',
        code: '',
        parentId: '',
        parentName: '',
        level: 0
        // slug: ''
    }

    const { handleSubmit, getValues, setValue, control, formState: { errors }, reset } = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    });


    const onSubmit = (data: TDefaultValues) => {
        if (!Object.keys(errors)?.length) {
            if (id) {
                //update
                dispatch(updateProductCategoryAsync({
                    name: data?.name,
                    code: data?.code,
                    parentId: data?.parentId,
                    parentName: data?.parentName,
                    level: data?.level,
                    id: id,
                    // slug: data?.slug
                }))
            } else {
                //create
                dispatch(createProductCategoryAsync({
                    name: data?.name,
                    code: data?.code,
                    parentId: data?.parentId,
                    parentName: data?.parentName,
                    level: data?.level,
                    // slug: data?.slug
                }))
            }
        }
    }


    const fetchDetailProductCategory = async (id: string) => {
        setLoading(true)
        await getProductCategoryDetail(id).then((res) => {
            const data = res?.result
            if (data) {
                reset({
                    name: data?.name,
                    code: data?.code,
                    parentId: data?.parentId,
                    parentName: data?.parentName,
                    level: data?.level,
                    // slug: data?.slug
                })
            }
            setLoading(false)
        }).catch((e) => {
            setLoading(false)
        })
    }

    const fetchAllCategories = async () => {
        setLoading(true)
        await getAllProductCategories({
            params: {
                take: -1,
                skip: 0,
                paging: false,
                orderBy: "name",
                dir: "asc",
                keywords: "''",
                filters: ""
            }
        }).then((res) => {
            const data = res?.result?.subset
            if (data) {
                setParentOptions(data?.map((item: { name: string, id: string }) => ({
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
        fetchAllCategories()
    }, [])


    useEffect(() => {
        if (!open) {
            reset({
                ...defaultValues
            })
        } else {
            if (id && open) {
                fetchDetailProductCategory(id)
            }
        }
    }, [open, id])

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
                    minWidth={{ md: '500px', xs: '80vw' }}
                    maxWidth={{ md: '50vw', xs: '80vw' }}
                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        paddingBottom: '20px'
                    }}>
                        <Typography variant="h4" sx={{ fontWeight: 600 }}>
                            {id ? t('update_product_category') : t('create_product_category')}
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
                            <Grid container item md={12} xs={12} spacing={5}>
                                <Grid item md={12} xs={12} >
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <CustomTextField
                                                fullWidth
                                                required
                                                label={t('product_category_name')}
                                                onChange={(e) => {
                                                    const value = e.target.value
                                                    const replacedValue = stringToSlug(value)
                                                    onChange(value)
                                                    // reset({
                                                    //     ...getValues(),
                                                    //     slug: replacedValue
                                                    // })
                                                }}
                                                onBlur={onBlur}
                                                value={value}
                                                placeholder={t('enter_product_category_name')}
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

                                                required
                                                label={t('product_category_code')}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                placeholder={t('enter_product_category_code')}
                                                error={errors.code ? true : false}
                                                helperText={errors.code?.message}
                                            />
                                        )}
                                        name='code'
                                    />
                                </Grid>
                                <Grid item md={12} xs={12} >
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <CustomTextField
                                                fullWidth
                                                disabled
                                                required
                                                label={t('product_category_parent_id')}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                placeholder={t('enter_product_category_parent_id')}
                                                error={errors.parentId ? true : false}
                                                helperText={errors.parentId?.message}
                                            />
                                        )}
                                        name='parentId'
                                    />
                                </Grid>
                                <Grid item md={12} xs={12} >
                                    <Controller
                                        control={control}
                                        name='parentName'
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Box sx={{
                                                mt: -5
                                            }}>
                                                <InputLabel sx={{
                                                    fontSize: "13px",
                                                    mb: "4px",
                                                    display: "block",
                                                    color: errors?.parentName ? theme.palette.error.main : `rgba(${theme.palette.customColors.main}, 0.42)`
                                                }}>
                                                    {t('parent_name')}
                                                </InputLabel>
                                                <CustomSelect
                                                    fullWidth
                                                    onChange={(e) => {
                                                        const selectedParent = parentOptions.find(opt => opt.value === e.target.value);
                                                        if (selectedParent) {
                                                            onChange(selectedParent.value);
                                                            setValue('parentId', selectedParent.value);
                                                        } else {
                                                            onChange('');
                                                            setValue('parentId', '');
                                                        }
                                                    }}
                                                    onBlur={onBlur}
                                                    value={value || ''}
                                                    options={parentOptions}
                                                    placeholder={t('select_parent_name')}
                                                    error={errors.parentName ? true : false}
                                                />
                                                {errors?.parentName?.message && (
                                                    <FormHelperText sx={{
                                                        color: errors?.parentName ? theme.palette.error.main : `rgba(${theme.palette.customColors.main}, 0.42)`
                                                    }}>
                                                        {errors?.parentName?.message}
                                                    </FormHelperText>
                                                )}
                                            </Box>
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
                                                label={t('product_category_level')}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                placeholder={t('enter_product_category_level')}
                                                error={errors.level ? true : false}
                                                helperText={errors.level?.message}
                                            />
                                        )}
                                        name='level'
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
                            </Grid>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 3 }}>
                            <Button variant="outlined" sx={{ mt: 3, mb: 2, ml: 2, py: 1.5 }} onClick={onClose}>{t('cancel')}</Button>
                            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>
                                {id ? t('update') : t('create')}
                            </Button>
                        </Box>
                    </form >
                </Box >
            </CustomModal >
        </>
    )
}

export default CreateUpdateProductCategory