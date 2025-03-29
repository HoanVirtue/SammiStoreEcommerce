export type TLoginAuth = {
    username: string;
    password: string;
    rememberMe?: boolean;
    returnUrl?: string;
    isEmployee?: boolean;
};

export type TRegisterAuth = {
    email: string,
    password: string
}

export type TChangePassword = {
    currentPassword: string,
    newPassword: string
}

export interface LoginParams {
    username: string;
    password: string;
    rememberMe?: boolean;
    returnUrl?: string;
    isEmployee?: boolean;
}

export interface UserDataType {
    id: number;
    username: string
  }

export type ErrCallbackType = (err: any) => void;

export interface AuthValuesType {
    user: UserDataType | null;
    loading: boolean;
    setUser: (user: UserDataType | null) => void;
    setLoading: (loading: boolean) => void;
    login: (params: LoginParams, errorCallback?: ErrCallbackType) => void;
    logout: () => void;
}