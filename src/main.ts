import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { globalRegister } from '@/global'

createApp(App).use(globalRegister).use(store).use(router).mount('#app')
