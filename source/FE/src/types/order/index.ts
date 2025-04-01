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
    code: string,
    displayOrder: number;
    paymentStatus: string;
    orderStatus: string;
    shippingStatus: string;
    voucherId?: number;
    wardId: number;
    customerAddress: string;
    costShip: number;
    trackingNumber?: string;
    estimatedDeliveryDate?: Date| string | null;
    actualDeliveryDate?: Date|string | null;
    shippingCompanyId: number;
    details: {
        id: number;
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
    code: string,
    customerId: number,
    customerName: string,
    phoneNumber: string,
    paymentStatus: string,
    shippingStatus: string,
    orderStatus: string,
    voucherId: number,
    wardId: number,
    customerAddress: string,
    costShip: number,
    trackingNumber: string,
    estimatedDeliveryDate: Date,
    actualDeliveryDate: Date,
    shippingCompanyId: number,
    totalPrice: number,
    totalQuantity: number,

    returnUrl: string,
    details: TItemOrderProduct[],
    
}
