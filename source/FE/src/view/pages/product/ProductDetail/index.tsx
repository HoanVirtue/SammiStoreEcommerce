"use client"

//React
import React, { useEffect, useState } from 'react'

//Next
import { NextPage } from 'next'

//MUI
import { Rating, useTheme } from '@mui/material'
import { Box, Button } from '@mui/material'



//Configs
import { Grid } from '@mui/material'

//Translate
import { t } from 'i18next'

//Redux


//Other
import Spinner from 'src/components/spinner'
import { useAuth } from 'src/hooks/useAuth'
import { useTranslation } from 'react-i18next'
import { getProductDetailPublicBySlug } from 'src/services/product'
import { useRouter } from 'next/router'
import { TProduct } from 'src/types/product'
import Image from 'next/image'
import { Typography } from '@mui/material'
import { hexToRGBA } from 'src/utils/hex-to-rgba'
import IconifyIcon from 'src/components/Icon'
import { formatPrice } from 'src/utils'

type TProps = {}

interface IDefaultValues {
    email: string
    address: string
    city: string
    phoneNumber: string
    role: string
    fullName: string
}
const ProductDetailPage: NextPage<TProps> = () => {
    //States
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter();
    const productId = router.query.productId as string
    const [productData, setProductData] = useState<TProduct | any>({})

    //hooks
    const { setUser } = useAuth()
    const { i18n } = useTranslation();

    //Theme
    const theme = useTheme();


    //fetch api
    const fetchGetProductDetail = async (slug: string) => {
        setLoading(true)
        await getProductDetailPublicBySlug(slug)
            .then(async response => {
                setLoading(false)
                const data = response?.data
                if (data) {
                    setProductData(data)
                }
            })
            .catch(() => {
                setLoading(false)
            })
    }


    useEffect(() => {
        if (productId) {
            fetchGetProductDetail(productId)
        }
    }, [productId])


    return (
        <>
            {loading && <Spinner />}
            <Grid container>
                <Grid container item md={12} xs={12} sx={{
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: "15px",
                    py: 5, px: 4
                }} >
                    <Box sx={{
                        width: "100%",
                        height: "100%",
                    }}>
                        <Grid container spacing={5}>
                            <Grid item md={5} xs={12}>
                                <Image src={productData?.image}
                                    alt={productData?.name}
                                    className="w-full h-full object-cover"
                                    objectFit="contain"
                                    width={0}
                                    height={0}
                                />
                            </Grid>
                            <Grid item md={7} xs={12}>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mt: 2
                                }}>
                                    <Typography variant="h5"
                                        sx={{
                                            color: theme.palette.primary.main,
                                            fontWeight: "bold",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            display: "-webkit-box",
                                            "-webkitLineClamp": "2",
                                            "-webkitBoxOrient": "vertical"
                                        }}>
                                        {productData?.name}
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1
                                }}>
                                    {productData?.averageRating > 0 && (
                                        <Box sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1
                                        }}>
                                            <Typography variant="h5"
                                                sx={{
                                                    color: theme.palette.primary.main,
                                                    fontWeight: "bold",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    display: "-webkit-box",
                                                    "-webkitLineClamp": "2",
                                                    "-webkitBoxOrient": "vertical",
                                                    textDecoration: "underline",
                                                    fontSize: "16px"
                                                }}>
                                                {productData?.averageRating}
                                            </Typography>
                                            <Rating defaultValue={productData?.averageRating}
                                                precision={0.1}
                                                size='small'
                                                name='read-only' />
                                        </Box>
                                    )}
                                    <Typography>
                                        {!!productData?.totalReviews ? (
                                            <span>
                                                {productData?.totalReviews}
                                                {t("review")}
                                            </span>
                                        ) : (
                                            <span>{t("no_review")}</span>
                                        )}
                                    </Typography>
                                    {productData?.sold > 0 && (
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            <>{t("product_sold", { count: productData?.sold })}</>
                                        </Typography>
                                    )}
                                </Box>
                                <Box sx={{
                                    display: "flex", alignItems: "center", gap: 2, mt: 2,
                                    backgroundColor: theme.palette.customColors.bodyBg,
                                    padding: "8px",
                                    borderRadius: "8px"
                                }}>
                                    {productData?.discount > 0 && (
                                        <Typography variant="h6" sx={{
                                            color: theme.palette.error.main,
                                            fontWeight: "bold",
                                            textDecoration: "line-through",
                                            fontSize: "18px"
                                        }}>
                                            {formatPrice(productData?.price)} VND
                                        </Typography>
                                    )}
                                    <Typography variant="h4" sx={{
                                        color: theme.palette.primary.main,
                                        fontWeight: "bold",
                                        fontSize: "24px"
                                    }}>
                                        {productData?.discount > 0 ? (
                                            <>
                                                {formatPrice(productData?.price - (productData?.price * productData?.discount / 100))} VND
                                            </>
                                        ) : (
                                            <>
                                                {formatPrice(productData?.price)} VND
                                            </>
                                        )}
                                    </Typography>
                                    {productData?.discount > 0 && (
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
                                                -{productData?.discount}%
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "0px 10px",
                                    gap: 4,
                                    mt: 4
                                }}>
                                    <Button variant="outlined"
                                        startIcon={<IconifyIcon icon="bx:cart" />}
                                        sx={{ height: "40px", mt: 3, py: 1.5, fontWeight: 600 }}>
                                        {t('add_to_cart')}
                                    </Button>
                                    <Button type="submit" variant="contained"
                                        startIcon={<IconifyIcon icon="icon-park-outline:buy" />}
                                        sx={{ height: "40px", mt: 3, py: 1.5, fontWeight: 600 }}>
                                        {t('buy_now')}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid container item md={12} xs={12} sx={{
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: "15px",
                    py: 5, px: 4, mt: 6
                }} >
                    <Box sx={{
                        width: "100%",
                        height: "100%",
                    }}>
                        <Box sx={{
                            display: "flex", alignItems: "center", gap: 2, mt: 2,
                            backgroundColor: theme.palette.customColors.bodyBg,
                            padding: "8px",
                            borderRadius: "8px"
                        }}>
                            <Typography variant="h6" sx={{
                                color: `rgba(${theme.palette.customColors.main}, 0.68)`,
                                fontWeight: "bold",
                                fontSize: "18px"
                            }}>
                                {t("product_description")}
                            </Typography>
                        </Box>
                        <Box dangerouslySetInnerHTML={{ __html: productData?.description }}
                            sx={{ mt: 4 }} />
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default ProductDetailPage
