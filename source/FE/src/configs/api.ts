

export const BASE_URL = process.env.NEXT_PUBLIC_API_HOST
export const API_ENDPOINT = {
  AUTH: {
    INDEX: `${BASE_URL}/auth`,
    AUTH_ME: `${BASE_URL}/auth/me`,
  },
  PAYMENT: {
    VNPAY: {
      INDEX: `${BASE_URL}/payment/vnpay`,
    }
  },
  REPORT: {
    INDEX: `${BASE_URL}/report`
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
    EMPLOYEE: {
      INDEX: `${BASE_URL}/users/employee`,
    },
    CUSTOMER: {
      INDEX: `${BASE_URL}/users/customer`,
    },
    SUPPLIER: {
      INDEX: `${BASE_URL}/users/supplier`,
    },
  },
  SETTING: {
    PAYMENT_METHOD: {
      INDEX: `${BASE_URL}/payment-type`,
    },
    DELIVERY_METHOD: {
      INDEX: `${BASE_URL}/delivery-type`,
    },
    BANNER: {
      INDEX: `${BASE_URL}/banner`,
    },
  },
  ADDRESS:{
    CITY: {
      INDEX: `${BASE_URL}/city`,
    },
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
      INDEX: `${BASE_URL}/orders`,
    },
    REVIEW: {
      INDEX: `${BASE_URL}/reviews`,
    },
  }
}
