
export type TParamsGetAllReviews = {
    limit?: number,
    page?: number,
    search?: string,
    isPublic?: boolean,
    order?: string
}

export type TParamsCreateReview = {
    productId?: number,
    user?: number,
    star: number,
    content: string,
}

export interface TParamsUpdateReview {
    id: number
    star: number,
    content: string,
}

export type TParamsDeleteMultipleReviews = {
    reviewIds: number[]
}

export type TReviewItem = {
    id: number,
    user: {
        firstName: string,
        middleName: string,
        lastName: string,
        avatar: string,
        id: number
    },
    product:{
        id: number,
        name: string
    },
    content: string,
    star: number,
    updatedAt?: string | Date
}



