"use client"

//React
import React, { useEffect, useRef, useState } from 'react'

//Next
import { NextPage } from 'next'

//MUI
import { Chip, ChipProps, Grid, styled, TabsProps, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/material'


//translation
import { useTranslation } from 'react-i18next'

//configs
import { PAGE_SIZE_OPTIONS } from 'src/configs/gridConfig'

//components

import CustomPagination from 'src/components/custom-pagination'
import Spinner from 'src/components/spinner'


import { formatFilter } from 'src/utils'
import ProductCard from '../product/components/ProductCard'
import { getAllProducts, getAllProductsPublic } from 'src/services/product'
import { TProduct } from 'src/types/product'
import { Tabs } from '@mui/material'
import { Tab } from '@mui/material'
import { getAllProductCategories } from 'src/services/product-category'
import SearchField from 'src/components/search-field'
import ProductFilter from '../product/components/ProductFilter'
import NoData from 'src/components/no-data'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import toast from 'react-hot-toast'
import { resetInitialState } from 'src/stores/product'
import Banner from './components/banner'
import OutstandingCategory from './components/category'
import { getLoginUser } from 'src/services/auth'
import axios from 'axios'
import { API_ENDPOINT } from 'src/configs/api'
import ListVoucher from './components/voucher'
import HotSale from './components/hot-sale'
import TopSale from './components/top-sale'

type TProps = {}

const StyledTabs = styled(Tabs)<TabsProps>(({ theme }) => ({
    "&.MuiTabs-root": {
        borderBottom: "none"
    }
}))

const HomePage: NextPage<TProps> = () => {
    //States
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

    const [sortBy, setSortBy] = useState("createdDate asc");
    const [searchBy, setSearchBy] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedReview, setSelectedReview] = useState<string>('');
    const [selectedLocation, setSelectedLocation] = useState<string>('');

    const [categoryOptions, setCategoryOptions] = useState<{ label: string, value: string }[]>([])
    const [filterBy, setFilterBy] = useState<Record<string, string | string[]>>({});
    const [publicProducts, setPublicProducts] = useState({
        data: [],
        total: 0
    });
    const [selectedProductCategory, setSelectedProductCategory] = React.useState('');
    const [cityOptions, setCityOptions] = useState<{ label: string, value: string }[]>([])

    const firstRender = useRef<boolean>(false)


    //Translation
    const { t, i18n } = useTranslation();

    //Theme
    const theme = useTheme();

    //Redux
    const dispatch: AppDispatch = useDispatch()
    const { isSuccessLike, isErrorLike, errorMessageLike, isSuccessUnlike, isErrorUnlike, errorMessageUnlike, typeError, isLoading } = useSelector((state: RootState) => state.product)


    //api 
    const handleGetListProduct = async () => {
        setLoading(true)
        const query = {
            params: {
                filters: "",
                take: pageSize,
                skip: (page - 1) * pageSize,
                orderBy: "createdDate",
                dir: "asc",
                paging: true,
                keywords: "''",
            },
        };
        await getAllProducts(query).then((res) => {
            if (res?.result) {
                setLoading(false)
                setPublicProducts({
                    data: res?.result?.subset,
                    total: res?.result?.totalItemCount
                })
            }
        })
    }

    const fetchAllCategories = async () => {
        setLoading(true)
        await getAllProductCategories({
            params: {
                filters: "",
                take: pageSize,
                skip: (page - 1) * pageSize,
                orderBy: "createdDate",
                dir: "asc",
                paging: true,
                keywords: "''",
            },
        }).then((res) => {
            const data = res?.result?.subset
            if (data) {
                setCategoryOptions(data?.map((item: { name: string, _id: string }) => ({
                    label: item.name,
                    value: item._id
                })))
                setSelectedProductCategory(data?.[0]?._id)
                firstRender.current = true
            }
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
        })
    }


    //handlers
    const handleOnChangePagination = (page: number, pageSize: number) => {
        setPage(page)
        setPageSize(pageSize)
        setSearchBy("")
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setSelectedProductCategory(newValue);
    };


    const handleProductFilter = (value: string, type: string) => {
        switch (type) {
            case 'review': {
                setSelectedReview(value)
                break
            }
            case 'location': {
                setSelectedLocation(value)
                break
            }
        }
    }

    const handleResetFilter = () => {
        setSelectedReview('')
        setSelectedLocation('')
    }

    useEffect(() => {
        fetchAllCategories()
    }, [])

    // useEffect(() => {
    //     if (firstRender.current) {
    //         handleGetListProduct();
    //     }
    // }, [sortBy, searchBy, page, pageSize, filterBy]);

    useEffect(() => {
        if (firstRender.current) {
            setFilterBy({ productType: selectedProductCategory, minStar: selectedReview, productLocation: selectedLocation });
        }
    }, [selectedProductCategory, selectedReview, selectedLocation]);

    useEffect(() => {
        if (isSuccessLike) {
            toast.success(t("like_product_success"))
            handleGetListProduct();
            dispatch(resetInitialState())
        } else if (isErrorLike && errorMessageLike && typeError) {
            toast.error(t("like_product_error"))
            dispatch(resetInitialState())
        }
    }, [isSuccessLike, isErrorLike, errorMessageLike, typeError])

    useEffect(() => {
        if (isSuccessUnlike) {
            toast.success(t("unlike_product_success"))
            handleGetListProduct();
            dispatch(resetInitialState())
        } else if (isErrorUnlike && errorMessageUnlike && typeError) {
            toast.error(t("unlike_product_error"))
            dispatch(resetInitialState())
        }
    }, [isSuccessUnlike, isErrorUnlike, errorMessageUnlike, typeError])

    return (
        <>
            {/* {loading && <Spinner />} */}
            <Box sx={{
                height: 'fit-content',
                mt: '4.6rem',
                backgroundColor: theme.palette.background.paper
            }}>
                {/* <Box sx={{width: '100%', height: 'fit-content'}}>
                    <StyledTabs
                        value={selectedProductCategory}
                        onChange={handleChange}
                        aria-label="wrapped label tabs example"
                    >
                        {categoryOptions.map((option) => {
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
                </Box> */}
                {/* <Box sx={{width: '100%', height: '9px', backgroundColor: '#e5677d'}}></Box> */}
                <Banner />
                <OutstandingCategory />
                <ListVoucher />
                <HotSale />
                <TopSale />
                {/* <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 4 }}>
                    <Box sx={{ width: '300px' }}>
                        <SearchField value={searchBy} placeholder={t('search_by_product_name')} onChange={(value: string) => setSearchBy(value)} />
                    </Box>
                </Box>
                <Box sx={{ width: '100%', height: '100%', mt: 4, mb: 4 }}>
                    <Grid container spacing={{ md: 4, sx: 2 }} mt={2}>
                        <Grid item md={3} display={{ md: "flex", xs: "none" }}>
                            <ProductFilter
                                selectedLocation={selectedLocation}
                                selectedReview={selectedReview}
                                handleReset={handleResetFilter}
                                handleProductFilter={handleProductFilter}
                                cityOptions={cityOptions} />
                        </Grid>
                        <Grid item md={9} xs={12}>
                            <Grid container spacing={{ md: 4, sx: 2 }}>
                                {publicProducts?.data?.length > 0 ? (
                                    <>
                                        {publicProducts?.data?.map((item: TProduct) => {
                                            return (
                                                <Grid item key={item.id} md={4} sm={6} xs={12}>
                                                    <ProductCard item={item} />
                                                </Grid>
                                            )
                                        })}
                                    </>
                                ) : (
                                    <Box sx={{
                                        padding: "20px",
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"    
                                    }}>
                                        <NoData imageWidth="60px" imageHeight="60px" textNodata={t("no_data")} />
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box> */}
                {/* <CustomPagination
                    pageSize={pageSize}
                    pageSizeOptions={PAGE_SIZE_OPTIONS}
                    onChangePagination={handleOnChangePagination}
                    page={page}
                    rowLength={publicProducts.total}
                    isHidden
                /> */}
            </Box >
        </>
    )
}

export default HomePage
