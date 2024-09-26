<template>
  <div>
    <BoxContent title="Category" border>
      <GhostLoading :isLoading="loadingTableStatus" setHeight="300">
        <ChartBuilder
          chartType="pie"
          chartID="al-recommendations-category"
          :chartOptions="options"
          :chartSeries="series"
        />
      </GhostLoading>
    </BoxContent>

    <BoxContent title="Object Type" border>
      <GhostLoading :isLoading="loadingTableStatus" setHeight="300">
        <ChartBuilder
          chartType="pie"
          chartID="al-recommendations-object-type"
          :chartOptions="{}"
          :chartSeries="[]"
        />
      </GhostLoading>
    </BoxContent>

    <BoxContent title="Suggestion" border>
      <GhostLoading :isLoading="loadingTableStatus" setHeight="300">
        <ChartBuilder
          chartType="pie"
          chartID="al-recommendations-suggestion"
          :chartOptions="{}"
          :chartSeries="[]"
        />
      </GhostLoading>
    </BoxContent>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'
import ChartBuilder from '@/components/common/charts/apex/ChartBuilder.vue'

export default {
  name: 'cloud-sdvisors-all-recommendations-charts',
  components: {
    BoxContent,
    GhostLoading,
    ChartBuilder,
  },
  data() {
    return {
      series: [4, 15, 37, 2, 8, 7, 1, 27, 24],
      options: {
        labels: [
          'Unused Resource',
          'Old Snapshot',
          'Compute Instance Rightsizing',
          'Unused Service Decommisioning',
          'Block Storage Rightsizing',
          'Unused Storage',
          'Compute Instance Without Monitoring',
          'Object Storage Optimization',
          'Compute Instance Decommisioning',
        ],
        dataLabels: {
          enabled: true,
          formatter: (val) => _.round(val, 1) + '%',
          style: {
            fontSize: '14px',
            colors: ['#000'],
          },
          background: {
            enabled: true,
            borderRadius: 5,
          },
        },
        legend: {
          show: true,
          offsetX: 0,
          offsetY: 10,
          position: 'bottom',
          fontSize: '14px',
          fontWeight: 500,
          formatter: (label, series) => {
            return `${label}: <b>${
              series.w.config.series[series.seriesIndex]
            }</b> - <b>${
              series.w.globals.seriesPercent[series.seriesIndex]
            }%</b>`
          },
          onItemHover: {
            highlightDataSeries: false,
          },
        },
        plotOptions: {
          pie: {
            customScale: 1.2,
            offsetX: 0,
            offsetY: 20,
            donut: {
              size: '50%',
              background: 'transparent',
              // labels: {
              //   show: true,
              //   name: {
              //     show: true,
              //     fontWeight: 'bold',
              //     offsetY: -5,
              //     formatter: (val) => {
              //       return val
              //     },
              //   },
              //   value: {
              //     show: true,
              //     fontWeight: 500,
              //     offsetY: 10,
              //     formatter: (val) => {
              //       return val
              //     },
              //   },
              //   total: {
              //     show: true,
              //     showAlways: true,
              //     label: 'Total',
              //     fontSize: '22px',
              //     fontWeight: 'bold',
              //     color: '#000',
              //   },
              // },
            },
          },
        },
        tooltip: {
          enabled: true,
          fillSeriesColor: false,
          y: {
            formatter: (value, series) =>
              `${value} - ${
                series.globals.seriesPercent[series.seriesIndex][0]
              }%`,
          },
          style: {
            fontSize: '14px',
          },
          onDatasetHover: {
            highlightDataSeries: true,
          },
        },
        colors: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
          'rgba(255, 159, 64)',
          'rgb(176, 101, 156)', // light purple
          'rgb(254, 188, 59)', // light orange
          'rgb(144, 190, 109)', // light green
          'rgb(253, 128, 128)', // light red
          'rgb(71, 172, 177)', // light blue
          'rgb(232, 221, 9)', // yellow
          'rgb(248, 150, 30)', // dark orange
          'rgb(139, 117, 215)', // dark purple
          'rgb(249, 65, 68)', // dark red
          'rgb(67, 170, 139)', // dark green
          'rgb(87, 117, 144)', // dark blue
        ].reverse(),
      },
    }
  },
  computed: {
    ...mapGetters(['loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
