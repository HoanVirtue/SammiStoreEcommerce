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
import { getBrandDetail } from "src/services/brand"

//translation
import { useTranslation } from "react-i18next"
//redux
import { useDispatch } from "react-redux"
import { AppDispatch } from "src/stores"
import { createBrandAsync, updateBrandAsync } from "src/stores/brand/action"
import { convertBase64, stringToSlug } from "src/utils";
import { Avatar } from "@mui/material";
import FileUploadWrapper from "src/components/file-upload-wrapper";
import { FormHelperText } from "@mui/material";

interface TCreateUpdateBrand {
    open: boolean
    onClose: () => void
    idBrand?: string
}

type TDefaultValues = {
    name: string,
    code: string,
    image: string,
}

const CreateUpdateBrand = (props: TCreateUpdateBrand) => {

    //state
    const [loading, setLoading] = useState(false)
    const [previewImage, setPreviewImage] = useState<string>("");

    //props
    const { open, onClose, idBrand } = props

    //translation
    const { t, i18n } = useTranslation()

    //theme
    const theme = useTheme()

    //redux
    const dispatch: AppDispatch = useDispatch()

    const schema = yup.object().shape({
        name: yup.string().required(t("required_brand_name")),
        code: yup.string().required(t("required_brand_code")),
        image: yup.string().required(t("required_brand_image")),
    });

    const defaultValues: TDefaultValues = {
        name: '',
        code: '',
        image: ''
    }

    const { handleSubmit, getValues, control, setValue, formState: { errors }, reset } = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    });


    const onSubmit = (data: TDefaultValues) => {
        if (!Object.keys(errors)?.length) {
            if (idBrand) {
                //update
                dispatch(updateBrandAsync({
                    name: data?.name,
                    code: data?.code,
                    image: data?.image,
                    id: idBrand,
                    // slug: data?.slug
                }))
            } else {
                //create
                dispatch(createBrandAsync({
                    name: data?.name,
                    code: data?.code,
                    image: data?.image,
                }))
            }
        }
    }


    const handleUploadImage = async (file: File) => {
        const base64WithPrefix = await convertBase64(file);
        const base64 = base64WithPrefix.split(",")[1];
        setValue("image", base64, { shouldValidate: true });
        setPreviewImage(base64WithPrefix);
    };

    const fetchDetailBrand = async (id: string) => {
        setLoading(true);
        try {
            const res = await getBrandDetail(id);
            const data = res?.result;
            if (data) {
                reset({
                    name: data.name || "",
                    code: data.code || "",
                    image: data.image || "",
                });
                setPreviewImage(
                    data.image && data.image.startsWith("data:")
                        ? data.image
                        : `data:image/jpeg;base64,${data.image}`
                );
            }
        } catch (e) {
            console.error("Error fetching brand detail:", e);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (!open) {
            reset({ ...defaultValues });
            setPreviewImage("");
        } else if (idBrand && open) {
            fetchDetailBrand(idBrand);
        }
    }, [open, idBrand, reset]);

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
                            {idBrand ? t('update_brand') : t('create_brand')}
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

                            <Grid item md={12} xs={12}>
                                <Controller
                                    control={control}
                                    name="image"
                                    render={({ field: { value } }) => (
                                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                                            {previewImage && (
                                                <Box sx={{ position: "relative" }}>
                                                    <Avatar
                                                        src={previewImage}
                                                        sx={{ width: 100, height: 100 }}
                                                        alt="brand-image"
                                                    />
                                                    <IconButton
                                                        sx={{ position: "absolute", bottom: -4, right: -6, color: theme.palette.error.main }}
                                                        onClick={() => {
                                                            setValue("image", "", { shouldValidate: true });
                                                            setPreviewImage("");
                                                        }}
                                                    >
                                                        <IconifyIcon icon="material-symbols:delete-rounded" />
                                                    </IconButton>
                                                </Box>
                                            )}
                                            <FileUploadWrapper
                                                uploadFile={handleUploadImage}
                                                objectAcceptedFile={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] }}
                                            >
                                                <Button
                                                    variant="outlined"
                                                    sx={{ width: "auto", display: "flex", alignItems: "center", gap: 1 }}
                                                >
                                                    <IconifyIcon icon="ph:camera-thin" />
                                                    {t("upload_brand_image")}
                                                </Button>
                                            </FileUploadWrapper>
                                            {errors.image && (
                                                <FormHelperText sx={{ color: theme.palette.error.main }}>
                                                    {errors.image.message}
                                                </FormHelperText>
                                            )}
                                        </Box>
                                    )}
                                />
                            </Grid>


                            <Grid container item md={12} xs={12} spacing={5}>
                                <Grid item md={12} xs={12} >
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <CustomTextField
                                                fullWidth
                                                required
                                                label={t('brand_name')}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                placeholder={t('enter_brand_name')}
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
                                                label={t('brand_code')}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                placeholder={t('enter_brand_code')}
                                                error={errors.code ? true : false}
                                                helperText={errors.code?.message}
                                            />
                                        )}
                                        name='code'
                                    />
                                </Grid>

                            </Grid>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>
                                {idBrand ? t('update') : t('create')}
                            </Button>
                        </Box>
                    </form >
                </Box >
            </CustomModal >
        </>
    )
}

export default CreateUpdateBrand