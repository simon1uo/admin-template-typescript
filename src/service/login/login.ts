import AxiosRequest from '@/service'
import { IAccount, ILoginResult } from '@/service/login/types'
import { IDataType } from '@/service/type'

enum LoginAPI {
    accountLogin = '/login',
    loginUserInfo = '/users/', // +id
    userMenus = '/role/'
}

export function requestLoginAction(acccount: IAccount) {
    return AxiosRequest.post<IDataType<ILoginResult>>({
        url: LoginAPI.accountLogin,
        data: acccount
    })
}

export function requestLoginUserInfo(id: number) {
    return AxiosRequest.get<IDataType>({
        url: LoginAPI.loginUserInfo + id,
        showLoading: false
    })
}

export function requestUserMenusByRoleId(id: number) {
    return AxiosRequest.get<IDataType>({
        url: LoginAPI.userMenus,
        data: id
    })
}
