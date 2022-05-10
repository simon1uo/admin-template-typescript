import { createStore, Store } from 'vuex'
import login from './login/login'
import { IRootState, IStoreType } from '@/store/type'
import { useStore as useVuexStore } from 'vuex'

const store = createStore<IRootState>({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        login
    }
})

export function setupStore() {
    store.dispatch('login/loadLocalLoginInfo')
}

export function useStore(): Store<IStoreType> {
    return useVuexStore()
}

export default store
