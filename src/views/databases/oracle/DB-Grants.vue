<template>
  <ToggleColumns
    getPage="dbGrants"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <DbGrantsFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </DbGrantsFilters>

    <FullTable
      slot="center"
      :placeholder="$t('menu.dbGrants')"
      :keys="keys"
      :tableData="getOracleDbGrants"
      @clickedRow="handleClickedRow"
      isClickable
      :isLoadingTable="loadingTableStatus"
    >
      <template slot="headData">
        <v-th sortKey="hostname">{{ $t('common.collumns.hostname') }}</v-th>
        <v-th sortKey="dbName">{{ $t('common.collumns.name') }}</v-th>
        <v-th sortKey="grantee">Grantee</v-th>
        <v-th sortKey="adminOption">Admin Option</v-th>
        <v-th sortKey="defaultRole">Default Role</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <HostLink :hostname="rowData.scope.hostname" class="first-col" />
        <TdContent :value="rowData.scope.dbName" />
        <TdContent :value="rowData.scope.grantee" />
        <TdIcon
          :value="rowData.scope.adminOption"
          @click.native="handleClickedRow([rowData.scope])"
        />
        <TdIcon
          :value="rowData.scope.defaultRole"
          @click.native="handleClickedRow([rowData.scope])"
        />
      </template>

      <ExportButton
        slot="export"
        url="hosts/technologies/all/databases/grant-dba"
        expName="oracleDbGrants"
      />
    </FullTable>
  </ToggleColumns>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import DbGrantsFilters from '@/components/databases/oracle/databaseGrants/DbGrantsFilters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'oracle-databases-dbgrants-page',
  mixins: [hostnameLinkRow],
  components: {
    ToggleColumns,
    FullTable,
    ExportButton,
    TdContent,
    HostLink,
    TdIcon,
    DbGrantsFilters,
    Loading,
  },
  data() {
    return {
      keys: ['hostname', 'dbName', 'grantee', 'adminOption', 'defaultRole'],
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getDbGrants().then(() => {
      bus.$emit('data', this.getOracleDbGrants)
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getDbGrants']),
  },
  computed: {
    ...mapGetters(['getOracleDbGrants', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
