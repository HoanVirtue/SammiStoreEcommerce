//react
import { useEffect, useState } from "react"

//form
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import * as yup from 'yup';

//Mui
import { Box, Button, Grid, IconButton, InputAdornment, Rating, Typography } from "@mui/material"
import { useTheme } from "@mui/material"

//components
import CustomModal from "src/components/custom-modal"
import IconifyIcon from "src/components/Icon"
import Spinner from "src/components/spinner"
import CustomTextField from "src/components/text-field"

//services
import { getReviewDetail } from "src/services/review";

//translation
import { useTranslation } from "react-i18next"

//redux
import { useDispatch } from "react-redux"
import { AppDispatch } from "src/stores"
import CustomTextArea from "src/components/text-area";
import { createReviewAsync } from "src/stores/review/action";

interface TWriteReviewModal {
    open: boolean
    onClose: () => void
    productId?: number
    userId?: number
}

type TDefaultValues = {
    content: string,
    star: number
}

const WriteReviewModal = (props: TWriteReviewModal) => {

    //state
    const [loading, setLoading] = useState(false)

    //props
    const { open, onClose, userId, productId } = props

    //translation
    const { t, i18n } = useTranslation()

    //theme
    const theme = useTheme()

    //redux
    const dispatch: AppDispatch = useDispatch()

    const schema = yup.object().shape({
        content: yup.string().required(t("required_content")),
        star: yup.number().required(t("required_star")),
    });

    const defaultValues: TDefaultValues = {
        content: '',
        star: 0
    }

    const { handleSubmit, getValues, setError, clearErrors, control, formState: { errors }, reset } = useForm<TDefaultValues>({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    });


    const onSubmit = (data: TDefaultValues) => {
        if (!Object.keys(errors)?.length) {
            //update 
            if (productId && userId) {
                dispatch(createReviewAsync({
                    productId: productId,
                    user: userId,
                    content: data?.content,
                    star: data?.star,
                }))
            }
        }
    }

    //handler

    useEffect(() => {
        if (!open) {
            reset({
                ...defaultValues
            })
        }
    }, [open])

    return (
        <>
            {loading && <Spinner />}
            <CustomModal open={open} onClose={onClose}>
                <Box
                    sx={{
                        backgroundColor: theme.palette.customColors.bodyBg,
                        padding: '20px',
                        bReviewRadius: '15px',
                    }}
                    minWidth={{ md: '40px', xs: '80vw' }}
                    maxWidth={{ md: '40vw', xs: '80vw' }}
                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        paddingBottom: '20px'
                    }}>
                        <Typography variant="h4" sx={{ fontWeight: 600 }}>
                            {t('update_review')}
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
                                bReviewRadius: "15px",
                                py: 5, px: 4
                            }}>
                            <Grid container
                                spacing={4}
                            >
                                <Grid container item md={12} xs={12}>
                                    <Box sx={{
                                        width: "100%",
                                        height: "100%",
                                    }}>
                                        <Grid container spacing={4}>
                                            <Grid item md={12} xs={12} >
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <Rating name="rating" defaultValue={0} value={+value} onChange={(e: any)=>{
                                                            onChange(e.target.value)
                                                        }} precision={0.1} />
                                                    )}
                                                    name='star'
                                                />
                                            </Grid>
                                            <Grid item md={12} xs={12} >
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomTextArea
                                                            required
                                                            label={t('content')}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value}
                                                            placeholder={t('enter_content')}
                                                            error={errors.content ? true : false}
                                                            helperText={errors.content?.message}
                                                            minRows={3}
                                                            maxRows={3}
                                                        />
                                                    )}
                                                    name='content'
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>
                                {t('confirm')}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </CustomModal>
        </>
    )
}

export default WriteReviewModal