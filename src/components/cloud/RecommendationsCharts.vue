<template>
  <section class="columns">
    <BoxContent class="column" title="Category" border>
      <GhostLoading :isLoading="loadingTableStatus" setHeight="350">
        <ChartBuilder
          chartType="pie"
          chartID="category"
          :chartOptions="options('category')"
          :chartSeries="getSeries('category')"
          chartHeight="350"
        />
      </GhostLoading>
    </BoxContent>

    <BoxContent class="column" title="Object Type" border>
      <GhostLoading :isLoading="loadingTableStatus" setHeight="350">
        <ChartBuilder
          chartType="pie"
          chartID="objectType"
          :chartOptions="options('objectType')"
          :chartSeries="getSeries('objectType')"
          chartHeight="350"
        />
      </GhostLoading>
    </BoxContent>

    <BoxContent class="column" title="Suggestion" border>
      <GhostLoading :isLoading="loadingTableStatus" setHeight="350">
        <ChartBuilder
          chartType="pie"
          chartID="suggestion"
          :chartOptions="options('suggestion')"
          :chartSeries="getSeries('suggestion')"
          chartHeight="350"
        />
      </GhostLoading>
    </BoxContent>
  </section>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'
import ChartBuilder from '@/components/common/charts/apex/ChartBuilder.vue'

export default {
  name: 'cloud-sdvisors-recommendations-charts',
  components: {
    BoxContent,
    GhostLoading,
    ChartBuilder,
  },
  beforeMount() {
    this.returnCategoryChartData
    this.returnObjectTypeChartData
    this.returnSuggestionChartData
  },
  methods: {
    getSeries(type) {
      if (type === 'category') {
        return this.returnCategoryChartData.series
      } else if (type === 'objectType') {
        return this.returnObjectTypeChartData.series
      } else if (type === 'suggestion') {
        return this.returnSuggestionChartData.series
      }
    },
    getLabels(type) {
      if (type === 'category') {
        return this.returnCategoryChartData.labels
      } else if (type === 'objectType') {
        return this.returnObjectTypeChartData.labels
      } else if (type === 'suggestion') {
        return this.returnSuggestionChartData.labels
      }
    },
    options(type) {
      return {
        labels: this.getLabels(type),
        dataLabels: {
          enabled: true,
          formatter: (val) => _.round(val, 1) + '%',
          style: {
            fontSize: '12px',
            colors: ['#000'],
            fontWeight: 'bold',
          },
          background: {
            enabled: false,
          },
          dropShadow: {
            enabled: false,
          },
        },
        legend: {
          show: true,
          position: 'left',
          fontSize: '14px',
          formatter: (label, series) => {
            return `${label}: <b>${
              series.w.config.series[series.seriesIndex]
            }</b> - <b>${_.round(
              series.w.globals.seriesPercent[series.seriesIndex],
              1
            )}%</b>`
          },
        },
        tooltip: {
          enabled: true,
          fillSeriesColor: false,
          y: {
            formatter: (value, series) => {
              return `${value} - ${_.round(
                series.globals.seriesPercent[series.seriesIndex][0],
                1
              )}%`
            },
          },
          style: {
            fontSize: '14px',
          },
          onDatasetHover: {
            highlightDataSeries: true,
          },
          fixed: {
            enabled: true,
            position: 'topRight',
            offsetX: 0,
            offsetY: 0,
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
        stroke: {
          show: true,
          width: 0.3,
        },
      }
    },
  },
  computed: {
    ...mapGetters([
      'loadingTableStatus',
      'returnCategoryChartData',
      'returnObjectTypeChartData',
      'returnSuggestionChartData',
    ]),
  },
}
</script>

<style lang="scss" scoped></style>
