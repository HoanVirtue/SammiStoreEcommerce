"use client"

//React
import React, { useEffect, useState } from 'react'

//Next
import { NextPage } from 'next'

//MUI
import { IconButton, Rating, useTheme } from '@mui/material'
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
import { getListRelatedProductBySlug, getProductDetailPublicBySlug } from 'src/services/product'
import { useRouter } from 'next/router'
import { TProduct } from 'src/types/product'
import Image from 'next/image'
import { Typography } from '@mui/material'
import { hexToRGBA } from 'src/utils/hex-to-rgba'
import IconifyIcon from 'src/components/Icon'
import { convertUpdateProductToCart, formatPrice, isExpired } from 'src/utils'
import CustomTextField from 'src/components/text-field'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { getLocalProductFromCart, setLocalProductToCart } from 'src/helpers/storage'
import { updateProductToCart } from 'src/stores/order'
import NoData from 'src/components/no-data'
import ProductCard from '../components/ProductCard'
import RelatedProduct from '../components/RelatedProduct'
import CustomBreadcrumbs from 'src/components/custom-breadcrum'

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
    const [listRelatedProduct, setListRelatedProduct] = useState<TProduct[]>([])

    const [productAmount, setProductAmount] = useState<number>(1)

    //hooks
    const { user } = useAuth()
    const { i18n } = useTranslation();

    //redux
    const { orderItems } = useSelector((state: RootState) => state.order)
    const dispatch: AppDispatch = useDispatch();

    //Theme
    const theme = useTheme();

    const breadcrumbItems = [
        { label: t('home'), href: '/', icon: <IconifyIcon color='primary' icon='healthicons:home-outline' /> },
        { label: t('product_detail'), href: '/product' },
        { label: productData?.name || t('product'), href: `/product/${productId}` }, 
    ];

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

    const fetchGetListRelatedProduct = async (slug: string) => {
        setLoading(true)
        await getListRelatedProductBySlug({ params: { slug: slug } })
            .then(async response => {
                setLoading(false)
                const data = response?.data
                if (data) {
                    setListRelatedProduct(data.products)
                }
            })
            .catch(() => {
                setLoading(false)
            })
    }

    //handler
    const handleUpdateProductToCart = (item: TProduct) => {
        const productCart = getLocalProductFromCart()
        const parseData = productCart ? JSON.parse(productCart) : {}
        const discountItem = item.discountStartDate && item.discountEndDate && isExpired(item?.discountStartDate, item.discountEndDate) ? item.discount : 0
        const listOrderItems = convertUpdateProductToCart(orderItems, {
            name: item?.name,
            amount: productAmount,
            image: item?.image,
            price: item?.price,
            discount: discountItem,
            product: item._id,
            slug: item?.slug
        })
        if (user?._id) {
            dispatch(
                updateProductToCart({
                    orderItems: listOrderItems
                })
            )
            setLocalProductToCart({ ...parseData, [user?._id]: listOrderItems })
        } else {
            router.replace({
                pathname: '/login',
                query: {
                    returnUrl: router.asPath
                }
            })
        }
    }


    useEffect(() => {
        if (productId) {
            fetchGetProductDetail(productId)
            fetchGetListRelatedProduct(productId)
        }
    }, [productId])

    const memoCheckExpire = React.useMemo(() => {
        if (productData.discountStartDate && productData.discountEndDate) {
            return isExpired(productData.discountStartDate, productData.discountEndDate);
        }
    }, [productData])

    return (
        <>
            {loading && <Spinner />}
            <Box sx={{
                paddingLeft: '0.75rem',
                mb: 2,
                backgroundColor: theme.palette.grey[100],
            }}>
                <CustomBreadcrumbs items={breadcrumbItems} />
            </Box>
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
                                    className="w-full h-[300px] max-h-[400px] object-contain"
                                    width={0}
                                    height={0}
                                />
                            </Grid>
                            <Grid item md={5} xs={12}>
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
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        mt: 1,
                                        mb: 1
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
                                            name='read-only'
                                            sx={{
                                                '& .MuiRating-icon': {
                                                    color: 'gold',
                                                },
                                            }} />
                                    </Box>
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
                                </Box>
                                {productData?.sold > 0 && (
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        <>{t("product_sold", { count: productData?.sold })}</>
                                    </Typography>
                                )}
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                                    <IconifyIcon icon="carbon:location" width={20} height={20} />
                                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: "14px", fontWeight: "bold", mt: 1 }}>
                                        {productData?.location?.name}
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    display: "flex", alignItems: "center", gap: 2, mt: 2,
                                    backgroundColor: theme.palette.common.white,
                                    paddingTop: "8px",
                                    paddingBottom: "8px",
                                    borderRadius: "8px"
                                }}>
                                    <Typography variant="h4" sx={{
                                        color: theme.palette.primary.main,
                                        fontWeight: "bold",
                                        fontSize: "24px"
                                    }}>
                                        {productData?.discount > 0 && memoCheckExpire ? (
                                            <>
                                                {formatPrice(productData?.price - (productData?.price * productData?.discount / 100))} VND
                                            </>
                                        ) : (
                                            <>
                                                {formatPrice(productData?.price)} VND
                                            </>
                                        )}
                                    </Typography>
                                    {productData?.discount > 0 && memoCheckExpire && (
                                        <Typography variant="h6" sx={{
                                            color: theme.palette.error.main,
                                            fontWeight: "bold",
                                            textDecoration: "line-through",
                                            fontSize: "18px"
                                        }}>
                                            {formatPrice(productData?.price)} VND
                                        </Typography>
                                    )}
                                    {productData?.discount > 0 && memoCheckExpire && (
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
                                                whiteSpace: "nowrap"
                                            }}>
                                                -{productData?.discount}%
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: 'center',
                                    gap: 2
                                }}>
                                    <Typography>{t('quantity')}:</Typography>
                                    <IconButton sx={{
                                        border: `1px solid ${theme.palette.customColors.borderColor}`,
                                    }}
                                        onClick={() => {
                                            if (productAmount > 1) {
                                                setProductAmount((prev) => prev - 1)
                                            }
                                        }}
                                    >
                                        <IconifyIcon icon="eva:minus-fill" />
                                    </IconButton>
                                    <CustomTextField
                                        type='number'
                                        value={productAmount}
                                        InputProps={{
                                            inputMode: "numeric",
                                            inputProps: {
                                                min: 1,
                                                max: productData?.countInStock
                                            }
                                        }}
                                        onChange={(e) => {
                                            setProductAmount(+e.target.value);
                                        }}
                                        sx={{
                                            ".MuiInputBase-root.MuiFilledInput-root": {
                                                width: "50px",
                                                border: "none",
                                            },
                                            'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
                                                WebkitAppearance: "none",
                                                margin: 0
                                            },
                                            'input[type=number]': {
                                                MozAppearance: "textfield"
                                            },
                                            input: {
                                                padding: 0,
                                                paddingLeft: "12px",
                                                width: "25px"
                                            },
                                            fieldset: {
                                                border: "none"
                                            }
                                        }} />
                                    <IconButton sx={{
                                        border: `1px solid ${theme.palette.customColors.borderColor}`,
                                    }}
                                        onClick={() => {
                                            if (productAmount < productData?.countInStock) {
                                                setProductAmount((prev) => prev + 1)
                                            }
                                        }}>
                                        <IconifyIcon icon="ic:round-plus" />
                                    </IconButton>
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: 0,
                                    gap: 4,
                                    mt: 4
                                }}>
                                    <Button variant="contained"
                                        color='error'
                                        onClick={() => handleUpdateProductToCart(productData)}
                                        startIcon={<IconifyIcon icon="bx:cart" />}
                                        sx={{ height: "40px", mt: 3, py: 1.5, fontWeight: 600 }}>
                                        {t('add_cart')}
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
                <Grid container md={12} xs={12} mt={6}>
                    <Grid container>
                        <Grid container item md={9} xs={12} sx={{
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: "15px",
                            border: `1px solid ${theme.palette.customColors.borderColor}`,
                            py: 5, px: 4, mt: 6
                        }} >
                            <Box sx={{
                                width: "100%",
                                height: "100%",
                            }}>
                                <Box sx={{
                                    display: "flex", alignItems: "center", gap: 2, mt: 2,
                                    backgroundColor: theme.palette.background.paper,
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
                                    sx={{
                                        mt: 4,
                                        padding: 5,
                                        borderRadius: "10px",
                                        backgroundColor: theme.palette.background.paper,
                                        color: `rgba(${theme.palette.customColors.main}, 0.42)`,
                                        fontSize: "14px"
                                    }} />
                            </Box>
                        </Grid>
                        <Grid container item md={3} xs={12}>
                            <Box sx={{
                                width: "100%",
                                height: "100%",
                                backgroundColor: theme.palette.background.paper,
                                border: `1px solid ${theme.palette.customColors.borderColor}`,
                                borderRadius: "15px",
                                py: 5, px: 4, mt: 6
                            }}
                                marginLeft={{ md: 5, xs: 0 }}
                            >
                                <Box sx={{
                                    display: "flex", alignItems: "center", gap: 2, mt: 2,
                                    backgroundColor: theme.palette.background.paper,
                                    padding: "8px",
                                    borderRadius: "8px"
                                }}>
                                    <Typography variant="h6" sx={{
                                        color: `rgba(${theme.palette.customColors.main}, 0.68)`,
                                        fontWeight: "bold",
                                        fontSize: "18px"
                                    }}>
                                        {t("related_products")}
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    mt: 4,
                                    padding: 5,
                                }}>
                                    {listRelatedProduct.length > 0 ? (
                                        <>
                                            {listRelatedProduct.map((item: any) => {
                                                return (
                                                    <RelatedProduct item={item} key={item._id} />
                                                )
                                            })}
                                        </>
                                    ) : (
                                        <Box sx={{
                                            padding: "20px",
                                            width: "100%",
                                        }}>
                                            <NoData imageWidth="60px" imageHeight="60px" textNodata={t("empty_cart")} />
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </Grid>
                        <Grid container item md={8} xs={12} sx={{
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: "15px",
                            py: 5, px: 4, mt: 6
                        }} >
                            <Box sx={{
                                width: "100%",
                                height: "100%",
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: "15px",
                                py: 5, px: 4, mt: 6
                            }}>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        </>
    )
}

export default ProductDetailPage
