<template>
    <div class="line-chart">
        <BaseChart :options="option" />
    </div>
</template>

<script lang="ts" setup>
import BaseChart from '@/base-ui/EChart/src/BaseChart.vue'
import { withDefaults, defineProps, computed } from 'vue'

const props = withDefaults(
    defineProps<{
        title?: string
        xLabels: string[]
        values: any[]
    }>(),
    {
        title: ''
    }
)

const option = computed(() => {
    return {
        title: {
            text: props.title
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {},
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: props.xLabels
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '分别销量',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: props.values
            }
        ]
    }
})
</script>

<style lang="less" scoped></style>
