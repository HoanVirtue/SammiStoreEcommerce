//React
import React, { useEffect, useMemo, useState } from "react"

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
import { TItemCart } from "src/types/order";
import { getLocalProductFromCart } from "src/helpers/storage";
import { updateProductToCart } from "src/stores/order";
import { hexToRGBA } from "src/utils/hex-to-rgba";
import { formatPrice } from "src/utils";
import { ROUTE_CONFIG } from "src/configs/route";
import NoData from "src/components/no-data";
import { getProductDetail } from "src/services/product";
import { getCartsAsync } from "src/stores/cart/action";

type TProps = {}

const StyledMenuItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
}))

interface CartItem {
    productId: number;
    quantity: number;
    productName?: string;
    price?: number;
    discount?: number;
    images?: any[];
}

const ProductCart = (props: TProps) => {
    const { user } = useAuth()

    const [productImages, setProductImages] = useState<Record<string, string>>({})
    const { carts } = useSelector((state: RootState) => state.cart)
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

    const handleNavigateProductDetail = (id: number) => {
        router.push(`${ROUTE_CONFIG.PRODUCT}/${id}`)
    }

    const handleNavigateMyCart = () => {
        router.push(`${ROUTE_CONFIG.MY_CART}`)
    }

    const totalItemsCart = useMemo(() => {
        if (!carts?.data) return 0;
        return carts.data.reduce((result: number, current: CartItem) => {
            return result + current.quantity;
        }, 0);
    }, [carts]);

    useEffect(() => {
        if (user?.id) {
            dispatch(
                getCartsAsync({
                    params: {
                        take: -1,
                        skip: 0,
                        paging: false,
                        orderBy: 'name',
                        dir: 'asc',
                        keywords: "''",
                        filters: '',
                    },
                })
            );
        }
    }, [dispatch, user?.id]);

    useEffect(() => {
        const fetchImages = async () => {
            const imageMap: Record<string, string> = {};
            const cartItems = carts?.data as CartItem[] || [];
            for (const item of cartItems) {
                const res = await getProductDetail(item.productId);
                const data = res?.result;
                if (data) {
                    const image = data.images?.[0]?.imageUrl;
                    imageMap[item.productId] = image;
                }
            }
            setProductImages(imageMap);
        };

        if (carts?.data?.length > 0) {
            fetchImages();
        }
    }, [carts?.data]);

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
                        {!!carts?.data?.length ? (
                            <Badge color="primary" badgeContent={totalItemsCart}>
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
                {carts?.data?.length > 0 ? (
                    <Box sx={{ maxHeight: "300px", maxWidth: "300px", overflow: "auto" }}>
                        {carts?.data?.map((item: CartItem) => {
                            return (
                                <StyledMenuItem key={item.productId} onClick={() => handleNavigateProductDetail(item.productId)}>
                                    <Avatar src={productImages[item.productId]} />
                                    <Box sx={{ ml: 1 }}>
                                        <Typography sx={{ textWrap: "wrap", fontSize: "13px" }}>{item?.productName}</Typography>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                            <Typography variant="h4" sx={{
                                                color: theme.palette.primary.main,
                                                fontWeight: "bold",
                                                fontSize: "12px"
                                            }}>
                                                {item?.discount && item?.discount > 0 && item?.price ? (
                                                    <>
                                                        {formatPrice(item.price * (100 - item.discount * 100) / 100)}
                                                    </>
                                                ) : item?.price ? (
                                                    <>
                                                        {formatPrice(item.price)}
                                                    </>
                                                ) : null}
                                            </Typography>
                                            {(item?.discount && item?.discount > 0 && item?.price) ? (
                                                <Typography variant="h6" sx={{
                                                    color: theme.palette.error.main,
                                                    fontWeight: "bold",
                                                    textDecoration: "line-through",
                                                    fontSize: "10px"
                                                }}>
                                                    {formatPrice(item.price)}
                                                </Typography>
                                            ) : null}

                                        </Box>
                                    </Box>
                                    <Typography sx={{ textWrap: "wrap", fontSize: "13px", fontWeight: 600, ml: 2 }}>
                                        x{item?.quantity}
                                    </Typography>
                                </StyledMenuItem>
                            )
                        })}
                        <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", padding: '0 20px' }}>
                            <Button type="submit" variant="contained" fullWidth
                                onClick={handleNavigateMyCart}
                                sx={{ mt: 3, mb: 2, py: 1.5, mr: 2, borderRadius: "8px" }}>
                                {t('view_cart')}
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{
                        padding: "20px",
                        width: "fit-content",
                    }}>
                        <NoData imageWidth="60px" imageHeight="60px" textNodata={t("empty_cart")} />
                    </Box>
                )}
            </Menu>
        </React.Fragment>
    )
}

export default ProductCart
