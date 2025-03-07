import { ProductImage } from "../product";

export type TParamsGetAllOrders = {
    skip?: number;
    take?: number;
    filters?: string;
    orderBy?: string;
    dir?: string;
    type?: number | (1 | 2 | 3 | 4 | 5 | 6)
    paging?: boolean;
    restrictOrderBy?: boolean;
    keywords?: string;
}

export type TItemOrderProduct = {
    id: string;
    code: string;
    name: string;
    stockQuantity: number;
    price: number;
    discount?: number;
    ingredient: string;
    uses: string;
    usageGuide: string;
    brandId: number;
    categoryId: number;
    status: number;
    startDate?: string;
    endDate?: string;
    images: ProductImage[];
}

export type TItemOrderProductMe = {
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

export type TParamsUpdateOrder ={
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

export type TOrderItem = {
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
    orderItems: TItemOrderProduct[],
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
