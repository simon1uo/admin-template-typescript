import { reactive } from 'vue'
import { FormRules } from 'element-plus'

export const phoneRules = reactive<FormRules>({
    phone: [
        {
            required: true,
            message: '手机号必须填写',
            trigger: 'blur'
        },
        {
            pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
            message: '手机号输入有误',
            trigger: 'blur'
        }
    ],
    code: [
        {
            required: true,
            message: '验证码必须填写',
            trigger: 'blur'
        },
        {
            pattern: /^[0-9]{6}$/,
            message: '验证码为六位数的数字',
            trigger: 'blur'
        }
    ]
})
