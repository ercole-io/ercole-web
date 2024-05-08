<template>
  <ToggleColumns
    getPage="partitionings"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <div slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </div>

    <FullTable
      slot="center"
      placeholder="AWS RDS"
      :keys="keys"
      :tableData="returnAwsRdsDbs"
      :isLoadingTable="loadingTableStatus"
    >
      <template slot="headData">
        <v-th sortKey="dbName">DB Name</v-th>
        <v-th sortKey="dbInstanceClass">DB Instance Class</v-th>
        <v-th sortKey="engine">Engine</v-th>
        <v-th sortKey="engineVersion">Engine Version</v-th>
        <v-th sortKey="dbInstanceStatus">DB Instance Status</v-th>
        <v-th sortKey="licenseModel">License Model</v-th>
        <v-th sortKey="storageType">Storage Type</v-th>
        <v-th sortKey="allocatedStorage">Allocated Storage</v-th>
        <v-th sortKey="maxAllocatedStorage">Max Allocated Storage</v-th>
        <v-th sortKey="instanceType">Instance Type</v-th>
        <v-th sortKey="processorManufacturer">Processor Manu facturer</v-th>
        <v-th sortKey="defaultCore">Default Core</v-th>
        <v-th sortKey="defaultThreadsPerCore">Default Threads Per Core</v-th>
        <v-th sortKey="defaultVCpus">Default VCpus</v-th>
        <v-th sortKey="memorySizeInMib">Memory Size In Mib</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.dbName" />
        <tdContent :value="rowData.scope.dbInstanceClass" />
        <tdContent :value="rowData.scope.engine" />
        <tdContent :value="rowData.scope.engineVersion" />
        <tdContent :value="rowData.scope.dbInstanceStatus" />
        <tdContent :value="rowData.scope.licenseModel" />
        <tdContent :value="rowData.scope.storageType" />
        <tdContent :value="rowData.scope.allocatedStorage" />
        <tdContent :value="rowData.scope.maxAllocatedStorage" />
        <tdContent :value="rowData.scope.instanceType" />
        <tdContent :value="rowData.scope.processorManufacturer" />
        <tdContent :value="rowData.scope.defaultCore" />
        <tdContent :value="rowData.scope.defaultThreadsPerCore" />
        <tdContent :value="rowData.scope.defaultVCpus" />
        <tdContent :value="rowData.scope.memorySizeInMib" />
      </template>

      <ExportButton slot="export" url="aws/rds" expName="oracleAwsRds" />
    </FullTable>
  </ToggleColumns>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'oracle-databases-aws-rds',
  components: {
    ToggleColumns,
    FullTable,
    ExportButton,
    TdContent,
    Loading,
  },
  data() {
    return {
      keys: [
        'dbName',
        'dbInstanceClass',
        'engine',
        'engineVersion',
        'dbInstanceStatus',
        'licenseModel',
        'storageType',
        'allocatedStorage',
        'maxAllocatedStorage',
        'instanceType',
        'processorManufacturer',
        'defaultCore',
        'defaultThreadsPerCore',
        'defaultVCpus',
        'memorySizeInMib',
      ],
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getAwsRdsDbs()
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getAwsRdsDbs']),
  },
  computed: {
    ...mapGetters(['returnAwsRdsDbs', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
