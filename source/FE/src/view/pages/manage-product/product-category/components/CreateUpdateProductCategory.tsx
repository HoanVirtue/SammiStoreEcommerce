//react
import { useEffect, useState } from "react"

//form
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import * as yup from 'yup';

//Mui
import { Box, Button, Grid, IconButton, Typography } from "@mui/material"
import { useTheme } from "@mui/material"

//components
import CustomModal from "src/components/custom-modal"
import IconifyIcon from "src/components/Icon"
import Spinner from "src/components/spinner"
import CustomTextField from "src/components/text-field"

//services
import { getProductCategoryDetail } from "src/services/product-category"

//translation
import { useTranslation } from "react-i18next"
//redux
import { useDispatch } from "react-redux"
import { AppDispatch } from "src/stores"
import { createProductCategoryAsync, updateProductCategoryAsync } from "src/stores/product-category/action"
import { stringToSlug } from "src/utils";

interface TCreateUpdateProductCategory {
    open: boolean
    onClose: () => void
    idProductCategory?: string
}

type TDefaultValues = {
    name: string,
    code: string,
    parentId: number,
    level: number
    // slug: string
}

const CreateUpdateProductCategory = (props: TCreateUpdateProductCategory) => {

    //state
    const [loading, setLoading] = useState(false)

    //props
    const { open, onClose, idProductCategory } = props

    //translation
    const { t, i18n } = useTranslation()

    //theme
    const theme = useTheme()

    //redux
    const dispatch: AppDispatch = useDispatch()

    const schema = yup.object().shape({
        name: yup.string().required(t("required_product_category_name")),
        code: yup.string().required(t("required_product_category_code")),
        parentId: yup.number().required(t("required_product_category_parent_id")),
        level: yup.number().required(t("required_product_category_level")),
        // slug: yup.string().required("Product category slug is required")
    });

    const defaultValues: TDefaultValues = {
        name: '',
        code: '',
        parentId: 0,
        level: 0
        // slug: ''
    }

    const { handleSubmit, getValues, control, formState: { errors }, reset } = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    });


    const onSubmit = (data: TDefaultValues) => {
        if (!Object.keys(errors)?.length) {
            if (idProductCategory) {
                //update
                dispatch(updateProductCategoryAsync({
                    name: data?.name,
                    code: data?.code,
                    parentId: data?.parentId,
                    level: data?.level,
                    id: idProductCategory,
                    // slug: data?.slug
                }))
            } else {
                //create
                dispatch(createProductCategoryAsync({
                    name: data?.name,
                    code: data?.code,
                    parentId: data?.parentId,
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
                    level: data?.level,
                    // slug: data?.slug
                })
            }
            setLoading(false)
        }).catch((e) => {
            setLoading(false)
        })
    }


    useEffect(() => {
        if (!open) {
            reset({
                ...defaultValues
            })
        } else {
            if (idProductCategory && open) {
                fetchDetailProductCategory(idProductCategory)
            }
        }
    }, [open, idProductCategory])

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
                            {idProductCategory ? t('update_product_category') : t('create_product_category')}
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
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>
                                {idProductCategory ? t('update') : t('create')}
                            </Button>
                        </Box>
                    </form >
                </Box >
            </CustomModal >
        </>
    )
}

export default CreateUpdateProductCategory