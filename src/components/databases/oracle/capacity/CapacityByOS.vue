<template>
  <b-tabs size="is-small" type="is-toggle" expanded>
    <b-tab-item
      v-for="cap in capacityTabsOS"
      :key="cap.id"
      :label="checkID(cap.id) ? `${cap.label} - Daily` : cap.label"
      :value="cap.id"
    >
      <BoxContent
        hasShadow
        customStyle="padding: 20px; border: 1px solid #efefef"
      >
        <ChartBuilder
          chartType="line"
          :chartID="`${cap.id}-${cap.label}CapacityDailyChart`"
          :chartOptions="chartDailyOptions(cap.id, capacityDailyDataOS, hasMax)"
          :chartSeries="chartDailySeries(cap.id, capacityDailyDataOS, hasMax)"
          v-if="checkID(cap.id)"
        />

        <ChartBuilder
          chartType="bar"
          :chartID="`${cap.id}-${cap.label}CapacityChart`"
          :chartOptions="chartOptions(cap.label, hasMax)"
          :chartSeries="getSeries(cap.id, capacityDataOS, hasMax)"
          v-if="!checkID(cap.id)"
        />
      </BoxContent>
    </b-tab-item>
  </b-tabs>
</template>

<script>
import _ from 'lodash'
import databasesCapacityMixin from '@/mixins/hostDetails/capacity/databasesCapacity.js'
import databasesCapacityMonthMixin from '@/mixins/hostDetails/capacity/databasesCapacityMonth.js'
import databasesCapacityDailyMixin from '@/mixins/hostDetails/capacity/databasesCapacityDaily.js'
import BoxContent from '@/components/common/BoxContent.vue'

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
    hasMax: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    BoxContent,
  },
  beforeMount() {
    this.capacityTabs = _.remove(this.capacityTabs, (val) => {
      return val.id !== 'cpuHost' && val.id !== 'cpuHost-daily'
    })
  },
}
</script>

<style lang="scss" scoped></style>
