"use client"

import { NextPage } from "next"

//MUI
import { Badge, Box, IconButton, styled, Toolbar, Typography, useTheme } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

//conponents
import IconifyIcon from "src/components/Icon";
import UserMenu from "src/view/layout/components/user-menu";
import ModeToggle from "./components/mode-toggle";
import LanguageDropdown from "./components/language-dropdown";

//hooks
import { useAuth } from "src/hooks/useAuth";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

//config
import { ROUTE_CONFIG } from "src/configs/route";
import Link from "next/link";
import ProductCart from "./components/product-cart";
import { useTranslation } from "react-i18next";
import SearchField from "src/components/search-field";
import { useState } from "react";

type TProps = {
    open: boolean
    toggleDrawer: () => void
    isHideMenu?: boolean
}

const drawerWidth: number = 0

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
    // ...(open && {
    //     marginLeft: drawerWidth,
    //     width: `calc(100% - ${drawerWidth}px)`,
    //     transition: theme.transitions.create(['width', 'margin'], {
    //         easing: theme.transitions.easing.sharp,
    //         duration: theme.transitions.duration.enteringScreen,
    //     }),
    // }),
}))

const HorizontalLayout: NextPage<TProps> = ({ open, toggleDrawer }) => {

    //state
    const [searchBy, setSearchBy] = useState("");

    //hooks
    const { user } = useAuth()
    const router = useRouter()
    const theme = useTheme()
    const { t } = useTranslation()

    const isDashboard = router.pathname === "/dashboard";

    const handleNavigateLogin = () => {
        if (router.asPath !== '/') {
            router.replace({
                pathname: '/login',
                query: {
                    returnUrl: router.asPath
                }
            })
        } else {
        }
        router.replace('/login')
    }

    return (
        <AppBar position="absolute" open={open}>
            <Toolbar sx={{ pr: '30px', margin: '0 20px', display: "flex", alignItems: "center", justifyContent: "space-between" }} >
                <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                    {isDashboard && (
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="drawer"
                            onClick={toggleDrawer}
                            sx={{
                                transition: "transform 0.3s ease",
                            }}
                        >
                            {!open ? (
                                <IconifyIcon icon="material-symbols:menu-rounded" />
                            ) : (
                                <IconifyIcon icon="ic:twotone-menu-open" />
                            )}
                        </IconButton>
                    )}
                    <Typography component="h1" variant="h2" color="primary" noWrap
                        sx={{
                            width: "fit-content",
                            fontWeight: "600",
                            marginRight: "5rem",
                            background: 'linear-gradient(90deg, rgba(6,196,235,1) 10%, rgba(175,21,213,1) 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            cursor: "pointer"
                        }}>
                        <Link href={ROUTE_CONFIG.HOME}>Sammi Stores</Link>
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {/* <SearchField
                    sx={{ 
                        flex: 1, 
                        marginRight: "20rem"
                     }}
                    value={searchBy}
                    placeholder={t("search_by_product_name...")}
                    onChange={(value: string) => setSearchBy(value)} /> */}
                    <ModeToggle />
                    <LanguageDropdown />
                    <ProductCart />
                    <IconButton color="inherit">
                        <Badge badgeContent={4}
                            color="primary"
                        >
                            <IconifyIcon icon="line-md:bell-loop" />
                        </Badge>
                    </IconButton>
                    {
                        user
                            ? (<UserMenu />)
                            : (
                                <Button onClick={handleNavigateLogin}
                                    variant="contained" sx={{ mt: 3, mb: 2, ml: 2, py: 1.5, width: "auto" }}>
                                    {t("login")}
                                </Button>
                            )
                    }
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default HorizontalLayout