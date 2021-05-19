<template>
  <BoxContent title="Licenses: Used x Purchased">
    <div slot="customTitle">
      <b-field>
        <b-select
          placeholder="Select a type"
          size="is-small"
          v-model="selectedType"
          @change.native="mountLincenseChart"
        >
          <option
            v-for="(type, index) in getChartLicenseHistory"
            :value="type.licenseTypeID"
            :key="index"
          >
            {{ type.licenseTypeID }} <span v-if="type.licenseTypeID">-</span>
            {{ type.itemDescription }} <span v-if="type.metric">-</span>
            {{ type.metric }}
          </option>
        </b-select>
      </b-field>
    </div>
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
      />
      <b-button
        class="ml-1"
        size="is-small"
        type="is-primary"
        icon-right="delete"
        @click="getCurrentMonthDates"
      />
    </div>
    <LineChart
      chartId="lincenseChart"
      :lineChartData="finalChartData"
      v-if="showChart"
    />
    <NoContent
      v-if="!showChart"
      :noContentText="'No data. Please change the dates!'"
      style="min-height: 200px"
    />
  </BoxContent>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import { mapGetters } from 'vuex'
import formatDate from '@/filters/formatDate.js'
import BoxContent from '@/components/common/BoxContent.vue'
import LineChart from '@/components/common/charts/LineChart.vue'
import NoContent from '@/components/common/NoContent.vue'

const matchType = (data, selected) => {
  return _.find(data, type => {
    return type.licenseTypeID === selected
  })
}
const mapLicenseType = (history, type, dateRange) => {
  const historyByType = []

  _.map(history, value => {
    let date = moment(value.date).format('YYYY-MM-DD')

    if (date > dateRange[0] && date < dateRange[1]) {
      historyByType.push({
        date: date,
        value: type === 'purchased' ? value.covered : value.consumed
      })
    }
  })

  return historyByType
}
const loopLicenseTypeValues = values => {
  const result = {}
  for (const prop in values) {
    result[values[prop].date] = values[prop].value
  }

  return result
}
const buildFinalData = (purchased, used) => {
  const finalResult = []
  finalResult.push(
    {
      name: 'Purchased Licenses',
      data: purchased
    },
    {
      name: 'Used Licenses',
      data: used
    }
  )
  return finalResult
}

export default {
  components: {
    LineChart,
    BoxContent,
    NoContent
  },
  data() {
    return {
      finalChartData: [],
      selectedType: '',
      startDate: null,
      endDate: null,
      showChart: false
    }
  },
  async beforeMount() {
    await this.$store.dispatch('getLicenseHistory')
    this.selectedType = this.getChartLicenseHistory[0].licenseTypeID

    this.getCurrentMonthDates()

    this.mountLincenseChart()
  },
  methods: {
    mountLincenseChart() {
      let findType = matchType(this.getChartLicenseHistory, this.selectedType)
      const dateRange = [
        moment(this.startDate).format('YYYY-MM-DD'),
        moment(this.endDate).format('YYYY-MM-DD')
      ]

      const purchased = mapLicenseType(findType.history, 'purchased', dateRange)
      const used = mapLicenseType(findType.history, 'used', dateRange)

      const resultPurchased = loopLicenseTypeValues(purchased)
      const resultUsed = loopLicenseTypeValues(used)

      const finalData = buildFinalData(resultPurchased, resultUsed)

      if (_.isEmpty(resultPurchased) || _.isEmpty(resultUsed)) {
        this.finalChartData = []
        this.showChart = false
      } else {
        this.finalChartData = finalData
        this.showChart = true
      }
    },
    getCurrentMonthDates() {
      const today = moment(new Date(), 'YYYY/MM/DD')
      this.startDate = new Date(moment().format('YYYY-MM-01'))
      this.endDate = new Date(moment().format(`YYYY-MM-${today.format('DD')}`))
    },
    formatDate(date) {
      return formatDate(date)
    }
  },
  computed: {
    ...mapGetters(['getChartLicenseHistory'])
  },
  watch: {
    startDate(newValue) {
      if (newValue) {
        this.mountLincenseChart()
      }
    },
    endDate(newValue) {
      if (newValue) {
        this.mountLincenseChart()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.range-dates {
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  margin-right: -3px;
  margin-top: -10px;

  .range-dates-field {
    width: 100%;
    max-width: 180px;
  }
}
</style>
