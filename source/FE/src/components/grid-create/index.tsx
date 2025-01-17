import { Box, IconButton, Tooltip, useTheme } from "@mui/material"
import { ModalProps } from "@mui/material"
import { Modal, styled, Typography } from "@mui/material"
import IconifyIcon from "../Icon"
import { useTranslation } from "../../../node_modules/react-i18next"

interface TGridCreate {
    onClick: () => void
    disabled?: boolean
}

const GridCreate = (props: TGridCreate) => {

    const { onClick, disabled } = props
    const { t } = useTranslation()

    const theme = useTheme()

    return (
        <Tooltip title="Thêm mới">
            <IconButton
                onClick={onClick}
                disabled={disabled}
                sx={{
                    backgroundColor: `${theme.palette.primary.main} !important`,
                    color: `${theme.palette.common.white}`
                }}>
                <IconifyIcon icon="ic:round-plus" />
            </IconButton>
        </Tooltip>
    )
}

export default GridCreate