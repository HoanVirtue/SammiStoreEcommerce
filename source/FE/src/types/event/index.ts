export interface PropertyFilterModel {
    field: string;      
    operator: string;     
    filterValue: string;   
}

export type TParamsGetAllEvents = {
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

export type EventImage = {
    imageUrl: string;
    imageBase64: string;
    publicId: string;
    typeImage: number;
    value: string;
    displayOrder: number;
}

export type TParamsCreateEvent = {
    name: string;
    code: string;
    startDate: Date;
    endDate: Date;
    eventType: number;
    imageCommand: EventImage;
    imageId: number 
    description?: string;
    voucherCommands: {
        code: string
        name: string
        eventId: number
        discountTypeId: number
        discountValue: number
        usageLimit: number
        startDate: Date
        endDate: Date
        conditions:{
            voucherId: number
            conditionTypeId: number
            conditionValue: number
        }
    }
}

export interface TParamsUpdateEvent extends TParamsCreateEvent {
    id: string,
}

export type TParamsDeleteEvent = {
    id: string,
}

export type TParamsDeleteMultipleEvents = {
    eventIds: string[],
}