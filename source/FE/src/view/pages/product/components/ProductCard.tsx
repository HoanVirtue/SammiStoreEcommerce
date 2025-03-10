import React, { useEffect, useMemo } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia, { CardMediaProps } from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import IconifyIcon from 'src/components/Icon';
import { Box, Button, Fab, LinearProgress, Rating, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TProduct } from 'src/types/product';
import { hexToRGBA } from 'src/utils/hex-to-rgba';
import { useRouter } from 'next/router';
import { ROUTE_CONFIG } from 'src/configs/route';
import { convertUpdateProductToCart, formatPrice, isExpired } from 'src/utils';
import { AppDispatch, RootState } from 'src/stores';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductToCart } from 'src/stores/order';
import { getLocalProductFromCart, setLocalProductToCart } from 'src/helpers/storage';
import { useAuth } from 'src/hooks/useAuth';
import { likeProductAsync, unlikeProductAsync } from 'src/stores/product/action';
import { ButtonGroup } from '@mui/material';

interface TProductCard {
    item: TProduct
}

const StyledCard = styled(Card)(({ theme }) => ({
    position: "relative",
    overflow: "hidden",
    width: "100%",
    ".MuiCardMedia-root.MuiCardMedia-media": {
        objectFit: "contain"
    },
    "&:hover .button-group": {
        opacity: 1,
        visibility: "visible",
        right: 8,
        top: 8
    },
    "&:hover": {
        // boxShadow: theme.shadows[10],
        border: `2px solid ${theme.palette.customColors.borderColor}`,
    },
}));

const ButtonGroupWrapper = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: -100,
    right: -100,
    opacity: 0,
    visibility: "hidden",
    transition: "all 0.3s ease",
}));

// const ProductCard = (props: TProductCard) => {
const ProductCard = (props: any) => {

    //props
    const { item } = props

    //state

    //hooks
    const { t } = useTranslation()
    const theme = useTheme()
    const router = useRouter()
    const { user } = useAuth()

    //redux
    const dispatch: AppDispatch = useDispatch()
    const { orderItems } = useSelector((state: RootState) => state.order)

    //handler
    const handleNavigateProductDetail = (id: string) => {
        router.push(`${ROUTE_CONFIG.PRODUCT}/${id}`)
    }

    const handleUpdateProductToCart = (item: TProduct) => {
        const productCart = getLocalProductFromCart()
        const parseData = productCart ? JSON.parse(productCart) : {}
        const discountItem = item.startDate && item.endDate && isExpired(item?.startDate, item.endDate) ? item.discount : 0

        const listOrderItems = convertUpdateProductToCart(orderItems, {
            name: item?.name,
            amount: 1,
            images: item?.images,
            price: item?.price,
            discount: discountItem,
            productId: item.id,
            // slug: item?.slug
        })
        if (user?.id) {
            dispatch(
                updateProductToCart({
                    orderItems: listOrderItems
                })
            )
            setLocalProductToCart({ ...parseData, [user?.id]: listOrderItems })
        } else {
            router.replace({
                pathname: '/login',
                query: {
                    returnUrl: router.asPath
                }
            })
        }
    }

    const handleToggleFavoriteProduct = (id: string, isLiked: boolean) => {
        if (user?.id) {
            if (isLiked) {
                dispatch(unlikeProductAsync({ productId: id }))
            } else {
                dispatch(likeProductAsync({ productId: id }))
            }
        } else {
            router.replace({
                pathname: '/login',
                query: {
                    returnUrl: router.asPath
                }
            })
        }
    }


    const memoCheckExpire = useMemo(() => {
        if (item.startDate && item.endDate) {
            return isExpired(item.startDate, item.endDate);
        }
    }, [item])


    const soldPercentage = useMemo(() => {
        if (item.stockQuantity === 0) return 100;
        return ((item.sold || 0) / (item.stockQuantity + (item.sold || 0))) * 100;
    }, [item]);

    const progressColor = useMemo(() => {
        if (item.stockQuantity === 0) return 'error';
        if (item.stockQuantity <= 10) return 'warning';
        return 'primary';
    }, [item]);

    const statusText = useMemo(() => {
        if (item.stockQuantity === 0) return t('out_of_stock');
        if (item.stockQuantity <= 10) return t('selling_fast');
        return t('product_sold', { count: item.sold || 0 });
    }, [item, t]);

    return (
        <StyledCard sx={{ width: "100%", boxShadow: "none" }}>
            <CardMedia
                className="card-media"
                component="img"
                image={item?.images[0]?.imageUrl}
                alt="product image"
                sx={{
                    height: { xs: '200px', sm: '260px', md: '300px' },
                    width: '100%',
                    objectFit: 'contain',
                    transition: "transform 0.3s ease",
                    "&:hover": {
                        transform: "scale(0.9)",
                    },
                }}
            />
            <ButtonGroupWrapper className="button-group">
                <ButtonGroup orientation="vertical" aria-label="Vertical button group"
                    sx={{
                        gap: 2,
                        position: "absolute",
                        top: 2,
                        right: 2
                    }}>
                    <Tooltip title={t("add_to_cart")}>
                        <Fab aria-label="add" sx={{ backgroundColor: theme.palette.common.white }}>
                            <IconButton onClick={() => handleUpdateProductToCart(item)} disabled={item.stockQuantity === 0}>
                                <IconifyIcon color={theme.palette.primary.main}
                                    icon="bi:cart-plus" fontSize='1.5rem' />
                            </IconButton>
                        </Fab>
                    </Tooltip>
                    <Tooltip title={t("see_product_detail")}>
                        <Fab aria-label="see-detail" sx={{ backgroundColor: theme.palette.common.white }}>
                            <IconButton onClick={() => handleNavigateProductDetail(item?.id)}>
                                <IconifyIcon color={theme.palette.primary.main} icon="famicons:eye-outline" fontSize='1.5rem' />
                            </IconButton>
                        </Fab>
                    </Tooltip>
                    <Tooltip title={t("add_to_wishlist")}>
                        <Fab aria-label="add-to-fav" sx={{ backgroundColor: theme.palette.common.white }}>
                            <IconButton onClick={() => handleToggleFavoriteProduct(item?.id, Boolean(user && item?.likedBy?.includes(user.id)))}
                                aria-label="add to favorites">
                                {user && item?.likedBy?.includes(user.id) ? (
                                    <IconifyIcon icon="mdi:heart" color={theme.palette.primary.main} fontSize='1.5rem' />
                                ) : (
                                    <IconifyIcon icon="tabler:heart" color={theme.palette.primary.main} fontSize='1.5rem' />
                                )}
                            </IconButton>
                        </Fab>
                    </Tooltip>
                </ButtonGroup>
            </ButtonGroupWrapper>
            <CardContent sx={{ padding: "8px 12px 0px 12px", pb: "10px !important", }}>
                <Typography variant="h5" onClick={() => handleNavigateProductDetail(item?.slug)}
                    sx={{
                        color: theme.palette.primary.main,
                        fontWeight: "bold",
                        cursor: "pointer",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        "-webkitLineClamp": "2",
                        "-webkitBoxOrient": "vertical",
                        minHeight: "48px",
                        mt: 2
                    }}>
                    {item?.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px", mt: 1, mb: 1 }}>
                    <Rating defaultValue={item?.averageRating}
                        precision={0.1}
                        size='medium'
                        name='read-only'
                        sx={{
                            '& .MuiRating-icon': {
                                color: 'gold',
                            },
                        }} />
                    <Typography>
                        {!!item?.totalReviews ? (
                            <b>{item?.totalReviews} {t("product_reviews")}</b>
                        ) : (
                            <span>{t("no_review")}</span>
                        )}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Typography variant="h4" sx={{
                        color: theme.palette.primary.main,
                        fontWeight: "bold",
                        fontSize: "18px"
                    }}>
                        {item?.discount > 0 && memoCheckExpire ? (
                            <>
                                {formatPrice(item?.price * (100 - item?.discount * 100) / 100)}đ
                            </>
                        ) : (
                            <>
                                {formatPrice(item?.price)}đ
                            </>
                        )}
                    </Typography>
                    {item?.discount > 0 && memoCheckExpire && (
                        <Typography variant="h6" sx={{
                            color: theme.palette.error.main,
                            fontWeight: "bold",
                            textDecoration: "line-through",
                            fontSize: "14px"
                        }}>
                            {formatPrice(item?.price)}đ
                        </Typography>
                    )}
                    {item?.discount > 0 && memoCheckExpire && (
                        <Box sx={{
                            backgroundColor: hexToRGBA(theme.palette.error.main, 0.99),
                            width: "fit-content",
                            padding: "10px 10px",
                            height: "16px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "12px"
                        }}>
                            <Typography variant="h6" sx={{
                                color: theme.palette.common.white,
                                fontWeight: "bold",
                                fontSize: "10px",
                                lineHeight: "1.3",
                                whiteSpace: "nowrap",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                -{item?.discount * 100}%
                            </Typography>
                        </Box>
                    )}
                </Box>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <Box sx={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "column",
                        gap: "4px",
                        alignItems: "flex-start",
                        justifyContent: "center"
                    }}>
                        {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {item?.stockQuantity > 0 ? (
                                <>{t("product_count_in_stock", { count: item?.stockQuantity })}</>
                            ) : (
                                <span>
                                    {t('out_of_stock')}
                                </span>
                            )}
                        </Typography> */}

                        <Box sx={{ width: "100%", mt: 1, position: 'relative' }}>
                            <LinearProgress
                                variant="determinate"
                                value={soldPercentage}
                                color={progressColor}
                                sx={{
                                    height: 18, borderRadius: 6, width: '100%',
                                    backgroundColor: '#fedfe2',
                                    '& .MuiLinearProgress-bar': {
                                        backgroundImage: 'linear-gradient(to right, #d82e4d, #ff7f8e)',
                                        borderRadius: 6,
                                    }
                                }}
                            />
                            <Typography variant="body2"
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    color: progressColor === 'error' ? theme.palette.error.main : progressColor === 'warning' ? theme.palette.warning.main : theme.palette.text.primary,
                                    textShadow: '0px 0px 2px rgba(255, 255, 255, 0.8)',
                                    fontWeight: 'bold'
                                }}>
                                {statusText}
                            </Typography>
                        </Box>

                        {item?.location?.name && (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                                <IconifyIcon icon="carbon:location" width={20} height={20} />
                                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: "14px", fontWeight: "bold", mt: 1 }}>
                                    {item?.location?.name}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            </CardContent>
        </StyledCard>
    )
}

export default ProductCard