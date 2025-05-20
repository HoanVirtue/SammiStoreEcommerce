//react
import { useEffect, useState } from "react"

//Mui
import { Box, IconButton, Grid, Typography, Container, Stack, Divider, alpha, useTheme, Button, Switch } from "@mui/material"

//components
import IconifyIcon from "src/components/Icon"
import Spinner from "src/components/spinner"
import CustomAutocomplete from "src/components/custom-autocomplete"
import { AutocompleteOption } from "src/components/custom-autocomplete"

//services
import { getEventDetail, updateEventActive } from "src/services/event";

//translation
import { useTranslation } from "react-i18next"
import { formatPrice } from "src/utils"
import Image from "src/components/image"
import StepLabel from "src/components/step-label";

import { toast } from "react-toastify"

interface TEventDetail {
    id: number
    onClose: () => void
    onRefresh?: () => void
}

interface EventData {
    code: string;
    name: string;
    startDate: string;
    endDate: string;
    eventType: string;
    imageId: number;
    imageUrl: string;
    description: string;
    id: number;
    createdDate: string;
    updatedDate: string | null;
    createdBy: string;
    updatedBy: string | null;
    isActive: boolean;
    isDeleted: boolean;
    displayOrder: number | null;

}


const EventDetail = (props: TEventDetail) => {
    //state
    const [loading, setLoading] = useState(false)
    const [eventData, setEventData] = useState<EventData | null>(null)
    const [isActive, setIsActive] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState<AutocompleteOption | null>(null)
    const [isStatusChanged, setIsStatusChanged] = useState(false)

    //props
    const { id, onClose, onRefresh } = props

    //translation
    const { t } = useTranslation()

    //theme
    const theme = useTheme()

    const statusOptions: AutocompleteOption[] = [
        { label: t('active'), value: 1 },
        { label: t('inactive'), value: 0 }
    ];

    const fetchEventDetail = async (id: number) => {
        setLoading(true)
        await getEventDetail(id).then((res) => {
            const data = res?.result
            if (data) {
                setEventData(data)
                setIsActive(data.isActive)
                const initialStatus = statusOptions.find(option => 
                    (option.value === 1 && data.isActive) || 
                    (option.value === 0 && !data.isActive)
                ) || null;
                setSelectedStatus(initialStatus)
            }
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        if (id) {
            fetchEventDetail(id)
        }
    }, [id])

    const handleStatusChange = (newValue: AutocompleteOption | null) => {
        setSelectedStatus(newValue)
        setIsStatusChanged(true)
    }

    const handleApplyStatus = async () => {
        if (!selectedStatus) return;

        try {
            const res: any = await updateEventActive({
                id: id,
                isActive: Boolean(selectedStatus.value)
            })
            if (res?.data?.isSuccess === true) {
                setIsActive(Boolean(selectedStatus.value))
                setIsStatusChanged(false)
                toast.success(t("event_status_updated_successfully"))
                if (onRefresh) {
                    onRefresh()
                }
            } else {
                toast.error(res?.message)
            }
        } catch (error) {
            toast.error(t("error_updating_event_status"))
        }
    }

    const formatDate = (dateString: string | undefined | null) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleString();
    }

    return (
        <>
            {loading && <Spinner />}
            <Container maxWidth="lg">
                <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center" sx={{ mb: 3 }}>
                    <CustomAutocomplete
                        options={statusOptions}
                        value={selectedStatus}
                        onChange={handleStatusChange}
                        sx={{ width: 200 }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleApplyStatus}
                        disabled={!isStatusChanged}
                    >
                        {t('apply')}
                    </Button>
                </Stack>

                <Stack spacing={3}>
                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 1,
                        }}
                    >
                        <StepLabel step="1" title={t('event_information')} />
                        <Stack spacing={2} sx={{ mt: 3 }}>
                            <Stack spacing={1} direction="row" alignItems="center">
                                <Typography variant="subtitle2" fontWeight="bold">
                                    {t('event_code')}:
                                </Typography>
                                <Typography variant="body2">
                                    {eventData?.code}
                                </Typography>
                            </Stack>

                            <Stack spacing={1} direction="row" alignItems="center">
                                <Typography variant="subtitle2" fontWeight="bold">
                                    {t('event_name')}:
                                </Typography>
                                <Typography variant="body2">
                                    {eventData?.name}
                                </Typography>
                            </Stack>

                            <Stack spacing={1} direction="row" alignItems="center">
                                <Typography variant="subtitle2" fontWeight='bold'>
                                    {t('description')}:
                                </Typography>
                                <Typography variant="body2" dangerouslySetInnerHTML={{ __html: eventData?.description || '' }} />
                            </Stack>

                            <Stack spacing={1} direction="row" alignItems="center">
                                <Typography variant="subtitle2" fontWeight='bold'>
                                    {t('start_date')}:
                                </Typography>
                                <Typography variant="body2">
                                    {formatDate(eventData?.startDate)}
                                </Typography>
                            </Stack>

                            <Stack spacing={1} direction="row" alignItems="center">
                                <Typography variant="subtitle2" fontWeight='bold'>
                                    {t('end_date')}:
                                </Typography>
                                <Typography variant="body2">
                                    {formatDate(eventData?.endDate)}
                                </Typography>
                            </Stack>

                            <Stack spacing={1} direction="row" alignItems="center">
                                <Typography variant="subtitle2" fontWeight='bold'>
                                    {t('event_type')}:
                                </Typography>
                                <Typography variant="body2">
                                    {eventData?.eventType}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 1,
                        }}
                    >
                        <StepLabel step="2" title={t('event_image')} />
                        {eventData?.imageUrl && (
                            <Stack spacing={2} sx={{ mt: 3 }}>
                                <Image
                                    src={eventData.imageUrl}
                                    sx={{ width: 100, maxHeight: 100, objectFit: 'contain' }}
                                />
                            </Stack>
                        )
                        }
                    </Box>

                    <Box
                        sx={{
                            p: 3,
                            bgcolor: 'background.neutral',
                            borderRadius: 1,
                        }}
                    >
                        <StepLabel step="3" title={t('event_status_information')} />
                        <Stack spacing={2} sx={{ mt: 3 }}>
                            <Stack spacing={1} direction="row" alignItems="center">
                                <Typography variant="subtitle2" fontWeight='bold'>{t('status')}: </Typography>
                                <Typography variant="body2" color={isActive ? 'success.main' : 'error.main'}>
                                    {isActive ? t('active') : t('inactive')}
                                </Typography>
                            </Stack>

                            <Stack spacing={1} direction="row" alignItems="center">
                                <Typography variant="subtitle2" fontWeight='bold'>{t('created_by')}: </Typography>
                                <Typography variant="body2">
                                    {eventData?.createdBy}
                                </Typography>
                            </Stack>

                            <Stack spacing={1} direction="row" alignItems="center">
                                <Typography variant="subtitle2" fontWeight='bold'>{t('created_at')}: </Typography>
                                <Typography variant="body2">
                                    {formatDate(eventData?.createdDate)}
                                </Typography>
                            </Stack>

                            {eventData?.updatedBy && (
                                <Stack spacing={1} direction="row" alignItems="center">
                                    <Typography variant="subtitle2" fontWeight='bold'>{t('updated_by')}: </Typography>
                                    <Typography variant="body2">
                                        {eventData.updatedBy}
                                    </Typography>
                                </Stack>
                            )}

                            {eventData?.updatedDate && (
                                <Stack spacing={1} direction="row" alignItems="center">
                                    <Typography variant="subtitle2" fontWeight='bold'>{t('updated_at')}: </Typography>
                                    <Typography variant="body2">
                                        {formatDate(eventData.updatedDate)}
                                    </Typography>
                                </Stack>
                            )}
                        </Stack>
                    </Box>
                </Stack>
            </Container>
        </>
    )
}

export default EventDetail