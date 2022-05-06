import axios, { AxiosInstance } from 'axios'
import {
    IAxiosRequestConfig,
    IAxiosRequestInterceptors
} from '@/service/request/type'
import { ElLoading } from 'element-plus'

const DEFAULT_LOADING = true
class IAxiosRequest {
    instance: AxiosInstance
    interceptors?: IAxiosRequestInterceptors
    loading?: any // ElLoading.service()返回实例loadingService
    showLoading: boolean

    constructor(config: IAxiosRequestConfig) {
        // 创建aixos实例
        this.instance = axios.create(config)
        // 保存基本信息
        this.interceptors = config.interceptors
        this.showLoading = config.showLoading ?? true // 左无则右，默认不显示

        this.instance.interceptors.request.use(
            this.interceptors?.requestInterceptor,
            this.interceptors?.requestInterceptorCatch
        )

        this.instance.interceptors.response.use(
            this.interceptors?.responseInterceptor,
            this.interceptors?.responseInterceptorCatch
        )

        // 添加所有的实例共有的请求拦截器
        this.instance.interceptors.request.use(
            (config) => {
                if (this.showLoading) {
                    this.loading = ElLoading.service({
                        lock: true,
                        text: '正在加载...',
                        background: 'rgba(0, 0, 0, 0.5)'
                    })
                }
                return config
            },
            (error) => {
                return error
            }
        )

        // 添加所有的实例都有的响应拦截器
        this.instance.interceptors.response.use(
            (res) => {
                // 将loading移除，使用可选链
                this.loading?.close()
                const data = res.data
                if (data.returnCode === '-1001') {
                    console.log('请求失败')
                } else {
                    return data
                }
            },
            (error) => {
                // 将loading移除
                this.loading?.close()

                // 根据不同的错误返回不同的错误信息
                if (error.response.status === 404) {
                    console.log('404')
                }
                return error
            }
        )
    }

    request<T = any>(config: IAxiosRequestConfig<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            if (config.interceptors?.requestInterceptor) {
                config = config.interceptors.requestInterceptor(config)
            }

            if (config.showLoading === false) {
                this.showLoading = config.showLoading
            }

            this.instance
                .request<any, T>(config)
                .then((res) => {
                    if (config.interceptors?.responseInterceptor) {
                        res = config.interceptors.responseInterceptor(res)
                    }
                    this.showLoading = DEFAULT_LOADING // 不让上一次关掉加载动画影响下一次请求

                    // 将结果返回出去
                    resolve(res)
                })
                .catch((error) => {
                    this.showLoading = DEFAULT_LOADING // 不让上一次关掉加载动画影响下一次请求
                    reject(error)
                    return error
                })
        })
    }

    get<T = any>(config: IAxiosRequestConfig<T>): Promise<T> {
        return this.request({ ...config, method: 'GET' })
    }

    post<T = any>(config: IAxiosRequestConfig<T>): Promise<T> {
        return this.request({ ...config, method: 'POST' })
    }

    delete<T = any>(config: IAxiosRequestConfig<T>): Promise<T> {
        return this.request({ ...config, method: 'DELETE' })
    }

    put<T = any>(config: IAxiosRequestConfig<T>): Promise<T> {
        return this.request({ ...config, method: 'PUT' })
    }

    patch<T = any>(config: IAxiosRequestConfig<T>): Promise<T> {
        return this.request({ ...config, method: 'PATCH' })
    }
}

export default IAxiosRequest
