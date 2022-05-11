export const goodsContentTableConfig = {
    title: '商品列表',
    propList: [
        { prop: 'name', label: '商品名称', minWidth: '80' },
        { prop: 'oldPrice', label: '原价', minWidth: '50', slotName: 'price' },
        { prop: 'newPrice', label: '现价', minWidth: '50', slotName: 'price' },
        {
            prop: 'imgUrl',
            label: '商品图片',
            minWidth: '100',
            slotName: 'image'
        },
        { prop: 'status', label: '状态', minWidth: '100', slotName: 'status' },
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

    showIndexColumn: true,
    showSelectColumn: true
}
