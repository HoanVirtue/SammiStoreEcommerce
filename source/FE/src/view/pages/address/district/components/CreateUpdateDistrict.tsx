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
import { getDistrictDetail } from "src/services/district"

//translation
import { useTranslation } from "react-i18next"
//redux
import { useDispatch } from "react-redux"
import { AppDispatch } from "src/stores"
import { createDistrictAsync, updateDistrictAsync } from "src/stores/district/action"
import { InputLabel } from "@mui/material";
import CustomSelect from "src/components/custom-select";
import { FormHelperText } from "@mui/material";
import { getAllProvinces } from "src/services/province";

interface TCreateUpdateDistrict {
    open: boolean
    onClose: () => void
    id?: number
}

type TDefaultValues = {
    name: string,
    code: string,
    provinceId: string,
    provinceName: string,
}

const CreateUpdateDistrict = (props: TCreateUpdateDistrict) => {

    //state
    const [loading, setLoading] = useState(false)
    const [provinceOptions, setProvinceOptions] = useState<{ label: string, value: string }[]>([])

    //props
    const { open, onClose, id } = props

    //translation
    const { t, i18n } = useTranslation()

    //theme
    const theme = useTheme()

    //redux
    const dispatch: AppDispatch = useDispatch()

    const schema = yup.object().shape({
        name: yup.string().required(t('required_district_name')),
        code: yup.string().required(t('required_district_code')),
        provinceId: yup.string().required(t('required_province_id')),
        provinceName: yup.string().required(t('required_province_name')),
    });

    const defaultValues: TDefaultValues = {
        name: '',
        code: '',
        provinceId: '',
        provinceName: ''
    }

    const { handleSubmit, control, formState: { errors }, reset, setValue } = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    });


    const onSubmit = (data: TDefaultValues) => {
        if (!Object.keys(errors)?.length) {
            if (id) {
                //update
                dispatch(updateDistrictAsync({
                    name: data?.name,
                    code: data?.code,
                    provinceId: data?.provinceId,
                    provinceName: data?.provinceName,
                    id: id,
                }))
            } else {
                //create
                dispatch(createDistrictAsync({
                    name: data?.name,
                    code: data?.code,
                    provinceId: data?.provinceId,
                    provinceName: data?.provinceName,
                }))
            }
        }
    }


    const fetchAllProvince = async () => {
        setLoading(true)
        await getAllProvinces({
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
                setProvinceOptions(data?.map((item: { name: string, id: string }) => ({
                    label: item.name,
                    value: item.id
                })))
            }
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
        })
    }


    const fetchDetailDistrict = async (id: number) => {
        setLoading(true)
        await getDistrictDetail(id).then((res) => {
            const data = res?.result
            if (data) {
                reset({
                    name: data?.name,
                    code: data?.code,
                    provinceId: data?.provinceId,
                    provinceName: data?.provinceName
                })
            }
            setLoading(false)
        }).catch((e) => {
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchAllProvince()
    }, [])

    useEffect(() => {
        if (!open) {
            reset({
                ...defaultValues
            })
        } else {
            if (id && open) {
                fetchDetailDistrict(id)
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
                    minWidth={{ md: '400px', xs: '80vw' }}
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
                            {id ? t('update_district') : t('create_district')}
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
                            <Grid container item md={12} xs={12} spacing={6}>
                                <Grid item md={12} xs={12} >
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <CustomTextField
                                                fullWidth
                                                required
                                                label={t('district_name')}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                placeholder={t('enter_district_name')}
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
                                                label={t('district_code')}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                placeholder={t('enter_district_code')}
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
                                                disabled
                                                label={t('province_id')}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                placeholder={t('enter_province_id')}
                                                error={errors.provinceId ? true : false}
                                                helperText={errors.provinceId?.message}
                                            />
                                        )}
                                        name='provinceId'
                                    />
                                </Grid>
                                <Grid item md={12} xs={12} >
                                    <Controller
                                        control={control}
                                        name='provinceName'
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Box sx={{
                                                mt: -5
                                            }}>
                                                <InputLabel sx={{
                                                    fontSize: "13px",
                                                    mb: "4px",
                                                    display: "block",
                                                    color: errors?.provinceName ? theme.palette.error.main : `rgba(${theme.palette.customColors.main}, 0.42)`
                                                }}>
                                                    {t('province_name')}
                                                </InputLabel>
                                                <CustomSelect
                                                    fullWidth
                                                    onChange={(e) => {
                                                        const selectedProvince = provinceOptions.find(opt => opt.value === e.target.value);
                                                        if (selectedProvince) {
                                                            onChange(selectedProvince.value);
                                                            setValue('provinceId', selectedProvince.value);
                                                        } else {
                                                            onChange('');
                                                            setValue('provinceId', '');
                                                        }
                                                    }}
                                                    onBlur={onBlur}
                                                    value={value || ''}
                                                    options={provinceOptions}
                                                    placeholder={t('enter_province_name')}
                                                    error={errors.provinceName ? true : false}
                                                />
                                                {errors?.provinceName?.message && (
                                                    <FormHelperText sx={{
                                                        color: errors?.provinceName ? theme.palette.error.main : `rgba(${theme.palette.customColors.main}, 0.42)`
                                                    }}>
                                                        {errors?.provinceName?.message}
                                                    </FormHelperText>
                                                )}
                                            </Box>
                                        )}
                                    />
                                </Grid>
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

export default CreateUpdateDistrict