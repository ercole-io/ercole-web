<template>
  <BarChart
    :chartId="id"
    :barChartData="getDatabasesCharts"
    :chartHeight="chartHeight"
    stacked
    :legend="false"
    :xAxesConfig="xAxesConfig"
    :barThickness="70"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import BarChart from '@/components/common/charts/BarChart.vue'

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    xAxesConfig: {
      type: Array
    },
    chartHeight: {
      type: String
    }
  },
  components: {
    BarChart
  },
  computed: {
    ...mapGetters(['getDatabasesCharts'])
  }
}
</script>

<style lang="scss" scoped></style>
