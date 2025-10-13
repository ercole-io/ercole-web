<template>
  <FullTable
    :keys="keys"
    :tableData="getLicensesScenario(licenceType)"
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
import ScenariosDetailsMixin from '@/mixins/scenarios/detailsMixin.js'

export default {
  name: 'ScenariosDetailsLicensesUsedHosts',
  mixins: [ScenariosDetailsMixin],
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
      licenceType: 'USED_CLUSTERS',
    }
  },
}
</script>

<style lang="scss" scoped></style>
