import { createStore, Store } from 'vuex'
import { IRootState, IStoreType } from '@/store/type'
import { useStore as useVuexStore } from 'vuex'

import login from './login/login'
import system from './main/system/system'
import { getPageListData } from '@/service/main/system/system'

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
        }
    },
    modules: {
        login,
        system
    }
})

export function setupStore() {
    store.dispatch('login/loadLocalLoginInfo')
    store.dispatch('getInitialDataAction')
}

export function useStore(): Store<IStoreType> {
    return useVuexStore()
}

export default store
