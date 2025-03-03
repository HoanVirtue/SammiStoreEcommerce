
export type TParamsGetAllReviews = {
    limit?: number,
    page?: number,
    search?: string,
    isPublic?: boolean,
    order?: string
}

export type TParamsCreateReview = {
    product?: string,
    user?: string,
    star: number,
    content: string,
}

export interface TParamsUpdateReview {
    id: string
    star: number,
    content: string,
}

export type TParamsDeleteMultipleReviews = {
    reviewIds: string[]
}

export type TReviewItem = {
    _id: string,
    user: {
        firstName: string,
        middleName: string,
        lastName: string,
        avatar: string,
        _id: string
    },
    product:{
        id: string,
        name: string
    },
    content: string,
    star: number,
    updatedAt?: string | Date
}



