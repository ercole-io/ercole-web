<template>
  <b-tab-item label="Capacity">
    <b-tabs size="is-small" type="is-boxed" class="mt-5" expanded>
      <b-tab-item
        v-for="cap in capacityTabs"
        :key="cap.label"
        :label="cap.label"
        :value="cap.label"
      >
        <ChartBuilder
          chartType="bar"
          :chartID="`${cap.id}CapacityPdbChart`"
          :chartOptions="chartOptions(cap.label)"
          :chartSeries="getSeries(cap.id)"
        />
      </b-tab-item>
    </b-tabs>
  </b-tab-item>
</template>

<script>
import _ from 'lodash'
import databasesCapacityMixin from '@/mixins/hostDetails/capacity/databasesCapacity.js'
import databasesCapacityMonthMixin from '@/mixins/hostDetails/capacity/databasesCapacityMonth.js'

export default {
  name: 'hosts-details-oracle-databases-capacity-pdb-component',
  mixins: [databasesCapacityMixin, databasesCapacityMonthMixin],
  beforeMount() {
    this.capacityTabs = _.remove(this.capacityTabs, (val) => {
      return val.id !== 'cpuHost'
    })
    this.capacityData = this.capacity
  },
}
</script>

<style lang="sass" scoped></style>
