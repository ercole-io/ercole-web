import _ from 'lodash'

export default {
  props: {
    capacity: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      title: ``,
    }
  },
  methods: {
    setMax(val) {
      if (val) {
        return val
      } else {
        return 0
      }
    },
    getData(type, data = []) {
      const dataSeries = data && data.length > 0 ? data : this.capacity

      const model = {
        m: {
          avg: null,
          max: null,
        },
        w4: {
          avg: null,
          max: null,
        },
        w3: {
          avg: null,
          max: null,
        },
        w2: {
          avg: null,
          max: null,
        },
        w1: {
          avg: null,
          max: null,
        },
        d7: {
          avg: null,
          max: null,
        },
        d6: {
          avg: null,
          max: null,
        },
        d5: {
          avg: null,
          max: null,
        },
        d4: {
          avg: null,
          max: null,
        },
        d3: {
          avg: null,
          max: null,
        },
        d2: {
          avg: null,
          max: null,
        },
        d1: {
          avg: null,
          max: null,
        },
      }
      _.map(dataSeries, (value) => {
        switch (value.target) {
          case 'm':
            model.m.avg = value[`${type}Avg`]
            model.m.max = value[`${type}Max`]
            break
          case 'w4':
            model.w4.avg = value[`${type}Avg`]
            model.w4.max = value[`${type}Max`]
            break
          case 'w3':
            model.w3.avg = value[`${type}Avg`]
            model.w3.max = value[`${type}Max`]
            break
          case 'w2':
            model.w2.avg = value[`${type}Avg`]
            model.w2.max = value[`${type}Max`]
            break
          case 'w1':
            model.w1.avg = value[`${type}Avg`]
            model.w1.max = value[`${type}Max`]
            break
          case 'd7':
            model.d7.avg = value[`${type}Avg`]
            model.d7.max = value[`${type}Max`]
            break
          case 'd6':
            model.d6.avg = value[`${type}Avg`]
            model.d6.max = value[`${type}Max`]
            break
          case 'd5':
            model.d5.avg = value[`${type}Avg`]
            model.d5.max = value[`${type}Max`]
            break
          case 'd4':
            model.d4.avg = value[`${type}Avg`]
            model.d4.max = value[`${type}Max`]
            break
          case 'd3':
            model.d3.avg = value[`${type}Avg`]
            model.d3.max = value[`${type}Max`]
            break
          case 'd2':
            model.d2.avg = value[`${type}Avg`]
            model.d2.max = value[`${type}Max`]
            break
          case 'd1':
            model.d1.avg = value[`${type}Avg`]
            model.d1.max = value[`${type}Max`]
            break
          default:
            break
        }
      })

      return model
    },
    getSeries(type, data = []) {
      const dataSeries = data && data.length > 0 ? data : this.capacity

      const result = [
        {
          name: 'Average',
          data: [
            {
              x: 'M',
              y: this.getData(type, dataSeries).m.avg,
              fillColor: this.monthColor,
              goals: [
                {
                  name: 'Max',
                  value: this.setMax(this.getData(type, dataSeries).m.max),
                  strokeHeight: 3,
                  strokeColor: _.isNumber(this.getData(type, dataSeries).m.max)
                    ? this.maxColor
                    : 'transparent',
                },
              ],
            },
            {
              x: 'W4',
              y: this.getData(type, dataSeries).w4.avg,
              fillColor: this.weekColor,
              goals: [
                {
                  name: 'Max',
                  value: this.setMax(this.getData(type, dataSeries).w4.max),
                  strokeHeight: 3,
                  strokeColor: _.isNumber(this.getData(type, dataSeries).w4.max)
                    ? this.maxColor
                    : 'transparent',
                },
              ],
            },
            {
              x: 'W3',
              y: this.getData(type, dataSeries).w3.avg,
              fillColor: this.weekColor,
              goals: [
                {
                  name: 'Max',
                  value: this.setMax(this.getData(type, dataSeries).w3.max),
                  strokeHeight: 3,
                  strokeColor: _.isNumber(this.getData(type, dataSeries).w3.max)
                    ? this.maxColor
                    : 'transparent',
                },
              ],
            },
            {
              x: 'W2',
              y: this.getData(type, dataSeries).w2.avg,
              fillColor: this.weekColor,
              goals: [
                {
                  name: 'Max',
                  value: this.setMax(this.getData(type, dataSeries).w2.max),
                  strokeHeight: 3,
                  strokeColor: _.isNumber(this.getData(type, dataSeries).w2.max)
                    ? this.maxColor
                    : 'transparent',
                },
              ],
            },
            {
              x: 'W1',
              y: this.getData(type, dataSeries).w1.avg,
              fillColor: this.weekColor,
              goals: [
                {
                  name: 'Max',
                  value: this.setMax(this.getData(type, dataSeries).w1.max),
                  strokeHeight: 3,
                  strokeColor: _.isNumber(this.getData(type, dataSeries).w1.max)
                    ? this.maxColor
                    : 'transparent',
                },
              ],
            },
            {
              x: 'D7',
              y: this.getData(type, dataSeries).d7.avg,
              fillColor: this.dayColor,
              goals: [
                {
                  name: 'Max',
                  value: this.setMax(this.getData(type, dataSeries).d7.max),
                  strokeHeight: 3,
                  strokeColor: _.isNumber(this.getData(type, dataSeries).d7.max)
                    ? this.maxColor
                    : 'transparent',
                },
              ],
            },
            {
              x: 'D6',
              y: this.getData(type, dataSeries).d6.avg,
              fillColor: this.dayColor,
              goals: [
                {
                  name: 'Max',
                  value: this.setMax(this.getData(type, dataSeries).d6.max),
                  strokeHeight: 3,
                  strokeColor: _.isNumber(this.getData(type, dataSeries).d6.max)
                    ? this.maxColor
                    : 'transparent',
                },
              ],
            },
            {
              x: 'D5',
              y: this.getData(type, dataSeries).d5.avg,
              fillColor: this.dayColor,
              goals: [
                {
                  name: 'Max',
                  value: this.setMax(this.getData(type, dataSeries).d5.max),
                  strokeHeight: 3,
                  strokeColor: _.isNumber(this.getData(type, dataSeries).d5.max)
                    ? this.maxColor
                    : 'transparent',
                },
              ],
            },
            {
              x: 'D4',
              y: this.getData(type, dataSeries).d4.avg,
              fillColor: this.dayColor,
              goals: [
                {
                  name: 'Max',
                  value: this.setMax(this.getData(type, dataSeries).d4.max),
                  strokeHeight: 3,
                  strokeColor: _.isNumber(this.getData(type, dataSeries).d4.max)
                    ? this.maxColor
                    : 'transparent',
                },
              ],
            },
            {
              x: 'D3',
              y: this.getData(type, dataSeries).d3.avg,
              fillColor: this.dayColor,
              goals: [
                {
                  name: 'Max',
                  value: this.setMax(this.getData(type, dataSeries).d3.max),
                  strokeHeight: 3,
                  strokeColor: _.isNumber(this.getData(type, dataSeries).d3.max)
                    ? this.maxColor
                    : 'transparent',
                },
              ],
            },
            {
              x: 'D2',
              y: this.getData(type, dataSeries).d2.avg,
              fillColor: this.dayColor,
              goals: [
                {
                  name: 'Max',
                  value: this.setMax(this.getData(type, dataSeries).d2.max),
                  strokeHeight: 3,
                  strokeColor: _.isNumber(this.getData(type, dataSeries).d2.max)
                    ? this.maxColor
                    : 'transparent',
                },
              ],
            },
            {
              x: 'D1',
              y: this.getData(type, dataSeries).d1.avg,
              fillColor: this.dayColor,
              goals: [
                {
                  name: 'Max',
                  value: this.setMax(this.getData(type, dataSeries).d1.max),
                  strokeHeight: 3,
                  strokeColor: _.isNumber(this.getData(type, dataSeries).d1.max)
                    ? this.maxColor
                    : 'transparent',
                },
              ],
            },
          ],
        },
      ]

      return result
    },
    chartOptions(type) {
      return {
        yaxis: {
          showForNullSeries: false,
        },
        xaxis: {
          group: {
            style: {
              fontSize: '12px',
              fontWeight: 'bold',
            },
            groups: [
              { title: 'Month', cols: 1 },
              { title: 'Weeks', cols: 4 },
              { title: 'Days', cols: 7 },
            ],
          },
          axisBorder: {
            show: true,
          },
          axisTicks: {
            show: true,
          },
          labels: {
            offsetX: 0,
            offsetY: 0,
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ['#000'],
            fontSize: '12px',
            fontWeight: 'bold',
          },
          dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            blur: 5,
            color: '#fff',
            opacity: 1,
          },
          offsetX: 0,
          offsetY: 0,
          formatter: (val) => {
            if (_.isNull(val)) {
              return 'N/A'
            }
            return val
          },
        },
        grid: {
          position: 'back',
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5,
          },
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'bottom',
            },
          },
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ['Month Avg', 'Week Avg', 'Day Avg', 'Max'],
          markers: {
            fillColors: [
              this.monthColor,
              this.weekColor,
              this.dayColor,
              this.maxColor,
            ],
          },
          onItemClick: {
            toggleDataSeries: false,
          },
          offsetX: 0,
          offsetY: 0,
        },
        chart: {
          toolbar: {
            show: false,
          },
        },
        title: {
          text: this.getChartTitle(type, 'month', null),
          align: 'left',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: undefined,
            color: '#263238',
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
  },
}
