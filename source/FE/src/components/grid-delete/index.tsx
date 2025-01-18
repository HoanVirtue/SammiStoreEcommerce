import { Box, IconButton, Tooltip } from "@mui/material"
import { ModalProps } from "@mui/material"
import { Modal, styled, Typography } from "@mui/material"
import IconifyIcon from "../Icon"
import { useTranslation } from "../../../node_modules/react-i18next"

interface TGridDelete {
    onClick: () => void
    disabled?: boolean
}

const GridDelete = (props: TGridDelete) => {

    const { onClick, disabled } = props
    const { t } = useTranslation()

    return (
        <Tooltip title="Xóa">
            <IconButton onClick={onClick} disabled={disabled}>
                <IconifyIcon icon="ic:outline-delete" />
            </IconButton>
        </Tooltip>
    )
}

export default GridDelete