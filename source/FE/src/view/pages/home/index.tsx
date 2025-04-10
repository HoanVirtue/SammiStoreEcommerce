"use client"

//React
import React, { useEffect, useRef, useState } from 'react'

//Next
import { NextPage } from 'next'

//MUI
import { Chip, ChipProps, Grid, styled, Tabs, TabsProps, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/material'


//translation
import { useTranslation } from 'react-i18next'

//configs
import { PAGE_SIZE_OPTIONS } from 'src/configs/gridConfig'

//components
import { getAllProducts } from 'src/services/product'
import { getAllProductCategories } from 'src/services/product-category'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { toast } from 'react-toastify'
import { resetInitialState } from 'src/stores/product'
import dynamic from 'next/dynamic'

const Banner = dynamic(() => import('./components/banner'), { ssr: false })
const OutstandingCategory = dynamic(() => import('./components/category'), { ssr: false })
const ListVoucher = dynamic(() => import('./components/voucher'), { ssr: false })
const HotSale = dynamic(() => import('./components/hot-sale'), { ssr: false })
const TopSale = dynamic(() => import('./components/top-sale'), { ssr: false })

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
            <Box sx={{
                height: 'fit-content',
                backgroundColor: theme.palette.background.paper
            }}>
                <Banner />
                <OutstandingCategory />
                <ListVoucher />
                <HotSale />
                <TopSale />

            </Box >
        </>
    )
}

export default HomePage
