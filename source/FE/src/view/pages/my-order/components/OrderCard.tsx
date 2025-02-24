"use client"

//React
import React, { useEffect, useState } from 'react'

//Next
import { NextPage } from 'next'

//MUI
import { Avatar, Button, Divider,Typography, useTheme } from '@mui/material'
import { Box } from '@mui/material'

//Translate
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'

//Redux
import { AppDispatch, RootState } from 'src/stores'
import { useDispatch, useSelector } from 'react-redux'


//Other

import { formatPrice } from 'src/utils'
import { TItemOrderProduct, TOrderItem } from 'src/types/order'
import IconifyIcon from 'src/components/Icon'
import ConfirmDialog from 'src/components/confirm-dialog'
import { cancelOrderAsync } from 'src/stores/order/action'


type TProps = {
    orderData: TOrderItem
}


const OrderCard: NextPage<TProps> = (props) => {

    const { orderData } = props

    //States
    const [openCancelDialog, setOpenCancelDialog] = useState<boolean>(false)

    //hooks
    const { t } = useTranslation();

    //redux
    const dispatch: AppDispatch = useDispatch();
    const {isSuccessCancel } = useSelector((state: RootState) => state.order)

    //Theme
    const theme = useTheme();

    const handleConfirm = () => {
        dispatch(cancelOrderAsync(orderData._id))
    }

        //cancel order
        useEffect(() => {
            if (isSuccessCancel) {
                setOpenCancelDialog(false)
            }
        }, [isSuccessCancel])

    return (
        <>
            {/* {loading || isLoading && <Spinner />} */}
            <ConfirmDialog
                open={openCancelDialog}
                onClose={()=>setOpenCancelDialog(false)}
                handleCancel={()=>setOpenCancelDialog(false)}
                handleConfirm={handleConfirm}
                title={t("confirm_cancel_order")}
                description={t("confirm_cancel_order_description")}
            />
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
                    {[0, 1].includes(orderData.status) && (
                        <Button variant="contained"
                            color='error'
                            onClick={() => setOpenCancelDialog(true)}
                            startIcon={<IconifyIcon icon="tabler:device-ipad-cancel" />}
                            sx={{ height: "40px", mt: 3, py: 1.5, fontWeight: 600 }}>
                            {t('cancel_order')}
                        </Button>
                    )}
                    <Button variant="contained"
                        color='primary'
                        // onClick={() => handleUpdateProductToCart(productData)}
                        startIcon={<IconifyIcon icon="bx:cart" />}
                        sx={{ height: "40px", mt: 3, py: 1.5, fontWeight: 600 }}>
                        {t('buy_again')}
                    </Button>
                    <Button type="submit" variant="outlined"
                        // onClick={() => handleBuyNow(productData)}
                        startIcon={<IconifyIcon icon="icon-park-outline:view-grid-detail" />}
                        sx={{ height: "40px", mt: 3, py: 1.5, fontWeight: 600 }}>
                        {t('view_detail')}
                    </Button>
                </Box>
            </Box >
        </>
    )
}

export default OrderCard
