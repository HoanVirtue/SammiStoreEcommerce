
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


const stringOperators: Operator[] = [
    { value: "contains", label: "Contains" },
    { value: "doesnotcontain", label: "Does Not Contain" },
    { value: "eq", label: "Equal" },
    { value: "neq", label: "Not Equal" },
    { value: "startswith", label: "Starts With" },
    { value: "endswith", label: "Ends With" },
    { value: "isnull", label: "Is Null" },
    { value: "isnotnull", label: "Is Not Null" },
    { value: "isempty", label: "Is Empty" },
    { value: "isnotempty", label: "Is Not Empty" },
];

const numberOperators: Operator[] = [
    { value: "eq", label: "Equal" },
    { value: "neq", label: "Not Equal" },
    { value: "gt", label: "Greater Than" },
    { value: "gte", label: "Greater Than or Equal" },
    { value: "lt", label: "Less Than" },
    { value: "lte", label: "Less Than or Equal" },
    { value: "isnull", label: "Is Null" },
    { value: "isnotnull", label: "Is Not Null" },
];

const booleanOperators: Operator[] = [
    { value: "eq", label: "Equal" },
    { value: "neq", label: "Not Equal" },
    { value: "isnull", label: "Is Null" },
    { value: "isnotnull", label: "Is Not Null" },
];

const dateOperators: Operator[] = [
    { value: "eq", label: "Equal" },
    { value: "neq", label: "Not Equal" },
    { value: "gt", label: "Greater Than" },
    { value: "gte", label: "Greater Than or Equal" },
    { value: "lt", label: "Less Than" },
    { value: "lte", label: "Less Than or Equal" },
    { value: "isnull", label: "Is Null" },
    { value: "isnotnull", label: "Is Not Null" },
];

// Định nghĩa fields cho ListProvincePage
export const provinceFields: FieldConfig[] = [
    { value: "name", label: "Province Name", type: "string", operators: stringOperators },
    { value: "code", label: "Province Code", type: "string", operators: stringOperators },
    { value: "postalCode", label: "Postal Code", type: "string", operators: stringOperators },
    // Thêm các field khác nếu cần, ví dụ:
    // { value: "active", label: "Active", type: "boolean", operators: booleanOperators },
    // { value: "population", label: "Population", type: "number", operators: numberOperators },
    // { value: "createdAt", label: "Created At", type: "date", operators: dateOperators },
];


export const PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50, 100];
