<template>
  <BoxContent
    :title="`${$t('views.hostDetails.cpuUsage')} (${dbSelected}/${dbTotal})`"
    border
    hasShadow
    :mbottom="false"
    customStyle="padding: 0"
    customStyleTitle="height: 40px;"
    v-if="showChart"
  >
    <div
      class="is-flex is-flex-direction-row is-justify-content-space-between is-align-content-flex-start"
      style="padding: 0 10px"
    >
      <SearchableMultiSelect
        :selected="selectedDatabases"
        :dataOptions="getOracleCpuUsageChartInfo"
        :placeholderName="$t('views.hostDetails.searchBy')"
        :btnLabelText="$t('views.hostDetails.compareDb')"
      />
      <RangeDates :setRange="SET_RANGE_DATES" />
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
  name: 'hosts-details-oracle-chartcpu-component',
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
    ...mapGetters(['getOracleCpuUsageChart', 'getOracleCpuUsageChartInfo']),
    showChart() {
      return this.getOracleCpuUsageChart()
    },
    dbSelected() {
      return this.selectedDatabases.length
    },
    dbTotal() {
      return this.getOracleCpuUsageChartInfo.length < 10
        ? this.getOracleCpuUsageChartInfo.length
        : '10'
    },
  },
}
</script>

<style lang="scss" scoped>
.chart-space {
  padding-top: 10px;
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
