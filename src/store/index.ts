import { createStore } from 'vuex'
import login from './login/login'
import { IRootState } from '@/store/type'

export default createStore<IRootState>({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        login
    }
})
