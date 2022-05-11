import { createStore, Store } from 'vuex'
import { IRootState, IStoreType } from '@/store/type'
import { useStore as useVuexStore } from 'vuex'

import login from './login/login'
import pageData from './main/pageData/pageData'
import { getPageListData } from '@/service/main/pageData/pageData'

import localCache from '@/utils/cache'

const store = createStore<IRootState>({
    state: {
        entireDepartment: [],
        entireRole: [],
        entireRoleMenu: []
    },
    mutations: {
        CHANGE_ENTIRE_DEPARTMENT(state, entireDepartment) {
            state.entireDepartment = entireDepartment
        },
        CHANGE_ENTIRE_ROLE(state, entireRole) {
            state.entireRole = entireRole
        },
        CHANGE_ENTIRE_ROLE_MENU(state, entireRoleMenu) {
            state.entireRoleMenu = entireRoleMenu
        }
    },
    actions: {
        async getInitialDataAction({ commit }) {
            const departmentResult = await getPageListData('/department/list', {
                offset: 0,
                size: 100
            })
            const { list: departmentList } = departmentResult.data

            const roleResult = await getPageListData('/role/list', {
                offset: 0,
                size: 100
            })
            const { list: roleList } = roleResult.data

            const roleMenuResult = await getPageListData('/menu/list', {})
            const { list: menuList } = roleMenuResult.data

            // 保存数据
            commit('CHANGE_ENTIRE_DEPARTMENT', departmentList)
            commit('CHANGE_ENTIRE_ROLE', roleList)
            commit('CHANGE_ENTIRE_ROLE_MENU', menuList)
            localCache.setCache('departmentList', departmentList)
            localCache.setCache('roleList', roleList)
            localCache.setCache('menuList', menuList)
        },
        loadLocalEntireList({ commit }) {
            const departmentList = localCache.getCache('departmentList')
            const roleList = localCache.getCache('roleList')
            const menuList = localCache.getCache('menuList')
            if (departmentList && roleList && menuList) {
                commit('CHANGE_ENTIRE_DEPARTMENT', departmentList)
                commit('CHANGE_ENTIRE_ROLE', roleList)
                commit('CHANGE_ENTIRE_ROLE_MENU', menuList)
            }
        }
    },
    modules: {
        login,
        pageData
    }
})

export function setupStore() {
    store.dispatch('login/loadLocalLoginInfo')
    store.dispatch('loadLocalEntireList')
}

export function useStore(): Store<IStoreType> {
    return useVuexStore()
}

export default store
