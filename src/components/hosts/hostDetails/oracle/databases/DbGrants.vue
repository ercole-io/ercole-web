<template>
  <b-tab-item label="DB Grants" v-if="dbGrants.length > 0">
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
        <TdContent :value="rowData.scope.adminOption" />
        <TdContent :value="rowData.scope.defaultRole" />
      </template>
    </FullTable>
  </b-tab-item>
</template>

<script>
import { mapGetters } from 'vuex'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  props: {
    dbName: {
      type: String,
      required: true,
    },
  },
  components: {
    FullTable,
    TdContent,
  },
  data() {
    return {
      keys: ['grantee', 'adminOption', 'defaultRole'],
    }
  },
  computed: {
    ...mapGetters(['getCurrentHostDbGrants']),
    dbGrants() {
      return this.getCurrentHostDbGrants(this.dbName)
    },
  },
}
</script>

<style lang="scss" scoped></style>
