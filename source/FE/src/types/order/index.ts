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
    productId: string;
    name: string;
    amount: number;
    price: number;
    discount?: number;
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
    customerId: number;
    code: number,
    paymentStatus: string;
    orderStatus: string;
    shippingStatus: string;
    voucherId?: number;
    wardId: number;
    customerAddress: string;
    costShip: number;
    trackingNumber?: string;
    estimatedDeliveryDate?: Date | null;
    actualDeliveryDate?: Date | null;
    shippingCompanyId: number;
    details: {
        orderId: number;
        productId: number;
        quantity: number;
        tax?: number;
        amount: number;
    }[];
    totalAmount: number;
    totalQuantity: number;
    discountAmount?: number;
    isBuyNow?: boolean;
    paymentMethodId: number;
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
