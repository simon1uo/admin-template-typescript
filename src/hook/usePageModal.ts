import { ref } from 'vue'
import PageModal from '@/components/PageModal'

type CallbackType = (item?: any) => void

export function usePageModal(createCb?: CallbackType, editCb?: CallbackType) {
    const pageModalRef = ref<InstanceType<typeof PageModal>>()
    const defaultInfo = ref({})

    const handleCreateData = () => {
        defaultInfo.value = {}
        if (pageModalRef.value) {
            pageModalRef.value.title = '新建'
            pageModalRef.value.dialogVisible = true
        }

        createCb && createCb() // 有值才执行
    }

    const handleEditData = (item: any) => {
        defaultInfo.value = { ...item }
        if (pageModalRef.value) {
            pageModalRef.value.title = '编辑'
            pageModalRef.value.dialogVisible = true
        }

        editCb && editCb(item)
    }

    return [pageModalRef, defaultInfo, handleCreateData, handleEditData]
}
