import { IForm } from '@/base-ui/InputForm'

export const categorySearchFormConfig: IForm = {
    labelWidth: '120px',
    itemLayout: {
        padding: '20px 60px'
    },
    formItems: [
        {
            field: 'id',
            type: 'input',
            label: 'id',
            placeholder: '请输入id'
        },
        {
            field: 'name',
            type: 'input',
            label: '分类名称',
            placeholder: '请输入分类名称'
        },
        {
            field: 'createTime',
            type: 'datepicker',
            label: '创建时间',
            placeholder: '请输入创建时间',
            otherOptions: {
                startPlaceholder: '开始时间',
                endPlaceholder: '结束时间',
                type: 'daterange'
            }
        },
        {
            field: 'updateTime',
            type: 'datepicker',
            label: '更新时间',
            placeholder: '请输入更新时间',
            otherOptions: {
                startPlaceholder: '开始时间',
                endPlaceholder: '结束时间',
                type: 'daterange'
            }
        }
    ]
}
