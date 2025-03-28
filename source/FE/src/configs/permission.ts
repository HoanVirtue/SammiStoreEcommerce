export const PERMISSIONS: any = {
    ADMIN: "ADMIN.GRANTED",
    BASIC: "BASIC.PUBLIC",
    DASHBOARD: "DASHBOARD",
    MANAGE_PRODUCT: {
      PRODUCT: {
        VIEW: "MANAGE_PRODUCT.PRODUCT.VIEW",
        CREATE: "MANAGE_PRODUCT.PRODUCT.CREATE",
        UPDATE: "MANAGE_PRODUCT.PRODUCT.UPDATE",
        DELETE: "MANAGE_PRODUCT.PRODUCT.DELETE",
      },
      PRODUCT_CATEGORY: {
        CREATE: "MANAGE_PRODUCT.PRODUCT_CATEGORY.CREATE",
        UPDATE: "MANAGE_PRODUCT.PRODUCT_CATEGORY.UPDATE",
        DELETE: "MANAGE_PRODUCT.PRODUCT_CATEGORY.DELETE",
      },
      BRAND: {
        CREATE: "MANAGE_PRODUCT.BRAND.CREATE",
        UPDATE: "MANAGE_PRODUCT.BRAND.UPDATE",
        DELETE: "MANAGE_PRODUCT.BRAND.DELETE",
      },
    },
    SYSTEM: {
      USER: {
        CREATE: "SYSTEM.USER.CREATE",
        UPDATE: "SYSTEM.USER.UPDATE",
        DELETE: "SYSTEM.USER.DELETE",
        VIEW: "SYSTEM.USER.VIEW",
      },
      ROLE: {
        CREATE: "SYSTEM.ROLE.CREATE",
        UPDATE: "SYSTEM.ROLE.UPDATE",
        DELETE: "SYSTEM.ROLE.DELETE",
        VIEW: "SYSTEM.ROLE.VIEW",
      },
    },
    USER: {
      EMPLOYEE: {
        CREATE: "SYSTEM.EMPLOYEE.CREATE",
        UPDATE: "SYSTEM.EMPLOYEE.UPDATE",
        DELETE: "SYSTEM.EMPLOYEE.DELETE",
        VIEW: "SYSTEM.EMPLOYEE.VIEW",
      },
      CUSTOMER: {
        CREATE: "SYSTEM.CUSTOMER.CREATE",
        UPDATE: "SYSTEM.CUSTOMER.UPDATE",
        DELETE: "SYSTEM.CUSTOMER.DELETE",
        VIEW: "SYSTEM.CUSTOMER.VIEW",
      },
      SUPPLIER: {
        CREATE: "SYSTEM.SUPPLIER.CREATE",
        UPDATE: "SYSTEM.SUPPLIER.UPDATE",
        DELETE: "SYSTEM.SUPPLIER.DELETE",
        VIEW: "SYSTEM.SUPPLIER.VIEW",
      },
    },
    MANAGE_ORDER: {
      REVIEW: {
        UPDATE: "MANAGE_ORDER.REVIEW.UPDATE",
        DELETE: "MANAGE_ORDER.REVIEW.DELETE",
      },
      ORDER: {
        CREATE: "MANAGE_ORDER.ORDER.CREATE",
        UPDATE: "MANAGE_ORDER.ORDER.UPDATE",
        DELETE: "MANAGE_ORDER.ORDER.DELETE",
        VIEW: "MANAGE_ORDER.ORDER.VIEW",
      },
    },
    SETTING: {
      PAYMENT_METHOD: {
        CREATE: "SETTING.PAYMENT_METHOD.CREATE",
        UPDATE: "SETTING.PAYMENT_METHOD.UPDATE",
        DELETE: "SETTING.PAYMENT_METHOD.DELETE",
      },
      DELIVERY_METHOD: {
        CREATE: "SETTING.DELIVERY_METHOD.CREATE",
        UPDATE: "SETTING.DELIVERY_METHOD.UPDATE",
        DELETE: "SETTING.DELIVERY_METHOD.DELETE",
      },
      BANNER: {
        CREATE: "SETTING.BANNER.CREATE",
        UPDATE: "SETTING.BANNER.UPDATE",
        DELETE: "SETTING.BANNER.DELETE",
        VIEW: "SETTING.BANNER.VIEW",
      },
    },
    ADDRESS: {
      PROVINCE: {
        CREATE: "ADDRESS.PROVINCE.CREATE",
        UPDATE: "ADDRESS.PROVINCE.UPDATE",
        DELETE: "ADDRESS.PROVINCE.DELETE",
      },
      DISTRICT: {
        CREATE: "ADDRESS.DISTRICT.CREATE",
        UPDATE: "ADDRESS.DISTRICT.UPDATE",
        DELETE: "ADDRESS.DISTRICT.DELETE",
      },
      WARD: {
        CREATE: "ADDRESS.WARD.CREATE",
        UPDATE: "ADDRESS.WARD.UPDATE",
        DELETE: "ADDRESS.WARD.DELETE",
      },
    },
    GOODS_RECEIPT: {
      RECEIPT_LIST: {
        VIEW: "GOODS_RECEIPT.RECEIPT_LIST.VIEW",
        CREATE: "GOODS_RECEIPT.RECEIPT_LIST.CREATE",
        UPDATE: "GOODS_RECEIPT.RECEIPT_LIST.UPDATE",
        DELETE: "GOODS_RECEIPT.RECEIPT_LIST.DELETE",
      },
    },
  };

export const LIST_PERMISSION_DATA: any = [
  {
    id: 14,
    name: "dashboard",
    isParent: false,
    value: "DASHBOARD",
    isHideCreate: true,
    isHideUpdate: true,
    isHideDelete: true,
    isHideCheckAll: true
  },
  {
    id: 11,
    name: "province",
    isParent: false,
    value: "PROVINCE",
    parentValue: "SETTING",
    isHideView: true,
  },
  {
    id: 1,
    name: "product_manage",
    isParent: true,
    value: "MANAGE_PRODUCT",
  },
  {
    id: 2,
    name: "product",
    isParent: false,
    value: "PRODUCT",
    parentValue: "MANAGE_PRODUCT",
  },
  {
    id: 3,
    name: "product_type",
    isParent: false,
    value: "PRODUCT_TYPE",
    parentValue: "MANAGE_PRODUCT",
    isHideView: true
  },
  {
    id: 4,
    name: "system",
    isParent: true,
    value: "SYSTEM",
  },
  {
    id: 5,
    name: "user",
    isParent: false,
    value: "USER",
    parentValue: "SYSTEM",
  },
  {
    id: 6,
    name: "role",
    isParent: false,
    value: "ROLE",
    parentValue: "SYSTEM",
  },
  {
    id: 7,
    name: "manage_order",
    isParent: true,
    value: "MANAGE_ORDER",
  },
  {
    id: 8,
    name: "review",
    isParent: false,
    value: "REVIEW",
    parentValue: "MANAGE_ORDER",
    isHideView: true,
    isHideCreate: true
  },
  {
    id: 9,
    name: "order",
    isParent: false,
    value: "ORDER",
    parentValue: "MANAGE_ORDER",
  },
  {
    id: 10,
    name: "setting",
    isParent: true,
    value: "SETTING",
  },
  {
    id: 11,
    name: "city",
    isParent: false,
    value: "CITY",
    parentValue: "SETTING",
    isHideView: true,
  },
  {
    id: 12,
    name: "delivery_type",
    isParent: false,
    value: "DELIVERY_TYPE",
    parentValue: "SETTING",
    isHideView: true,
  },  {
    id: 13,
    name: "payment_type",
    isParent: false,
    value: "PAYMENT_TYPE",
    parentValue: "SETTING",
    isHideView: true,
  },
]