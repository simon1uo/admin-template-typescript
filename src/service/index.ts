import IAxiosRequest from '@/service/request'
import { BASE_URL, TIME_OUT } from '@/service/request/config'

import localCache from '@/utils/cache'

const AxiosRequest = new IAxiosRequest({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    interceptors: {
        requestInterceptor: (config) => {
            const token = localCache.getCache('token')
            if (token) {
                config.headers = {
                    ...config.headers,
                    Authorization: token
                }
            }
            return config
        },
        requestInterceptorCatch: (err) => {
            return err
        },
        responseInterceptor: (config) => {
            return config
        },
        responseInterceptorCatch: (error) => {
            return error
        }
    }
})

export default AxiosRequest
