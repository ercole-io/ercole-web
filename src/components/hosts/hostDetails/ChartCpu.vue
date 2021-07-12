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
    <div class="range-dates">
      <b-datepicker
        v-model="startDate"
        size="is-small"
        placeholder="Start Date"
        position="is-bottom-right"
        icon="calendar-today"
        :max-date="endDate ? endDate : new Date()"
        :date-formatter="formatDate"
        class="mr-1 range-dates-field"
        trap-focus
        @input="SET_RANGE_DATES([startDate, endDate])"
      />
      <b-datepicker
        v-model="endDate"
        size="is-small"
        placeholder="End Date"
        position="is-bottom-left"
        icon="calendar-today"
        :min-date="startDate"
        :max-date="new Date()"
        :date-formatter="formatDate"
        class="ml-1 range-dates-field"
        trap-focus
        @input="SET_RANGE_DATES([startDate, endDate])"
      />
      <b-button
        class="ml-1"
        size="is-small"
        type="is-primary"
        icon-right="delete"
        @click="getCurrentMonthDates"
      />
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
import moment from 'moment'
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapMutations } from 'vuex'
import formatDate from '@/filters/formatDate.js'
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
      selectedDatabases: [],
      startDate: null,
      endDate: null
    }
  },
  beforeMount() {
    this.selectedDatabases = [this.currentHostActiveDB]
    bus.$on('selectedData', val => {
      this.selectedDatabases = val
    })
    this.getCurrentMonthDates()
  },
  methods: {
    ...mapMutations(['SET_RANGE_DATES']),
    getCurrentMonthDates() {
      const today = moment(new Date(), 'YYYY/MM/DD')
      this.startDate = new Date(moment().format('YYYY-MM-01'))
      this.endDate = new Date(moment().format(`YYYY-MM-${today.format('DD')}`))

      const dateRange = [this.startDate, this.endDate]
      this.SET_RANGE_DATES(dateRange)
    },
    formatDate(date) {
      return formatDate(date)
    }
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

.range-dates {
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  margin-right: -3px;
  margin-top: -10px;
  margin-bottom: -15px;

  .range-dates-field {
    width: 100%;
    // max-width: 180px;
  }
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
