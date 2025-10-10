<template>
  <section class="p-3">
    <p class="has-text-weight-medium">Created Scenario Licenses Details</p>
    <b-tabs type="is-toggle" size="is-small" expanded>
      <b-tab-item v-for="tab in detailsTabs" :key="tab.id" :label="tab.label">
        <component :is="tab.component" />
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import LicensesCompliance from '@/components/scenarios/details/LicensesCompliance.vue'
import LicensesUsedDatabases from '@/components/scenarios/details/LicensesUsedDatabases.vue'
import LicensesUsedHosts from '@/components/scenarios/details/LicensesUsedHosts.vue'
import LicensesUsedClusters from '@/components/scenarios/details/LicensesUsedClusters.vue'
import LicensesUsedClustersVeritas from '@/components/scenarios/details/LicensesUsedClustersVeritas.vue'

export default {
  name: 'ScenariosDetailsLicenses',
  components: {
    LicensesCompliance,
    LicensesUsedDatabases,
    LicensesUsedHosts,
    LicensesUsedClusters,
    LicensesUsedClustersVeritas,
  },
  data() {
    return {
      detailsTabs: [
        {
          id: 'compliance',
          component: 'LicensesCompliance',
          label: 'Licenses Compliance',
        },
        {
          id: 'databases',
          component: 'LicensesUsedDatabases',
          label: 'Licenses Used - Databases',
        },
        {
          id: 'hosts',
          component: 'LicensesUsedHosts',
          label: 'Licenses Used - Hosts',
        },
        {
          id: 'clusters',
          component: 'LicensesUsedClusters',
          label: 'Licenses Used - Clusters',
        },
        {
          id: 'veritas',
          component: 'LicensesUsedClustersVeritas',
          label: 'Licenses Used - Clusters Veritas',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.original-col {
  color: #0c8c29;
  /* background-color: #94dca5; */
  font-weight: bold;
}
.simulated-col {
  color: #b58003;
  /* background-color: #f5dea9; */
  font-weight: bold;
}
</style>
