<template>
  <b-tab-item label="Capacity" value="Capacity">
    <b-tabs size="is-small" type="is-boxed" expanded>
      <b-tab-item
        v-for="cap in capacityTabs"
        :key="cap.label"
        :label="cap.label"
        :value="cap.label"
      >
        <CapacityChart
          :chartID="`${cap.id}CapacityChart`"
          :options="chartOptions"
          :series="getSeries(cap.id)"
        />
      </b-tab-item>
    </b-tabs>
  </b-tab-item>
</template>

<script>
import CapacityChart from '@/components/hosts/hostDetails/oracle/databases/capacity/CapacityChart.vue'

export default {
  name: 'hosts-details-oracle-databases-capacity-component',
  props: {
    capacity: {
      type: Array,
      default: null,
    },
  },
  components: {
    CapacityChart,
  },
  data: () => {
    return {
      monthColor: 'rgb(87, 117, 144)',
      weekColor: 'rgb(67, 170, 139)',
      dayColor: 'rgba(153, 102, 255)',
      maxColor: 'rgb(249, 65, 68)',
      capacityTabs: [
        {
          label: 'Database',
          id: 'cpuDb',
        },
        {
          label: 'Host',
          id: 'cpuHost',
        },
        {
          label: 'IOPS',
          id: 'iops',
        },
        {
          label: 'IOMB',
          id: 'iomb',
        },
      ],
    }
  },
  methods: {
    getData(type) {
      return {
        month: {
          avg: this.capacity[0][`${type}Avg`],
          max: this.capacity[0][`${type}Max`],
        },
        w4: {
          avg: this.capacity[1][`${type}Avg`],
          max: this.capacity[1][`${type}Max`],
        },
        w3: {
          avg: this.capacity[2][`${type}Avg`],
          max: this.capacity[2][`${type}Max`],
        },
        w2: {
          avg: this.capacity[3][`${type}Avg`],
          max: this.capacity[3][`${type}Max`],
        },
        w1: {
          avg: this.capacity[4][`${type}Avg`],
          max: this.capacity[4][`${type}Max`],
        },
        d7: {
          avg: this.capacity[5][`${type}Avg`],
          max: this.capacity[5][`${type}Max`],
        },
        d6: {
          avg: this.capacity[6][`${type}Avg`],
          max: this.capacity[6][`${type}Max`],
        },
        d5: {
          avg: this.capacity[7][`${type}Avg`],
          max: this.capacity[7][`${type}Max`],
        },
        d4: {
          avg: this.capacity[8][`${type}Avg`],
          max: this.capacity[8][`${type}Max`],
        },
        d3: {
          avg: this.capacity[9][`${type}Avg`],
          max: this.capacity[9][`${type}Max`],
        },
        d2: {
          avg: this.capacity[10][`${type}Avg`],
          max: this.capacity[10][`${type}Max`],
        },
        d1: {
          avg: this.capacity[11][`${type}Avg`],
          max: this.capacity[11][`${type}Max`],
        },
      }
    },
    getSeries(type) {
      return [
        {
          name: 'Average',
          data: [
            {
              x: 'M',
              y: this.getData(type).month.avg,
              fillColor: this.monthColor,
              goals: [
                {
                  name: 'Max',
                  value: this.getData(type).month.max,
                  strokeHeight: 2,
                  strokeColor: this.maxColor,
                },
              ],
            },
            {
              x: 'W4',
              y: this.getData(type).w4.avg,
              fillColor: this.weekColor,
              goals: [
                {
                  name: 'Max',
                  value: this.getData(type).w4.max,
                  strokeHeight: 2,
                  strokeColor: this.maxColor,
                },
              ],
              tooltip: {
                x: {
                  formatter: (val) => {
                    return `Week ${val}`
                  },
                },
              },
            },
            {
              x: 'W3',
              y: this.getData(type).w3.avg,
              fillColor: this.weekColor,
              goals: [
                {
                  name: 'Max',
                  value: this.getData(type).w3.max,
                  strokeHeight: 2,
                  strokeColor: this.maxColor,
                },
              ],
            },
            {
              x: 'W2',
              y: this.getData(type).w2.avg,
              fillColor: this.weekColor,
              goals: [
                {
                  name: 'Max',
                  value: this.getData(type).w2.max,
                  strokeHeight: 2,
                  strokeColor: this.maxColor,
                },
              ],
            },
            {
              x: 'W1',
              y: this.getData(type).w1.avg,
              fillColor: this.weekColor,
              goals: [
                {
                  name: 'Max',
                  value: this.getData(type).w1.max,
                  strokeHeight: 2,
                  strokeColor: this.maxColor,
                },
              ],
            },
            {
              x: 'D7',
              y: this.getData(type).d7.avg,
              fillColor: this.dayColor,
              goals: [
                {
                  name: 'Max',
                  value: this.getData(type).d7.max,
                  strokeHeight: 2,
                  strokeColor: this.maxColor,
                },
              ],
            },
            {
              x: 'D6',
              y: this.getData(type).d6.avg,
              fillColor: this.dayColor,
              goals: [
                {
                  name: 'Max',
                  value: this.getData(type).d6.max,
                  strokeHeight: 2,
                  strokeColor: this.maxColor,
                },
              ],
            },
            {
              x: 'D5',
              y: this.getData(type).d5.avg,
              fillColor: this.dayColor,
              goals: [
                {
                  name: 'Max',
                  value: this.getData(type).d5.max,
                  strokeHeight: 2,
                  strokeColor: this.maxColor,
                },
              ],
            },
            {
              x: 'D4',
              y: this.getData(type).d4.avg,
              fillColor: this.dayColor,
              goals: [
                {
                  name: 'Max',
                  value: this.getData(type).d4.max,
                  strokeHeight: 2,
                  strokeColor: this.maxColor,
                },
              ],
            },
            {
              x: 'D3',
              y: this.getData(type).d3.avg,
              fillColor: this.dayColor,
              goals: [
                {
                  name: 'Max',
                  value: this.getData(type).d3.max,
                  strokeHeight: 2,
                  strokeColor: this.maxColor,
                },
              ],
            },
            {
              x: 'D2',
              y: this.getData(type).d2.avg,
              fillColor: this.dayColor,
              goals: [
                {
                  name: 'Max',
                  value: this.getData(type).d2.max,
                  strokeHeight: 2,
                  strokeColor: this.maxColor,
                },
              ],
            },
            {
              x: 'D1',
              y: this.getData(type).d1.avg,
              fillColor: this.dayColor,
              goals: [
                {
                  name: 'Max',
                  value: this.getData(type).d1.max,
                  strokeHeight: 2,
                  strokeColor: this.maxColor,
                },
              ],
            },
          ],
        },
      ]
    },
  },
  computed: {
    chartOptions() {
      return {
        yaxis: {
          // labels: {
          //   formatter: function (value) {
          //     return value + ' GB'
          //   },
          // },
          // title: {
          //   text: 'Servings',
          // },
        },
        xaxis: {
          // labels: {
          //   formatter: function (value) {
          //     return value
          //   },
          // },
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
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ['#333'],
            fontSize: '12px',
            fontWeight: 'bold',
          },
          // dropShadow: {
          //   enabled: true,
          //   left: 2,
          //   top: 2,
          //   opacity: 0.5,
          // },
          background: {
            enabled: true,
            foreColor: '#fff',
            borderRadius: 4,
            padding: 3,
            opacity: 0.7,
            borderWidth: 1,
            borderColor: '#fff',
          },
          offsetX: 0,
          offsetY: 0,
          // formatter: function (val) {
          //   return val + '%'
          // },
        },
        grid: {
          position: 'back',
          row: {
            colors: ['#f9f9f9', '#fff'],
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
        },
        chart: {
          toolbar: {
            show: false,
          },
        },
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
