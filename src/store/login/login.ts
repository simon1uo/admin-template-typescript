import { Module } from 'vuex'
import { ILoginState } from '@/store/login/type'
import { IRootState } from '@/store/type'
import { IAccount } from '@/service/login/types'
import { requestLoginAction, requestLoginUserInfo } from '@/service/login/login'

import localCache from '@/utils/cache'

const LoginModule: Module<ILoginState, IRootState> = {
    namespaced: true,
    state() {
        return {
            token: '',
            userInfo: []
        }
    },
    mutations: {
        CHANGE_TOKEN(state, token) {
            state.token = token
        },
        CHANGE_USER_INFO(state, userInfo) {
            state.userInfo = userInfo
        }
    },
    actions: {
        async loginAccountAction({ commit }, payload: IAccount) {
            const loginResult = await requestLoginAction(payload)
            const { id, token } = loginResult.data
            commit('CHANGE_TOKEN', token)
            localCache.setCache('token', token)

            const loginUserInfoResult = await requestLoginUserInfo(id)
            const userInfo = loginUserInfoResult.data
            commit('CHANGE_USER_INFO', userInfo)
            localCache.setCache('userInfo', userInfo)
        }
    }
}

export default LoginModule
