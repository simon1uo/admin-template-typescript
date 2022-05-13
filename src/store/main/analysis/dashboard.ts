import { Module } from 'vuex'
import { IRootState } from '@/store/type'
import { IDashboardState } from './types'
import {
    getAddressGoodsSale,
    getCategoryGoodsCount,
    getCategoryGoodsFavor,
    getCategoryGoodsSale
} from '@/service/main/analysis/dashboard'

const DashboardModule: Module<IDashboardState, IRootState> = {
    namespaced: true,
    state() {
        return {
            categoryGoodsCount: [],
            categoryGoodsSale: [],
            categoryGoodsFavor: [],
            addressGoodsSale: []
        }
    },
    mutations: {
        CHANGE_CATEGORY_GOODS_COUNT(state, data) {
            state.categoryGoodsCount = data
        },
        CHANGE_CATEGORY_GOODS_SALE(state, data) {
            state.categoryGoodsSale = data
        },
        CHANGE_CATEGORY_GOODS_FAVOR(state, data) {
            state.categoryGoodsFavor = data
        },
        CHANGE_ADDRESS_GOODS_SALE(state, data) {
            state.addressGoodsSale = data
        }
    },
    actions: {
        async getDashboardDataAction({ commit }) {
            const categoryCountResult = await getCategoryGoodsCount()
            commit('CHANGE_CATEGORY_GOODS_COUNT', categoryCountResult.data)

            const categorySaleResult = await getCategoryGoodsSale()
            commit('CHANGE_CATEGORY_GOODS_SALE', categorySaleResult.data)

            const categoryFavourResult = await getCategoryGoodsFavor()
            commit('CHANGE_CATEGORY_GOODS_FAVOR', categoryFavourResult.data)

            const addressSaleResult = await getAddressGoodsSale()
            commit('CHANGE_ADDRESS_GOODS_SALE', addressSaleResult.data)
        }
    }
}

export default DashboardModule
