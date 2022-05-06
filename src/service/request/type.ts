import type { AxiosRequestConfig, AxiosResponse } from 'axios'
// 请求接口
export interface IAxiosRequestConfig<T = AxiosResponse>
    extends AxiosRequestConfig {
    interceptors?: IAxiosRequestInterceptors<T>
    showLoading?: boolean
}

// 请求拦截器接口
export interface IAxiosRequestInterceptors<T = AxiosResponse> {
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
    requestInterceptorCatch?: (error: any) => any
    responseInterceptor?: (res: T) => T
    responseInterceptorCatch?: (error: any) => any
}
