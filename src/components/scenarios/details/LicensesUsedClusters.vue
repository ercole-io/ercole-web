<template>
  <FullTable
    :keys="keys"
    :tableData="getLicensesScenario('USED_CLUSTERS')"
    :isLoadingTable="loadingTableStatus"
  >
    <template slot="headData">
      <v-th sortKey="cluster">Hostname</v-th>
      <v-th sortKey="hosts">Databases</v-th>
      <v-th sortKey="partNumber">Part Number</v-th>
      <v-th sortKey="description">Description</v-th>
      <v-th sortKey="metric">Metric</v-th>
      <v-th sortKey="usedLicenses">Used Licenses (Original)</v-th>
      <v-th sortKey="usedLicensesSim">Used Licenses (Simulated)</v-th>
    </template>

    <template slot="bodyData" slot-scope="rowData">
      <TdContent :value="rowData.scope.cluster" />
      <TdContent :value="rowData.scope.hosts" />
      <TdContent :value="rowData.scope.partNumber" />
      <TdContent :value="rowData.scope.description" />
      <TdContent :value="rowData.scope.metric" />
      <TdContent :value="rowData.scope.usedLicenses" class="original-col" />
      <TdContent :value="rowData.scope.usedLicensesSim" class="simulated-col" />
    </template>
  </FullTable>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  name: 'ScenariosDetailsLicensesUsedHosts',
  components: {
    FullTable,
    TdContent,
  },
  data() {
    return {
      keys: [
        'cluster',
        'hosts',
        'partNumber',
        'description',
        'metric',
        'usedLicenses',
        'usedLicensesSim',
      ],
    }
  },
  async beforeMount() {
    await this.fetchScenarioLicenses({
      id: this.$route.params.id,
      type: 'USED_CLUSTERS',
    })
  },
  methods: {
    ...mapActions(['fetchScenarioLicenses']),
  },
  computed: {
    ...mapGetters(['getLicensesScenario', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
