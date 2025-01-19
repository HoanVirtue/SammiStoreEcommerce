export class PagedListMetaData<T> {

    constructor() {
        this.skip = 0;
        this.pageSize = 10;
        this.isFirstPage = true;
    }

    pageCount: number;
    totalItemCount: number;
    skip: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    isFirstPage: boolean;
    isLastPage: boolean;
    firstItemOnPage: number;
    lastItemOnPage: number;
    subset: T[]
}