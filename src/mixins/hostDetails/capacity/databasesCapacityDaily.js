import _ from 'lodash'
import formatDateTime from '@/filters/formatDateTime.js'

export default {
  props: {
    capacityDaily: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    chartDailySeries(type) {
      const transformType = _.split(type, '-daily')

      const maxData = []
      const avgData = []

      _.map(this.capacityDaily, (val) => {
        maxData.push(val[`${transformType[0]}Max`])
        avgData.push(val[`${transformType[0]}Avg`])
      })

      maxData.push(null)
      maxData.unshift(null)

      avgData.push(null)
      avgData.unshift(null)

      return [
        {
          name: 'Max',
          data: maxData,
        },
        {
          name: 'Daily Avg',
          data: avgData,
        },
      ]
    },
    chartDailyOptions(type) {
      const categories = []

      _.map(this.capacityDaily, (val) => {
        if (_.includes(type, '-daily')) {
          categories.push(formatDateTime(val.timeStart))
        }
      })

      categories.push('')
      categories.unshift('')

      return {
        chart: {
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: categories,
        },
        colors: [this.maxColor, this.dayColor],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth',
        },
        title: {
          text: this.getChartTitle(type, 'daily'),
          align: 'left',
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        markers: {
          size: 1,
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
        },
      }
    },
    checkID(id) {
      return _.includes(id, '-daily')
    },
  },
}
