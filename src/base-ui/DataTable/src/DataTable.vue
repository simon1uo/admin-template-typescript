<template>
    <div class="data-table">
        <div class="header">
            <slot name="header">
                <div class="title">
                    <h2>{{ title }}</h2>
                </div>
                <div class="header-handler">
                    <slot name="headerHandler"></slot>
                </div>
            </slot>
        </div>

        <el-table
            :data="listData"
            :listCount="listCount"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
            v-bind="childrenProps"
        >
            <el-table-column
                v-if="showSelectColumn"
                type="selection"
                align="center"
                width="60"
            />
            <el-table-column
                v-if="showIndexColumn"
                type="index"
                label="序号"
                align="center"
                width="60"
            />
            <template v-for="propItem in propList" :key="propItem.prop">
                <el-table-column
                    v-bind="propItem"
                    align="center"
                    show-overflow-tooltip
                >
                    <template #default="scope">
                        <slot :name="propItem.slotName" :row="scope.row">
                            {{ scope.row[propItem.prop] }}
                        </slot>
                    </template>
                </el-table-column>
            </template>
        </el-table>

        <div class="footer" v-if="showPagination">
            <slot name="footer">
                <el-pagination
                    :current-page="page.currentPage"
                    :page-size="page.pageSize"
                    :page-sizes="[10, 20, 30, 40]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="listCount"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'DataTable',
    props: {
        title: {
            type: String,
            required: true
        },
        listData: {
            type: Array,
            required: true
        },
        listCount: {
            type: Number,
            default: 0
        },
        propList: {
            type: Array,
            required: true
        },
        showIndexColumn: {
            type: Boolean,
            default: false
        },
        showSelectColumn: {
            type: Boolean,
            default: false
        },
        page: {
            type: Object,
            default: () => ({ currentPage: 0, pageSize: 10 })
        },
        childrenProps: {
            type: Object,
            default: () => ({})
        },
        showPagination: {
            type: Boolean,
            default: true
        }
    },
    emits: ['selectionChange', 'update:page'],
    setup(props, { emit }) {
        const handleSelectionChange = (value: any) => {
            emit('selectionChange', value)
        }
        const handleSizeChange = (pageSize: number) => {
            emit('update:page', { ...props.page, pageSize })
        }

        const handleCurrentChange = (currentPage: number) => {
            emit('update:page', { ...props.page, currentPage })
        }

        return { handleSelectionChange, handleSizeChange, handleCurrentChange }
    }
})
</script>

<style lang="less" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
}

.footer {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
}
</style>
