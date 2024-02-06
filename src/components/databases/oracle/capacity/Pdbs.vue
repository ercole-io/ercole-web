<template>
  <div class="pdb-box">
    <p class="has-text-centered has-text-weight-medium">
      {{ dbName }} - Pluggable Databases
    </p>

    <CollapseSimple
      :isOpen="false"
      :collapseID="`collapse-${pdb.pdbName}`"
      :collapseTitle="pdb.pdbName"
      v-for="pdb in pdbsData"
      :key="pdb.pdbName"
    >
      <b-tabs size="is-small" type="is-toggle" class="p-5" expanded>
        <b-tab-item
          v-for="capPdb in capacityTabs"
          :key="capPdb.id"
          :label="checkID(capPdb.id) ? `${capPdb.label} - Daily` : capPdb.label"
          :value="capPdb.id"
        >
          <ChartBuilder
            chartType="line"
            :chartID="`${capPdb.id}-${capPdb.label}CapacityDailyPdbChart`"
            :chartOptions="
              chartDailyOptions(capPdb.id, pdb.pdbCapacityDaily, true)
            "
            :chartSeries="
              chartDailySeries(capPdb.id, pdb.pdbCapacityDaily, true)
            "
            v-if="checkID(capPdb.id)"
          />
          <ChartBuilder
            chartType="bar"
            :chartID="`${capPdb.id}-${capPdb.label}CapacityPdbChart`"
            :chartOptions="chartOptions(capPdb.label, true)"
            :chartSeries="getSeries(capPdb.id, pdb.pdbCapacity, true)"
            v-if="!checkID(capPdb.id)"
          />
        </b-tab-item>
      </b-tabs>
    </CollapseSimple>
  </div>
</template>

<script>
import _ from 'lodash'
import databasesCapacityMixin from '@/mixins/hostDetails/capacity/databasesCapacity.js'
import databasesCapacityMonthMixin from '@/mixins/hostDetails/capacity/databasesCapacityMonth.js'
import databasesCapacityDailyMixin from '@/mixins/hostDetails/capacity/databasesCapacityDaily.js'
import CollapseSimple from '@/components/common/CollapseSimple.vue'

export default {
  name: 'databases-oracle-capacity-databases-pdbs-component',
  mixins: [
    databasesCapacityMixin,
    databasesCapacityMonthMixin,
    databasesCapacityDailyMixin,
  ],
  props: {
    dbName: {
      type: String,
      required: true,
    },
    pdbsData: {
      type: Array,
      required: true,
    },
  },
  components: {
    CollapseSimple,
  },
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

<style lang="scss" scoped></style>
