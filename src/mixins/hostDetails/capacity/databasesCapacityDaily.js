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
    chartDailySeries(type, data = []) {
      const dataSeries = data && data.length > 0 ? data : this.capacityDaily

      const transformType = _.split(type, '-daily')

      const maxData = []
      const avgData = []

      _.map(dataSeries, (val) => {
        maxData.push(val[`${transformType[0]}Max`])
        avgData.push(val[`${transformType[0]}Avg`])
      })

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
    chartDailyOptions(type, data = []) {
      const dataSeries = data && data.length > 0 ? data : this.capacityDaily

      const categories = []
      const dateRange = []

      _.map(dataSeries, (val) => {
        if (_.includes(type, '-daily')) {
          categories.push(formatDateTime(val.timeStart))
        }
      })

      dateRange.push(
        _.split(_.head(categories), ' ')[0],
        _.split(_.last(categories), ' ')[0]
      )

      return {
        chart: {
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        xaxis: {
          categories: categories,
          labels: {
            formatter: (value) => {
              return _.split(value, ' ')[1]
            },
          },
        },
        colors: [this.maxColor, this.dayColor],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        title: {
          text: this.getChartTitle(type, 'daily', dateRange),
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
        tooltip: {
          x: {
            show: true,
            formatter: (seriesIndex) => {
              return categories[seriesIndex - 1]
            },
          },
        },
        noData: {
          text: 'There are no data',
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '14px',
            fontFamily: undefined,
          },
        },
      }
    },
    checkID(id) {
      return _.includes(id, '-daily')
    },
  },
}
