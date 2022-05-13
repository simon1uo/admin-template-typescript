import AxiosRequest from '@/service'
import { IDataType } from '@/service/type'

enum DashboardAPI {
    categoryGoodsCount = '/goods/category/count',
    categoryGoodsSale = '/goods/category/sale',
    categoryGoodsFavor = '/goods/category/favor',
    addressGoodsSale = '/goods/address/sale'
}

export function getCategoryGoodsCount() {
    return AxiosRequest.get<IDataType>({
        url: DashboardAPI.categoryGoodsCount
    })
}

export function getCategoryGoodsSale() {
    return AxiosRequest.get<IDataType>({
        url: DashboardAPI.categoryGoodsSale
    })
}

export function getCategoryGoodsFavor() {
    return AxiosRequest.get<IDataType>({
        url: DashboardAPI.categoryGoodsFavor
    })
}

export function getAddressGoodsSale() {
    return AxiosRequest.get<IDataType>({
        url: DashboardAPI.addressGoodsSale
    })
}
