import { Button } from '@mui/material'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import CustomAutocomplete from '../custom-autocomplete'
import { AutocompleteOption } from '../custom-autocomplete'
import { useState } from 'react'

type TProp = {
    selectedRows: string[],
    statusOptions: AutocompleteOption[],
    onStatusUpdate: (selectedRows: string[], newStatus: string) => Promise<void>,
    statusLabel?: string,
    onClear: () => void
}

const StatusUpdateHeader = (props: TProp) => {
    const {
        selectedRows,
        statusOptions,
        onStatusUpdate,
        statusLabel = "status",
        onClear
    } = props

    const { t } = useTranslation()
    const [selectedStatus, setSelectedStatus] = useState<AutocompleteOption | null>(null)

    const handleStatusChange = (newValue: AutocompleteOption | null) => {
        setSelectedStatus(newValue)
    }

    const handleApplyStatus = async () => {
        if (selectedStatus && selectedRows.length > 0) {
            try {
                await onStatusUpdate(selectedRows, selectedStatus.value as string)
                setSelectedStatus(null)
                onClear()
            } catch (error) {
                console.error('Error updating status:', error)
            }
        }
    }

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: "6px"
        }}>
            <CustomAutocomplete
                options={statusOptions}
                value={selectedStatus}
                onChange={handleStatusChange}
                label={t(statusLabel)}
                sx={{ width: 200 }}
            />
            <Button
                variant="contained"
                onClick={handleApplyStatus}
                disabled={!selectedStatus}
            >
                {t("apply")}
            </Button>
        </Box>
    )
}

export default StatusUpdateHeader 