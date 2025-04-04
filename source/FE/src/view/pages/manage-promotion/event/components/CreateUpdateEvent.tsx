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
    TableCell,
    TableContainer,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useTranslation } from 'react-i18next';
import CustomTextField from 'src/components/text-field';
import CustomAutocomplete from 'src/components/custom-autocomplete';
import Spinner from 'src/components/spinner';
import { useDispatch } from 'react-redux';
import { createEventAsync, updateEventAsync } from 'src/stores/event/action';
import { useRouter } from 'next/router';
import { AppDispatch } from 'src/stores';
import { getEventDetail } from 'src/services/event';
import { toast } from 'react-toastify';
// import { EVENT_TYPE } from 'src/configs/event';

interface ImageCommand {
    imageUrl: string;
    imageBase64: string;
    publicId: string;
    typeImage: number;
    value: string;
    displayOrder: number;
}

interface EventFormData {
    code: string;
    name: string;
    startDate: Date;
    endDate: Date;
    eventType: number;
    imageCommand: ImageCommand;
}

interface CreateUpdateEventProps {
    id?: string;
    onClose: () => void;
}

const CreateUpdateEvent: React.FC<CreateUpdateEventProps> = ({ id, onClose }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const dispatch: AppDispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    // const eventTypeOptions = EVENT_TYPE();

    const schema = yup.object().shape({
        code: yup.string().required(t("event_code_required")),
        name: yup.string().required(t("event_name_required")),
        startDate: yup.date().required(t("start_date_required")),
        endDate: yup.date().required(t("end_date_required")),
        eventType: yup.number().required(t("event_type_required")),
        imageCommand: yup.object().shape({
            imageUrl: yup.string(),
            imageBase64: yup.string(),
            publicId: yup.string(),
            typeImage: yup.number(),    
            value: yup.string(),
            displayOrder: yup.number()
        })
    });

    const defaultValues: EventFormData = {
        code: '',
        name: '',
        startDate: new Date(),
        endDate: new Date(),
        eventType: 0,
        imageCommand: {
            imageUrl: '',
            imageBase64: '',
            publicId: '',
            typeImage: 0,
            value: '',
            displayOrder: 0
        }
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm<EventFormData>({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema) as any,
    });

    const fetchEventDetail = async (eventId: string) => {
        setLoading(true);
        try {
            const res = await getEventDetail(eventId);
            if (res?.result) {
                const data = res.result;
                setValue('code', data.code);
                setValue('name', data.name);
                setValue('startDate', new Date(data.startDate));
                setValue('endDate', new Date(data.endDate));
                setValue('eventType', data.eventType);
                setValue('imageCommand', data.imageCommand);
            }
        } catch (err) {
            console.error('Error fetching event detail:', err);
            toast.error(t('error_fetching_event_detail'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            setIsEditMode(true);
            fetchEventDetail(id);
        } else {
            setIsEditMode(false);
            reset(defaultValues);
        }
    }, [id]);

    const onSubmit: SubmitHandler<EventFormData> = async (data) => {
        setLoading(true);
        try {
            const eventData = {
                code: data.code,
                name: data.name,
                startDate: data.startDate,
                endDate: data.endDate,
                eventType: data.eventType,
                imageCommand: data.imageCommand
            };

            if (isEditMode && id) {
                const result = await dispatch(updateEventAsync({ id, ...eventData }));
                if (result?.payload?.result) {
                    toast.success(t('update_event_success'));
                    onClose();
                }
            } else {
                const result = await dispatch(createEventAsync(eventData));
                if (result?.payload?.result) {
                    toast.success(t('create_event_success'));
                    onClose();
                }
            }
        } catch (error) {
            console.error('Error saving event:', error);
            toast.error(t('error_saving_event'));
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
                        {/* Header */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h5">{isEditMode ? t("update_event") : t("create_event")}</Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button variant="outlined" onClick={onClose}>
                                    {t("cancel")}
                                </Button>
                                <Button type="submit" variant="contained" color="primary">
                                    {isEditMode ? t("update") : t("create")}
                                </Button>
                            </Box>
                        </Box>

                        {/* Form Fields */}
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="code"
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomTextField
                                            fullWidth
                                            required
                                            label={t("event_code")}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder={t("enter_event_code")}
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
                                            label={t("event_name")}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder={t("enter_event_name")}
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
                                    name="eventType"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <CustomAutocomplete
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

                        {/* Items Table */}
                        {/* <TableContainer sx={{ mt: 3 }}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell width="5%">#</TableCell>
                                        <TableCell width="35%">{t("product_name")}</TableCell>
                                        <TableCell width="15%">{t("quantity")}</TableCell>
                                        <TableCell width="20%">{t("unit_price")}</TableCell>
                                        <TableCell width="20%">{t("total_product_price")}</TableCell>
                                        <TableCell width="5%">
                                            <IconButton color="primary" onClick={handleAddItem}>
                                                <AddIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <StyledTableCell width="5%">{index + 1}</StyledTableCell>
                                            <StyledTableCell width="35%">
                                                <Controller
                                                    name={`items.${index}.productId`}
                                                    control={control}
                                                    render={({ field: { onChange, value } }) => (
                                                        <Box>
                                                            <CustomAutocomplete
                                                                options={productOptions}
                                                                value={productOptions.find(option => option.id === value) || null}
                                                                onChange={(newValue) => {
                                                                    if (newValue && newValue.id !== undefined) {
                                                                        onChange(newValue.id);
                                                                        handleProductChange(index, newValue.id);
                                                                    } else {
                                                                        onChange(0);
                                                                    }
                                                                }}
                                                                error={!!errors.items?.[index]?.productId}
                                                                helperText={errors.items?.[index]?.productId?.message}
                                                                placeholder={t("enter_product_name")}
                                                                required
                                                            />
                                                        </Box>
                                                    )}
                                                />
                                            </StyledTableCell>

                                            <StyledTableCell width="15%">
                                                <Controller
                                                    name={`items.${index}.quantity`}
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            type="number"
                                                            onChange={(e) => {
                                                                onChange(e);
                                                                handleQuantityChange(index, parseInt(e.target.value) || 0);
                                                            }}
                                                            onBlur={onBlur}
                                                            value={value}
                                                            error={!!errors.items?.[index]?.quantity}
                                                            helperText={errors.items?.[index]?.quantity?.message}
                                                        />
                                                    )}
                                                />
                                            </StyledTableCell>

                                            <StyledTableCell width="20%">
                                                <Controller
                                                    name={`items.${index}.unitPrice`}
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            type="number"
                                                            onChange={(e) => {
                                                                onChange(e);
                                                                handleUnitPriceChange(index, parseFloat(e.target.value) || 0);
                                                            }}
                                                            onBlur={onBlur}
                                                            value={value}
                                                            error={!!errors.items?.[index]?.unitPrice}
                                                            helperText={errors.items?.[index]?.unitPrice?.message}
                                                        />
                                                    )}
                                                />
                                            </StyledTableCell>

                                            <StyledTableCell width="20%">
                                                <CustomTextField
                                                    fullWidth
                                                    type="number"
                                                    value={item.total}
                                                    disabled
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell width="5%" sx={{ padding: '6px 24px 6px 16px' }}>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleRemoveItem(index)}
                                                    disabled={items.length <= 1}
                                                >
                                                    <RemoveIcon />
                                                </IconButton>
                                            </StyledTableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer> */}

                    </form>
                </Paper>
            </Box>
        </LocalizationProvider>
    );
};

export default CreateUpdateEvent;
