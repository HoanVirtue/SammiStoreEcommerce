"use client"

import { NextPage } from "next"

//MUI
import { Badge, IconButton, styled, Toolbar, Typography, useTheme } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

//conponents
import IconifyIcon from "src/components/Icon";
import UserMenu from "src/view/layout/components/user-menu";
import ModeToggle from "./components/mode-toggle";
import LanguageDropdown from "./components/language-dropdown";

//hooks
import { useAuth } from "src/hooks/useAuth";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

//config
import { ROUTE_CONFIG } from "src/configs/route";

type TProps = {
    open: boolean
    toggleDrawer: () => void
    isHideMenu?: boolean
}

const drawerWidth: number = 240

interface AppBarProps extends MuiAppBarProps {
    open?: boolean
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor:
        theme.palette.mode === 'light'
            ? theme.palette.customColors.lightPaperBg
            : theme.palette.customColors.darkPaperBg,
    color: theme.palette.primary.main,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))

const HorizontalLayout: NextPage<TProps> = ({ open, toggleDrawer, isHideMenu }) => {
    const { user } = useAuth()
    const router = useRouter()
    const theme = useTheme()
    return (
        <AppBar position="absolute" open={open}>
            <Toolbar sx={{ pr: '30px', margin: '0 20px' }} >
                {!isHideMenu && (
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <IconifyIcon icon="material-symbols:menu-rounded" />
                    </IconButton>
                )}
                <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    Dashboard
                </Typography>
                <LanguageDropdown />
                <ModeToggle />
                <IconButton color="inherit">
                    <Badge badgeContent={4}
                        // color = {theme.palette.mode === 'light' ? theme.palette.error.main : theme.palette.primary.main}
                        color="primary"
                    >
                        <IconifyIcon icon="basil:notification-solid" />
                    </Badge>
                </IconButton>
                {
                    user
                        ? (<UserMenu />)
                        : (
                            <Button onClick={() => { router.push(ROUTE_CONFIG.LOGIN) }}
                                variant="contained" sx={{ mt: 3, mb: 2, ml: 2, py: 1.5, width: "auto" }}>
                                Sign in
                            </Button>
                        )
                }
            </Toolbar>
        </AppBar>
    )
}

export default HorizontalLayout