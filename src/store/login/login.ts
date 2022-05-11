import { Module } from 'vuex'
import { ILoginState } from '@/store/login/type'
import { IRootState } from '@/store/type'
import { IAccount } from '@/service/login/types'
import {
    requestLoginAction,
    requestLoginUserInfo,
    requestUserMenusByRoleId
} from '@/service/login/login'

import localCache from '@/utils/cache'
import router from '@/router'
import { mapMenusToRoutes, mapMenuToPermissions } from '@/utils/map-menus'

const LoginModule: Module<ILoginState, IRootState> = {
    namespaced: true,
    state() {
        return {
            token: '',
            userInfo: [],
            userMenus: [],
            permissions: []
        }
    },
    mutations: {
        CHANGE_TOKEN(state, token) {
            state.token = token
        },
        CHANGE_USER_INFO(state, userInfo) {
            state.userInfo = userInfo
        },
        CHANGE_USER_MENUS(state, userMenus) {
            state.userMenus = userMenus

            const routes = mapMenusToRoutes(userMenus)
            routes.forEach((route) => {
                router.addRoute('Main', route)
            })

            const permissions = mapMenuToPermissions(userMenus)
            state.permissions = permissions
        }
    },
    actions: {
        async loginAccountAction({ commit, dispatch }, payload: IAccount) {
            const loginResult = await requestLoginAction(payload)
            const { id, token } = loginResult.data
            commit('CHANGE_TOKEN', token)
            localCache.setCache('token', token)

            // 以防在获取token之前就初始化了一些数据（菜单权限），所以要在token获取后才进行请求
            dispatch('getInitialDataAction', null, { root: true })

            const loginUserInfoResult = await requestLoginUserInfo(id)
            const userInfo = loginUserInfoResult.data
            commit('CHANGE_USER_INFO', userInfo)
            localCache.setCache('userInfo', userInfo)

            const userMenusResult = await requestUserMenusByRoleId(id)
            const userMenus = userMenusResult.data
            commit('CHANGE_USER_MENUS', userMenus)
            localCache.setCache('userMenus', userMenus)

            router.push('/main')
        },
        loadLocalLoginInfo({ commit }) {
            const token = localCache.getCache('token')
            if (token) {
                commit('CHANGE_TOKEN', token)
            }

            const userInfo = localCache.getCache('userInfo')
            if (userInfo) {
                commit('CHANGE_USER_INFO', userInfo)
            }

            const userMenus = localCache.getCache('userMenus')
            if (userMenus) {
                commit('CHANGE_USER_MENUS', userMenus)
            }
        }
    }
}

export default LoginModule
