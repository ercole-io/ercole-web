<template>
  <div>
    <div class="range-dates mt-0 mb-4">
      <div class="mr-2">
        <GhostLoading :isLoading="loading" setHeight="30" setWidth="400">
          <b-field style="min-width: 400px">
            <b-autocomplete
              v-model="selectedType"
              size="is-small"
              type="text"
              icon="magnify"
              field="full"
              :data="filteredChartLicenseHistory"
              @typing="
                getAutocompletePartNumber(
                  $event,
                  'ChartLicenseHistory',
                  getChartLicenseHistory
                )
              "
              @focus="
                () => (filteredChartLicenseHistory = getChartLicenseHistory)
              "
              open-on-focus
              expanded
              keep-first
              clearable
            >
              <template slot-scope="props">
                <div class="media media-custom">
                  <div class="media-content">
                    <b>{{ props.option.licenseTypeID }}</b>
                    <br />
                    <small>
                      {{ props.option.itemDescription }}
                      <br />
                      {{ props.option.metric }}
                    </small>
                  </div>
                </div>
              </template>
              <template slot="empty">
                {{ $i18n.t('common.validations.noResults') }}
              </template>
            </b-autocomplete>
          </b-field>
        </GhostLoading>
      </div>

      <div class="mr-2">
        <GhostLoading :isLoading="loading" setHeight="30" setWidth="150">
          <b-datepicker
            v-model="startDate"
            size="is-small"
            placeholder="Start Date"
            position="is-bottom-right"
            icon="calendar-today"
            :max-date="endDate ? endDate : new Date()"
            :date-formatter="formatDate"
            class="range-dates-field"
            trap-focus
          />
        </GhostLoading>
      </div>

      <div class="mr-2">
        <GhostLoading :isLoading="loading" setHeight="30" setWidth="150">
          <b-datepicker
            v-model="endDate"
            size="is-small"
            placeholder="End Date"
            position="is-bottom-left"
            icon="calendar-today"
            :min-date="startDate"
            :max-date="new Date()"
            :date-formatter="formatDate"
            class="range-dates-field"
            trap-focus
          />
        </GhostLoading>
      </div>
      <GhostLoading :isLoading="loading" setHeight="30" setWidth="30">
        <b-button
          size="is-small"
          type="is-ercole-blue"
          icon-right="delete"
          @click="getCurrentMonthDates"
        />
      </GhostLoading>
    </div>

    <GhostLoading :isLoading="loading" setHeight="300">
      <LineChart
        chartId="lincenseChart"
        :lineChartData="finalChartData"
        v-if="showChart"
      />
      <NoContent
        v-if="!showChart"
        :noContentText="$t('views.dashboard.noData')"
        style="min-height: 200px"
      />
    </GhostLoading>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
import { getKeyValuePair } from '@/helpers/helpers.js'
import formatDate from '@/filters/formatDate.js'
import LineChart from '@/components/common/charts/LineChart.vue'
import NoContent from '@/components/common/NoContent.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'
import { simpleAutocompleteData } from '@/helpers/helpers.js'

const matchType = (data, selected) => {
  return _.find(data, (type) => {
    return type.licenseTypeID === selected
  })
}
const mapLicenseType = (history, type, dateRange) => {
  const historyByType = []

  _.map(history, (value) => {
    let date = moment(value.date).format('YYYY-MM-DD')

    if (date > dateRange[0] && date < dateRange[1]) {
      historyByType.push({
        date: date,
        value: resolveType(type, value),
      })
    }
  })

  return historyByType
}

const resolveType = (type, value) => {
  if (type === 'covered') {
    return value.covered
  } else if (type === 'consumed') {
    return value.consumed
  } else if (type === 'purchased') {
    return value.purchased
  }
}

export default {
  components: {
    LineChart,
    NoContent,
    GhostLoading,
  },
  data() {
    return {
      finalChartData: [],
      selectedType: '',
      startDate: null,
      endDate: null,
      showChart: false,
      loading: true,
      filteredChartLicenseHistory: [],
    }
  },
  async beforeMount() {
    await this.getLicenseHistory().then(() => {
      this.loading = false
    })
    this.selectedType = this.getChartLicenseHistory[0].full

    this.getCurrentMonthDates()

    this.mountLincenseChart()
  },
  methods: {
    ...mapActions(['getLicenseHistory']),
    mountLincenseChart() {
      let findType = matchType(
        this.getChartLicenseHistory,
        this.selectedType.split(' - ')[0]
      )
      const dateRange = [
        moment(this.startDate).subtract(1, 'days').format('YYYY-MM-DD'),
        moment(this.endDate).add(1, 'days').format('YYYY-MM-DD'),
      ]

      const covered = mapLicenseType(findType.history, 'covered', dateRange)
      const consumed = mapLicenseType(findType.history, 'consumed', dateRange)
      const purchased = mapLicenseType(findType.history, 'purchased', dateRange)

      const resultCovered = getKeyValuePair(covered, 'date', 'value')
      const resultConsumed = getKeyValuePair(consumed, 'date', 'value')
      const resultPurchased = getKeyValuePair(purchased, 'date', 'value')

      const finalData = this.buildFinalData(
        resultCovered,
        resultConsumed,
        resultPurchased
      )

      if (
        _.isEmpty(resultCovered) ||
        _.isEmpty(resultConsumed) ||
        _.isEmpty(resultPurchased)
      ) {
        this.finalChartData = []
        this.showChart = false
      } else {
        this.finalChartData = finalData
        this.showChart = true
      }
    },
    buildFinalData(covered, consumed, purchased) {
      const finalResult = []
      finalResult.push(
        {
          name: this.purchased,
          data: purchased,
        },
        {
          name: this.covered,
          data: covered,
        },
        {
          name: this.consumed,
          data: consumed,
        }
      )
      return finalResult
    },
    getCurrentMonthDates() {
      const today = moment(new Date(), 'YYYY/MM/DD')
      this.startDate = new Date(
        moment().subtract(31, 'days').format('YYYY-MM-DD')
      )
      this.endDate = new Date(moment().format(`YYYY-MM-${today.format('DD')}`))
    },
    formatDate(date) {
      return formatDate(date)
    },
    getAutocompleteData(text, toFilter, data) {
      const values = simpleAutocompleteData(text, data)
      this[`filtered${toFilter}`] = _.uniqBy(values, (e) => e)
    },
    getAutocompletePartNumber(text, toFilter, data) {
      const newData = []
      _.map(data, (val) => {
        newData.push(val.full)
      })

      const values = simpleAutocompleteData(text, newData)

      const newValues = []
      _.map(values, (val) => {
        const newVal = _.split(val, ' - ')
        newValues.push({
          licenseTypeID: newVal[0],
          itemDescription: newVal[1],
          metric: newVal[2],
          full: `${newVal[0]} - ${newVal[1]} - ${newVal[2]}`,
        })
      })

      this[`filtered${toFilter}`] = newValues
    },
  },
  computed: {
    ...mapGetters(['getChartLicenseHistory']),
    consumed() {
      return this.$i18n.t('views.dashboard.usedLicenses')
    },
    covered() {
      return this.$i18n.t('views.dashboard.coveredLicenses')
    },
    purchased() {
      return this.$i18n.t('views.dashboard.purchasedLicenses')
    },
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
    },
    '$i18n.locale'(newValue) {
      if (newValue) {
        this.getCurrentMonthDates()
      }
    },
    selectedType(newValue) {
      if (newValue.split(' - ').length > 1) {
        this.mountLincenseChart()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.range-dates {
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  margin-top: -10px;
  margin-bottom: 5px;

  .range-dates-field {
    width: 100%;
    max-width: 150px;
  }
}

.media-custom {
  line-height: 1.2;
  font-size: 0.75rem;
}
</style>
