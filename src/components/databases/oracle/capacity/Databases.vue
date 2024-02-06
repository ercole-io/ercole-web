<template>
  <b-tabs size="is-small" type="is-boxed" destroy-on-hide animated>
    <b-tab-item
      v-for="db in capacityData"
      :value="db.dbName"
      :label="db.dbName"
      :key="db.dbName"
    >
      <b-tabs size="is-small" type="is-toggle" class="p-5" expanded>
        <b-tab-item
          v-for="cap in capacityTabs"
          :key="cap.id"
          :label="checkID(cap.id) ? `${cap.label} - Daily` : cap.label"
          :value="cap.id"
        >
          <ChartBuilder
            chartType="line"
            :chartID="`${cap.id}-${cap.label}CapacityDailyChart`"
            :chartOptions="chartDailyOptions(cap.id, db.dbCapacityDaily, true)"
            :chartSeries="chartDailySeries(cap.id, db.dbCapacityDaily, true)"
            v-if="checkID(cap.id)"
          />

          <ChartBuilder
            chartType="bar"
            :chartID="`${cap.id}-${cap.label}CapacityChart`"
            :chartOptions="chartOptions(cap.label, true)"
            :chartSeries="getSeries(cap.id, db.dbCapacity, true)"
            v-if="!checkID(cap.id)"
          />
        </b-tab-item>
      </b-tabs>

      <CapacityPdbs
        :dbName="db.dbName"
        :pdbsData="db.pdbs"
        v-if="db.pdbs && db.pdbs.length > 0"
      />
    </b-tab-item>
  </b-tabs>
</template>

<script>
import databasesCapacityMixin from '@/mixins/hostDetails/capacity/databasesCapacity.js'
import databasesCapacityMonthMixin from '@/mixins/hostDetails/capacity/databasesCapacityMonth.js'
import databasesCapacityDailyMixin from '@/mixins/hostDetails/capacity/databasesCapacityDaily.js'
import CapacityPdbs from '@/components/databases/oracle/capacity/Pdbs.vue'

export default {
  name: 'databases-oracle-capacity-databases-component',
  mixins: [
    databasesCapacityMixin,
    databasesCapacityMonthMixin,
    databasesCapacityDailyMixin,
  ],
  props: {
    capacityData: {
      type: Array,
      required: true,
    },
  },
  components: {
    CapacityPdbs,
  },
}
</script>

<style lang="scss" scoped></style>
