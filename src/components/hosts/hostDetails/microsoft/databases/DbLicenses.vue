<template>
  <b-tab-item label="Licenses" v-if="licenses && licenses.length > 0">
    <FullTable
      :tableData="licenses"
      :keys="keys"
      hideSearch
      hidePerpage
      hidePagination
      hideTopTable
      :isLoadingTable="false"
    >
      <template slot="headData">
        <v-th sortKey="ignored">Ignore License</v-th>
        <v-th sortKey="ignoredComment">Ignore Comment</v-th>
        <v-th sortKey="licenseTypeID">Part Number</v-th>
        <v-th sortKey="description">Description</v-th>
        <v-th sortKey="metric">Metric</v-th>
        <v-th sortKey="usedLicenses">Used Licenses</v-th>
        <v-th sortKey="clusterLicenses">Cluster Licenses</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <ignoreDbLicense
          :db="rowData.scope.dbName"
          :host="$route.params.hostname"
          :licenseID="rowData.scope.licenseTypeID"
          :description="rowData.scope.description"
          :metric="rowData.scope.metric"
          :status="!rowData.scope.ignored"
          :ignoreComment="rowData.scope.ignoredComment"
          type="microsoft"
          page="host-details"
        />
        <TdContent :value="rowData.scope.ignoredComment" />
        <TdContent :value="rowData.scope.licenseTypeID" />
        <TdContent :value="rowData.scope.description" />
        <TdContent :value="rowData.scope.metric" />
        <TdContent
          :value="rowData.scope.usedLicenses"
          :class="rowData.scope.clusterLicenses > 0 ? 'line-through' : ''"
        />
        <TdContent :value="rowData.scope.clusterLicenses" />
      </template>
    </FullTable>
  </b-tab-item>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import ignoreDbLicense from '@/components/licenses/used/databases/ignoreDbLicense.vue'

export default {
  name: 'hosts-details-microsoft-databases-licenses-component',
  props: {
    licenses: {
      type: Array,
      default: null,
    },
  },
  components: {
    FullTable,
    TdContent,
    ignoreDbLicense,
  },
  data() {
    return {
      keys: [
        'ignored',
        'licenseTypeID',
        'description',
        'metric',
        'usedLicenses',
        'clusterLicenses',
        'ignoredComment',
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
