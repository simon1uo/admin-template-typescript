export const departmentContentTableConfig = {
    title: '部门列表',
    propList: [
        { prop: 'id', label: 'id', minWidth: '80' },
        { prop: 'name', label: '部门名称', minWidth: '80' },
        { prop: 'name', label: '领导', minWidth: '80' },
        {
            prop: 'createAt',
            label: '创建时间',
            minWidth: '100',
            slotName: 'createAt'
        },
        {
            prop: 'updateAt',
            label: '更新时间',
            minWidth: '100',
            slotName: 'updateAt'
        },
        {
            label: '操作',
            minWidth: '100',
            slotName: 'handler'
        }
    ],

    showIndexColumn: false,
    showSelectColumn: true
}
