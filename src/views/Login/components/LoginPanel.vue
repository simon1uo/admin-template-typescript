<template>
    <div class="login-panel">
        <h1>🎮 admin-template</h1>
        <el-tabs
            type="border-card"
            class="login-tabs"
            stretch
            v-model="currentTab"
        >
            <el-tab-pane name="account">
                <template #label>
                    <span class="login-tabs-label">
                        <el-icon><user /></el-icon>
                        <span>账号登录</span>
                    </span>
                </template>
                <LoginAccount ref="accountLoginRef" />
            </el-tab-pane>
            <el-tab-pane name="phone">
                <template #label>
                    <span class="login-tabs-label">
                        <el-icon><iphone /></el-icon>
                        <span>手机登录</span>
                    </span>
                </template>
                <LoginPhone ref="phoneLoginRef" />
            </el-tab-pane>
        </el-tabs>
        <el-button type="primary" class="login-btn" @click="handleLoginClick">
            立即登录
        </el-button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from '@/views/Login/components/LoginAccount.vue'
import LoginPhone from '@/views/Login/components/LoginPhone.vue'
export default defineComponent({
    name: 'LoginPanel',
    components: {
        LoginAccount,
        LoginPhone
    },
    setup() {
        const currentTab = ref<string>('account')

        const accountLoginRef = ref<InstanceType<typeof LoginAccount>>()
        const phoneLoginRef = ref<InstanceType<typeof LoginPhone>>()

        const handleLoginClick = () => {
            if (currentTab.value === 'account') {
                console.log('loginAccount')
                accountLoginRef.value?.loginAccountAction()
            } else if (currentTab.value === 'phone') {
                phoneLoginRef.value?.loginPhoneAction()
            }
        }

        return { currentTab, accountLoginRef, phoneLoginRef, handleLoginClick }
    }
})
</script>

<style lang="less" scoped>
.login-panel {
    text-align: center;
    width: 320px;

    h1 {
        font-weight: bold;
        color: #409eff;
    }

    .login-tabs > .el-tabs__content {
        padding: 32px;
        color: #6b778c;
        font-size: 32px;
        font-weight: 600;
    }

    .login-tabs .login-tabs-label .el-icon {
        vertical-align: middle;
    }

    .login-tabs .login-tabs-label span {
        vertical-align: middle;
        margin-left: 4px;
    }

    .login-tabs {
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }

    .login-btn {
        width: 100%;
        margin-top: 20px;
    }

    .footer {
        margin-top: 10px;

        span {
            font-size: 10px;
            font-weight: 100;
        }
    }
}
</style>
