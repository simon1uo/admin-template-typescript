import { IForm } from '@/base-ui/InputForm'

export const categoryModalConfig: IForm = {
    formItems: [
        {
            field: 'name',
            type: 'input',
            label: '分类名称',
            placeholder: '请输入分类名称'
        }
    ],
    colLayout: {
        span: 24
    }
}
