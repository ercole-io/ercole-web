<template>
  <ToggleColumns
    getPage="diskgroups"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <DiskGroupsFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </DiskGroupsFilters>

    <FullTable
      slot="center"
      placeholder="Disk Groups"
      :keys="keys"
      :tableData="getDiskGroups"
      @clickedRow="handleClickedRow"
      isClickable
      :isLoadingTable="loadingTableStatus"
    >
      <template slot="headData">
        <v-th sortKey="hostname">Hostname</v-th>
        <v-th sortKey="databases">Databases</v-th>
        <v-th sortKey="diskGroupName">Disk Group Name</v-th>
        <v-th sortKey="totalSpace">Total Space</v-th>
        <v-th sortKey="usedSpace">Uused Space</v-th>
        <v-th sortKey="freeSpace">Free Space</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <HostLink :hostname="rowData.scope.hostname" class="first-col" />
        <TdArrayMore :value="rowData.scope.databases" />
        <TdContent :value="rowData.scope.diskGroupName" />
        <TdContent :value="rowData.scope.totalSpace" />
        <TdContent :value="rowData.scope.usedSpace" />
        <TdContent :value="rowData.scope.freeSpace" />
      </template>

      <ExportButton
        slot="export"
        url="hosts/technologies/oracle/databases/diskgroups"
        expName="oracleDiskGroups"
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
import TdArrayMore from '@/components/common/Table/TdArrayMore.vue'
import DiskGroupsFilters from '@/components/databases/oracle/disk-groups/Filters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'oracle-databases-disk-groups-page',
  mixins: [hostnameLinkRow],
  components: {
    ToggleColumns,
    FullTable,
    ExportButton,
    TdContent,
    HostLink,
    TdArrayMore,
    DiskGroupsFilters,
    Loading,
  },
  data() {
    return {
      keys: [
        'hostname',
        'databases',
        'diskGroupName',
        'totalSpace',
        'usedSpace',
        'freeSpace',
      ],
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.requestDiskGoups().then(() => {
      bus.$emit('data', this.getDiskGroups)
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['requestDiskGoups']),
  },
  computed: {
    ...mapGetters(['getDiskGroups', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
