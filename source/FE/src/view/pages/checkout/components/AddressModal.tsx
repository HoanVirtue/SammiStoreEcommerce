//react
import { Fragment, useEffect, useState } from "react"

//form
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import * as yup from 'yup';

//Mui
import { Box, Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, IconButton, InputAdornment, Typography } from "@mui/material"
import { useTheme } from "@mui/material"

//components
import CustomModal from "src/components/custom-modal"
import IconifyIcon from "src/components/Icon"
import Spinner from "src/components/spinner"
import CustomTextField from "src/components/text-field"

//translation
import { useTranslation } from "react-i18next"

//redux
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "src/stores"
import { InputLabel } from "@mui/material";
import CustomSelect from "src/components/custom-select";
import { getAllCities } from "src/services/city";
import NoData from "src/components/no-data";
import { RadioGroup } from "@mui/material";
import { Radio } from "@mui/material";
import { cloneDeep, separationFullname, toFullName } from "src/utils";
import { useAuth } from "src/hooks/useAuth";
import { TUserAddress } from "src/contexts/types";
import { updateAuthMeAsync } from "src/stores/auth/action";
import toast from "react-hot-toast";
import { resetInitialState } from "src/stores/auth";

interface TAddressModal {
    open: boolean
    onClose: () => void
}

interface TDefaultValues {
    streetAddress: string;
    wardId: number;
}

const AddressModal = (props: TAddressModal) => {

    //state
    const [loading, setLoading] = useState(false)
    const [cityOptions, setCityOptions] = useState<{ label: string, value: string }[]>([])
    const [activeTab, setActiveTab] = useState(1)
    const [userAddress, setUserAddress] = useState<TUserAddress[]>([])
    const [isEdit, setIsEdit] = useState({
        isEdit: false,
        index: 0
    })

    //props
    const { open, onClose } = props

    //translation
    const { t, i18n } = useTranslation()
    const { user, setUser } = useAuth()

    //theme
    const theme = useTheme()

    //redux
    const dispatch: AppDispatch = useDispatch()
    const { isLoading, isErrorUpdateMe, messageUpdateMe, isSuccessUpdateMe } = useSelector((state: RootState) => state.auth)

    const schema = yup.object().shape({
        streetAddress: yup.string().required(t("required_street_address")),
        wardId: yup.number().required(t("required_ward_id")),
    });

    const defaultValues: TDefaultValues = {
        streetAddress: '',
        wardId: 0
    }
    const { handleSubmit, getValues, setError, clearErrors, control, formState: { errors }, reset } = useForm<TDefaultValues>({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    });


    const onSubmit = (data: TDefaultValues) => {
        if (!Object.keys(errors)?.length) {
            if (activeTab === 2) {
                const haveDefault = userAddress.some((item) => item.isDefault)
                if (isEdit.isEdit) {
                    const cloneAddress = cloneDeep(userAddress)
                    const findAddress = cloneAddress[isEdit.index]
                    if (findAddress) {
                        findAddress.streetAddress = data.streetAddress
                        findAddress.wardId = data.wardId
                    }
                    setUserAddress(cloneAddress)
                } else {
                    setUserAddress([...userAddress,
                    {
                        streetAddress: data?.streetAddress,
                        wardId: data?.wardId,
                        isDefault: !haveDefault
                    }])
                }
                setActiveTab(1)
                setIsEdit({
                    isEdit: false,
                    index: 0
                })
            }
        }
    }


    //fetch
    const fetchAllCities = async () => {
        setLoading(true)
        await getAllCities({ params: { limit: -1, page: -1, search: '', order: '' } }).then((res) => {
            const data = res?.data?.cities
            if (data) {
                setCityOptions(data?.map((item: { name: string, _id: string }) => ({
                    label: item.name,
                    value: item._id
                })))
            }
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
        })
    }


    const onChangeAddress = (value: string) => {
        const cloneAddress = [...userAddress]
        setUserAddress(cloneAddress.map((item, index) => {
            return {
                ...item,
                isDefault: Boolean(index === Number(value))
            }
        }))
    }

    const handleUpdate = () => {
        dispatch(updateAuthMeAsync({
            ...user,
            userAddress: userAddress
        }))
    }

    useEffect(() => {
        if (!open) {
            reset({
                ...defaultValues
            })
        }
    }, [open])

    useEffect(() => {
        fetchAllCities()
    }, [])


    useEffect(() => {
        if (messageUpdateMe) {
            if (isErrorUpdateMe) {
                toast.error(messageUpdateMe)
            }
            else if (isSuccessUpdateMe) {
                toast.success(messageUpdateMe)
                if (user) {
                    setUser({...user})
                }
            }
        }
        dispatch(resetInitialState())
        onClose()
    }, [isErrorUpdateMe, isSuccessUpdateMe, messageUpdateMe])

    useEffect(() => {
        if (activeTab === 2 && isEdit.isEdit) {
            const findDefault = userAddress.find((item) => item.isDefault)
            const findCity = findDefault ? cityOptions.find((item) => findDefault?.city === item.label) : ""
            const fullName = toFullName(findDefault?.lastName || "", findDefault?.middleName || "", findDefault?.firstName || "",
                i18n.language)
            reset({
                fullName: fullName,
                phoneNumber: findDefault?.phoneNumber,
                address: findDefault?.address,
                city: findCity ? findCity?.value : '',
            })
        } else {
            reset({
                ...defaultValues
            })
        }
    }, [activeTab])

    return (
        <>
            {(isLoading || loading) && <Spinner />}
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
                            {activeTab === 1 ? (<>{t('shipping_address')}</>) : (<>{t('add_address')}</>)}
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
                            {activeTab === 1 ? (
                                <Box>
                                    {userAddress.length > 0 ? (
                                        <FormControl>
                                            <FormLabel id="radio-address-group" sx={{
                                                fontWeight: "bold",
                                                color: theme.palette.primary.main
                                            }}>{t("address")}</FormLabel>
                                            <RadioGroup
                                                sx={{ gap: 4 }}
                                                aria-labelledby="radio-address-group"
                                                name="radio-address-group"
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeAddress(e.target.value)}
                                            >
                                                {userAddress.map((address, index) => {
                                                    const findCity = cityOptions.find((item) => item.value === address.city)
                                                    return (
                                                        <Box key={index}
                                                            sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                                            <FormControlLabel
                                                                value={index}
                                                                control={<Radio checked={address.isDefault} />}
                                                                label={`${toFullName(
                                                                    address?.lastName || "",
                                                                    address?.middleName || "",
                                                                    address?.firstName || "",
                                                                    i18n.language)}
                                                            ${address.phoneNumber}
                                                            ${address.address} 
                                                            ${findCity?.label}`}
                                                            />
                                                            {address.isDefault && (
                                                                <Button
                                                                    variant="outlined"
                                                                    onClick={() => {
                                                                        setActiveTab(2)
                                                                        setIsEdit({
                                                                            isEdit: true,
                                                                            index: index
                                                                        })
                                                                    }}
                                                                    sx={{ mt: 3, mb: 2, py: 1.5 }}>
                                                                    {t('change_address')}
                                                                </Button>
                                                            )}
                                                        </Box>
                                                    )
                                                })}
                                            </RadioGroup>
                                        </FormControl>
                                    ) : (
                                        <NoData imageWidth="60px" imageHeight="60px"
                                            textNodata={t("no_shipping_address")} />
                                    )}
                                    <Button
                                        variant="outlined"
                                        disabled={userAddress.length > 3}
                                        onClick={() => setActiveTab(2)}
                                        sx={{ mt: 3, mb: 2, py: 1.5 }}>
                                        {t('add_address')}
                                    </Button>
                                </Box>
                            ) : (
                                <Grid container
                                    spacing={4}
                                >
                                    <Grid item md={6} xs={12} >
                                        <Controller
                                            control={control}
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <CustomTextField
                                                    fullWidth
                                                    label={t('full_name')}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    placeholder={t('enter_your_full_name')}
                                                    error={errors.fullName ? true : false}
                                                    helperText={errors.fullName?.message}
                                                />
                                            )}
                                            name='fullName'
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12} >
                                        <Controller
                                            control={control}
                                            name='address'
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <CustomTextField
                                                    fullWidth
                                                    label={t('address')}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    placeholder={t('enter_your_address')}
                                                    error={errors.address ? true : false}
                                                    helperText={errors.address?.message}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12} >
                                        <Controller
                                            control={control}
                                            name='city'
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <Box>
                                                    <InputLabel sx={{
                                                        fontSize: "13px",
                                                        mb: "4px",
                                                        display: "block",
                                                        color: errors?.city ? theme.palette.error.main : `rgba(${theme.palette.customColors.main}, 0.42)`
                                                    }}>
                                                        {t('city')}
                                                    </InputLabel>
                                                    <CustomSelect
                                                        fullWidth
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value}
                                                        options={cityOptions}
                                                        placeholder={t('select_your_city')}
                                                        error={errors.city ? true : false}
                                                    />
                                                    {errors?.city?.message && (
                                                        <FormHelperText sx={{
                                                            color: !errors?.city ? theme.palette.error.main : `rgba(${theme.palette.customColors.main}, 0.42)`
                                                        }}>
                                                            {errors?.city?.message}
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
                                                    required
                                                    fullWidth
                                                    label={t('phone_number')}
                                                    onChange={(e) => {
                                                        const numberValue = e.target.value.replace(/\D/g, '');
                                                        onChange(numberValue);
                                                    }}
                                                    onBlur={onBlur}
                                                    inputProps={{
                                                        inputMode: 'numeric',
                                                        pattern: '[0-9]*',
                                                        minLength: 8
                                                    }}
                                                    value={value}
                                                    placeholder={t('enter_your_phone_number')}
                                                    error={errors.phoneNumber ? true : false}
                                                    helperText={errors.phoneNumber?.message}
                                                />
                                            )}
                                            name='phoneNumber'
                                        />
                                    </Grid>
                                </Grid>
                            )}
                        </Box>
                        {activeTab === 1 ? (
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Button onClick={handleUpdate} variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>
                                    {t('update')}
                                </Button>
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 4 }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setActiveTab(1)
                                        setIsEdit({
                                            isEdit: false,
                                            index: 0
                                        })
                                    }}
                                    sx={{ mt: 3, mb: 2, py: 1.5 }}>
                                    {t('cancel')}
                                </Button>
                                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>
                                    {t('confirm')}
                                </Button>
                            </Box>
                        )}
                    </form>
                </Box>
            </CustomModal>
        </>
    )
}

export default AddressModal