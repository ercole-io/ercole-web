<template>
  <BoxContent border hasShadow :mbottom="false" customStyle="padding: 0">
    <b-tabs type="is-toggle" size="is-small" expanded destroy-on-hide>
      <b-tab-item
        :label="$t('views.dashboard.licensesX')"
        data-cy="licenses-tab"
      >
        <LicensesChart />
      </b-tab-item>
      <b-tab-item label="Core Hosts" data-cy="corehosts-tab">
        <CoreHostsChart />
      </b-tab-item>
    </b-tabs>
  </BoxContent>
</template>

<script>
import BoxContent from '@/components/common/BoxContent.vue'
import LicensesChart from '@/components/dashboard/LicenseChart.vue'
import CoreHostsChart from '@/components/dashboard/CoreHostsChart.vue'

export default {
  name: 'daschboard-tabs-component',
  components: {
    BoxContent,
    LicensesChart,
    CoreHostsChart,
  },
}
</script>

<style lang="scss" scoped></style>
