<template>
    <div class="login-account">
        <el-form
            label-position="left"
            :rules="accountRules"
            :model="account"
            ref="loginAccountFormRef"
        >
            <el-form-item label="账号" prop="name">
                <el-input v-model="account.name" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="account.password" show-password />
            </el-form-item>
            <div class="account-control">
                <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
                <el-link type="primary">忘记密码</el-link>
            </div>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { accountRules } from '../config/account-rules'
import { FormInstance } from 'element-plus'
import { useStore } from 'vuex'

import localCache from '@/utils/cache'

export default defineComponent({
    name: 'LoginAccount',
    setup() {
        const account = reactive({
            name: localCache.getCache('name') ?? '',
            password: localCache.getCache('password') ?? ''
        })
        const isKeepPassword = ref(false) // 记住密码

        const loginAccountFormRef = ref<FormInstance>()

        const store = useStore()

        const loginAccountAction = () => {
            loginAccountFormRef.value?.validate((valid) => {
                if (valid) {
                    if (isKeepPassword.value) {
                        localCache.setCache('name', account.name)
                        localCache.setCache('password', account.password)
                    } else {
                        localCache.removeCache('name')
                        localCache.removeCache('password')
                    }
                    // console.log('验证通过')
                } else {
                    console.log('验证失败')
                }

                store.dispatch('login/loginAccountAction', { ...account })
            })
        }

        return {
            account,
            isKeepPassword,
            loginAccountFormRef,
            loginAccountAction,
            accountRules
        }
    }
})
</script>

<style lang="less" scoped>
.login-account {
    .account-control {
        display: flex;
        justify-content: space-between;
    }
}
</style>
