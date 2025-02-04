import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import IconifyIcon from 'src/components/Icon';
import { Box, Button, Rating } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TProduct } from 'src/types/product';
import { hexToRGBA } from 'src/utils/hex-to-rgba';


interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}


interface TProductCard {
    item: TProduct
}

const StyledCard = styled(Card)(({ theme }) => ({
    position: "relative",
    boxShadow: theme.shadows[8],
}));

const ProductCard = (props: TProductCard) => {

    //props
    const { item } = props

    //state

    //translation
    const { t } = useTranslation()

    const theme = useTheme();

    return (
        <StyledCard sx={{ width: "100%" }}>
            <IconButton aria-label="add to favorites" sx={{ position: "absolute", top: "8px", right: "8px" }}>
                <IconifyIcon icon="mdi:heart" />
            </IconButton>
            {/* <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            /> */}
            <CardMedia
                component="img"
                height="194"
                image={item?.image}
                alt="product image"
            />
            <CardContent sx={{ padding: "8px 12px" }}>
                <Typography variant="h5" sx={{
                    color: theme.palette.primary.main,
                    fontWeight: "bold"
                }}>
                    {item?.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {item?.discount > 0 && (
                        <Typography variant="h6" sx={{
                            color: theme.palette.error.main,
                            fontWeight: "bold",
                            textDecoration: "line-through",
                            fontSize: "14px"
                        }}>
                            {item?.price}
                        </Typography>
                    )}
                    <Typography variant="h4" sx={{
                        color: theme.palette.primary.main,
                        fontWeight: "bold",
                        fontSize: "18px"
                    }}>
                        {item?.discount > 0 ? (
                            <>
                                {item?.price * (100 - item?.discount) / 100} VND
                            </>
                        ) : (
                            <>
                                {item?.price} VND
                            </>
                        )}
                    </Typography>
                    {item?.discount > 0 && (
                        <Box sx={{
                            backgroundColor: hexToRGBA(theme.palette.error.main, 0.42),
                            width: "25px",
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
                                lineHeight: "1.3"
                            }}>
                                {item?.discount}%
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
                    </Box>
                    {!!item?.averageRating && (
                        <Rating
                            name="rating"
                            defaultValue={item?.averageRating}
                        />
                    )}
                    <Typography>
                        {!!item?.totalReviews ? (
                            <b>{item?.totalReviews} {t("product_reviews")}</b>
                        ): (    
                            <span>{t("no_review")}</span>
                        )}
                    </Typography>
                </Box>
            </CardContent>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "0px 10px",
                gap: 2
            }}>
                <Button fullWidth variant="outlined"
                    startIcon={<IconifyIcon icon="bx:cart" />}
                    sx={{ height: "40px", mt: 3, py: 1.5, fontWeight: 600 }}>
                    {t('add_to_cart')}
                </Button>
                <Button fullWidth type="submit" variant="contained"
                    startIcon={<IconifyIcon icon="icon-park-outline:buy" />}
                    sx={{ height: "40px", mt: 3, py: 1.5, fontWeight: 600 }}>
                    {t('buy_now')}
                </Button>
            </Box>
        </StyledCard>
    )
}

export default ProductCard