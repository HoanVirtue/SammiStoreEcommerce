import React, { useEffect, useState } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import {
    Box,
    Button,
    Typography,
    Paper,
    Grid,
    styled,
    useTheme,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useTranslation } from 'react-i18next';
import CustomTextField from 'src/components/text-field';
import Spinner from 'src/components/spinner';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/stores';
import { getVoucherDetail, getVoucherCode } from 'src/services/voucher';
import { toast } from 'react-toastify';

interface VoucherFormData {
    code: string;
    name: string;
    startDate: Date;
    endDate: Date;
    discountType: number;
    discountValue: number;
    minOrderAmount: number;
    maxDiscountAmount: number;
    usageLimit: number;
    description: string;
}

interface CreateUpdateVoucherProps {
    id?: number;
    onClose: () => void;
}

const CreateUpdateVoucher: React.FC<CreateUpdateVoucherProps> = ({ id, onClose }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const dispatch: AppDispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const voucherCode = useSelector((state: any) => state.voucher.voucherCode);

    const schema = yup.object().shape({
        code: yup.string().required(t("voucher_code_required")),
        name: yup.string().required(t("voucher_name_required")),
        startDate: yup.date().required(t("start_date_required")),
        endDate: yup.date().required(t("end_date_required")),
        discountType: yup.number().required(t("discount_type_required")),
        discountValue: yup.number().required(t("discount_value_required")),
        minOrderAmount: yup.number().required(t("min_order_amount_required")),
        maxDiscountAmount: yup.number().required(t("max_discount_amount_required")),
        usageLimit: yup.number().required(t("usage_limit_required")),
        description: yup.string()
    });

    const defaultValues: VoucherFormData = {
        code: voucherCode || '',
        name: '',
        startDate: new Date(),
        endDate: new Date(),
        discountType: 0,
        discountValue: 0,
        minOrderAmount: 0,
        maxDiscountAmount: 0,
        usageLimit: 0,
        description: ''
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm<VoucherFormData>({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema) as any,
    });

    const fetchVoucherDetail = async (voucherId: number) => {
        setLoading(true);
        try {
            const res = await getVoucherDetail(voucherId);
            if (res?.result) {
                const data = res.result;
                setValue('code', data.code);
                setValue('name', data.name);
                setValue('startDate', new Date(data.startDate));
                setValue('endDate', new Date(data.endDate));
                setValue('discountType', data.discountType);
                setValue('discountValue', data.discountValue);
                setValue('minOrderAmount', data.minOrderAmount);
                setValue('maxDiscountAmount', data.maxDiscountAmount);
                setValue('usageLimit', data.usageLimit);
                setValue('description', data.description);
            }
        } catch (err) {
            console.error('Error fetching voucher detail:', err);
            toast.error(t('error_fetching_voucher_detail'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchVoucherCode = async () => {
            try {
                const res = await getVoucherCode({
                    params: {
                        take: -1,
                        skip: 0,
                        paging: false,
                        orderBy: "name",
                        dir: "asc",
                        keywords: "''",
                        filters: ""
                    }
                });
                if (res?.result) {
                    setValue('code', res.result);
                }
            } catch (err) {
                console.error('Error fetching voucher code:', err);
            }
        };

        if (id) {
            setIsEditMode(true);
            fetchVoucherDetail(id);
        } else {
            setIsEditMode(false);
            reset(defaultValues);
            fetchVoucherCode();
        }
    }, [id]);

    const onSubmit: SubmitHandler<VoucherFormData> = async (data) => {
        setLoading(true);
        try {
            const voucherData = {
                code: data.code,
                name: data.name,
                startDate: data.startDate,
                endDate: data.endDate,
                discountType: data.discountType,
                discountValue: data.discountValue,
                minOrderAmount: data.minOrderAmount,
                maxDiscountAmount: data.maxDiscountAmount,
                usageLimit: data.usageLimit,
                description: data.description
            };

            if (isEditMode && id) {
                // const result = await dispatch(updateVoucherAsync({ id, ...voucherData }));
                // if (result?.payload?.result) {
                //     toast.success(t('update_voucher_success'));
                //     onClose();
                // }
            } else {
                // const result = await dispatch(createVoucherAsync(voucherData));
                // if (result?.payload?.result) {
                //     toast.success(t('create_voucher_success'));
                //     onClose();
                // }
            }
        } catch (error) {
            console.error('Error saving voucher:', error);
            toast.error(t('error_saving_voucher'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ p: 3 }}>
                {loading && <Spinner />}
                <Paper sx={{ p: 2 }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h5">{isEditMode ? t("update_voucher") : t("create_voucher")}</Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button variant="outlined" onClick={onClose}>
                                    {t("cancel")}
                                </Button>
                                <Button type="submit" variant="contained" color="primary">
                                    {isEditMode ? t("update") : t("create")}
                                </Button>
                            </Box>
                        </Box>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="code"
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomTextField
                                            fullWidth
                                            required
                                            label={t("voucher_code")}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder={t("enter_voucher_code")}
                                            error={!!errors.code}
                                            helperText={errors.code?.message}
                                            disabled={isEditMode}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomTextField
                                            fullWidth
                                            required
                                            label={t("voucher_name")}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder={t("enter_voucher_name")}
                                            error={!!errors.name}
                                            helperText={errors.name?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="startDate"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <DateTimePicker
                                            value={value}
                                            onChange={(newValue) => onChange(newValue)}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    size: "small",
                                                    label: t("start_date"),
                                                    placeholder: t("select_start_date"),
                                                    error: !!errors.startDate,
                                                    helperText: errors.startDate?.message,
                                                }
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="endDate"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <DateTimePicker
                                            value={value}
                                            onChange={(newValue) => onChange(newValue)}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    size: "small",
                                                    label: t("end_date"),
                                                    placeholder: t("select_end_date"),
                                                    error: !!errors.endDate,
                                                    helperText: errors.endDate?.message,
                                                }
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            {/* <Grid item xs={12} sm={6}>
                                <Controller
                                    name="discountType"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <CustomAutocomplete
                                            options={[
                                                { value: 1, label: t("percentage") },
                                            options={Object.values(eventTypeOptions)}
                                            value={Object.values(eventTypeOptions).find(option => option.value === value) || null}
                                            onChange={(newValue) => {
                                                onChange(newValue?.value || '');
                                            }}
                                            label={t("event_type")}
                                            error={!!errors.eventType}
                                            helperText={errors.eventType?.message}
                                            placeholder={t("select_event_type")}
                                        />
                                    )}
                                />
                            </Grid> */}
                        </Grid>

                    </form>
                </Paper>
            </Box>
        </LocalizationProvider>
    );
};

export default CreateUpdateVoucher;
