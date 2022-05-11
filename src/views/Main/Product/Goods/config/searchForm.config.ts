import { IForm } from '@/base-ui/InputForm'

export const goodsSearchFormConfig: IForm = {
    labelWidth: '120px',
    itemLayout: {
        padding: '20px 60px'
    },
    formItems: [
        {
            field: 'name',
            type: 'input',
            label: '商品名称',
            placeholder: '请输入商品名称'
        },
        {
            field: 'oldPrice',
            type: 'input',
            label: '原价',
            placeholder: '请输入原价'
        },
        {
            field: 'newPrice',
            type: 'input',
            label: '现价',
            placeholder: '请输入现价'
        },
        {
            field: 'status',
            type: 'select',
            label: '商品状态',
            placeholder: '请选择商品状态',
            options: [
                { title: '启用', value: 1 },
                { title: '禁用', value: 0 }
            ]
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
            field: 'createTime',
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
