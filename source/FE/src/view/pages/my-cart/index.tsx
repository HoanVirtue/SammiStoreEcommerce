"use client"

//React
import React, { Fragment, useEffect } from 'react'

//Next
import { NextPage } from 'next'

//MUI
import { Avatar, Button, Checkbox, Divider, Grid, IconButton, Tooltip, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/material'

//Translate
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'

//Redux
import { AppDispatch, RootState } from 'src/stores'
import { useDispatch, useSelector } from 'react-redux'


//Other

import Spinner from 'src/components/spinner'
import { useAuth } from 'src/hooks/useAuth'
import { formatPrice } from 'src/utils'
import product from 'src/stores/product';
import { TItemOrderProduct } from 'src/types/order-product'
import { hexToRGBA } from 'src/utils/hex-to-rgba'
import IconifyIcon from 'src/components/Icon'
import CustomTextField from 'src/components/text-field'

type TProps = {}

interface IDefaultValues {
    email: string
    address: string
    city: string
    phoneNumber: string
    role: string
    fullName: string
}
const MyCartPage: NextPage<TProps> = () => {
    //States
    const [loading, setLoading] = React.useState<boolean>(false)

    //hooks
    const { setUser } = useAuth()
    const { i18n } = useTranslation();

    //Theme
    const theme = useTheme();

    //Dispatch
    const dispatch: AppDispatch = useDispatch();
    const { orderItems } = useSelector((state: RootState) => state.orderProduct)

    return (
        <>
            {/* {loading || isLoading && <Spinner />} */}
            <Box sx={{
                backgroundColor: theme.palette.background.paper,
                display: 'flex',
                alignItems: 'center',
                padding: '40px',
                borderRadius: '15px'
            }}>
                <Grid container>
                    <Grid container>
                        <Grid item md={1} xs={12}>
                            <Tooltip title={t("select_all")}>
                                <Checkbox />
                            </Tooltip>
                        </Grid>
                        <Grid item md={2} xs={12}>
                            <Typography fontWeight={600}>{t("product_image")}</Typography>
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <Typography  fontWeight={600}>{t("product_name")}</Typography>
                        </Grid>
                        <Grid item md={2} xs={12}>
                            <Typography  fontWeight={600}>{t("price")}</Typography>
                        </Grid>
                        <Grid item md={2} xs={12}>
                            <Typography  fontWeight={600}>{t("discount_price")}</Typography>
                        </Grid>
                        <Grid item md={1} xs={12}>
                            <Typography  fontWeight={600}>{t("quantity")}</Typography>
                        </Grid>
                        <Grid item md={1} xs={12}>
                            <Typography>
                                <Tooltip title={t("delete_all")}>
                                    <IconButton>
                                        <IconifyIcon icon="mdi:delete-outline" />
                                    </IconButton>
                                </Tooltip>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container spacing={2}>
                        {orderItems.map((item: TItemOrderProduct, index: number) => {
                            return (
                                <Fragment key={item?.product}>
                                    <>
                                        <Grid item md={1}>
                                            <Checkbox />
                                        </Grid>
                                        <Grid item md={2}>
                                            <Avatar src={item?.image} sx={{ width: "100px", height: "100px" }} />
                                        </Grid>
                                        <Grid item md={3}>
                                            <Typography fontSize={"24px"}>{item?.name}</Typography>
                                        </Grid>
                                        <Grid item md={2}>
                                            {item?.discount > 0 && (
                                                <Typography variant="h6" sx={{
                                                    color: theme.palette.error.main,
                                                    fontWeight: "bold",
                                                    textDecoration: "line-through",
                                                    fontSize: "14px"
                                                }}>
                                                    {formatPrice(item?.price)} VND
                                                </Typography>
                                            )}
                                        </Grid>
                                        <Grid item md={2}>
                                            <Typography variant="h4" sx={{
                                                color: theme.palette.primary.main,
                                                fontWeight: "bold",
                                                fontSize: "18px"
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
                                        </Grid>
                                        <Grid item md={1}>
                                            <IconButton>
                                                <IconifyIcon icon="eva:minus-fill" />
                                            </IconButton>
                                            <CustomTextField value={item?.amount} sx={{

                                                ".MuiInputBase-root.MuiFilledInput-root": {
                                                    width: "30px",
                                                    border: "none",
                                                }
                                            }} />
                                            <IconButton>
                                                <IconifyIcon icon="ic:round-plus" />
                                            </IconButton>
                                        </Grid>
                                        <Grid item md={1}>
                                            <IconButton>
                                                <IconifyIcon icon="mdi:delete-outline" />
                                            </IconButton>
                                        </Grid>
                                    </>
                                    {index !== orderItems.length - 1 && <Divider />}
                                </Fragment>
                            )
                        })}
                    </Grid>
                </Grid>
            </Box >
            <Box sx={{display: "flex", justifyContent: "flex-end", mt: 3}}>
                <Button type="submit" variant="contained"
                    startIcon={<IconifyIcon icon="icon-park-outline:buy" />}
                    sx={{ height: "40px", mt: 3, py: 1.5, fontWeight: 600 }}>
                    {t('buy_now')}
                </Button>
            </Box>
        </>
    )
}

export default MyCartPage
