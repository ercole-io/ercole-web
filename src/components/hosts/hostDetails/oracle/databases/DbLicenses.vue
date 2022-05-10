<template>
  <b-tab-item label="Licenses" v-if="dbLicenses.length > 0">
    <FullTable
      :tableData="dbLicenses"
      :keys="keys"
      hideSearch
      hidePerpage
      hidePagination
      hideTopTable
      :isLoadingTable="false"
    >
      <template slot="headData">
        <v-th sortKey="ignored">Ignore License</v-th>
        <v-th sortKey="licenseTypeID">Part Number</v-th>
        <v-th sortKey="description">Description</v-th>
        <v-th sortKey="metric">Metric</v-th>
        <v-th sortKey="usedLicenses">Used Licenses</v-th>
        <v-th sortKey="clusterLicenses">Cluster Licenses</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <ignoreDbLicense
          :db="dbName"
          :host="$route.params.hostname"
          :licenseID="rowData.scope.licenseTypeID"
          :description="rowData.scope.description"
          :metric="rowData.scope.metric"
          :status="!rowData.scope.ignored"
          type="oracle"
          page="host-details"
        />
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
import { mapGetters } from 'vuex'

export default {
  props: {
    licenses: {
      type: Array,
      default: null,
    },
    dbName: {
      type: String,
      required: true,
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
      ],
    }
  },
  computed: {
    ...mapGetters(['getCurrentHostDbLicenses']),
    dbLicenses() {
      return this.getCurrentHostDbLicenses(this.dbName)
    },
  },
}
</script>

<style lang="scss" scoped></style>
