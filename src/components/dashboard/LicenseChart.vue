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
            v-for="(type, index) in licenseChartData"
            :value="type.partID"
            :key="index"
          >
            {{ type.partID }} - {{ type.itemDescription }} - {{ type.metrics }}
          </option>
        </b-select>
      </b-field>
    </div>
    <LineChart chartId="lincenseChart" :lineChartData="finalChartData" />
  </BoxContent>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import BoxContent from '@/components/common/BoxContent.vue'
import LineChart from '@/components/common/charts/LineChart.vue'
import chartData from '@/components/dashboard/license-chart.json'

const matchType = (data, selected) => {
  return _.find(data, type => {
    return type.partID === selected
  })
}
const mapLicenseType = (history, type) => {
  const historyByType = []
  _.map(history, value => {
    historyByType.push({
      date: moment(value.date).format('YYYY-MM-DD'),
      value: type === 'purchased' ? value.purchasedLicenses : value.usedLicenses
    })
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
    BoxContent
  },
  data() {
    return {
      finalChartData: [],
      licenseChartData: chartData,
      selectedType: chartData[0].partID
    }
  },
  beforeMount() {
    this.mountLincenseChart()
  },
  methods: {
    mountLincenseChart() {
      let findType = matchType(this.licenseChartData, this.selectedType)

      const purchasedLicenses = mapLicenseType(findType.history, 'purchased')
      const usedLicenses = mapLicenseType(findType.history, 'used')

      const resultPurchased = loopLicenseTypeValues(purchasedLicenses)
      const resultUsed = loopLicenseTypeValues(usedLicenses)

      const finalData = buildFinalData(resultPurchased, resultUsed)

      this.finalChartData = finalData
      return this.finalChartData
    }
  }
}
</script>

<style lang="scss" scoped></style>
