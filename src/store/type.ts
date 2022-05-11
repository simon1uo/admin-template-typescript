import { ILoginState } from '@/store/login/type'

export interface IRootState {
    name?: string
    entireDepartment: any[]
    entireRole: any[]
    entireRoleMenu: any[]
}

export interface IRootWithModule {
    login: ILoginState
}

export type IStoreType = IRootState & IRootWithModule
