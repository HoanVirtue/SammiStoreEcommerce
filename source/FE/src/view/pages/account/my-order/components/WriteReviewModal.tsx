//react
import { useEffect, useState } from "react"

//form
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import * as yup from 'yup';

//Mui
import { Box, Button, Grid, IconButton, InputAdornment, Rating, Typography, Paper } from "@mui/material"
import { useTheme } from "@mui/material"

//components
import CustomModal from "src/components/custom-modal"
import IconifyIcon from "src/components/Icon"
import Spinner from "src/components/spinner"
import CustomTextField from "src/components/text-field"
import FileUploadWrapper from "src/components/file-upload-wrapper"
import CustomTextArea from "src/components/text-area"

//services
import { getReviewDetail } from "src/services/review";

//translation
import { useTranslation } from "react-i18next"

//redux
import { useDispatch } from "react-redux"
import { AppDispatch } from "src/stores"
import { createReviewAsync } from "src/stores/review/action";

interface TWriteReviewModal {
    open: boolean
    onClose: () => void
    productId?: number
    orderId?: number
}

type TDefaultValues = {
    content: string,
    star: number
}

const WriteReviewModal = (props: TWriteReviewModal) => {
    //state
    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    //props
    const { open, onClose, orderId, productId } = props

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

    const handleImageUpload = (file: File) => {
        setImageFile(file)
        const reader = new FileReader()
        reader.onloadend = () => {
            setImagePreview(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    const onSubmit = (data: TDefaultValues) => {
        if (!Object.keys(errors)?.length) {
            if (productId && orderId) {
                const formData = {
                    productId: productId,
                    orderId: orderId,
                    rating: data?.star,
                    comment: data?.content,
                }

                if (imageFile) {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                        const base64String = reader.result as string
                        const imageCommand = {
                            imageUrl: '',
                            imageBase64: base64String,
                            publicId: '',
                            typeImage: imageFile.type,
                            value: imageFile.name
                        }
                        dispatch(createReviewAsync({
                            ...formData,
                            imageCommand
                        }))
                    }
                    reader.readAsDataURL(imageFile)
                } else {
                    dispatch(createReviewAsync(formData))
                }
            }
        }
    }

    useEffect(() => {
        if (!open) {
            reset({
                ...defaultValues
            })
            setImageFile(null)
            setImagePreview(null)
        }
    }, [open])

    return (
        <>
            {loading && <Spinner />}
            <CustomModal open={open} onClose={onClose}>
                <Paper
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                        padding: '20px',
                        borderRadius: '15px',
                        minWidth: { md: '500px', xs: '90vw' },
                        maxWidth: { md: '600px', xs: '90vw' },
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3
                    }}>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                            {t('rate_product')}
                        </Typography>
                        <IconButton onClick={onClose}>
                            <IconifyIcon
                                icon="material-symbols-light:close-rounded"
                                fontSize={"24px"}
                            />
                        </IconButton>
                    </Box>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                        {t('rating')}
                                    </Typography>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <Rating 
                                                value={value} 
                                                onChange={(e, newValue) => onChange(newValue)}
                                                precision={1}
                                                size="large"
                                            />
                                        )}
                                        name='star'
                                    />
                                    {errors.star && (
                                        <Typography color="error" variant="caption">
                                            {errors.star.message}
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
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
                                            error={!!errors.content}
                                            helperText={errors.content?.message}
                                            minRows={4}
                                            maxRows={6}
                                        />
                                    )}
                                    name='content'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    {t('upload_image')}
                                </Typography>
                                <FileUploadWrapper
                                    uploadFile={handleImageUpload}
                                    objectAcceptedFile={{
                                        'image/*': ['.png', '.jpg', '.jpeg', '.gif']
                                    }}
                                >
                                    <Box
                                        sx={{
                                            border: `2px dashed ${theme.palette.divider}`,
                                            borderRadius: 1,
                                            p: 3,
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                borderColor: theme.palette.primary.main
                                            }
                                        }}
                                    >
                                        {imagePreview ? (
                                            <Box
                                                component="img"
                                                src={imagePreview}
                                                alt="Preview"
                                                sx={{
                                                    maxWidth: '100%',
                                                    maxHeight: '200px',
                                                    objectFit: 'contain'
                                                }}
                                            />
                                        ) : (
                                            <Typography color="text.secondary">
                                                {t('drag_drop_image')}
                                            </Typography>
                                        )}
                                    </Box>
                                </FileUploadWrapper>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                    <Button
                                        variant="outlined"
                                        onClick={onClose}
                                    >
                                        {t('cancel')}
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                    >
                                        {t('submit')}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </CustomModal>
        </>
    )
}

export default WriteReviewModal