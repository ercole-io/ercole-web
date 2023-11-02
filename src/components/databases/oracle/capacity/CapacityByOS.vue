<template>
  <b-tabs size="is-small" type="is-toggle" expanded>
    <b-tab-item
      v-for="cap in capacityTabsOS"
      :key="cap.id"
      :label="checkID(cap.id) ? `${cap.label} - Daily` : cap.label"
      :value="cap.id"
    >
      <ChartBuilder
        chartType="line"
        :chartID="`${cap.id}-${cap.label}CapacityDailyChart`"
        :chartOptions="chartDailyOptions(cap.id, capacityDailyDataOS)"
        :chartSeries="chartDailySeries(cap.id, capacityDailyDataOS)"
        v-if="checkID(cap.id)"
      />

      <ChartBuilder
        chartType="bar"
        :chartID="`${cap.id}-${cap.label}CapacityChart`"
        :chartOptions="chartOptions(cap.label)"
        :chartSeries="getSeries(cap.id, capacityDataOS)"
        v-if="!checkID(cap.id)"
      />
    </b-tab-item>
  </b-tabs>
</template>

<script>
import _ from 'lodash'
import databasesCapacityMixin from '@/mixins/hostDetails/capacity/databasesCapacity.js'
import databasesCapacityMonthMixin from '@/mixins/hostDetails/capacity/databasesCapacityMonth.js'
import databasesCapacityDailyMixin from '@/mixins/hostDetails/capacity/databasesCapacityDaily.js'

export default {
  name: 'databases-oracle-capacity-by-os-component',
  mixins: [
    databasesCapacityMixin,
    databasesCapacityMonthMixin,
    databasesCapacityDailyMixin,
  ],
  props: {
    capacityDataOS: {
      type: Array,
      required: true,
    },
    capacityDailyDataOS: {
      type: Array,
      required: true,
    },
  },
  beforeMount() {
    this.capacityTabs = _.remove(this.capacityTabs, (val) => {
      return val.id !== 'cpuHost' && val.id !== 'cpuHost-daily'
    })
  },
}
</script>

<style lang="scss" scoped></style>
