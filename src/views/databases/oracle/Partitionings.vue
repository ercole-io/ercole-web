<template>
  <ToggleColumns
    getPage="partitionings"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <PartitioningsFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </PartitioningsFilters>

    <FullTable
      slot="center"
      :placeholder="$t('menu.partitionings')"
      :keys="keys"
      :tableData="getOraclePartitionings"
      @clickedRow="handleClickedRow"
      isClickable
      :isLoadingTable="loadingTableStatus"
    >
      <template slot="headData">
        <v-th sortKey="hostname">Hostname</v-th>
        <v-th sortKey="databaseName">DB Name</v-th>
        <v-th sortKey="pdb">PDB</v-th>
        <v-th sortKey="segmentName">Segment Name</v-th>
        <v-th sortKey="owner">Segment Owner</v-th>
        <v-th sortKey="count">Partition Count"</v-th>
        <v-th sortKey="mb" defaultSort="desc">MB</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <HostLink
          :hostname="[rowData.scope.hostname, rowData.scope.databaseName]"
          class="first-col"
        />
        <TdContent :value="rowData.scope.databaseName" />
        <TdContent :value="rowData.scope.pdb" />
        <TdContent :value="rowData.scope.segmentName" />
        <TdContent :value="rowData.scope.owner" />
        <TdContent :value="rowData.scope.count" />
        <TdContent :value="rowData.scope.mb" />
      </template>

      <ExportButton
        slot="export"
        url="hosts/technologies/oracle/databases/partitionings"
        expName="oraclePartitionings"
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
import PartitioningsFilters from '@/components/databases/oracle/partitionings/Filters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'oracle-databases-partitionings-page',
  mixins: [hostnameLinkRow],
  components: {
    ToggleColumns,
    FullTable,
    ExportButton,
    TdContent,
    HostLink,
    PartitioningsFilters,
    Loading,
  },
  data() {
    return {
      keys: [
        'hostname',
        'databaseName',
        'owner',
        'segmentName',
        'count',
        'mb',
        'pdb',
      ],
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getPartitionings().then(() => {
      bus.$emit('data', this.getOraclePartitionings)
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getPartitionings']),
  },
  computed: {
    ...mapGetters(['getOraclePartitionings', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
