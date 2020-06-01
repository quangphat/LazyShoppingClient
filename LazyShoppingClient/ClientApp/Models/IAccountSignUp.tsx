export interface IAccountSignUp {
    displayName: string,
    profileName: string,
    email: string,
    skillTag: string[],
    password: string,
    re_pass?: string,
    accept_policy?: boolean
}