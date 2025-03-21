import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import IconifyIcon from 'src/components/Icon';
import { Box, Rating } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TProduct } from 'src/types/product';
import { hexToRGBA } from 'src/utils/hex-to-rgba';
import { useRouter } from 'next/router';
import { ROUTE_CONFIG } from 'src/configs/route';
import { convertUpdateProductToCart, formatPrice, isExpired } from 'src/utils';
import { AppDispatch, RootState } from 'src/stores';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from 'src/hooks/useAuth';


interface TRelatedProduct {
    item: TProduct
}

const StyledCard = styled(Card)(({ theme }) => ({
    position: "relative",
    boxShadow: theme.shadows[8],
    ".MuiCardMedia-root.MuiCardMedia-media": {
        objectFit: "contain"
    }
}));

const RelatedProduct = (props: TRelatedProduct) => {

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
    const handleNavigateProductDetail = (slug: string) => {
        router.push(`${ROUTE_CONFIG.PRODUCT}/${slug}`)
    }

    const memoCheckExpire = React.useMemo(() => {
        if (item.discountStartDate && item.discountEndDate) {
            return isExpired(item.discountStartDate, item.discountEndDate);
        }
    }, [item])

    return (
        <StyledCard sx={{ width: "100%" }}>
            <CardMedia
                component="img"
                height="194"
                image={item?.image}
                alt="product image"
            />
            <CardContent sx={{ padding: "8px 12px" }}>
                <Typography variant="h5"
                    onClick={() => handleNavigateProductDetail(item?.slug)}
                    sx={{
                        color: theme.palette.primary.main,
                        fontWeight: "bold",
                        cursor: "pointer",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        "-webkitLineClamp": "2",
                        "-webkitBoxOrient": "vertical",
                        minHeight: "48px"
                    }}>
                    {item?.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {item?.discount > 0 && memoCheckExpire && (
                        <Typography variant="h6" sx={{
                            color: theme.palette.error.main,
                            fontWeight: "bold",
                            textDecoration: "line-through",
                            fontSize: "14px"
                        }}>
                            {formatPrice(item?.price)} VND
                        </Typography>
                    )}
                    <Typography variant="h4" sx={{
                        color: theme.palette.primary.main,
                        fontWeight: "bold",
                        fontSize: "18px"
                    }}>
                        {item?.discount > 0 && memoCheckExpire ? (
                            <>
                                {formatPrice(item?.price * (100 - item?.discount) / 100)} VND
                            </>
                        ) : (
                            <>
                                {formatPrice(item?.price)} VND
                            </>
                        )}
                    </Typography>
                    {item?.discount > 0 && memoCheckExpire && (
                        <Box sx={{
                            backgroundColor: hexToRGBA(theme.palette.error.main, 0.42),
                            width: "fit-content",
                            padding: "2px 4px",
                            height: "16px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "2px"
                        }}>
                            <Typography variant="h6" sx={{
                                color: theme.palette.error.main,
                                fontWeight: "bold",
                                fontSize: "10px",
                                lineHeight: "1.3",
                                whiteSpace: "nowrap"
                            }}>
                                -{item?.discount}%
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
                        flexDirection: "column",
                        gap: "4px",
                        alignItems: "flex-start",
                        justifyContent: "center"
                    }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {item?.countInStock > 0 ? (
                                <>{t("product_count_in_stock", { count: item?.countInStock })}</>
                            ) : (
                                <span>
                                    Hết hàng
                                </span>
                            )}
                        </Typography>
                        {item?.sold > 0 && (
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                <>{t("product_sold", { count: item?.sold })}</>
                            </Typography>
                        )}
                        {item?.location?.name && (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                                <IconifyIcon icon="carbon:location" width={20} height={20} />
                                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: "14px", fontWeight: "bold", mt: 1 }}>
                                    {item?.location?.name}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    {!!item?.averageRating && (
                        <Rating defaultValue={item?.averageRating}
                            precision={0.1}
                            size='small'
                            name='read-only' />
                    )}
                    <Typography>
                        {!!item?.totalReviews ? (
                            <b>{item?.totalReviews} {t("product_reviews")}</b>
                        ) : (
                            <span>{t("no_review")}</span>
                        )}
                    </Typography>
                </Box>
            </CardContent>
        </StyledCard>
    )
}

export default RelatedProduct