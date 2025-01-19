import { Observable, BehaviorSubject, from, Subject, of } from "rxjs";
import { HttpClientService } from "./http-client.service";
import { GridDataResult } from "@progress/kendo-angular-grid";
import { map, mergeMap, tap } from "rxjs/operators";
import * as _ from "lodash";
import { plainToClassFromExist, plainToClass } from 'class-transformer';
import { transformAndValidate } from 'class-transformer-validator';
import { Inject, InjectionToken } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IBaseService } from "../_components/ibase.service";
import { QueryResultsModel } from "../models/query-results.model";
import { QueryParamsModel, RequestType } from "../models/query-params.model";
import { PagedListMetaData } from "../models/paged-list";
import { SelectionModel } from "../models/selection-model";
import { HierarchicalModel } from "../models/hierarchical-model";
import { PropertyParamItem } from "../models/property-param-item";

// export const HTTP_CLIENT_SERVICE = new InjectionToken<HttpClientService>('Http Client Service', {
//   providedIn: 'root',
//   factory: () => new HttpClientService(httpClient)
// });

export abstract class BaseService<T extends object> implements IBaseService {
  protected httpClientService: HttpClientService;
  private _apiPath: string = '';
  public get apiPath(): string {
    return this._apiPath;
  }
  public set apiPath(value: string) {
    this._apiPath = value;
  }

  public get loading() {
    return this.httpClientService.loading$;
  }

  constructor(
    protected httpClient: HttpClient,
    private entityType: new (...args: any[]) => T) {

    if (!this.apiPath)
      throw new Error(
        "The service subclass has been declared without @HttpService decorator or it's value is empty. It's not allowed"
      );
    this.httpClientService = new HttpClientService(httpClient);
  }

  AddOrEdit(object: any) {
    return object?.id
      ? this.Edit(object)
      : this.Add(object);
  }

  Add(object: any): Observable<QueryResultsModel<T>> {
    return this.httpClientService.post<QueryResultsModel<T>>(
      this.apiPath,
      object
    );
  }

  Edit(object: any): Observable<QueryResultsModel<T>> {
    return this.httpClientService.put<QueryResultsModel<T>>(
      `${this.apiPath}/${object.id}`,
      object
    );
  }

  DeleteById(recordId: number): Observable<QueryResultsModel<any>> {
    return this.httpClientService.delete(`${this.apiPath}/${recordId}`);
  }

  Delete(path: string, params: any): Observable<QueryResultsModel<any>> {
    return this.httpClientService.delete(`${this.apiPath}/${path}`, params);
  }

  GetGrid(filterParams: QueryParamsModel) : Observable<GridDataResult> {
    return this.httpClientService
      .get<any>(`${this.apiPath}`, filterParams.shrink())
      .pipe(
        map(
          (response) =>
            <GridDataResult>
            {
              data: response.isSuccess
                ? response.result.subset
                : [],
              total: response.isSuccess
                ? response.result.totalItemCount
                : filterParams.take,
            }
        )
      );
  }

  GetAll(
    filterParams: QueryParamsModel = null
  ): Observable<QueryResultsModel<PagedListMetaData<T>>> {
    let nonPagedQueryFilter = new QueryParamsModel();

    if (filterParams) {
      Object.assign(nonPagedQueryFilter, filterParams);
    }

    nonPagedQueryFilter.paging = false;
    return this.httpClientService.get<QueryResultsModel<PagedListMetaData<T>>>(
      `${this.apiPath}`,
      nonPagedQueryFilter.shrink()
    );
  }

  GetAllSimple<TResult>(
    filterParams: QueryParamsModel = null
  ): Observable<QueryResultsModel<TResult[]>> {
    let nonPagedQueryFilter = new QueryParamsModel();

    if (filterParams) {
      Object.assign(nonPagedQueryFilter, filterParams);
    }
    nonPagedQueryFilter.type = RequestType.SimpleAll;
    nonPagedQueryFilter.paging = false;

    return this.httpClientService.get<QueryResultsModel<TResult[]>>(
      `${this.apiPath}`,
      nonPagedQueryFilter.shrink()
    );
  }

  GetSelectionList(
    selectionQueryFilter: QueryParamsModel = new QueryParamsModel()
  ): Observable<QueryResultsModel<SelectionModel[]>> {
    selectionQueryFilter.type = RequestType.Selection;
    selectionQueryFilter.paging = false;
    return this.httpClientService.get<QueryResultsModel<SelectionModel[]>>(
      `${this.apiPath}`,
      selectionQueryFilter.shrink()
    );
  }

  private buildHierarchicalList(
    data: HierarchicalModel[],
    parentId = undefined
  ) {
    let children = data.filter((e) =>
      parentId ? e.parentId === parentId : !e.parentId
    );

    if (!children.some((e) => e.hasChildren)
    ) return children;

    if (children[0].hasOwnProperty("displayOrder")) {
      children = _.sortBy(children, ["displayOrder"]).reverse();
    }

    for (const child of children.filter((e) => e.hasChildren)) {
      child.children = this.buildHierarchicalList(data, child.value);
    }

    return children;
  }

  GetHierarchicalList(filterModel: QueryParamsModel = null): Observable<HierarchicalModel[]> {
    if (filterModel == null) {
      filterModel = new QueryParamsModel();
    }
    filterModel.type = RequestType.Hierarchical;
    filterModel.paging = false;
    return this.httpClientService
      .get<QueryResultsModel<HierarchicalModel[]>>(
        `${this.apiPath}`,
        filterModel.shrink()
      )
      .pipe(
        map((val) =>
          this.buildHierarchicalList(val.isSuccess ? val.result : [])
        )
      );
  }

  GetList(
    filterParams: QueryParamsModel
  ): Observable<QueryResultsModel<PagedListMetaData<T>>> {
    return this.httpClientService.get<QueryResultsModel<PagedListMetaData<T>>>(
      `${this.apiPath}`,
      filterParams.shrink()
    );
  }

  GetDetail(id: any, params: any = null): Observable<QueryResultsModel<T>> {
    return this.httpClientService
      .get<QueryResultsModel<T>>(`${this.apiPath}/${id}`, params)
      .pipe(
        mergeMap(httpResponse => {
          if (!httpResponse) {
            let defaultResponse = new QueryResultsModel<T>();
            defaultResponse.isSuccess = false;
            defaultResponse.message = "Content not found!";
            defaultResponse.result = null;
            return of(defaultResponse);
          }

          if (!httpResponse.isSuccess || typeof httpResponse.result !== "object") {
            return of(httpResponse);
          }

          return from(transformAndValidate(this.entityType, httpResponse.result))
            .pipe(
              map((transformedObject) => {
                httpResponse.result = transformedObject;
                return httpResponse;
              })
            );
        })
      );
  }

  Post<T>(path: string = "", data?: any) {
    return this.httpClientService.post<T>(
      `${this.apiPath}${path ? "/" + path : ""}`,
      data
    );
  }

  Put<T>(path: string = "", data?: any) {
    return this.httpClientService.put<T>(
      `${this.apiPath}${path ? "/" + path : ""}`,
      data
    );
  }

  Get<T>(path: string = "", params?: any) {
    return this.httpClientService.get<T>(
      `${this.apiPath}${path ? "/" + path : ""}`,
      params
    );
  }

  downloadPDF(url): any {
    const options = { responseType: 'blob' as 'json' };
    return this.httpClientService.get<Blob>(url, options).pipe(
      map(
        res => new Blob([res], { type: 'application/pdf' })
      )
    );
  }

  downloadFile(url): any {
    return this.httpClientService.downloadFile(url);
  }

  AutoComplete<T>(keywords: string, take: number, value?: any) {
    let autocompleteFilterModel = new QueryParamsModel();
    autocompleteFilterModel.keywords = keywords;
    autocompleteFilterModel.take = take;
    autocompleteFilterModel.skip = 0;
    autocompleteFilterModel.paging = true;
    autocompleteFilterModel.type = RequestType.Autocomplete;

    if (value) {
      autocompleteFilterModel.addFilterProperty(new PropertyParamItem("value", value));
    }

    return this.httpClientService.get<QueryResultsModel<T[]>>(
      `${this.apiPath}`,
      autocompleteFilterModel.shrink()
    );
  }
  
}
