export type TLoginAuth = {
    username: string,
    password: string
}

export type TRegisterAuth = {
    email: string,
    password: string
}

export type TChangePassword = {
    currentPassword: string,
    newPassword: string
}