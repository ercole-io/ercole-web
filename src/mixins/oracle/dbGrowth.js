import _ from 'lodash'
import moment from 'moment'
import { mapMutations, mapState } from 'vuex'
import {
  setRangeDateFormat,
  checkRangeDate,
  getKeyValuePair,
} from '@/helpers/helpers.js'
import LineChart from '@/components/common/charts/LineChart.vue'
import RangeDates from '@/components/common/RangeDates.vue'

export default {
  components: {
    LineChart,
    RangeDates,
  },
  methods: {
    ...mapMutations(['SET_RANGE_DATES_ALT']),
    calcChartValues(data, item) {
      const chartData = []

      _.map(data, (val) => {
        const getItem = val[item]
        const updated = val.updated
        let date = setRangeDateFormat(updated)

        if (checkRangeDate(date, this.rangeDates.rangeDatesAlt)) {
          chartData.push({
            date: moment(updated).format('ll'),
            value: getItem,
          })
        }
      })

      _.reverse(chartData)

      return getKeyValuePair(chartData, 'date', 'value')
    },
    mountDbGrowthChart(data) {
      return [
        {
          name: 'Datafile Size',
          data: this.calcChartValues(data, 'datafileSize'),
        },
        {
          name: 'Segments Size',
          data: this.calcChartValues(data, 'segmentsSize'),
        },
        {
          name: 'Allocable Size',
          data: this.calcChartValues(data, 'allocable'),
        },
      ]
    },
  },
  computed: {
    ...mapState(['rangeDates']),
  },
}
