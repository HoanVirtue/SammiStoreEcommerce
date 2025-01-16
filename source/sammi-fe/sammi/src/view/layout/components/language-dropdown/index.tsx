//React
import React from "react"

//Next

// MUI Imports
import { Box, BoxProps, IconButton, Menu, MenuItem, Popover, Typography } from "@mui/material"
import { styled } from "@mui/material";

//components
import IconifyIcon from "../../../../components/Icon";

//i18n
import { useTranslation } from "react-i18next";

//config
import { LANGUAGE_OPTIONS } from "src/configs/i18n";
import { ListItemIcon } from "@mui/material";

type TProps = {}

interface TStyledItem extends BoxProps {
    selected?: boolean
}

const StyledLanguageItem = styled(Box)<TStyledItem>(({ theme, selected }) => {

    return ({
        cursor: "pointer",
        "&:hover": {
            backgroundColor: theme.palette.action.hover
        },
        "& .MuiTypography-root": {
            padding: "8px 12px"
        }
    })
})

const LanguageDropdown = (props: TProps) => {
    //State
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    //Hooks
    const { i18n } = useTranslation();

    const open = Boolean(anchorEl);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <IconButton color="inherit" id={"language-dropdown"} onClick={handleOpen}>
                <IconifyIcon icon="bi:translate" />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {
                    LANGUAGE_OPTIONS.map((lang) => (
                        <MenuItem
                            onClick={() => i18n.changeLanguage(lang.value)}
                            selected={lang.value === i18n.language}
                            key={lang.value}>
                            <ListItemIcon>
                                {lang.language}
                            </ListItemIcon>
                        </MenuItem>
                    ))
                }
            </Menu>
        </>
    )
}

export default LanguageDropdown
