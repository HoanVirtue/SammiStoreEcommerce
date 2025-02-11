import paymentMethod from 'src/stores/payment-method';

export type TItemOrderProduct = {
    name: string,
    amount: number,
    image: string,
    price: number,
    discount: number,
    product : string,
    slug: string
}

export type TParamsCreateOrder = {
    orderItems: TItemOrderProduct[],
        fullName: string,
        address?: string,
        city: string,
        phone: string,
    paymentMethod: string,
    deliveryMethod: string,
    itemsPrice: number,
    shippingPrice: number,
    totalPrice: number,
    user: string,
}
