<template>
  <BoxContent title="CPU Usage" class="column is-4">
    <vueMultiSelect
      v-model="selectedDatabases"
      search
      :filters="filters"
      :position="position"
      :options="options"
      :selectOptions="getCurrentHostDbsName"
      historyButton
      slot="customTitle"
      searchPlaceholder="Search by DB name"
      emptyTabText="No database found!"
      :btnLabel="() => 'Compare Databases'"
      class="custom-multi-select"
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
import BoxContent from '@/components/common/BoxContent.vue'
import LineChart from '@/components/common/charts/LineChart.vue'
import { mapGetters } from 'vuex'
import vueMultiSelect from 'vue-multi-select'

export default {
  components: {
    BoxContent,
    LineChart,
    vueMultiSelect
  },
  data() {
    return {
      selectedDatabases: [],
      filters: [
        {
          nameAll: 'Select all',
          nameNotAll: 'Deselect all',
          func() {
            return true
          }
        }
      ],
      options: {
        multi: true,
        cssSelected: option =>
          option.selected ? { 'background-color': '#679189' } : ''
      },
      position: 'bottom-right'
    }
  },
  beforeMount() {
    this.selectedDatabases = [this.getCurrentHostDbsName[0]]
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
