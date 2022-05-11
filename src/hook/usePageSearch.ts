import { ref } from 'vue'
import PageContent from '@/components/PageContent/src/PageContent.vue'

export function usePageSearch() {
    const pageContentRef = ref<InstanceType<typeof PageContent>>()
    const handleResetClick = () => {
        pageContentRef.value?.getPageData()
    }

    const handleQueryClick = (queryInfo: any) => {
        pageContentRef.value?.getPageData(queryInfo)
    }

    return [pageContentRef, handleResetClick, handleQueryClick]
}
