<template>
  <Collapse :title="chartValues.title" :id="chartValues.collapseId" isOpen>
    <ColumnChart
      :chartId="chartValues.chartId"
      :columnChartData="chartValues.data"
      chartHeight="150px"
      stacked
    />
  </Collapse>
</template>

<script>
import { mapGetters } from 'vuex'
import Collapse from '@/components/common/Collapse.vue'
import ColumnChart from '@/components/common/charts/ColumnChart.vue'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    ColumnChart,
    Collapse
  },
  computed: {
    ...mapGetters(['getOracleChartsData']),
    chartValues() {
      return this.getOracleChartsData(this.id)
    }
  }
}
</script>

<style lang="scss" scoped></style>
