<template>
  <ToggleColumns
    getPage="patch"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <PatchFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </PatchFilters>

    <FullTable
      slot="center"
      :placeholder="$t('menu.patch')"
      :keys="keys"
      :tableData="getOraclePatch"
      @clickedRow="handleClickedRow"
      isClickable
      :isLoadingTable="loadingTableStatus"
    >
      <template slot="headData">
        <v-th sortKey="hostname">{{ $t('common.collumns.hostname') }}</v-th>
        <v-th sortKey="dbName">{{ $t('common.collumns.name') }}</v-th>
        <v-th sortKey="patchAction">Patch Action</v-th>
        <v-th sortKey="patchDate">Patch Date</v-th>
        <v-th sortKey="patchDesc">Patch Description</v-th>
        <v-th sortKey="patchID">Patch ID</v-th>
        <v-th sortKey="dbName">Patch Version</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <HostLink :hostname="rowData.scope.hostname" class="first-col" />
        <TdContent :value="rowData.scope.dbName" />
        <TdContent :value="rowData.scope.patchAction" />
        <TdContent :value="rowData.scope.patchDate" />
        <TdContent :value="rowData.scope.patchDesc" />
        <TdContent :value="rowData.scope.patchID" />
        <TdContent :value="rowData.scope.patchVersion" />
      </template>

      <ExportButton
        slot="export"
        url="hosts/technologies/oracle/databases/patch-list"
        expName="oraclePatch"
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
import PatchFilters from '@/components/databases/oracle/patch/Filters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'oracle-databases-patch-page',
  mixins: [hostnameLinkRow],
  components: {
    ToggleColumns,
    FullTable,
    ExportButton,
    TdContent,
    HostLink,
    PatchFilters,
    Loading,
  },
  data() {
    return {
      keys: [
        'hostname',
        'dbName',
        'patchAction',
        'patchDate',
        'patchDesc',
        'patchID',
        'patchVersion',
      ],
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getPatch().then(() => {
      bus.$emit('data', this.getOraclePatch)
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getPatch']),
  },
  computed: {
    ...mapGetters(['getOraclePatch', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
