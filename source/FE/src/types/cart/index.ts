
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
    cartId: number,
    productId: number,
    quantity: number,
    operation: number,
}


export type TParamsCreateCart = {
    cartId: string,
    productId: number,
    quantity: number,
    operation: number,
}

