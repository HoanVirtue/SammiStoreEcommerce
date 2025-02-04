"use client"

//React
import React, { useEffect, useState } from 'react'

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
import { getAllProductsPublic } from 'src/services/product'
import { TProduct } from 'src/types/product'
import { Tabs } from '@mui/material'
import { Tab } from '@mui/material'
import { getAllProductCategories } from 'src/services/product-category'
import SearchField from 'src/components/search-field'
import ProductFilter from '../product/components/ProductFilter'

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

    const [sortBy, setSortBy] = useState("createdAt asc");
    const [searchBy, setSearchBy] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedRewview, setSelectedReview] = useState<string>('');

    const [categoryOptions, setCategoryOptions] = useState<{ label: string, value: string }[]>([])
    const [filterBy, setFilterBy] = useState<Record<string, string | string[]>>({});
    const [publicProducts, setPublicProducts] = useState({
        data: [],
        total: 0
    });
    const [selectedProductCategory, setSelectedProductCategory] = React.useState('');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setSelectedProductCategory(newValue);
    };


    //Translation
    const { t, i18n } = useTranslation();

    //Theme
    const theme = useTheme();

    //api 
    const handleGetListProduct = async () => {
        setLoading(true)
        const query = {
            params: { limit: pageSize, page: page, search: searchBy, order: sortBy, ...formatFilter(filterBy) }
        }
        await getAllProductsPublic(query).then((res) => {
            if (res?.data) {
                setLoading(false)
                setPublicProducts({
                    data: res?.data?.products,
                    total: res?.data?.totalCount
                })
            }
        })
        // dispatch(getAllProductsAsync(query));
    }

    const fetchAllCategories = async () => {
        setLoading(true)
        await getAllProductCategories({ params: { limit: -1, page: -1, search: '', order: '' } }).then((res) => {
            const data = res?.data?.productTypes
            if (data) {
                setCategoryOptions(data?.map((item: { name: string, _id: string }) => ({
                    label: item.name,
                    value: item._id
                })))
                setSelectedProductCategory(data?.[0]?._id)
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
    }

    const handleProductFilter = (review: string) =>{
        setSelectedReview(review)
    }

    useEffect(() => {
        handleGetListProduct();
    }, [sortBy, searchBy, page, pageSize, filterBy]);

    useEffect(() => {
        setFilterBy({ productType: selectedProductCategory, minStar: selectedRewview });
    }, [selectedProductCategory, selectedRewview]);

    useEffect(() => {
        fetchAllCategories()
    }, [])

    return (
        <>
            {loading && <Spinner />}
            <Box sx={{
                padding: '20px',
                height: 'fit-content',
            }}>
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
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                    <Box sx={{ width: '300px' }}>
                        <SearchField value={searchBy} onChange={(value: string) => setSearchBy(value)} />
                    </Box>
                </Box>
                <Box sx={{ width: '100%', height: '100%', mt: 4, mb: 4 }}>
                    <Grid container spacing={{ md: 6, sx: 4 }} mt={2}>
                        <Grid item md={3} display={{ md: "flex", xs: "none" }}>
                            <ProductFilter handleProductFilter={handleProductFilter} />
                        </Grid>
                        <Grid item md={9} xs={12}>
                            <Grid container spacing={{ md: 6, sx: 4 }}>
                                {publicProducts?.data?.length > 0 ? (
                                    <>
                                        {publicProducts?.data?.map((item: TProduct) => {
                                            return (
                                                <Grid item key={item._id} md={4} sm={6} xs={12}>
                                                    <ProductCard item={item} />
                                                </Grid>
                                            )
                                        })}
                                    </>
                                ) : (
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '100%',
                                        height: '100%',
                                    }}>
                                        <Typography variant="h4" sx={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
                                            {t("no_data")}
                                        </Typography>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <CustomPagination
                    pageSize={pageSize}
                    pageSizeOptions={PAGE_SIZE_OPTIONS}
                    onChangePagination={handleOnChangePagination}
                    page={page}
                    rowLength={10}
                    isHidden
                />
            </Box >
        </>
    )
}

export default HomePage
