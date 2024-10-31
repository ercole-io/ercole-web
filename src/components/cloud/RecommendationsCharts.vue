<template>
  <section class="columns">
    <BoxContent class="column" title="Category" border>
      <GhostLoading :isLoading="loadingTableStatus" setHeight="300">
        <ChartBuilder
          chartType="pie"
          chartID="category"
          :chartOptions="options('category')"
          :chartSeries="getSeries('category')"
          chartHeight="350"
        />

        <b-message
          v-model="showExtraCategory"
          size="is-small"
          type="is-light"
          class="mt-3 ml-3"
          v-if="showExtraCategory"
        >
          <template #header>
            <span
              class="is-size-6"
              :style="{ color: messageColor }"
              style="line-height: 38px"
            >
              <b-icon
                icon="circle"
                size="is-small"
                style="vertical-align: baseline"
              />
              {{ extraContent[0].category }}
            </span>
          </template>
          <div class="is-flex is-justify-content-space-around">
            <p class="is-size-7 mb-0 has-text-weight-semibold">
              Oracle:
              <span class="is-size-6 has-text-weight-bold pl-1">
                {{ extraContent[0].oracle }} - {{ extraContent[0].oraclePerc }}
              </span>
            </p>
            <p class="is-size-7 mb-0 has-text-weight-semibold">
              AWS:
              <span class="is-size-6 has-text-weight-bold pl-1">
                {{ extraContent[0].aws }} - {{ extraContent[0].awsPerc }}
              </span>
            </p>
            <p class="is-size-7 mb-0 has-text-weight-semibold">
              Google:
              <span class="is-size-6 has-text-weight-bold pl-1">
                {{ extraContent[0].google }} - {{ extraContent[0].googlePerc }}
              </span>
            </p>
          </div>
        </b-message>
      </GhostLoading>
    </BoxContent>

    <BoxContent class="column" title="Object Type" border>
      <GhostLoading :isLoading="loadingTableStatus" setHeight="300">
        <ChartBuilder
          chartType="pie"
          chartID="objectType"
          :chartOptions="options('objectType')"
          :chartSeries="getSeries('objectType')"
          chartHeight="350"
        />

        <b-message
          v-model="showExtraObjectType"
          size="is-small"
          type="is-light"
          class="mt-3 ml-3"
          v-if="showExtraObjectType"
        >
          <template #header>
            <span
              class="is-size-6"
              :style="{ color: messageColor }"
              style="line-height: 38px"
            >
              <b-icon
                icon="circle"
                size="is-small"
                style="vertical-align: baseline"
              />
              {{ extraContent[0].objectType }}
            </span>
          </template>
          <div class="is-flex is-justify-content-space-around">
            <p class="is-size-7 mb-0 has-text-weight-semibold">
              Oracle:
              <span class="is-size-6 has-text-weight-bold pl-1">
                {{ extraContent[0].oracle }} - {{ extraContent[0].oraclePerc }}
              </span>
            </p>
            <p class="is-size-7 mb-0 has-text-weight-semibold">
              AWS:
              <span class="is-size-6 has-text-weight-bold pl-1">
                {{ extraContent[0].aws }} - {{ extraContent[0].awsPerc }}
              </span>
            </p>
            <p class="is-size-7 mb-0 has-text-weight-semibold">
              Google:
              <span class="is-size-6 has-text-weight-bold pl-1">
                {{ extraContent[0].google }} - {{ extraContent[0].googlePerc }}
              </span>
            </p>
          </div>
        </b-message>
      </GhostLoading>
    </BoxContent>

    <BoxContent class="column" title="Suggestion" border>
      <GhostLoading :isLoading="loadingTableStatus" setHeight="300">
        <ChartBuilder
          chartType="pie"
          chartID="suggestion"
          :chartOptions="options('suggestion')"
          :chartSeries="getSeries('suggestion')"
          chartHeight="350"
        />

        <b-message
          v-model="showExtraSuggestion"
          size="is-small"
          type="is-light"
          class="mt-3 ml-3"
          v-if="showExtraSuggestion"
        >
          <template #header>
            <span
              class="is-size-6"
              :style="{ color: messageColor }"
              style="line-height: 38px"
            >
              <b-icon
                icon="circle"
                size="is-small"
                style="vertical-align: baseline"
              />
              {{ extraContent[0].suggestion }}
            </span>
          </template>
          <div class="is-flex is-justify-content-space-around">
            <p class="is-size-7 mb-0 has-text-weight-semibold">
              Oracle:
              <span class="is-size-6 has-text-weight-bold pl-1">
                {{ extraContent[0].oracle }} - {{ extraContent[0].oraclePerc }}
              </span>
            </p>
            <p class="is-size-7 mb-0 has-text-weight-semibold">
              AWS:
              <span class="is-size-6 has-text-weight-bold pl-1">
                {{ extraContent[0].aws }} - {{ extraContent[0].awsPerc }}
              </span>
            </p>
            <p class="is-size-7 mb-0 has-text-weight-semibold">
              Google:
              <span class="is-size-6 has-text-weight-bold pl-1">
                {{ extraContent[0].google }} - {{ extraContent[0].googlePerc }}
              </span>
            </p>
          </div>
        </b-message>
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
  data() {
    return {
      showExtraCategory: false,
      showExtraObjectType: false,
      showExtraSuggestion: false,
      extraContent: null,
      messageColor: '',
    }
  },
  beforeMount() {
    this.returnCategoryChartData
    this.returnObjectTypeChartData
    this.returnSuggestionChartData
  },
  methods: {
    getSeries(type) {
      if (this.$route.name === 'allRecommendations') {
        if (type === 'category') {
          return this.returnAllCategoryChartData.series
        } else if (type === 'objectType') {
          return this.returnAllObjectTypeChartData.series
        } else if (type === 'suggestion') {
          return this.returnAllSuggestionChartData.series
        }
      } else {
        if (type === 'category') {
          return this.returnCategoryChartData.series
        } else if (type === 'objectType') {
          return this.returnObjectTypeChartData.series
        } else if (type === 'suggestion') {
          return this.returnSuggestionChartData.series
        }
      }
    },
    getLabels(type) {
      if (this.$route.name === 'allRecommendations') {
        if (type === 'category') {
          return this.returnAllCategoryChartData.labels
        } else if (type === 'objectType') {
          return this.returnAllObjectTypeChartData.labels
        } else if (type === 'suggestion') {
          return this.returnAllSuggestionChartData.labels
        }
      } else {
        if (type === 'category') {
          return this.returnCategoryChartData.labels
        } else if (type === 'objectType') {
          return this.returnObjectTypeChartData.labels
        } else if (type === 'suggestion') {
          return this.returnSuggestionChartData.labels
        }
      }
    },
    options(type) {
      return {
        chart: {
          events: {
            legendClick: (chartContext, seriesIndex) => {
              if (this.$route.name === 'allRecommendations') {
                if (type === 'category') {
                  this.showExtraCategory = true
                  this.showExtraObjectType = false
                  this.showExtraSuggestion = false
                } else if (type === 'objectType') {
                  this.showExtraCategory = false
                  this.showExtraObjectType = true
                  this.showExtraSuggestion = false
                } else if (type === 'suggestion') {
                  this.showExtraCategory = false
                  this.showExtraObjectType = false
                  this.showExtraSuggestion = true
                }

                this.extraContent = this.returnAllTypesChartDataByCloud(
                  chartContext.opts.labels[seriesIndex],
                  type
                )
                this.messageColor = chartContext.opts.colors[seriesIndex]
              }
            },
          },
        },
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
          horizontalAlign: 'left',
          fontSize: '13px',
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
        noData: {
          text: 'Thare are no data!',
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
  computed: {
    ...mapGetters([
      'loadingTableStatus',
      'returnCategoryChartData',
      'returnObjectTypeChartData',
      'returnSuggestionChartData',
      'returnAllCategoryChartData',
      'returnAllTypesChartDataByCloud',
      'returnAllObjectTypeChartData',
      'returnAllSuggestionChartData',
    ]),
  },
}
</script>

<style lang="scss">
.apexcharts-legend {
  width: 350px !important;
}
.apexcharts-legend-text {
  width: 100%; /* Garante que o texto ocupe toda a largura disponível */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
