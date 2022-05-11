import { IForm } from '@/base-ui/InputForm'

export const departmentSearchFormConfig: IForm = {
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
