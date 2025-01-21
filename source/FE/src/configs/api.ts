

export const BASE_URL = process.env.NEXT_PUBLIC_API_HOST
export const API_ENDPOINT = {
  AUTH: {
    INDEX: `${BASE_URL}/auth`,
    AUTH_ME: `${BASE_URL}/auth/me`,
  },
  SYSTEM: {
    ROLE: {
      INDEX: `${BASE_URL}/roles`,
    },
    USER: {
      INDEX: `${BASE_URL}/users`,
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
  }
}
