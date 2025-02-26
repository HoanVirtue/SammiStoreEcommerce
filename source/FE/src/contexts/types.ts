export type ErrCallbackType = (err: any) => void

export type LoginParams = {
  username: string
  password: string
  rememberMe?: boolean
}

export type TUserAddress ={
  address: string,
  city: string,
  phoneNumber: string,
  firstName: string,
  middleName: string,
  lastName: string,
  isDefault: boolean
}

export type UserDataType = {
  _id: string
  role: {
    name: string,
    permissions: string[]
  }
  email: string
  fullName: string
  firstName: string
  middleName: string
  lastName: string
  username: string
  password: string
  avatar?: string | null
  likedProducts: string[]
  city: string,
  address?: string,
  phoneNumber: string
  addresses: TUserAddress[]
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}
