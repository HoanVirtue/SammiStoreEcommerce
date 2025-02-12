//react
import { useEffect, useState } from "react"

//form
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import * as yup from 'yup';

//Mui
import { Box, Button, IconButton, Typography } from "@mui/material"
import { useTheme } from "@mui/material"

//components
import CustomModal from "src/components/custom-modal"
import IconifyIcon from "src/components/Icon"
import Spinner from "src/components/spinner"
import CustomTextField from "src/components/text-field"

//services
import { getRoleDetail } from "src/services/role"

//translation
import { useTranslation } from "../../../../../../node_modules/react-i18next"

//redux
import { useDispatch } from "react-redux"
import { AppDispatch } from "src/stores"
import { createRoleAsync, updateRoleAsync } from "src/stores/role/action"

interface TCreateUpdateRole {
    open: boolean
    onClose: () => void
    idRole?: string
}

const CreateUpdateRole = (props: TCreateUpdateRole) => {

    //state
    const [loading, setLoading] = useState(false)

    //props
    const { open, onClose, idRole } = props

    //translation
    const { t } = useTranslation()

    //theme
    const theme = useTheme()

    //redux
    const dispatch: AppDispatch = useDispatch()

    const schema = yup.object().shape({
        name: yup
            .string()
            .required("Role is required")
    });

    const { handleSubmit, control, formState: { errors }, reset } = useForm({
        defaultValues: {
            name: '',
        },
        mode: 'onChange',
        resolver: yupResolver(schema)
    });


    const onSubmit = (data: { name: string }) => {
        if (!Object.keys(errors)?.length) {
            if (idRole) {
                //update
                dispatch(updateRoleAsync({ name: data?.name, id: idRole }))
            } else {
                //create
                dispatch(createRoleAsync({ name: data?.name }))
            }
        }
    }

    const fetchDetailRole = async (id: string) => {
        setLoading(true)
        await getRoleDetail(id).then((res) => {
            if (res?.data) {
                reset({
                    name: res?.data?.name
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
                name: ""
            })
        } else {
            if (idRole) {
                fetchDetailRole(idRole)
            }
        }
    }, [open, idRole])


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
                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        paddingBottom: '20px'
                    }}>
                        <Typography variant="h4" sx={{ fontWeight: 600 }}>
                            {idRole ? t('Update role') : t('Create role')}
                        </Typography>
                        <IconButton sx={{
                            position: 'absolute',
                            right: "-10px",
                            top: "-6px",
                        }}>
                            <IconifyIcon icon="material-symbols-light:close-rounded" fontSize={"30px"} onClick={onClose} />
                        </IconButton>
                    </Box>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate >
                        <Box sx={{
                            width: '100%',
                            backgroundColor: theme.palette.background.paper,
                            padding: '30px 20px',
                            borderRadius: '15px'
                        }}>
                            <Controller
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <CustomTextField
                                        required

                                        fullWidth
                                        label="Role name"
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        placeholder='Enter role name'
                                        helperText={errors.name?.message}
                                        error={errors.name ? true : false}
                                    />
                                )}
                                name='name'
                            />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>
                                {idRole ? t('Update') : t('Create')}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </CustomModal>
        </>
    )
}

export default CreateUpdateRole