"use client"

//React
import React, { useEffect, useState } from 'react'

//Next
import { NextPage } from 'next'
import dynamic from 'next/dynamic'

//MUI
import { styled, Tab, TabsProps, useTheme } from '@mui/material'
import { Box } from '@mui/material'

//Configs
import { Grid } from '@mui/material'

//Translate
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'

//Redux
import { AppDispatch, RootState } from 'src/stores'
import { useDispatch, useSelector } from 'react-redux'
import { resetInitialState } from 'src/stores/product'

//Other
import { toast } from 'react-toastify'
import { Tabs } from '@mui/material'
import { PAGE_SIZE_OPTIONS } from 'src/configs/gridConfig'
import { getAllLikedProductsAsync, getAllViewedProductsAsync } from 'src/stores/product/action'
import { TProduct } from 'src/types/product'

// Dynamic imports
const Spinner = dynamic(() => import('src/components/spinner'), { ssr: false })
const SearchField = dynamic(() => import('src/components/search-field'), { ssr: false })
const ProductCard = dynamic(() => import('../../product/components/ProductCard'), { ssr: false })
const NoData = dynamic(() => import('src/components/no-data'), { ssr: false })
const CustomPagination = dynamic(() => import('src/components/custom-pagination'), { ssr: false })

type TProps = {}

const StyledTabs = styled(Tabs)<TabsProps>(({ theme }) => ({
    "&.MuiTabs-root": {
        borderBottom: "none"
    }
}))

const TYPE_OPTIONS = {
    liked: "1",
    viewed: "2"
}

const MyProductPage: NextPage<TProps> = () => {
    //hooks
    const { i18n, t } = useTranslation();

    //States
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

    const [loading, setLoading] = useState<boolean>(false)
    const [searchBy, setSearchBy] = useState("");
    const [tabType, setTabType] = useState(TYPE_OPTIONS.liked);
    const [typeOptions, setTypeOptions] = useState([
        {
            label: t("liked_products"),
            value: TYPE_OPTIONS.liked
        },
        {
            label: t("viewed_products"),
            value: TYPE_OPTIONS.viewed
        }
    ])


    //Theme
    const theme = useTheme();

    //Dispatch
    const dispatch: AppDispatch = useDispatch();
    const { isLoading, likedProducts, viewedProducts, isSuccessLike, isErrorLike, errorMessageLike, typeError, isSuccessUnlike, isErrorUnlike, errorMessageUnlike } = useSelector((state: RootState) => state.product)

    //API
    const handleGetListViewedProducts = () => {
        const query = {
            params: {
                take: -1,
                skip: 0,
                paging: false,
                orderBy: "name",
                dir: "asc",
                keywords: "''",
                filters: ""
            }
        }
        dispatch(getAllViewedProductsAsync(query));
    }

    const handleGetListLikedProducts = () => {
        const query = {
            params: {
                take: -1,
                skip: 0,
                paging: false,
                orderBy: "name",
                dir: "asc",
                keywords: "''",
                filters: ""
            }
        }
        dispatch(getAllLikedProductsAsync(query));
    }

    const handleGetListData = () => {
        if (tabType === TYPE_OPTIONS.liked) {
            handleGetListLikedProducts()
        } else {
            handleGetListViewedProducts()
        }
    }

    //Handler
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabType(newValue);
    };

    const handleOnChangePagination = (page: number, pageSize: number) => {
        setPage(page)
        setPageSize(pageSize)
        setSearchBy("")
        handleGetListData();
    }

    useEffect(() => {
        if (isSuccessLike) {
            toast.success(t("like_product_success"))
            handleGetListData();
            dispatch(resetInitialState())
        } else if (isErrorLike && errorMessageLike && typeError) {
            toast.error(t("like_product_error"))
            dispatch(resetInitialState())
        }
    }, [isSuccessLike, isErrorLike, errorMessageLike, typeError])

    useEffect(() => {
        if (isSuccessUnlike) {
            toast.success(t("unlike_product_success"))
            handleGetListData();
            dispatch(resetInitialState())
        } else if (isErrorUnlike && errorMessageUnlike && typeError) {
            toast.error(t("unlike_product_error"))
            dispatch(resetInitialState())
        }
    }, [isSuccessUnlike, isErrorUnlike, errorMessageUnlike, typeError])

    useEffect(() => {
        handleGetListData();
    }, [searchBy, tabType, page, pageSize])


    return (
        <>
            {loading || isLoading && <Spinner />}
            <Box sx={{
                // backgroundColor: theme.palette.background.paper,
            }}>
                <Grid container item md={12} xs={12} sx={{
                    borderRadius: "15px",
                    py: 5, px: 4
                }} >
                    <Box sx={{ width: '100%', height: 'fit-content' }}>
                        <StyledTabs
                            value={tabType}
                            onChange={handleChange}
                            aria-label="wrapped label tabs"
                        >
                            {typeOptions.map((option) => {
                                return (
                                    <Tab
                                        key={option.value}
                                        value={option.value}
                                        label={option.label}
                                        wrapped
                                    />
                                )
                            })}
                        </StyledTabs>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, width: '100%' }}>
                            <Box sx={{ width: '300px', mb: 2 }}>
                                <SearchField value={searchBy} placeholder={t('search_by_product_name')} onChange={(value: string) => setSearchBy(value)} />
                            </Box>
                        </Box>
                    </Box>
                    {tabType === TYPE_OPTIONS.liked && (
                        <Box sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Grid container md={12} xs={12} spacing={4}>
                                {likedProducts?.data?.length > 0 ? (
                                    <>
                                        {likedProducts?.data?.map((item: TProduct) => {
                                            return (
                                                <Grid item key={item.id} md={3} sm={6} xs={12}>
                                                    <ProductCard item={item} />
                                                </Grid>
                                            )
                                        })}
                                    </>
                                ) : (
                                    <Box sx={{
                                        padding: "20px",
                                        width: "100%",
                                    }}>
                                        <NoData imageWidth="60px" imageHeight="60px" textNodata={t("no_data")} />
                                    </Box>
                                )}
                            </Grid>
                        </Box>
                    )}
                    {tabType === TYPE_OPTIONS.viewed && (
                        <Box sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Grid container md={12} xs={12} spacing={4}>
                                {viewedProducts?.data?.length > 0 ? (
                                    <>
                                        {viewedProducts?.data?.map((item: TProduct) => {
                                            return (
                                                <Grid item key={item.id} md={3} sm={6} xs={12}>
                                                    <ProductCard item={item} />
                                                </Grid>
                                            )
                                        })}
                                    </>
                                ) : (
                                    <Box sx={{
                                        padding: "20px",
                                        width: "100%",

                                    }}>
                                        <NoData imageWidth="60px" imageHeight="60px" textNodata={t("no_data")} />
                                    </Box>
                                )}
                            </Grid>
                        </Box>
                    )}
                </Grid>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", mt: 4 }}>
                    <CustomPagination
                        pageSize={pageSize}
                        pageSizeOptions={PAGE_SIZE_OPTIONS}
                        onChangePagination={handleOnChangePagination}
                        page={page}
                        rowLength={tabType === TYPE_OPTIONS.liked ? likedProducts.total : viewedProducts.total}
                        isHidden
                    />
                </Box>
            </Box>
        </>
    )
}

export default MyProductPage
