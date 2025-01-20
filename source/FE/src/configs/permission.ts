export const PERMISSIONS: any = {
    ADMIN: "ADMIN.GRANTED",
    BASIC: "BASIC.PUBLIC",
    DASHBOARD: "DASHBOARD",
    MANAGE_PRODUCT: {
      PRODUCT: {
        CREATE: "MANAGE_PRODUCT.PRODUCT.CREATE",
        UPDATE: "MANAGE_PRODUCT.PRODUCT.UPDATE",
        DELETE: "MANAGE_PRODUCT.PRODUCT.DELETE",
      },
      PRODUCT_TYPE: {
        CREATE: "MANAGE_PRODUCT.PRODUCT_TYPE.CREATE",
        UPDATE: "MANAGE_PRODUCT.PRODUCT_TYPE.UPDATE",
        DELETE: "MANAGE_PRODUCT.PRODUCT_TYPE.DELETE",
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
      CITY: {
        CREATE: "CITY.CREATE",
        UPDATE: "CITY.UPDATE",
        DELETE: "CITY.DELETE",
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
    isHideView: true
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