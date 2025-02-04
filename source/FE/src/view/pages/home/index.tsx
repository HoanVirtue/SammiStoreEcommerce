"use client"

//React
import React, { useEffect, useState } from 'react'

//Next
import { NextPage } from 'next'

//MUI
import { Chip, ChipProps, Grid, styled, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/material'


//translation
import { useTranslation } from 'react-i18next'

//configs
import { PAGE_SIZE_OPTIONS } from 'src/configs/gridConfig'

//components

import CustomPagination from 'src/components/custom-pagination'
import Spinner from 'src/components/spinner'


import { formatFilter } from 'src/utils'
import ProductCard from './components/ProductCard'
import { getAllProductsPublic } from 'src/services/product'
import { TProduct } from 'src/types/product'
import { Tabs } from '@mui/material'
import { Tab } from '@mui/material'
import { getAllProductCategories } from 'src/services/product-category'
import SearchField from 'src/components/search-field'

type TProps = {

}

const HomePage: NextPage<TProps> = () => {
    //States
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

    const [sortBy, setSortBy] = useState("createdAt asc");
    const [searchBy, setSearchBy] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedRow, setSelectedRow] = useState<string[]>([]);

    const [categoryOptions, setCategoryOptions] = useState<{ label: string, value: string }[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [statusOptions, setStatusOptions] = useState<{ label: string, value: string }[]>([])
    const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
    const [filterBy, setFilterBy] = useState<Record<string, string | string[]>>({});
    const [publicProducts, setPublicProducts] = useState({
        data: [],
        total: 0
    });
    const [value, setValue] = React.useState('one');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };


    //Translation
    const { t, i18n } = useTranslation();

    //Theme
    const theme = useTheme();

    //api 
    const handleGetListProduct = async () => {
        const query = {
            params: { limit: pageSize, page: page, search: searchBy, order: sortBy, ...formatFilter(filterBy) }
        }
        await getAllProductsPublic(query).then((res) => {
            if (res?.data) {
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

    useEffect(() => {
        handleGetListProduct();
    }, [sortBy, searchBy, page, pageSize, filterBy]);

    useEffect(() => {
        setFilterBy({ productType: selectedCategory, status: selectedStatus });
    }, [selectedCategory, selectedStatus]);

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
                <Tabs
                    value={value}
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
                </Tabs>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                    <Box sx={{ width: '300px' }}>
                        <SearchField value={searchBy} onChange={(value: string) => setSearchBy(value)} />
                    </Box>
                </Box>
                <Box sx={{ width: '100%', height: '100%', mt: 4, mb: 4 }}>
                    <Grid container spacing={{ md: 6, sx: 4 }} mt={2}>
                        {publicProducts?.data?.length > 0 ? (
                            <>
                                {publicProducts?.data?.map((item: TProduct) => {
                                    return (
                                        <Grid item key={item._id} md={3} sm={6} xs={12}>
                                            <ProductCard item={item} />
                                        </Grid>
                                    )
                                })}
                            </>
                        ) : (
                            <Typography variant="h4" sx={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
                                {t("no_data")}
                            </Typography>
                        )}
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
