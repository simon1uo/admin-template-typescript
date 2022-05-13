<template>
    <div class="rose-chart">
        <BaseChart :options="option" />
    </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import BaseChart from '@/base-ui/EChart/src/BaseChart.vue'
import { IDataType } from '../type'

const props = defineProps<{
    roseData: IDataType
}>()

const option = computed(() => {
    return {
        legend: {
            top: 'bottom'
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        series: [
            {
                name: '类别数据',
                type: 'pie',
                radius: [10, 100],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                data: props.roseData
            }
        ]
    }
})
</script>

<style lang="less" scoped></style>
