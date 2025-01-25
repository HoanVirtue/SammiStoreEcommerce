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
    slug: string
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
        name: yup.string().required("Product category name is required"),
        slug: yup.string().required("Product category slug is required")
    });

    const defaultValues: TDefaultValues = {
        name: '',
        slug: ''
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
                    id: idProductCategory,
                    slug: data?.slug
                }))
            } else {
                //create
                dispatch(createProductCategoryAsync({
                    name: data?.name,
                    slug: data?.slug
                }))
            }
        }
    }


    const fetchDetailProductCategory = async (id: string) => {
        setLoading(true)
        await getProductCategoryDetail(id).then((res) => {
            const data = res?.data
            if (data) {
                reset({
                    name: data?.name,
                    slug: data?.slug
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
                            <Grid container item md={12} xs={12} >
                                <Grid item md={12} xs={12} >
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <CustomTextField
                                                fullWidth
                                                autoFocus
                                                required
                                                label={t('product_category_name')}
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