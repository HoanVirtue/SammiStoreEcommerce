import { Box, Button, Divider, Stack, TextField, Typography, useTheme } from "@mui/material"
import { alpha } from "@mui/material/styles"
import InputAdornment from "@mui/material/InputAdornment"
import { useRouter } from "next/router"
import { ROUTE_CONFIG } from "src/configs/route"
import { formatPrice } from "src/utils"
import { t } from "i18next"

type TProps = {
    subtotal: number
    discount: number
    total: number
    onApplyDiscount: () => void
    discountCode: string
    setDiscountCode: (value: string) => void
    onCheckout: () => void
}

const CartSummary = ({
    subtotal,
    discount,
    total,
    onApplyDiscount,
    discountCode,
    setDiscountCode,
    onCheckout
}: TProps) => {
    const theme = useTheme()

    return (
        <Stack
            spacing={3}
            sx={{
                p: 5,
                borderRadius: 2,
                border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{t("summary")}</Typography>

            <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between" sx={{ typography: 'subtitle2' }}>
                    <Box component="span" sx={{ typography: 'body2' }}>
                        {t("subtotal")}
                    </Box>
                    {formatPrice(subtotal)}
                </Stack>

                <Stack direction="row" justifyContent="space-between" sx={{ typography: 'subtitle2' }}>
                    <Box component="span" sx={{ typography: 'body2' }}>
                        {t("discount")}
                    </Box>
                    -{formatPrice(discount)}
                </Stack>
            </Stack>

            {/* <TextField
                hiddenLabel
                size="small"
                placeholder={t("voucher_code")}
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button onClick={onApplyDiscount}>{t("apply_voucher")}</Button>
                        </InputAdornment>
                    ),
                }}
            /> */}

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Stack direction="row" justifyContent="space-between" sx={{ typography: 'h6' }}>
                <Box component="span" sx={{ fontWeight: 'bold' }}>{t("total")}</Box>
                <Box component="span" sx={{ fontWeight: 'bold' }} color={theme.palette.primary.main}>
                    {formatPrice(total)}
                </Box>
            </Stack>

            <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={onCheckout}
                disabled={total === 0}
            >
                {t("buy_item")}
            </Button>
        </Stack>
    )
}

export default CartSummary
