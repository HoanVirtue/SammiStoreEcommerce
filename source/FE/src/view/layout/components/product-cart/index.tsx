//React
import React, { useEffect, useMemo } from "react"

//Next
import { useRouter } from "next/navigation";

// MUI Imports
import { Avatar, Badge, Box, Button, IconButton, Menu, MenuItem, MenuItemProps, styled, Tooltip, Typography, useTheme } from "@mui/material"


//components
import IconifyIcon from "../../../../components/Icon";

//hooks
import { useAuth } from "src/hooks/useAuth";

//Translate
import { useTranslation } from "react-i18next";


//Utils
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/stores";
import { TItemOrderProduct } from "src/types/order";
import { getLocalProductFromCart } from "src/helpers/storage";
import { updateProductToCart } from "src/stores/order";
import { hexToRGBA } from "src/utils/hex-to-rgba";
import { formatPrice } from "src/utils";
import { ROUTE_CONFIG } from "src/configs/route";
import NoData from "src/components/no-data";

type TProps = {}

const StyledMenuItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({

}))


const ProductCart = (props: TProps) => {
    const { user } = useAuth()

    const { orderItems } = useSelector((state: RootState) => state.order)
    const dispatch: AppDispatch = useDispatch()

    //Translation
    const { t, i18n } = useTranslation()
    const theme = useTheme()

    const router = useRouter()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    //handler
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigateProductDetail = (slug: string) => {
        router.push(`${ROUTE_CONFIG.PRODUCT}/${slug}`)
    }

    const handleNavigateMyCart = () => {
        router.push(`${ROUTE_CONFIG.MY_CART}`)
    }

    useEffect(() => {
        const productCart = getLocalProductFromCart()
        const parseData = productCart ? JSON.parse(productCart) : {}
        if (user?._id) {
            dispatch(updateProductToCart({
                orderItems: parseData[user?._id] || []
            }))
        }
    }, [user])

    const totalItems = useMemo(() => {
        const total = orderItems.reduce((result, current: TItemOrderProduct) => {
            return result + current.amount
        }, 0)
        return total
    }, [orderItems])


    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title={t("cart")}>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        color="inherit"
                        aria-controls={open ? 'product-cart' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        {!!orderItems.length ? (
                            <Badge color="primary" badgeContent={totalItems}>
                                <IconifyIcon icon="flowbite:cart-outline" />
                            </Badge>
                        ) : (
                            <IconifyIcon icon="flowbite:cart-outline" />
                        )}
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
                {orderItems.length > 0 ? (
                    <Box sx={{ maxHeight: "300px", maxWidth: "300px", overflow: "auto" }}>
                        {orderItems.map((item: TItemOrderProduct) => {
                            return (
                                <StyledMenuItem key={item.product} onClick={() => handleNavigateProductDetail(item.slug)}>
                                    <Avatar src={item?.image} />
                                    <Box sx={{ ml: 1 }}>
                                        <Typography sx={{ textWrap: "wrap", fontSize: "13px" }}>{item?.name}</Typography>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                            {item?.discount > 0 && (
                                                <Typography variant="h6" sx={{
                                                    color: theme.palette.error.main,
                                                    fontWeight: "bold",
                                                    textDecoration: "line-through",
                                                    fontSize: "10px"
                                                }}>
                                                    {formatPrice(item?.price)} VND
                                                </Typography>
                                            )}
                                            <Typography variant="h4" sx={{
                                                color: theme.palette.primary.main,
                                                fontWeight: "bold",
                                                fontSize: "12px"
                                            }}>
                                                {item?.discount > 0 ? (
                                                    <>
                                                        {formatPrice(item?.price * (100 - item?.discount) / 100)} VND
                                                    </>
                                                ) : (
                                                    <>
                                                        {formatPrice(item?.price)} VND
                                                    </>
                                                )}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography sx={{ textWrap: "wrap", fontSize: "13px", fontWeight: 600, ml: 2 }}>
                                        x{item?.amount}
                                    </Typography>
                                </StyledMenuItem>
                            )
                        })}
                        <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                            <Button type="submit" variant="contained"
                                onClick={handleNavigateMyCart}
                                sx={{ mt: 3, mb: 2, py: 1.5, mr: 2 }}>
                                {t('view_cart')}
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{
                        padding: "20px",
                        width: "100px",
                    }}>
                        <NoData imageWidth="60px" imageHeight="60px" textNodata={t("empty_cart")} />
                    </Box>
                )}
            </Menu>
        </React.Fragment>
    )
}

export default ProductCart
