<template>
  <BoxContent
    :title="`${$t('views.hostDetails.cpuUsage')} (${dbSelected}/${dbTotal})`"
    v-if="showChart"
  >
    <SearchableMultiSelect
      :selected="selectedDatabases"
      :dataOptions="currentHostDBsName"
      :placeholderName="$t('views.hostDetails.searchBy')"
      :btnLabelText="$t('views.hostDetails.compareDb')"
      slot="customTitle"
    />
    <RangeDates :setRange="SET_RANGE_DATES" />
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
    RangeDates
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
  methods: {
    ...mapMutations(['SET_RANGE_DATES'])
  },
  computed: {
    ...mapGetters([
      'getOracleCpuUsageChart',
      'currentHostDBsName',
      'currentHostActiveDB'
    ]),
    showChart() {
      return this.getOracleCpuUsageChart()
    },
    dbSelected() {
      return this.selectedDatabases.length
    },
    dbTotal() {
      return this.currentHostDBsName.length < 10
        ? this.currentHostDBsName.length
        : '10'
    }
  }
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
