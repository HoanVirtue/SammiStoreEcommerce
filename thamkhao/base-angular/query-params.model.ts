import { PropertyParamItem } from "./property-param-item";
import {
  FilterDescriptor,
  State,
} from "@progress/kendo-data-query";
import * as _ from 'lodash';

export class QueryParamsModel {
  keywords: string;

  skip: number;
  take: number;
  filters: string;
  orderBy: string;

  /**Order direction (asc|desc) */
  dir: string;

  type: RequestType;
  paging: boolean;

  private filterObjects: PropertyParamItem[];

  constructor() {
    this.skip = 0;
    this.take = 10;
    this.orderBy = "ID";
    this.dir = "desc";
    this.type = RequestType.Grid;
    this.paging = true;
    this.keywords = "";
    this.filterObjects = [];
  }

  isFilterDescriptor(object: any): object is FilterDescriptor {
    return "field" in object;
  }

  private transferFilterDes2PropertyParam(filterDesc: FilterDescriptor) {
    let propFilter = new PropertyParamItem();
    propFilter.field = filterDesc.field.toString();
    propFilter.operator = filterDesc.operator.toString();
    propFilter.value = filterDesc.value;
    propFilter.fromKendoGrid = true;
    return propFilter;
  }

  public map(gridState: State, pagingOnly = false) {
    this.skip = gridState.skip;
    this.take = gridState.take;
    this.dir =
      gridState.sort && gridState.sort[0]
        ? gridState.sort[0].dir || ""
        : "";
    this.orderBy =
      this.dir && gridState.sort && gridState.sort[0]
        ? gridState.sort[0].field || ""
        : "";

    if (pagingOnly) return;

    let propertyFilters = [];
    for (const filterDes of gridState.filter.filters) {
      if (this.isFilterDescriptor(filterDes)) {
        propertyFilters.push(this.transferFilterDes2PropertyParam(filterDes));
      } else {
        propertyFilters.push(...filterDes.filters.map((f: FilterDescriptor) =>
          this.transferFilterDes2PropertyParam(f)
        ));
      }
    }

    let differences = propertyFilters.filter((x) =>
      this.filterObjects.every((r) => r.field !== x.field ||
        r.operator !== x.operator
      )
    );

    let duplicates = propertyFilters.filter((x) =>
      this.filterObjects.some((r) => r.field === x.field &&
        r.field === x.field)
    );

    if (differences && differences.length > 0) {
      this.filterObjects = this.filterObjects.concat(differences);
    }

    if (duplicates && duplicates.length > 0) {
      for (const replacement of duplicates) {
        let replaceIdx = this.filterObjects.findIndex(
          (x) => x.field === replacement.field && x.operator === replacement.operator
        );

        this.filterObjects.splice(replaceIdx, 1, replacement);
      }
    }

    //this.filterObjects = propertyFilters.filter((x,index,y)=>
    //	y.findIndex(t=>(t.field===x.field &&t.operator === x.operator)) === index
    //);

    _.remove(
      this.filterObjects,
      (p) =>
        p.removable &&
        p.fromKendoGrid &&
        propertyFilters.every((pf) => pf.field !== p.field || pf.operator !== p.operator)
    );
  }

  public removeFilterField(fieldName: string, operator: string = "eq") {
    if (!fieldName) return;

    _.remove(
      this.filterObjects,
      (p) =>
        p.field &&
        p.field.toUpperCase() === fieldName.toUpperCase() &&
        (!operator || p.operator === operator)
    );
  }

  public removeFilter(fieldNameAndOperator: string) {
    if (!fieldNameAndOperator) return;

    let filterField = fieldNameAndOperator.split('__')[0];
    let filterOperator = fieldNameAndOperator.split('__')[1];

    _.remove(
      this.filterObjects,
      (p) =>
        p.field &&
        p.field.toUpperCase() === filterField.toUpperCase() &&
        (!filterOperator || p.operator === filterOperator)
    );
  }

  public cleanFilter() {
    _.remove(this.filterObjects, (f) => f.removable);
  }

  public cleanFilterFromGrid() {
    _.remove(this.filterObjects, (f) => f.removable && f.fromKendoGrid);
  }

  public cleanFilterOutsideGrid() {
    _.remove(this.filterObjects, (f) => f.removable && !f.fromKendoGrid);
  }

  public forceCleanFilter() {
    this.filterObjects = [];
  }

  public addFilterProperty(
    fieldNameOrProperty: string | PropertyParamItem,
    fieldValue?: any,
    operator: string = "eq",
    removable: boolean = true
  ) {
    if (typeof fieldNameOrProperty === "string") {
      // Update the field value if exist
      if (
        this.filterObjects.some(
          (f) =>
            f.field.toUpperCase() ===
            fieldNameOrProperty.toUpperCase() &&
            f.operator === operator
        )
      ) {
        let existedFilterProp = this.filterObjects.find(
          (f) =>
            f.field.toUpperCase() ===
            fieldNameOrProperty.toUpperCase() &&
            f.operator === operator
        );
        existedFilterProp.value = fieldValue;
        return;
      }

      let propertyFilterModel = new PropertyParamItem();
      propertyFilterModel.field = fieldNameOrProperty;
      propertyFilterModel.operator = operator;
      propertyFilterModel.value = fieldValue;
      propertyFilterModel.removable = removable;
      this.filterObjects.push(propertyFilterModel);
    } else if (fieldNameOrProperty instanceof PropertyParamItem) {
      if (
        this.filterObjects.some(
          (f) =>
            f.field.toUpperCase() ===
            fieldNameOrProperty.field.toUpperCase() &&
            f.operator === fieldNameOrProperty.operator
        )
      ) {
        let existedFilterProp = this.filterObjects.find(
          (f) =>
            f.field.toUpperCase() ===
            fieldNameOrProperty.field.toUpperCase() &&
            f.operator === fieldNameOrProperty.operator
        );
        existedFilterProp.value = fieldNameOrProperty.value;
        return;
      }
      this.filterObjects.push(fieldNameOrProperty);
    }
  }

  public shrink(): QueryParamsModel {
    const shrinkedObject = Object.create(this);

    Object.keys(this).forEach((k) => {
      if (k !== "filterObjects" && k !== "filters") {
        if (shrinkedObject[k] && shrinkedObject[k] instanceof Date) {
          shrinkedObject[k] = JSON.stringify(this[k]).replace(
            /\"/g,
            ""
          );
        } else {
          shrinkedObject[k] = this[k];
        }
      }
    });

    if (this.filterObjects && this.filterObjects.length > 0) {
      let propertyFilters = this.filterObjects
        .filter(
          (e) => !_.isEmpty(e)
          //&&
          //(typeof e.value !== "object" ||
          //(typeof e.value === "object" && e.value instanceof Array) ||
          //(typeof e.value === "object" && e.value instanceof Date))
        )
        .map((e: PropertyParamItem) => {
          let validValue = null;
          switch (typeof e.value) {
            case "string":
              validValue = e.value.replace(/\:+/gm, ":");
              break;
            case "object":
              if (e.value instanceof Date) {
                validValue = JSON.stringify(e.value).replace(
                  /\"/g,
                  ""
                );
              } else if (e.value instanceof Array) {
                validValue = e.value.join(",");
              } else {
                validValue = "";
              }
              break;
            default:
              validValue = e.value;
          }

          return `${e.field.toString()}::${validValue}::${e.operator.toString()}`;
        });
      shrinkedObject.filters = propertyFilters.join("|");
    } else {
      shrinkedObject.filters = "";
    }
    return shrinkedObject;
  }
}

export enum RequestType {
  Grid = 1,
  Selection = 2,
  Hierarchical = 3,
  SimpleAll = 4,
  Autocomplete = 5,
  AutocompleteSimple = 6,
}
