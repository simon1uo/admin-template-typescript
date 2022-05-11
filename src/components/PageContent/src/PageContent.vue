<template>
    <div class="page-content">
        <DataTable
            :list-data="dataList"
            :list-count="dataCount"
            v-bind="contentTableConfig"
            v-model:page="pageInfo"
        >
            <!--header插槽-->
            <template #headerHandler>
                <el-button
                    type="primary"
                    size="default"
                    v-if="isCreate"
                    @click="handleCreateClick"
                >
                    New {{ pageName }}
                </el-button>
            </template>

            <!--列中插槽-->
            <template #createAt="scope">
                {{ $filters.formatTime(scope.row.createAt) }}
            </template>
            <template #updateAt="scope">
                {{ $filters.formatTime(scope.row.updateAt) }}
            </template>
            <template #handler="scope">
                <el-button
                    size="small"
                    type="text"
                    v-if="isUpdate"
                    @click="handleEditClick(scope.row)"
                >
                    <el-icon><edit /></el-icon>编辑
                </el-button>
                <el-popconfirm
                    title="你确定要删除吗?"
                    @confirm="handleDeleteClick(scope.row)"
                >
                    <template v-if="isDelete" #reference>
                        <el-button size="small" type="text">
                            <el-icon><remove /></el-icon>删除
                        </el-button>
                    </template>
                </el-popconfirm>
            </template>

            <!-- 动态插入其他的插槽 -->
            <template
                v-for="item in otherPropSlots"
                :key="item.prop"
                #[item.slotName]="scope"
            >
                <template v-if="item.slotName">
                    <slot :name="item.slotName" :row="scope.row"></slot>
                </template>
            </template>
        </DataTable>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'

import DataTable from '@/base-ui/DataTable/src/DataTable.vue'

import { useStore } from '@/store'
import { usePermission } from '@/hook/usePermission'

export default defineComponent({
    name: 'PageContent',
    components: { DataTable },
    props: {
        contentTableConfig: {
            type: Object,
            required: true
        },
        pageName: {
            type: String,
            required: true
        }
    },
    emits: ['createBtnClick', 'editBtnClick'],
    setup(props, { emit }) {
        const store = useStore()

        const isCreate = usePermission(props.pageName, 'create')
        const isUpdate = usePermission(props.pageName, 'update')
        const isDelete = usePermission(props.pageName, 'delete')
        const isQuery = usePermission(props.pageName, 'query')

        // 双向绑定pageInfo
        const pageInfo = ref({ currentPage: 1, pageSize: 10 })
        watch(pageInfo, () => getPageData())

        // 发送请求
        const getPageData = (queryInfo: any = {}) => {
            if (!isQuery) return // 如果没有权限就不发送请求
            store.dispatch('pageData/getPageListAction', {
                pageName: props.pageName,
                queryInfo: {
                    offset:
                        pageInfo.value.pageSize *
                        (pageInfo.value.currentPage - 1),
                    size: pageInfo.value.pageSize,
                    ...queryInfo
                }
            })
        }
        getPageData()

        const dataList = computed(() =>
            store.getters['pageData/pageListData'](props.pageName)
        )

        const dataCount = computed(() =>
            store.getters['pageData/pageListCount'](props.pageName)
        )

        // 获取其他动态插槽名称
        const otherPropSlots = props.contentTableConfig?.propList.filter(
            (item: any) => {
                if (item.slotName === 'createAt') return false
                if (item.slotName === 'updateAt') return false
                if (item.slotName === 'handler') return false
                return true
            }
        )

        // 删除、编辑、新增操作
        const handleDeleteClick = (item: any) => {
            store.dispatch('pageData/deletePageDataAction', {
                pageName: props.pageName,
                id: item.id
            })
        }

        const handleCreateClick = () => {
            emit('createBtnClick')
        }
        const handleEditClick = (item: any) => {
            emit('editBtnClick', item)
        }

        return {
            isCreate,
            isUpdate,
            isDelete,
            isQuery,
            pageInfo,
            dataList,
            dataCount,
            getPageData,
            otherPropSlots,
            handleDeleteClick,
            handleCreateClick,
            handleEditClick
        }
    }
})
</script>

<style lang="less" scoped>
.page-content {
    padding: 20px;
    border-top: 20px solid #f5f5f5;
}
</style>
