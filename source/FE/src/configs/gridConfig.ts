import { get } from "http";
import i18n from "./i18n";

type Operator = {
    value: string;
    label: string;
};

type FieldConfig = {
    value: string;
    label: string;
    type: "string" | "number" | "boolean" | "date";
    operators: Operator[];
};


const getStringOperators = (): Operator[] => [
    { value: "contains", label: i18n.t("contains") },
    { value: "doesnotcontain", label: i18n.t("does_not_contain") },
    { value: "eq", label: i18n.t("equal") },
    { value: "neq", label: i18n.t("not_equal") },
    { value: "startswith", label: i18n.t("starts_with") },
    { value: "endswith", label: i18n.t("ends_with") },
    { value: "isnull", label: i18n.t("is_null") },
    { value: "isnotnull", label: i18n.t("is_not_null") },
    { value: "isempty", label: i18n.t("is_empty") },
    { value: "isnotempty", label: i18n.t("is_not_empty") },
];

const getNumberOperators = (): Operator[] => [
    { value: "eq", label: i18n.t("equal") },
    { value: "neq", label: i18n.t("not_equal") },
    { value: "gt", label: i18n.t("greater_than") },
    { value: "gte", label: i18n.t("greater_than_or_equal") },
    { value: "lt", label: i18n.t("less_than") },
    { value: "lte", label: i18n.t("less_than_or_equal") },
    { value: "isnull", label: i18n.t("is_null") },
    { value: "isnotnull", label: i18n.t("is_not_null") },
];

const getBooleanOperators = (): Operator[] => [
    { value: "eq", label: i18n.t("equal") },
    { value: "neq", label: i18n.t("not_equal") },
    { value: "isnull", label: i18n.t("is_null") },
    { value: "isnotnull", label: i18n.t("is_not_null") },
];

const getDateOperators = (): Operator[] => [
    { value: "eq", label: i18n.t("equal") },
    { value: "neq", label: i18n.t("not_equal") },
    { value: "gt", label: i18n.t("greater_than") },
    { value: "gte", label: i18n.t("greater_than_or_equal") },
    { value: "lt", label: i18n.t("less_than") },
    { value: "lte", label: i18n.t("less_than_or_equal") },
    { value: "isnull", label: i18n.t("is_null") },
    { value: "isnotnull", label: i18n.t("is_not_null") },
];


// Định nghĩa fields cho ListDistrictPage
export const getProvinceFields = (): FieldConfig[] => [
    { value: "name", label: i18n.t("province_name"), type: "string", operators: getStringOperators() },
    { value: "code", label: i18n.t("province_code"), type: "string", operators: getStringOperators() },
    { value: "postalCode", label: i18n.t("postal_code"), type: "string", operators: getStringOperators() },
];

export const getDistrictFields = (): FieldConfig[] => [
    { value: "name", label: i18n.t("district_name"), type: "string", operators: getStringOperators() },
    { value: "code", label: i18n.t("district_code"), type: "string", operators: getStringOperators() },
    { value: "provinceId", label: i18n.t("province_id"), type: "string", operators: getStringOperators() },
    { value: "provinceName", label: i18n.t("province_name"), type: "string", operators: getStringOperators() },
];

export const getWardFields = (): FieldConfig[] => [
    { value: "name", label: i18n.t("ward_name"), type: "string", operators: getStringOperators() },
    { value: "code", label: i18n.t("ward_code"), type: "string", operators: getStringOperators() },
    { value: "districtId", label: i18n.t("district_id"), type: "string", operators: getStringOperators() },
    { value: "districtName", label: i18n.t("district_name"), type: "string", operators: getStringOperators() },
];

export const getProductFields = (): FieldConfig[] => [
    { value: "name", label: i18n.t("product_name"), type: "string", operators: getStringOperators() },
    { value: "code", label: i18n.t("product_code"), type: "string", operators: getStringOperators() },
];


export const PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50, 100];
