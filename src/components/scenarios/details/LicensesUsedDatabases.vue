<template>
  <FullTable
    :keys="keys"
    :tableData="getLicensesScenario(licenceType)"
    :isLoadingTable="loadingTableStatus"
  >
    <template slot="headData">
      <v-th sortKey="hostname">Hostname</v-th>
      <v-th sortKey="dbName">DbName</v-th>
      <v-th sortKey="partNumber">Part Number</v-th>
      <v-th sortKey="description">Description</v-th>
      <v-th sortKey="metric">Metric</v-th>
      <v-th sortKey="usedLicenses">Used Licenses (Original)</v-th>
      <v-th sortKey="usedLicensesSim">Used Licenses (Simulated)</v-th>
      <v-th sortKey="clusterLicenses">Cluster Licenses (Original)</v-th>
      <v-th sortKey="clusterLicensesSim">Cluster Licenses (Simulated)</v-th>
    </template>

    <template slot="bodyData" slot-scope="rowData">
      <TdContent :value="rowData.scope.hostname" />
      <TdContent :value="rowData.scope.dbName" />
      <TdContent :value="rowData.scope.partNumber" />
      <TdContent :value="rowData.scope.description" />
      <TdContent :value="rowData.scope.metric" />

      <TdContent :value="rowData.scope.usedLicenses" class="original-col" />
      <TdContent :value="rowData.scope.usedLicensesSim" class="simulated-col" />
      <TdContent :value="rowData.scope.clusterLicenses" class="original-col" />
      <TdContent
        :value="rowData.scope.clusterLicensesSim"
        class="simulated-col"
      />
    </template>
  </FullTable>
</template>

<script>
import ScenariosDetailsMixin from '@/mixins/scenarios/detailsMixin.js'

export default {
  name: 'ScenariosDetailsLicensesUsedDatabases',
  mixins: [ScenariosDetailsMixin],
  data() {
    return {
      keys: [
        'hostname',
        'dbName',
        'partNumber',
        'description',
        'metric',
        'usedLicenses',
        'usedLicensesSim',
        'clusterLicenses',
        'clusterLicensesSim',
      ],
      licenceType: 'USED_DATABASES',
    }
  },
}
</script>

<style lang="scss" scoped></style>
