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
import { getListRelatedProductBySlug, getProductDetail, getProductDetailPublicBySlug } from 'src/services/product'
import { useRouter } from 'next/router'
import { TProduct } from 'src/types/product'
import Image from 'next/image'
import { Typography } from '@mui/material'
import { hexToRGBA } from 'src/utils/hex-to-rgba'
import IconifyIcon from 'src/components/Icon'
import { convertUpdateProductToCart, formatFilter, formatPrice, isExpired } from 'src/utils'
import CustomTextField from 'src/components/text-field'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { getLocalProductFromCart, setLocalProductToCart } from 'src/helpers/storage'
import { updateProductToCart } from 'src/stores/order'
import CustomBreadcrumbs from 'src/components/custom-breadcrum'
import { ROUTE_CONFIG } from 'src/configs/route'
import { getAllReviews } from 'src/services/review'
import { TReviewItem } from 'src/types/review'
import ReviewCard from '../components/ReviewCard'
import { toast } from 'react-toastify'
import { resetInitialState } from 'src/stores/review'

type TProps = {}


const ProductDetailPage: NextPage<TProps> = () => {
    //States
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter();
    const productId = router.query.productId as string
    const [productData, setProductData] = useState<TProduct>({
        id: '',
        code: '',
        name: '',
        stockQuantity: 0,
        price: 0,
        ingredient: '',
        uses: '',
        discount: 0,
        usageGuide: '',
        brandId: 0,
        categoryId: 0,
        status: 0,
        images: [
            {
                id: 0,
                imageUrl: '',
                imageBase64: '',
                value: '',
                publicId: '',
                typeImage: '',
                displayOrder: 0
            }
        ]
    })
    const [listRelatedProduct, setListRelatedProduct] = useState<TProduct[]>([])

    const [productAmount, setProductAmount] = useState<number>(1)
    const [listReview, setListReview] = useState<TReviewItem[]>([])

    //hooks
    const { user } = useAuth()
    const { i18n } = useTranslation();


    //Redux
    const { orderItems } = useSelector((state: RootState) => state.order)
    const { reviews, isSuccessUpdate, isErrorUpdate, isLoading,
        errorMessageUpdate, isSuccessDelete, isErrorDelete, errorMessageDelete, typeError } = useSelector((state: RootState) => state.review)
    const dispatch: AppDispatch = useDispatch();
    //Theme
    const theme = useTheme();

    const breadcrumbItems = [
        { label: t('home'), href: '/', icon: <IconifyIcon color='primary' icon='healthicons:home-outline' /> },
        { label: t('product_detail'), href: '/product' },
        { label: productData?.name || t('product'), href: `/product/${productId}` },
    ];

    // const roundedAverageRating = productData?.averageRating
    //     ? parseFloat(Number(productData.averageRating).toFixed(1))
    //     : 0;

    //fetch api
    const fetchGetProductDetail = async (id: string) => {
        setLoading(true)
        await getProductDetail(id)
            .then(async response => {
                setLoading(false)
                console.log("response", response)
                const data = response?.result
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

    const fetchGetAllReviews = async (id: string) => {
        setLoading(true)
        await getAllReviews({
            params: {
                limit: -1, page: -1, order: 'createAt desc', isPublic: true, ...formatFilter({ productId: id })
            }
        })
            .then(async response => {
                setLoading(false)
                const data = response?.data?.reviews
                if (data) {
                    setListReview(data)
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
        const discountItem = item.startDate && item.endDate && isExpired(item?.startDate, item.endDate) ? item.discount : 0
        const listOrderItems = convertUpdateProductToCart(orderItems, {
            name: item?.name,
            amount: productAmount,
            images: item?.images,
            price: item?.price,
            discount: discountItem,
            productId: item.id,
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

    const handleBuyNow = (item: TProduct) => {
        handleUpdateProductToCart(item)
        router.push({
            pathname: ROUTE_CONFIG.MY_CART,
            query: {
                selected: item.id,
            }
        }, ROUTE_CONFIG.MY_CART)
    }

    useEffect(() => {
        if (productId) {
            fetchGetProductDetail(productId)
            // fetchGetListRelatedProduct(productId)
        }
    }, [productId])

    useEffect(() => {
        if (productData.id) {
            fetchGetAllReviews(productData.id)
        }
    }, [productData.id])

    /// update Review
    useEffect(() => {
        if (isSuccessUpdate) {
            toast.success(t("update_review_success"))
            fetchGetAllReviews(productData.id)
            dispatch(resetInitialState())
        } else if (isErrorUpdate && errorMessageUpdate && typeError) {
            toast.error(t("update_review_error"))
            dispatch(resetInitialState())
        }
    }, [isSuccessUpdate, isErrorUpdate, errorMessageUpdate, typeError])


    //delete Review
    useEffect(() => {
        if (isSuccessDelete) {
            toast.success(t("delete_review_success"))
            fetchGetAllReviews(productData.id)
            dispatch(resetInitialState())
        } else if (isErrorDelete && errorMessageDelete) {
            toast.error(errorMessageDelete)
            dispatch(resetInitialState())
        }
    }, [isSuccessDelete, isErrorDelete, errorMessageDelete])

    const memoCheckExpire = React.useMemo(() => {
        if (productData.startDate && productData.endDate) {
            return isExpired(productData.startDate, productData.endDate);
        }
    }, [productData])

    console.log("deta", productData)

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
                                <img src={productData?.images[0].imageUrl}
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
                                            {/* {roundedAverageRating} */}
                                        </Typography>
                                        <Rating name="half-rating"
                                            // value={roundedAverageRating}
                                            precision={0.1} />
                                    </Box>
                                    {/* <Typography>
                                        {!!productData?.totalReviews ? (
                                            <span>
                                                {productData?.totalReviews}{' '}
                                                {t("review")}
                                            </span>
                                        ) : (
                                            <span>{t("no_review")}</span>
                                        )}
                                    </Typography> */}
                                </Box>
                                {/* {productData?.sold > 0 && (
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        <>{t("product_sold", { count: productData?.sold })}</>
                                    </Typography>
                                )} */}
                                {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                                    <IconifyIcon icon="carbon:location" width={20} height={20} />
                                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: "14px", fontWeight: "bold", mt: 1 }}>
                                        {productData?.location?.name}
                                    </Typography>
                                </Box> */}
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
                                                {formatPrice(productData?.price - (productData?.price * productData?.discount * 100 / 100))}
                                            </>
                                        ) : (
                                            <>
                                                {formatPrice(productData?.price)}
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
                                            {formatPrice(productData?.price)}
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
                                                -{productData?.discount * 100}%
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
                                                max: productData?.stockQuantity
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
                                            if (productAmount < productData?.stockQuantity) {
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
                                        disabled={productData?.stockQuantity === 0}
                                        onClick={() => handleUpdateProductToCart(productData)}
                                        startIcon={<IconifyIcon icon="bx:cart" />}
                                        sx={{ height: "40px", mt: 3, py: 1.5, fontWeight: 600 }}>
                                        {t('add_cart')}
                                    </Button>
                                    <Button type="submit" variant="contained"
                                        disabled={productData?.stockQuantity === 0}
                                        onClick={() => handleBuyNow(productData)}
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
                        <Grid container item md={12} xs={12} sx={{
                            // borderRadius: "15px",
                            // border: `1px solid ${theme.palette.customColors.borderColor}`,
                            py: 5, px: 4, mt: 6
                        }} >
                            <Box sx={{
                                borderRadius: "15px",
                                backgroundColor: theme.palette.background.paper,
                            }}>
                                <Box sx={{
                                    display: "flex", alignItems: "center", gap: 2, mt: 2,
                                    padding: "8px",
                                    borderRadius: "8px"
                                }}>
                                    <Typography variant="h6" sx={{
                                        color: `rgba(${theme.palette.customColors.main}, 0.68)`,
                                        fontWeight: "bold",
                                        fontSize: "18px"
                                    }}>
                                        {t("product_usage_guide")}
                                    </Typography>
                                </Box>
                                <Box dangerouslySetInnerHTML={{ __html: productData?.usageGuide }}
                                    sx={{
                                        mt: 4,
                                        padding: 5,
                                        borderRadius: "10px",
                                        backgroundColor: theme.palette.background.paper,
                                        color: `rgba(${theme.palette.customColors.main}, 0.42)`,
                                        fontSize: "14px"
                                    }} />
                            </Box>
                            <Box sx={{
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: "15px",
                                py: 5, px: 4, mt: 6
                            }}>
                                <Typography variant="h6" sx={{
                                    color: theme.palette.customColors.main,
                                    fontWeight: "bold",
                                    fontSize: "18px"
                                }}>{t('review_product')} <b style={{ color: theme.palette.primary.main }}>{listReview.length}</b> {t('rating')}</Typography>
                                <Grid container spacing={8} mt={1}>
                                    {
                                        listReview?.map((review: TReviewItem) => {
                                            return (
                                                <Grid item key={review._id} md={12} xs={12}>
                                                    <ReviewCard item={review} />
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid container item md={12} xs={12}>
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
                                    {/* <Typography variant="h6" sx={{
                                        color: `rgba(${theme.palette.customColors.main}, 0.68)`,
                                        fontWeight: "bold",
                                        fontSize: "18px"
                                    }}>
                                        {t("related_products")}
                                    </Typography> */}
                                </Box>
                                {/* <Box sx={{
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
                                </Box> */}
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        </>
    )
}

export default ProductDetailPage
