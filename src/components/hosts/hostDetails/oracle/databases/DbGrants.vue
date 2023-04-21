<template>
  <b-tab-item label="DBA Role">
    <FullTable
      :tableData="dbGrants"
      :keys="keys"
      hideSearch
      hidePerpage
      hidePagination
      hideTopTable
      :isLoadingTable="false"
    >
      <template slot="headData">
        <v-th sortKey="grantee">Grantee</v-th>
        <v-th sortKey="adminOption">Admin Option</v-th>
        <v-th sortKey="defaultRole">Default Role</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.grantee" />
        <TdIcon :value="rowData.scope.adminOption" />
        <TdIcon :value="rowData.scope.defaultRole" />
      </template>
    </FullTable>
  </b-tab-item>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'

export default {
  name: 'hosts-details-oracle-databases-grants-component',
  props: {
    dbGrants: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    FullTable,
    TdContent,
    TdIcon,
  },
  data() {
    return {
      keys: ['grantee', 'adminOption', 'defaultRole'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
