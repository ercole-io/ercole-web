<template>
  <b-tab-item label="Capacity" value="Capacity">
    <b-tabs size="is-small" type="is-boxed" expanded>
      <b-tab-item
        v-for="cap in capacityTabs"
        :key="cap.label"
        :label="cap.label"
        :value="cap.label"
      >
        <ApexBarChart
          :chartID="`${cap.id}CapacityChart`"
          :chartOptions="chartOptions(cap.label)"
          :chartSeries="getSeries(cap.id)"
        />
      </b-tab-item>
    </b-tabs>
  </b-tab-item>
</template>

<script>
import databasesCapacityMixin from '@/mixins/hostDetails/databasesCapacity.js'

export default {
  name: 'hosts-details-oracle-databases-capacity-component',
  mixins: [databasesCapacityMixin],

  beforeMount() {
    this.capacityData = this.capacity
    console.log(this.capacityDaily)
  },
}
</script>

<style lang="scss" scoped></style>
