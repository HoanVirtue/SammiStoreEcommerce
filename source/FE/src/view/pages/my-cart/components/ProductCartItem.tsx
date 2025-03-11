import { Box, Divider, Grid, IconButton, useTheme } from "@mui/material"
import { Typography } from "@mui/material"
import { Avatar } from "@mui/material"
import { Checkbox } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { Fragment, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import IconifyIcon from "src/components/Icon"
import CustomTextField from "src/components/text-field"
import { getLocalProductFromCart, setLocalProductToCart } from "src/helpers/storage"
import { useAuth } from "src/hooks/useAuth"
import { getProductDetail } from "src/services/product"
import { AppDispatch, RootState } from "src/stores"
import { updateProductToCart } from "src/stores/order"
import { TItemOrderProduct } from "src/types/order"
import { cloneDeep, convertUpdateProductToCart, formatPrice, isExpired } from "src/utils"

type TProps = {
    item: TItemOrderProduct
    index: number
    handleChangeCheckBox: (value: string) => void
    selectedRow: string[]
}

interface TItemOrderProductState extends TItemOrderProduct {
    stockQuantity?: number
}

const ProductCartItem = ({ item, index, handleChangeCheckBox, selectedRow }: TProps) => {

    //State
    const [itemState, setItemState] = useState<TItemOrderProductState>(item)

    //hooks
    const { user } = useAuth()
    const { i18n } = useTranslation();
    const router = useRouter()

    //Theme
    const theme = useTheme();

    //Redux
    const dispatch: AppDispatch = useDispatch();
    const { orderItems } = useSelector((state: RootState) => state.order)

    //fetch
    const fetchProductDetail = async (id: string) => {
        const res = await getProductDetail(id)
        const data = res?.result

        if (data) {
            const discountItem = data.startDate && data.endDate && isExpired(data?.startDate, data.endDate) ? data.discount : 0
            setItemState({
                name: data.name,
                images: data.images,
                price: data.price,
                discount: discountItem,
                productId: id,
                amount: data.amount,
                stockQuantity: data.stockQuantity
            })
        }
    }

    useEffect(() => {
        if (item.productId) {
            fetchProductDetail(item.productId)
        }
    }, [item.productId])

    useEffect(() => {
        setItemState((prev) => ({ ...prev, amount: item.amount }))
    }, [item.amount])


    const handleChangeQuantity = (item: TItemOrderProduct, amount: number) => {
        const productCart = getLocalProductFromCart()
        const parseData = productCart ? JSON.parse(productCart) : {}
        const listOrderItems = convertUpdateProductToCart(orderItems, {
            name: item?.name,
            amount: amount,
            images: item?.images,
            price: item?.price,
            discount: item?.discount,
            productId: item.productId,
        })
        if (user) {
            dispatch(
                updateProductToCart({
                    orderItems: listOrderItems
                })
            )
            setLocalProductToCart({ ...parseData, [user?.id]: listOrderItems })
        }
    }


    const handleDeleteProductInCart = (id: string) => {
        const productCart = getLocalProductFromCart()
        const parseData = productCart ? JSON.parse(productCart) : {}
        const cloneOrderItem = cloneDeep(orderItems)
        const filteredItem = cloneOrderItem.filter((item: TItemOrderProduct) => item.productId !== id)
        if (user) {
            dispatch(
                updateProductToCart({
                    orderItems: filteredItem
                })
            )
            setLocalProductToCart({ ...parseData, [user?.id]: filteredItem })
        }
    }

    console.log("select", selectedRow.includes(itemState?.productId))

    return (
        <Fragment>
            <>
                <Grid item md={1}>
                    <Checkbox
                        disabled={!itemState?.stockQuantity}
                        checked={selectedRow.includes(itemState?.productId)}
                        value={itemState?.productId}
                        onChange={(e) => {
                            handleChangeCheckBox(e.target.value)
                        }} />
                </Grid>
                <Grid item md={2}>
                    <Avatar src={itemState.images[0].imageUrl} sx={{ width: "100px", height: "100px" }} />
                </Grid>
                <Grid item md={3}>
                    <Typography fontSize={"18px"}>
                        <Link href={`/product/${itemState.productId}`}>
                            {itemState?.name}
                        </Link>
                    </Typography>
                </Grid>
                <Grid item md={2}>
                    <Typography variant="h6" sx={{
                        color: itemState?.discount && itemState?.discount > 0 ? theme.palette.error.main : theme.palette.primary.main,
                        fontWeight: "bold",
                        textDecoration: item?.discount && item?.discount > 0 ? "line-through" : "normal",
                        fontSize: "14px"
                    }}>
                        {formatPrice(itemState?.price)}đ
                    </Typography>
                </Grid>
                <Grid item md={2}>
                    <Typography variant="h4" sx={{
                        color: theme.palette.primary.main,
                        fontWeight: "bold",
                        fontSize: "18px"
                    }}>
                        {itemState?.discount && itemState?.discount > 0 ? (
                            <>
                                {formatPrice(itemState?.price * (100 - itemState?.discount * 100) / 100)}đ
                            </>
                        ) : (
                            <>
                                {formatPrice(itemState?.price)}đ
                            </>
                        )}
                    </Typography>
                </Grid>
                <Grid item md={1} sx={{ml: '-30px'}} >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton onClick={() => handleChangeQuantity(itemState, -1)}>
                            <IconifyIcon icon="eva:minus-fill" />
                        </IconButton>
                        <CustomTextField
                            type='number'
                            value={itemState?.amount}
                            InputProps={{
                                inputMode: "numeric",
                                inputProps: {
                                    min: 1,
                                }
                            }}
                            sx={{
                                ".MuiInputBase-root.MuiFilledInput-root": {
                                    width: "40px",
                                    border: "none",
                                },
                                'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
                                    WebkitAppearance: "none",
                                    margin: 0
                                },
                                'input[type=number]': {
                                    MozAppearance: "textfield"
                                }
                            }} />
                        <IconButton disabled={!itemState?.stockQuantity}
                            onClick={() => handleChangeQuantity(itemState, 1)}>
                            <IconifyIcon icon="ic:round-plus" />
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item md={1} sx={{ml: '25px'}}>
                    <IconButton onClick={() => handleDeleteProductInCart(itemState.productId)}>
                        <IconifyIcon icon="carbon:trash-can" />
                    </IconButton>
                </Grid>
            </>
            {index !== orderItems.length - 1 && <Divider />}
        </Fragment>
    )
}

export default ProductCartItem