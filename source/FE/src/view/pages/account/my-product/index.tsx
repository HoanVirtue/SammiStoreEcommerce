"use client"

//React
import React, { useEffect, useState } from 'react'

//Next
import { NextPage } from 'next'
import dynamic from 'next/dynamic'

//MUI
import { Box, Stack, useTheme } from '@mui/material'

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
import { PAGE_SIZE_OPTIONS } from 'src/configs/gridConfig'

// Dynamic imports
const Spinner = dynamic(() => import('src/components/spinner'), { ssr: false })
const SearchField = dynamic(() => import('src/components/search-field'), { ssr: false })
const NoData = dynamic(() => import('src/components/no-data'), { ssr: false })
const CustomPagination = dynamic(() => import('src/components/custom-pagination'), { ssr: false })

type TProps = {}

const MyProductPage: NextPage<TProps> = () => {
    //hooks
    const { i18n, t } = useTranslation();

    //States
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
    const [loading, setLoading] = useState<boolean>(false)
    const [searchBy, setSearchBy] = useState("");

    //Theme
    const theme = useTheme();

    //Dispatch
    const dispatch: AppDispatch = useDispatch();
    const { isLoading, isSuccessLike, isErrorLike, errorMessageLike, typeError, isSuccessUnlike, isErrorUnlike, errorMessageUnlike } = useSelector((state: RootState) => state.product)

    //Handler
    const handleOnChangePagination = (page: number, pageSize: number) => {
        setPage(page)
        setPageSize(pageSize)
        setSearchBy("")
    }

    useEffect(() => {
        if (isSuccessLike) {
            toast.success(t("like_product_success"))
            dispatch(resetInitialState())
        } else if (isErrorLike && errorMessageLike && typeError) {
            toast.error(t("like_product_error"))
            dispatch(resetInitialState())
        }
    }, [isSuccessLike, isErrorLike, errorMessageLike, typeError])

    useEffect(() => {
        if (isSuccessUnlike) {
            toast.success(t("unlike_product_success"))
            dispatch(resetInitialState())
        } else if (isErrorUnlike && errorMessageUnlike && typeError) {
            toast.error(t("unlike_product_error"))
            dispatch(resetInitialState())
        }
    }, [isSuccessUnlike, isErrorUnlike, errorMessageUnlike, typeError])

    return (
        <>
            {loading || isLoading && <Spinner />}
            <Box sx={{
                backgroundColor: theme.palette.background.paper,
                p: 4,
                borderRadius: '15px'
            }}>
                <Grid container item md={12} xs={12} sx={{
                    borderRadius: "15px",
                    py: 5, px: 4
                }} >
                    <Box sx={{ width: '100%', height: 'fit-content' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, width: '100%' }}>
                            <Box sx={{ width: '300px', mb: 2 }}>
                                <SearchField value={searchBy} placeholder={t('search_by_product_name')} onChange={(value: string) => setSearchBy(value)} />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Stack sx={{
                            padding: "20px",
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <NoData imageWidth="60px" imageHeight="60px" textNodata={t("no_data")} />
                        </Stack>
                    </Box>
                </Grid>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", mt: 4 }}>
                    <CustomPagination
                        pageSize={pageSize}
                        pageSizeOptions={PAGE_SIZE_OPTIONS}
                        onChangePagination={handleOnChangePagination}
                        page={page}
                        rowLength={0}
                        isHidden
                    />
                </Box>
            </Box>
        </>
    )
}

export default MyProductPage
