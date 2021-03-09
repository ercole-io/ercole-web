<template>
  <BoxContent title="CPU Usage" class="column is-4">
    <SearchableMultiSelect
      :selected="selectedDatabases"
      :dataOptions="getCurrentHostDbsName"
      placeholderName="Search by DB name"
      btnLabelText="Compare Databases"
      slot="customTitle"
    />
    <div class="chart-space">
      <LineChart
        chartId="lineChart"
        :lineChartData="getCpuUsageChart(selectedDatabases)"
      />
    </div>
  </BoxContent>
</template>

<script>
import { mapGetters } from 'vuex'
import { bus } from '@/helpers/eventBus.js'
import BoxContent from '@/components/common/BoxContent.vue'
import LineChart from '@/components/common/charts/LineChart.vue'
import SearchableMultiSelect from '@/components/common/SearchableMultiSelect.vue'

export default {
  components: {
    BoxContent,
    LineChart,
    SearchableMultiSelect
  },
  data() {
    return {
      selectedDatabases: []
    }
  },
  beforeMount() {
    bus.$on('selectedData', val => {
      this.selectedDatabases = val
    })
  },
  computed: {
    ...mapGetters(['getCpuUsageChart', 'getCurrentHostDbsName'])
  }
}
</script>

<style lang="scss" scoped>
.chart-space {
  padding-top: 22px;
}
</style>
