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
    typeImage: string;
    value: string;
    id: number;
    displayOrder: number;
}

export type TParamsCreateEvent = {
    name: string;
    code: string;
    startDate: Date;
    endDate: Date;
    eventType: number;
    imageCommand: EventImage;
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