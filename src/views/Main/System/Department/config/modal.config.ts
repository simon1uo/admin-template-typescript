import { IForm } from '@/base-ui/InputForm'

export const departmentModalConfig: IForm = {
    formItems: [
        {
            field: 'name',
            type: 'input',
            label: '部门名称',
            placeholder: '请输入部门名称'
        },
        {
            field: 'parentId',
            type: 'input',
            label: '上级部门id',
            placeholder: '请输入上级部门id'
        },
        {
            field: 'leader',
            type: 'input',
            label: '领导',
            placeholder: '请输入领导名称'
        }
    ],
    colLayout: {
        span: 24
    }
}
