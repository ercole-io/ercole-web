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
            v-for="(type, index) in getChartLicenseHistory"
            :value="type.licenseTypeID"
            :key="index"
          >
            {{ type.licenseTypeID }} - {{ type.itemDescription }} -
            {{ type.metric }}
          </option>
        </b-select>
      </b-field>
    </div>
    <LineChart chartId="lincenseChart" :lineChartData="finalChartData" />
  </BoxContent>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
import moment from 'moment'
import BoxContent from '@/components/common/BoxContent.vue'
import LineChart from '@/components/common/charts/LineChart.vue'

const matchType = (data, selected) => {
  return _.find(data, type => {
    return type.licenseTypeID === selected
  })
}
const mapLicenseType = (history, type) => {
  const historyByType = []
  _.map(history, value => {
    historyByType.push({
      date: moment(value.date).format('YYYY-MM-DD'),
      value: type === 'purchased' ? value.covered : value.consumed
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
      selectedType: null
    }
  },
  beforeUpdate() {
    this.mountLincenseChart()
  },
  methods: {
    mountLincenseChart() {
      this.selectedType = this.getChartLicenseHistory[0].licenseTypeID
      let findType = matchType(this.getChartLicenseHistory, this.selectedType)

      const purchasedLicenses = mapLicenseType(findType.history, 'purchased')
      const usedLicenses = mapLicenseType(findType.history, 'used')

      const resultPurchased = loopLicenseTypeValues(purchasedLicenses)
      const resultUsed = loopLicenseTypeValues(usedLicenses)

      const finalData = buildFinalData(resultPurchased, resultUsed)

      this.finalChartData = finalData
      return this.finalChartData
    }
  },
  computed: {
    ...mapGetters(['getChartLicenseHistory'])
  }
}
</script>

<style lang="scss" scoped></style>
