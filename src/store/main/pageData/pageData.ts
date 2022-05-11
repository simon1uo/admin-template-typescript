import { Module } from 'vuex'
import { IPageDataState } from '@/store/main/pageData/types'
import { IRootState } from '@/store/type'
import {
    createPageData,
    deletePageData,
    editPageData,
    getPageListData
} from '@/service/main/pageData/pageData'

const PageDataModule: Module<IPageDataState, IRootState> = {
    namespaced: true,
    state() {
        return {
            departmentList: [],
            departmentCount: 0,
            menuList: [],
            menuCount: 0,
            roleList: [],
            roleCount: 0,
            usersList: [],
            usersCount: 0,

            goodsList: [],
            goodsCount: 0,
            categoryList: [],
            categoryCount: 0
        }
    },
    mutations: {
        CHANGE_DEPARTMENT_LIST(state, departmentList: any[]) {
            state.departmentList = departmentList
        },
        CHANGE_DEPARTMENT_COUNT(state, departmentCount: number) {
            state.departmentCount = departmentCount
        },
        CHANGE_MENU_LIST(state, menuList: any[]) {
            state.menuList = menuList
        },
        CHANGE_MENU_COUNT(state, menuCount: number) {
            state.menuCount = menuCount
        },
        CHANGE_ROLE_LIST(state, roleList: any[]) {
            state.roleList = roleList
        },
        CHANGE_ROLE_COUNT(state, roleCount: number) {
            state.roleCount = roleCount
        },
        CHANGE_USERS_LIST(state, usersList: any[]) {
            state.usersList = usersList
        },
        CHANGE_USERS_COUNT(state, usersCount: number) {
            state.usersCount = usersCount
        },

        CHANGE_GOODS_LIST(state, goodsList: any[]) {
            state.goodsList = goodsList
        },
        CHANGE_GOODS_COUNT(state, goodsCount: number) {
            state.goodsCount = goodsCount
        },
        CHANGE_CATEGORY_LIST(state, categoryList: any[]) {
            state.categoryList = categoryList
        },
        CHANGE_CATEGORY_COUNT(state, categoryCount: number) {
            state.categoryCount = categoryCount
        }
    },
    getters: {
        pageListData(state) {
            return (pageName: string) => {
                return (state as any)[`${pageName}List`]
            }
        },
        pageListCount(state) {
            return (pageName: string) => {
                return (state as any)[`${pageName}Count`]
            }
        }
    },
    actions: {
        // 获取列表数据
        async getPageListAction({ commit }, payload: any) {
            const pageName = payload.pageName
            const pageUrl = `${pageName}/list`

            const pageResult = await getPageListData(pageUrl, payload.queryInfo)

            const { list, totalCount } = pageResult.data
            commit(`CHANGE_${pageName.toUpperCase()}_LIST`, list)
            commit(`CHANGE_${pageName.toUpperCase()}_COUNT`, totalCount)
        },

        // 删除列表数据项
        async deletePageDataAction({ dispatch }, payload: any) {
            // 获取pageName和id
            const { pageName, id } = payload
            const pageUrl = `/${pageName}/${id}`

            // 发送删除网路请求
            await deletePageData(pageUrl)
            // 重新请求最新数据
            dispatch('getPageListAction', {
                pageName,
                // todo查询条件
                queryInfo: {
                    offset: 0,
                    size: 10
                }
            })
        },

        // 新建数据项
        async createPageDataAction({ dispatch }, payload: any) {
            const { pageName, newData } = payload
            const pageUrl = `/${pageName}`
            await createPageData(pageUrl, newData)
            // 重新请求最新数据
            dispatch('getPageListAction', {
                pageName,
                // todo查询条件
                queryInfo: {
                    offset: 0,
                    size: 10
                }
            })
        },
        // 修改数据项
        async editPageDataAction({ dispatch }, payload: any) {
            const { pageName, editData, id } = payload
            const pageUrl = `/${pageName}/${id}`
            await editPageData(pageUrl, editData)
            // 重新请求最新数据
            dispatch('getPageListAction', {
                pageName,
                // todo查询条件
                queryInfo: {
                    offset: 0,
                    size: 10
                }
            })
        }
    }
}

export default PageDataModule
