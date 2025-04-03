// ** MUI Imports
import { Button, IconButton, TextField } from '@mui/material'
import { Box, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import IconifyIcon from '../Icon'
import { RECEIPT_STATUS } from 'src/configs/receipt'
import { useState } from 'react'
import { updateReceiptStatus } from 'src/services/receipt'
import CustomAutocomplete from '../custom-autocomplete'
import { AutocompleteOption } from '../custom-autocomplete'
import { toast } from 'react-toastify'

const StyledTableHeader = styled(Box)(({ theme }) => ({
    borderRadius: "15px",
    border: `1px solid ${theme.palette.customColors.borderColor}`,
    padding: "8px 10px",
    width: "100%",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
}))

type TProp = {
    selectedRowNumber: number,
    onClear: () => void,
    actions: { label: string, value: string, disabled?: boolean }[],
    handleAction: (type: string) => void,
    selectedRows: string[]
}

const TableHeader = (props: TProp) => {
    //Props
    const { selectedRowNumber, onClear, actions, handleAction, selectedRows } = props

    // ** Hook
    const theme = useTheme()
    const { t } = useTranslation()

    // ** State
    const [selectedStatus, setSelectedStatus] = useState<AutocompleteOption | null>(null)

    // ** Handler
    const handleStatusChange = (newValue: AutocompleteOption | null) => {
        setSelectedStatus(newValue)
    }

    const handleApplyStatus = async () => {
        if (selectedStatus && selectedRows.length > 0) {
            try {
                await Promise.all(selectedRows.map(row =>
                    updateReceiptStatus({
                        purchaseOrderId: parseInt(row),
                        newStatus: parseInt(selectedStatus.value as string)
                    })
                ))
                toast   .success(t("status_updated_successfully"))

                setSelectedStatus(null)
                onClear()
            } catch (error) {
                console.error('Error updating status:', error)
            }
        }
    }

    return (
        <StyledTableHeader>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: "6px"
            }}>
                <Typography>{t("selected_row")}</Typography>
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: "12px !important",
                        backgroundColor: theme.palette.primary.main,
                        height: "20px",
                        width: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        color: theme.palette.customColors.lightPaperBg
                    }}
                >
                    <span>{selectedRowNumber}</span>
                </Typography>
            </Box>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: "6px"
            }}>
                {selectedRowNumber > 0 && (
                    <>
                        <CustomAutocomplete
                            options={Object.values(RECEIPT_STATUS())}
                            value={selectedStatus}
                            onChange={handleStatusChange}
                            label={t("status")}
                            sx={{ width: 200 }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleApplyStatus}
                            disabled={!selectedStatus}
                        >
                            {t("apply")}
                        </Button>
                    </>
                )}
                {actions?.map((action) => {
                    return (
                        <Button disabled={action?.disabled} key={action.value} variant="contained" onClick={() => handleAction(action.value)}>
                            {action.label}
                        </Button>
                    )
                })}
                <IconButton onClick={onClear}>
                    <IconifyIcon icon="material-symbols-light:close-rounded" fontSize={"20px"} />
                </IconButton>
            </Box>
        </StyledTableHeader>
    )
}

export default TableHeader
