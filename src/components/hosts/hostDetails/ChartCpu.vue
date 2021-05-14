<template>
  <BoxContent title="CPU Usage" v-if="showChart">
    <SearchableMultiSelect
      :selected="selectedDatabases"
      :dataOptions="currentHostDBsName"
      placeholderName="Search by DB name"
      btnLabelText="Compare Databases"
      slot="customTitle"
    />
    <div class="chart-space">
      <LineChart
        chartId="lineChart"
        :lineChartData="getOracleCpuUsageChart(selectedDatabases)"
      />
    </div>
  </BoxContent>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
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
    this.selectedDatabases = [this.currentHostActiveDB]
    bus.$on('selectedData', val => {
      this.selectedDatabases = val
    })
  },
  computed: {
    ...mapGetters([
      'getOracleCpuUsageChart',
      'currentHostDBsName',
      'currentHostActiveDB'
    ]),
    showChart() {
      return this.getOracleCpuUsageChart()
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-space {
  padding-top: 22px;
}
</style>
