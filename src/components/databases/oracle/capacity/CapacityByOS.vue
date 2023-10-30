<template>
  <b-tabs size="is-small" type="is-toggle" expanded>
    <b-tab-item
      v-for="cap in capacityTabs"
      :key="cap.id"
      :label="checkID(cap.id) ? `${cap.label} - Daily` : cap.label"
      :value="cap.id"
    >
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
    capacityData: {
      type: Array,
      required: true,
    },
  },
  beforeMount() {
    this.capacityTabs = _.remove(this.capacityTabs, (val) => {
      return (
        val.id !== 'cpuHost' &&
        val.id !== 'cpuHost-daily' &&
        val.id !== 'iops-daily'
      )
    })
  },
}
</script>

<style lang="scss" scoped></style>
