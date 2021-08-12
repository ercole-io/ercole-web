<template>
  <div v-if="getChartCoreHosts.length > 0">
    <GhostLoading :isLoading="loading" setHeight="30" class="mb-4">
      <RangeDates
        :setRange="SET_RANGE_DATES_ALT"
        totalRange="31"
        class="mt-0 mb-4"
      />
    </GhostLoading>
    <GhostLoading :isLoading="loading" setHeight="300">
      <LineChart
        chartId="coreHostsChart"
        :hasLegend="false"
        :lineChartData="getChartCoreHosts"
      />
    </GhostLoading>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import LineChart from '@/components/common/charts/LineChart.vue'
import RangeDates from '@/components/common/RangeDates.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  components: {
    LineChart,
    RangeDates,
    GhostLoading
  },
  data() {
    return {
      loading: true
    }
  },
  async beforeMount() {
    await this.getCoreHosts().then(() => {
      this.loading = false
    })
  },
  methods: {
    ...mapActions(['getCoreHosts']),
    ...mapMutations(['SET_RANGE_DATES_ALT'])
  },
  computed: {
    ...mapGetters(['getChartCoreHosts'])
  }
}
</script>

<style lang="scss" scoped></style>
