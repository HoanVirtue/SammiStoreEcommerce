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
import HomeSearch from "src/components/home-search";

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
            <Toolbar sx={{ margin: '0 20px', display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }} >
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
                    <Link href={ROUTE_CONFIG.HOME}>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                        }}>
                            <IconifyIcon icon='ic:outline-shopify' fontSize='2rem' />
                            <Typography component="h1" variant="h2" color="primary" noWrap
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "fit-content",
                                    fontWeight: "600",
                                    background: 'linear-gradient(90deg, rgba(6,196,235,1) 10%, rgba(175,21,213,1) 90%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    cursor: "pointer"
                                }}>Sammi Stores</Typography>
                        </Box>
                    </Link>
                </Box>
                <HomeSearch
                    sx={{
                        flex: 1,
                    }}
                    value={searchBy}
                    placeholder={t("search_by_product_name...")}
                    onChange={(value: string) => setSearchBy(value)} />
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1
                }}>
                    <IconifyIcon fontSize='3rem' icon='line-md:phone-call-loop' />
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <Typography variant="h6" color='primary'>{t('customer_support')}</Typography>
                        <Typography variant="h6" color='primary' fontWeight='bold' >0372191612</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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