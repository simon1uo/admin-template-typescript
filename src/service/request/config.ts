let BASE_URL = '' // 请求基础路径
const TIME_OUT = 10000 // 请求超时

// 判断环境自动切换不同的BASE_URL
// 根据process.env.NODE_ENV区分
// 开发环境: development
// 生成环境: production
// 测试环境: test
if (process.env.NODE_ENV === 'development') {
    BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
    BASE_URL = 'http://.../prod'
} else {
    BASE_URL = 'http://.../test'
}

export { BASE_URL, TIME_OUT }
