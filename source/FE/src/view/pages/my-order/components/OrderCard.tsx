"use client"

//React
import React, { Fragment, useEffect, useMemo, useState } from 'react'

//Next
import { NextPage } from 'next'

//MUI
import { Avatar, Button, Checkbox, Divider, Grid, Tooltip, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/material'

//Translate
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'

//Redux
import { AppDispatch, RootState } from 'src/stores'
import { useDispatch, useSelector } from 'react-redux'


//Other

import { useAuth } from 'src/hooks/useAuth'
import { cloneDeep, convertUpdateProductToCart, formatPrice } from 'src/utils'
import { TItemOrderProduct, TOrderItem } from 'src/types/order'
import IconifyIcon from 'src/components/Icon'
import CustomTextField from 'src/components/text-field'
import { updateProductToCart } from 'src/stores/order'
import { getLocalProductFromCart, setLocalProductToCart } from 'src/helpers/storage'
import NoData from 'src/components/no-data'
import { useRouter } from 'next/router'
import { ROUTE_CONFIG } from 'src/configs/route'
import { PAGE_SIZE_OPTIONS } from 'src/configs/gridConfig'

type TProps = {
    orderData: TOrderItem
}


const OrderCard: NextPage<TProps> = (props) => {

    const { orderData } = props

    //States
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

    //hooks
    const { user } = useAuth()
    const { i18n } = useTranslation();
    const router = useRouter()

    //Theme
    const theme = useTheme();

    return (
        <>
            {/* {loading || isLoading && <Spinner />} */}
            <Box sx={{
                backgroundColor: theme.palette.background.paper,
                padding: '2rem',
                borderRadius: '15px',
                width: "100%",
            }}>
                <Divider />
                <Box sx={{ mt: 4, mb: 4, display: 'flex', flexDirection: "column", gap: 4 }}>
                    {orderData?.orderItems.map((item: TItemOrderProduct) => {
                        return (
                            <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start", gap: 3 }}>
                                <Box sx={{ border: `1px solid ${theme.palette.customColors.borderColor}`, height: 'fit-content' }}>
                                    <Avatar src={item?.image} sx={{ width: "80px", height: "80px" }} />
                                </Box>
                                <Box>
                                    <Box>
                                        <Typography fontSize={"18px"}>{item?.name}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" sx={{
                                            color: item?.discount > 0 ? theme.palette.error.main : theme.palette.primary.main,
                                            fontWeight: "bold",
                                            textDecoration: item?.discount > 0 ? "line-through" : "normal",
                                            fontSize: "12px"
                                        }}>
                                            {formatPrice(item?.price)} VND
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="h4" sx={{
                                            color: theme.palette.primary.main,
                                            fontWeight: "bold",
                                            fontSize: "16px"
                                        }}>
                                            {item?.discount > 0 ? (
                                                <>
                                                    {formatPrice(item?.price * (100 - item?.discount) / 100)} VND
                                                </>
                                            ) : (
                                                <>
                                                    {formatPrice(item?.price)} VND
                                                </>
                                            )}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography fontSize={"16px"}>x{item?.amount}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        )
                    })}
                </Box>
                <Divider />
                <Box sx={{ display: "flex", width: '100%', justifyContent: "flex-end", mt: 3, gap: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "18px" }}>
                        {t('total_price')}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "18px", color: theme.palette.primary.main }}>
                        {formatPrice(orderData.totalPrice)} VND
                    </Typography>
                </Box>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    padding: 0,
                    gap: 4,
                    mt: 4
                }}>
                    <Button variant="contained"
                        color='error'
                        // onClick={() => handleUpdateProductToCart(productData)}
                        startIcon={<IconifyIcon icon="bx:cart" />}
                        sx={{ height: "40px", mt: 3, py: 1.5, fontWeight: 600 }}>
                        {t('buy_again')}
                    </Button>
                    <Button type="submit" variant="outlined"
                        // onClick={() => handleBuyNow(productData)}
                        startIcon={<IconifyIcon icon="icon-park-outline:buy" />}
                        sx={{ height: "40px", mt: 3, py: 1.5, fontWeight: 600 }}>
                        {t('view_detail')}
                    </Button>
                </Box>
            </Box >
        </>
    )
}

export default OrderCard
