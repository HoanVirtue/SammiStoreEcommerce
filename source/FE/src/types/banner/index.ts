export interface PropertyFilterModel {
    field: string;      
    operator: string;     
    filterValue: string;   
}

export type TParamsGetAllBanners = {
    skip?: number;
    take?: number;
    filters?: string;
    orderBy?: string;
    dir?: string;
    type?: number | (1 | 2 | 3 | 4 | 5 | 6)
    paging?: boolean;
    restrictOrderBy?: boolean;
    keywords?: string;
    propertyFilterModels?: PropertyFilterModel[]; 
}

export type BannerImage = {
    imageUrl: string;
    imageBase64: string;
    publicId: string;
    typeImage: string;
    value: string;
    id: number;
    displayOrder: number;
}

export type TParamsCreateBanner = {
    name?: string;
    level?: string;
    imageCommand?: BannerImage;
}

export interface TParamsUpdateBanner extends TParamsCreateBanner {
    id: number,
}

export type TParamsDeleteBanner = {
    id: number,
}

export type TParamsDeleteMultipleBanners = {
    bannerIds: number[],
}