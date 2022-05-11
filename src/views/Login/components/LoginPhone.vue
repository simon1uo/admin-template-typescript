<template>
    <div class="login-phone">
        <el-form
            label-position="left"
            :rules="phoneRules"
            :model="phoneAccount"
            ref="loginPhoneFormRef"
        >
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="phoneAccount.phone" />
            </el-form-item>
            <el-form-item label="验证码" prop="code">
                <div class="get-code">
                    <el-input v-model="phoneAccount.code" />
                    <el-button class="get-code-btn" type="primary">
                        <el-icon><key /></el-icon>
                        获取验证码
                    </el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { phoneRules } from '../config/phone-rules'
import { FormInstance } from 'element-plus'
export default defineComponent({
    name: 'LoginPhone',
    setup() {
        const phoneAccount = reactive({
            phone: '',
            code: ''
        })

        const loginPhoneFormRef = ref<FormInstance>()

        const loginPhoneAction = () => {
            loginPhoneFormRef.value?.validate((valid) => {
                if (valid) {
                    console.log('验证通过')
                } else {
                    console.log('验证失败')
                }
            })
        }

        return { phoneAccount, loginPhoneFormRef, loginPhoneAction, phoneRules }
    }
})
</script>

<style lang="less" scoped>
.login-phone {
    .get-code {
        display: flex;
        .get-code-btn {
            margin-left: 5px;
        }
    }
}
</style>
