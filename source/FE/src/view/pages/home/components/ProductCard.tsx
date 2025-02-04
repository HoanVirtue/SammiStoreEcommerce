import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import IconifyIcon from 'src/components/Icon';
import { Box, Button, Rating } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TProduct } from 'src/types/product';


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
    console.log(item, "đ")

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
                    <Typography variant="h6" sx={{
                        color: theme.palette.error.main,
                        fontWeight: "bold",
                        textDecoration: "line-through",
                        fontSize: "14px"
                    }}>
                        111.111 VND
                    </Typography>
                    <Typography variant="h5" sx={{
                        color: theme.palette.primary.main,
                        fontWeight: "bold",
                        fontSize: "18px"
                    }}>
                        {item?.price}
                    </Typography>
                </Box>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Còn <b>{item?.countInStock}</b> sản phẩm trong kho
                    </Typography>
                    {!!item?.averageRating && (
                        <Rating
                            name="rating"
                            defaultValue={item?.averageRating}
                        />
                    )}
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