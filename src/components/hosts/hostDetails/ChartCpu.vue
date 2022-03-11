<template>
  <BoxContent
    :title="`${$t('views.hostDetails.cpuUsage')} (${dbSelected}/${dbTotal})`"
    v-if="showChart"
  >
    <div
      class="is-flex is-flex-direction-row is-justify-content-space-between is-align-content-flex-start"
    >
      <SearchableMultiSelect
        :selected="selectedDatabases"
        :dataOptions="currentHostDBsInfo"
        :placeholderName="$t('views.hostDetails.searchBy')"
        :btnLabelText="$t('views.hostDetails.compareDb')"
      />
      <RangeDates :setRange="SET_RANGE_DATES" totalRange="31" />
    </div>
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
import { mapGetters, mapMutations } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import LineChart from '@/components/common/charts/LineChart.vue'
import SearchableMultiSelect from '@/components/common/SearchableMultiSelect.vue'
import RangeDates from '@/components/common/RangeDates.vue'

export default {
  components: {
    BoxContent,
    LineChart,
    SearchableMultiSelect,
    RangeDates,
  },
  data() {
    return {
      selectedDatabases: [],
    }
  },
  beforeMount() {
    bus.$on('cpuChartSelected', (val) => {
      this.selectedDatabases = val
    })
  },
  methods: {
    ...mapMutations(['SET_RANGE_DATES']),
  },
  computed: {
    ...mapGetters(['getOracleCpuUsageChart', 'currentHostDBsInfo']),
    showChart() {
      return this.getOracleCpuUsageChart()
    },
    dbSelected() {
      return this.selectedDatabases.length
    },
    dbTotal() {
      return this.currentHostDBsInfo.length < 10
        ? this.currentHostDBsInfo.length
        : '10'
    },
  },
}
</script>

<style lang="scss" scoped>
.chart-space {
  padding-top: 22px;
}

.selected-text {
  position: absolute;
  top: 14px;
  left: 105px;
  font-size: 12px;
  font-weight: normal;

  span {
    font-weight: 500;
  }
}
</style>
