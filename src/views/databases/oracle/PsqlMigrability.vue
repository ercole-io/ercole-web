<template>
  <ToggleColumns
    getPage="psql-migrability"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <PsqlMigrabilityFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </PsqlMigrabilityFilters>

    <FullTable
      slot="center"
      placeholder="PSQL Migrability"
      :keys="keys"
      :tableData="getPsqlMigrability"
      :isLoadingTable="loadingTableStatus"
      @clickedRow="handleClickedRow"
      isClickable
    >
      <template slot="headData">
        <v-th sortKey="hostname">{{ $t('common.collumns.hostname') }}</v-th>
        <v-th sortKey="dbname">{{ $t('common.collumns.name') }}</v-th>
        <v-th sortKey="pdbname">PDB Name</v-th>
        <v-th sortKey="flag">Flag</v-th>
        <v-th sortKey="metrics">Metrics</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <HostLink :hostname="rowData.scope.hostname" class="first-col" />
        <TdContent :value="rowData.scope.dbname" />
        <TdContent :value="rowData.scope.pdbname" />
        <TdIcon
          v-if="rowData.scope.flagType !== 'N/A'"
          :value="['circle', rowData.scope.flagType, '', 'fa-lg']"
          @click.native="handleClickedRow([rowData.scope])"
        />
        <TdContent v-else :value="rowData.scope.flagType" />

        <td v-if="rowData.scope.metrics.length > 0">
          <Semaphore
            :hostname="rowData.scope.hostname"
            :dbname="rowData.scope.dbname"
            :setColor="rowData.scope.flag"
            :modalData="rowData.scope.metrics"
          />
        </td>
        <TdContent v-else :value="rowData.scope.flagType" />
      </template>

      <ExportButton
        slot="export"
        url="hosts/technologies/oracle/databases/psql-migrabilities"
        expName="oraclePsqlMigrability"
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
import HostLink from '@/components/common/Table/HostLink.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import Semaphore from '@/components/common/Semaphore.vue'
import PsqlMigrabilityFilters from '@/components/databases/oracle/psqlMigrability/Filters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'oracle-databases-psql-migrability-page',
  mixins: [hostnameLinkRow],
  components: {
    ToggleColumns,
    FullTable,
    HostLink,
    ExportButton,
    TdContent,
    TdIcon,
    Semaphore,
    PsqlMigrabilityFilters,
    Loading,
  },
  data() {
    return {
      keys: ['hostname', 'dbname', 'pdbname', 'flag', 'metrics'],
      isMounted: false,
    }
  },
  beforeMount() {
    this.getOraclePsqlMigrability().then(() => {
      bus.$emit('data', this.getPsqlMigrability)
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getOraclePsqlMigrability']),
  },
  computed: {
    ...mapGetters(['getPsqlMigrability', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
