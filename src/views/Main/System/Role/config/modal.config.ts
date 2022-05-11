import { IForm } from '@/base-ui/InputForm'

export const roleModalConfig: IForm = {
    formItems: [
        {
            field: 'name',
            type: 'input',
            label: '角色名称',
            placeholder: '请输入角色名称名'
        },
        {
            field: 'intro',
            type: 'input',
            label: '权限介绍',
            placeholder: '请输入权限介绍'
        }
    ],
    colLayout: {
        span: 24
    }
}
