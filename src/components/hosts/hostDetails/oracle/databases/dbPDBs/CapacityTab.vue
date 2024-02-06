<template>
  <b-tab-item label="Capacity">
    <b-tabs size="is-small" type="is-toggle" class="mt-5" expanded>
      <b-tab-item
        v-for="cap in capacityTabs"
        :key="cap.id"
        :label="checkID(cap.id) ? `${cap.label} - Daily` : cap.label"
        :value="cap.id"
      >
        <ChartBuilder
          chartType="line"
          :chartID="`${cap.id}CapacityDailyPdbChart`"
          :chartOptions="chartDailyOptions(cap.id, [], true)"
          :chartSeries="chartDailySeries(cap.id, [], true)"
          v-if="checkID(cap.id)"
        />
        <ChartBuilder
          chartType="bar"
          :chartID="`${cap.id}CapacityPdbChart`"
          :chartOptions="chartOptions(cap.label, true)"
          :chartSeries="getSeries(cap.id, [], true)"
          v-if="!checkID(cap.id)"
        />
      </b-tab-item>
    </b-tabs>
  </b-tab-item>
</template>

<script>
import _ from 'lodash'
import databasesCapacityMixin from '@/mixins/hostDetails/capacity/databasesCapacity.js'
import databasesCapacityDailyMixin from '@/mixins/hostDetails/capacity/databasesCapacityDaily.js'
import databasesCapacityMonthMixin from '@/mixins/hostDetails/capacity/databasesCapacityMonth.js'

export default {
  name: 'hosts-details-oracle-databases-capacity-pdb-component',
  mixins: [
    databasesCapacityMixin,
    databasesCapacityDailyMixin,
    databasesCapacityMonthMixin,
  ],
  beforeMount() {
    this.capacityTabs = _.remove(this.capacityTabs, (val) => {
      return (
        val.id !== 'cpuHost' &&
        val.id !== 'cpuHost-daily' &&
        val.id !== 'iops-daily'
      )
    })
    this.capacityData = this.capacity
  },
}
</script>

<style lang="sass" scoped></style>
