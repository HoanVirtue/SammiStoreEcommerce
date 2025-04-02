import { Box, Button, useTheme } from '@mui/material'
import { Card, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import IconifyIcon from 'src/components/Icon'
import { ROUTE_CONFIG } from 'src/configs/route'
import { getVNPayPaymentIpn } from 'src/services/payment'
import { formatPrice } from 'src/utils'

const PaymentPage = () => {

  const [paymentData, setPaymentData] = useState({
    status: "",
    totalPrice: 0
  })

  const { t } = useTranslation()
  const theme = useTheme()
  const router = useRouter()
  const { vnp_SecureHash, vnp_ResponseCode, vnp_TxnRef, ...rests } = router.query

  const fetchGetIpnVNPay = async (param: any) => {
    await getVNPayPaymentIpn({
      params: {
        ...param
      }
    }).then((res) => {
      const data = res?.data?.RspCode
      if (data) {
        setPaymentData({
          status: data.RspCode,
          totalPrice: data.totalPrice
        })
      }
    })
  }

  useEffect(() => {
    if (vnp_SecureHash && vnp_ResponseCode && vnp_TxnRef) {
      fetchGetIpnVNPay({ vnp_SecureHash, vnp_ResponseCode, orderId: vnp_TxnRef, vnp_TxnRef, ...rests })
    }
  }, [vnp_SecureHash, vnp_ResponseCode, vnp_TxnRef])

  return (
    <>
      <Card sx={{ padding: 4, borderRadius: "15px" }}>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "26px", color: theme.palette.primary.main }}>
            {formatPrice(paymentData?.totalPrice)}
          </Typography>
        </Box>
        {paymentData.status === "00" ? (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "20px" }}>
              <IconifyIcon icon="mdi:tick-circle-outline" fontSize="5rem" color={theme.palette.success.main} />
            </Box>
            <Typography fontWeight={600}>{t('payment_success')}</Typography>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "20px" }}>
              <IconifyIcon icon="mdi:alert-circle-outline" fontSize="5rem" color={theme.palette.warning.main} />
            </Box>
            <Typography fontWeight={600}>{t('payment_error')}</Typography>
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "20px" }}>
          <Button onClick={() => router.push(ROUTE_CONFIG.HOME)} variant="contained">{t('home')}</Button>
        </Box>
      </Card>
    </>
  )
}

export default PaymentPage
