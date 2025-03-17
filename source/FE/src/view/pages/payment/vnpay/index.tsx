import { Box, Button, useTheme } from '@mui/material'
import { Card, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import IconifyIcon from 'src/components/Icon'
import { ROUTE_CONFIG } from 'src/configs/route'

const PaymentPage = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const router = useRouter()

  return (
    <>
      <Card sx={{padding: 4, borderRadius: "15px"}}>
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: 4}}>
          <Box sx={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "20px" }}>
            <IconifyIcon icon="mdi:alert-circle-outline" fontSize="5rem" color={theme.palette.warning.main} />
          </Box>
          <Typography fontWeight={600}>{t('payment_error')}</Typography>
        </Box>
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: 4}}>
          <Box sx={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "20px" }}>
            <IconifyIcon icon="mdi:tick-circle-outline" fontSize="5rem" color={theme.palette.success.main} />
          </Box>
          <Typography fontWeight={600}>{t('payment_success')}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "20px"  }}>
          <Button onClick={() => router.push(ROUTE_CONFIG.HOME)} variant="contained">{t('home')}</Button>
        </Box>
      </Card>
    </>
  )
}

export default PaymentPage
