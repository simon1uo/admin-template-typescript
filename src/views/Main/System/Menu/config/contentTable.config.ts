export const menuContentTableConfig = {
    title: '菜单列表',
    propList: [
        { prop: 'name', label: '菜单名称', minWidth: '100' },
        { prop: 'type', label: '类型', minWidth: '60' },
        { prop: 'url', label: '菜单url', minWidth: '100' },
        { prop: 'icon', label: '菜单图标', minWidth: '100' },
        { prop: 'permission', label: '按钮权限', minWidth: '100' },
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
    showSelectColumn: false,
    showPagination: false,

    // 针对树状菜单要添加的配置
    childrenProps: {
        rowKey: 'id',
        childrenProps: {
            rowKey: 'id',
            treeProp: {
                children: 'children'
            }
        }
    }
}
