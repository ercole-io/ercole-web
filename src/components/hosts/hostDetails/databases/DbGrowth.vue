<template>
  <LineChart :chartId="growthId" :lineChartData="growth" />
</template>

<script>
import LineChart from '@/components/common/charts/LineChart.vue'

export default {
  props: {
    growthId: {
      type: String,
      required: true
    },
    growth: {
      type: Array,
      default: null
    }
  },
  components: {
    LineChart
  }
}
</script>

<style lang="scss" scoped></style>
