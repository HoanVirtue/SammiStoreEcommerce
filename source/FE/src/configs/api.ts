import { BASE_URL } from "src/configs/env"

export const API_ENDPOINT = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    REFRESH_TOKEN: `${BASE_URL}/auth/refresh-token`,
    LOGOUT: `${BASE_URL}/auth/logout`,
  },
  PAYMENT: {
    VNPAY: {
      INDEX: `${BASE_URL}/payment/vnpay`,
    }
  },
  REPORT: {
    INDEX: `${BASE_URL}/reports`
  },
  GHN: {
    INDEX: `${BASE_URL}/ghn`
  },
  CUSTOMER_ADDRESS: {
    INDEX: `${BASE_URL}/customer-address`
  },
  CART: {
    INDEX: `${BASE_URL}/carts`,
  },
  VOUCHER: {
    INDEX: `${BASE_URL}/vouchers`,
  },
  GOODS_RECEIPT: {
    INDEX: `${BASE_URL}/purchase-order`,
  },
  EVENT: {
    INDEX: `${BASE_URL}/events`,
  },
  FAVOURITE_PRODUCT: {
    INDEX: `${BASE_URL}/favourite-product`,
  },
  SYSTEM: {
    ROLE: {
      INDEX: `${BASE_URL}/roles`,
    },
    USER: {
      INDEX: `${BASE_URL}/users`,
    },
  },
  USER: {
    INDEX: `${BASE_URL}/users`,
    CHANGE_PASSWORD: `${BASE_URL}/users/change-password`,
    UPDATE_PROFILE: `${BASE_URL}/users/update-profile`,
    ME: {
      INDEX: `${BASE_URL}/users/get-current-user`,
    },
    EMPLOYEE: {
      INDEX: `${BASE_URL}/users/employee`,
      DELETE: `${BASE_URL}/users`,
    },
    CUSTOMER: {
      INDEX: `${BASE_URL}/users/customer`,
      DELETE: `${BASE_URL}/users`,
    },
    SUPPLIER: {
      INDEX: `${BASE_URL}/users/supplier`,
      DELETE: `${BASE_URL}/users`,
    },
  },
  SETTING: {
    PAYMENT_METHOD: {
      INDEX: `${BASE_URL}/payment-methods`,
    },
    DELIVERY_METHOD: {
      INDEX: `${BASE_URL}/delivery-type`,
    },
    BANNER: {
      INDEX: `${BASE_URL}/banners`,
    },
  },
  ADDRESS:{
    PROVINCE: {
      INDEX: `${BASE_URL}/provinces`,
    },
    DISTRICT: {
      INDEX: `${BASE_URL}/districts`,
    },
    WARD: {
      INDEX: `${BASE_URL}/wards`,
    },
  },
  MANAGE_PRODUCT: {
    PRODUCT: {
      INDEX: `${BASE_URL}/products`,
    },
    PRODUCT_CATEGORY: {
      INDEX: `${BASE_URL}/product-category`,
    },
    BRAND: {
      INDEX: `${BASE_URL}/brands`,
    },
  },
  MANAGE_ORDER: {
    ORDER: {
      INDEX: `${BASE_URL}/order-buy`,
    },
    REVIEW: {
      INDEX: `${BASE_URL}/reviews`,
    },
  },
  PERMISSION: {
    INDEX: `${BASE_URL}/permissions`,
  },
}
