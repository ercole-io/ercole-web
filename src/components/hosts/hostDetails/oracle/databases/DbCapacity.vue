<template>
  <b-tab-item label="Capacity" value="Capacity">
    <b-tabs size="is-small" type="is-toggle" expanded>
      <b-tab-item
        v-for="cap in capacityTabs"
        :key="cap.id"
        :label="checkID(cap.id) ? `${cap.label} - Daily` : cap.label"
        :value="cap.id"
      >
        <ChartBuilder
          chartType="line"
          :chartID="`${cap.id}CapacityDailyChart`"
          :chartOptions="chartDailyOptions(cap.id, [], true)"
          :chartSeries="chartDailySeries(cap.id, [], true)"
          v-if="checkID(cap.id)"
        />
        <ChartBuilder
          chartType="bar"
          :chartID="`${cap.id}CapacityChart`"
          :chartOptions="chartOptions(cap.label, true)"
          :chartSeries="getSeries(cap.id, [], true)"
          v-if="!checkID(cap.id)"
        />
      </b-tab-item>
    </b-tabs>
  </b-tab-item>
</template>

<script>
import databasesCapacityMixin from '@/mixins/hostDetails/capacity/databasesCapacity.js'
import databasesCapacityMonthMixin from '@/mixins/hostDetails/capacity/databasesCapacityMonth.js'
import databasesCapacityDailyMixin from '@/mixins/hostDetails/capacity/databasesCapacityDaily.js'

export default {
  name: 'hosts-details-oracle-databases-capacity-component',
  mixins: [
    databasesCapacityMixin,
    databasesCapacityMonthMixin,
    databasesCapacityDailyMixin,
  ],
}
</script>

<style lang="scss" scoped></style>
