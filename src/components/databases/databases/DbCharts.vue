<template>
  <Collapse
    :title="chartValues.title"
    :id="chartValues.collapseId"
    :isOpen="chartValues.isOpen"
  >
    <BarChart
      :chartId="chartValues.chartId"
      :barChartData="chartValues.data"
      chartHeight="150px"
      stacked
    />
  </Collapse>
</template>

<script>
import { mapGetters } from 'vuex'
import BarChart from '@/components/common/charts/BarChart.vue'
import Collapse from '@/components/common/Collapse.vue'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    BarChart,
    Collapse
  },
  computed: {
    ...mapGetters(['getDatabasesCharts']),
    chartValues() {
      return this.getDatabasesCharts(this.id)
    }
  }
}
</script>

<style lang="scss" scoped></style>
