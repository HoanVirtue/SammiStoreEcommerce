import { ProductImage } from "../product";

export type TParamsGetAllCarts = {
    skip?: number;
    take?: number;
    filters?: string;
    orderBy?: string;
    dir?: string;
    type?: number | (1 | 2 | 3 | 4 | 5 | 6)
    paging?: boolean;
    restrictCartBy?: boolean;
    keywords?: string;
}

export type TItemCartProduct = {
    cartId: string,
    productId: string,
    quantity: number,
    operation: number,
}

export type TItemCartProductMe = {
    name: string,
    amount: number,
    image: string,
    price: number,
    discount: number,
    product: {
        _id: string,
        countInStock: number,
        slug: string
    }
}

export type TParamsCreateCart = {
    cartItems: TItemCartProduct[],
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

export type TParamsUpdateCart ={
    shippingAddress: {
        address: string,
        city: string,
        phone: string,
        fullName: string
    },
    id: string
    isPaid: number,
    isDelivery: number,
    paymentMethod: string,
    deliveryMethod: string
}

export type TCartItem = {
    _id: string,
    shippingAddress: {
        fullName: string,
        address: string,
        city: {
            _id: string,
            name: string
        },
        phone: string,
    },
    cartItems: TItemCartProduct[],
    paymentMethod: {
        _id: string,
        name: string,
        type: string,
    },
    deliveryMethod: {
        _id: string,
        name: string,
        price: string,
    },
    itemsPrice: number,
    shippingPrice: number,
    totalPrice: number,
    isPaid: number,
    isDelivered: number,
    status: number,
    user: {
        _id: string,
        firstName: string,
        middleName: string,
        lastName: string,
    }
}
