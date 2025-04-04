import { Box, Button, useTheme } from '@mui/material'
import { Card, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import IconifyIcon from 'src/components/Icon'
import { ROUTE_CONFIG } from 'src/configs/route'
import { getVNPayPaymentIpn } from 'src/services/payment'
import { m } from 'framer-motion'

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
    <Box sx={{
      minHeight: '50vh',
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 2
    }}>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        color: theme.palette.primary.main,
        textAlign: 'center'
      }}>
        <m.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
          <Box sx={{ fontSize: 128 }}>🎉</Box>
        </m.div>
        <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
          Đặt hàng thành công
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.primary, maxWidth: '500px' }}>
          Chúc mừng quý khách hàng đã đặt hàng tại Sammi Stores. Nhân viên của chúng tôi sẽ liên hệ lại quý khách hàng khi đơn hàng được xác nhận. Quý khách hàng có thể theo dõi bằng cách đăng nhập và theo dõi đơn hàng trên website của chúng tôi.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button
            onClick={() => router.push(ROUTE_CONFIG.HOME)}
            variant="contained"
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.background.paper,
              '&:hover': {
                bgcolor: theme.palette.primary.main,
                opacity: 0.9
              }
            }}
          >
            Trang chủ
          </Button>
          <Button
            onClick={() => router.push(ROUTE_CONFIG.MY_ORDER)}
            variant="outlined"
            sx={{
              color: theme.palette.primary.main,
              borderColor: theme.palette.primary.main,
              '&:hover': {
                borderColor: theme.palette.primary.main,
                bgcolor: 'rgba(0,0,0,0.1)'
              }
            }}
          >
            Đơn mua
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default PaymentPage
