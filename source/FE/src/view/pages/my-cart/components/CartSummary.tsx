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

    const Row = ({ label, value }: { label: string, value: string }) => (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ typography: 'subtitle2', lineHeight: 1 }}
        >
            <Box component="span" sx={{ typography: 'body2' }}>
                {label}
            </Box>
            {value}
        </Stack>
    )

    return (
        <Stack
            spacing={3}
            sx={{
                p: 5,
                borderRadius: 2,
                border: `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
            }}
        >
            <Typography variant="h6" fontWeight={600}>{t("summary")}</Typography>

            <Stack spacing={2}>
                <Row label={t("subtotal")} value={`${formatPrice(subtotal)}đ`} />
                <Row label={t("discount")} value={`-${formatPrice(discount)}đ`} />
            </Stack>

            <TextField
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
            />

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ typography: 'subtitle2', lineHeight: 1 }}
            >
                <Box component="span" sx={{ typography: 'body2', fontWeight: 600 }}>
                    {t("total")}
                </Box>
                <Typography variant="subtitle2" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                    {`${formatPrice(total)}đ`}
                </Typography>
            </Stack>


            <Button
                size="large"
                variant="contained"
                onClick={onCheckout}
                disabled={total === 0}
            >
                {t("checkout")}
            </Button>
        </Stack>
    )
}

export default CartSummary
