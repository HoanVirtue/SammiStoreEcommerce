//React
import React, { useEffect } from "react"

//Next
import Image from "next/image";
import { useRouter } from "next/navigation";

// MUI Imports
import { Avatar, Badge, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from "@mui/material"
import { styled } from "@mui/material";

//components
import IconifyIcon from "../../../../components/Icon";

//hooks
import { useAuth } from "src/hooks/useAuth";

//Translate
import { useTranslation } from "../../../../../node_modules/react-i18next";

//Config
import { ROUTE_CONFIG } from "src/configs/route";

//Utils
import { toFullName } from "src/utils";
import { useSelector } from "react-redux";
import { RootState } from "src/stores";
import { Button } from "@mui/material";

type TProps = {}

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const UserMenu = (props: TProps) => {
    const { user, logout, setUser } = useAuth()

    const { userData } = useSelector((state: RootState) => state.auth)

    const userPermission = user?.role?.permissions ?? []
    //Translation
    const { t, i18n } = useTranslation()

    const router = useRouter()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigateMyProfile = () => {
        router.push(ROUTE_CONFIG.MY_PROFILE)
        handleClose()
    }

    const handleNavigateMyProduct = () => {
        router.push(ROUTE_CONFIG.MY_PRODUCT)
        handleClose()
    }

    const handleNavigateMyOrder = () => {
        router.push(ROUTE_CONFIG.MY_ORDER)
        handleClose()
    }

    const handleNavigateChangePassword = () => {
        router.push(ROUTE_CONFIG.CHANGE_PASSWORD)
        handleClose()
    }

    const handleNavigateManageSystem = () => {
        router.push(ROUTE_CONFIG.DASHBOARD)
        handleClose()
    }

    useEffect(() => {
        if (userData) {
            setUser({ ...userData })
        }
    }, [userData])


    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title={t("account")}>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>
                                {/* {
                                    user?.avatar ? (
                                        <Image src={user?.avatar || ""}
                                            alt={user?.fullName || ""}
                                            className="w-8 h-8 object-cover"
                                            objectFit="cover"
                                            width={0}
                                            height={0} />
                                    )
                                        :
                                        ( */}
                                            <IconifyIcon icon="ph:user-thin" />
                                        {/* )
                                } */}
                            </Avatar>
                        </StyledBadge>
                    </IconButton>
                </Tooltip>
            </Box>
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mx: 2, pb: 2, px: 2 }}>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >

                        <Avatar sx={{ width: 32, height: 32 }}>
                            {/* {
                                user?.avatar ? (
                                    <Image src={user?.avatar || ""}
                                        alt={user?.fullName || ""}
                                        className="w-8 h-8 object-cover"
                                        width={0}
                                        height={0} />
                                )
                                    :
                                    ( */}
                                        <IconifyIcon icon="ph:user-thin" />
                                    {/* )
                            } */}
                        </Avatar>
                    </StyledBadge>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography component="span">
                            {user?.fullName}
                        </Typography>
                        <Typography component="span">
                            {user?.role?.name}
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                {!userPermission.length && (
                    <MenuItem onClick={handleNavigateManageSystem}
                        sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        <IconifyIcon icon="tdesign:system-setting" />
                        {t("manage_system")}
                    </MenuItem>
                )}
                <MenuItem onClick={handleNavigateMyProfile}
                    sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <IconifyIcon icon="streamline:user-profile-focus" />
                    {t("my_account")}
                </MenuItem>
                <MenuItem onClick={handleNavigateMyProduct}
                    sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <IconifyIcon icon="iconoir:favourite-book" />
                    {t("fav_product")}
                </MenuItem>
                <MenuItem onClick={handleNavigateMyOrder}
                    sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <IconifyIcon icon="lsicon:work-order-abnormal-outline" />
                    {t("my_order")}
                </MenuItem>
                <MenuItem onClick={handleNavigateChangePassword}
                    sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <IconifyIcon icon="tabler:lock-password" />
                    {t("Đổi mật khẩu")}
                </MenuItem>
                <MenuItem onClick={logout}
                    sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Button fullWidth variant="contained" startIcon={
                        <IconifyIcon icon="humbleicons:logout" />
                    }
                        color="error"
                        sx={{ borderRadius: "6px" }}
                    >
                        {t("logout")}
                    </Button>
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}

export default UserMenu
