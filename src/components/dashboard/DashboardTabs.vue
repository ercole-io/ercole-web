<template>
  <b-tabs type="is-toggle" size="is-small" expanded>
    <b-tab-item :label="$t('views.dashboard.licensesX')">
      <LicensesChart />
    </b-tab-item>

    <b-tab-item label="Hosts Core">
      <CoreChart />
    </b-tab-item>
  </b-tabs>
</template>

<script>
import LicensesChart from '@/components/dashboard/LicenseChart.vue'
import CoreChart from '@/components/dashboard/CoreChart.vue'

export default {
  components: {
    LicensesChart,
    CoreChart
  }
}
</script>

<style lang="scss" scoped></style>
