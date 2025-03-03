
export type TParamsGetAllReviews = {
    limit?: number,
    page?: number,
    search?: string,
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



