import { IDataType } from '@/service/type'
import AxiosRequest from '@/service'

// 获取列表信息
export function getPageListData(url: string, queryInfo: any) {
    return AxiosRequest.post<IDataType>({
        url: url,
        data: queryInfo
    })
}

// 删除列表数据项目
export function deletePageData(url: string) {
    return AxiosRequest.delete<IDataType>({
        url: url
    })
}

// 新建列表数据项目
export function createPageData(url: string, newData: any) {
    return AxiosRequest.post<IDataType>({
        url: url,
        data: newData
    })
}

// 编辑列表数据项目
export function editPageData(url: string, editData: any) {
    return AxiosRequest.patch<IDataType>({
        url: url,
        data: editData
    })
}
