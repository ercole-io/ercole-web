<template>
  <ToggleColumns
    getPage="policy-audit"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <PolicyAuditFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </PolicyAuditFilters>

    <FullTable
      slot="center"
      placeholder="Policy Audit"
      :keys="keys"
      :tableData="getPolicyAudit"
      :isLoadingTable="loadingTableStatus"
      @clickedRow="handleClickedRow"
      isClickable
    >
      <template slot="headData">
        <v-th sortKey="hostname">{{ $t('common.collumns.hostname') }}</v-th>
        <v-th sortKey="dbName">{{ $t('common.collumns.name') }}</v-th>
        <v-th sortKey="pdbName">PDB Name</v-th>
        <v-th sortKey="flag">Flag</v-th>
        <v-th sortKey="policiesAudit">Policies Audit Retrieved From DB</v-th>
        <v-th sortKey="policiesAuditConfigured"
          >Policies Audit Configured on Ercole</v-th
        >
        <v-th sortKey="matched">Matched</v-th>
        <v-th sortKey="notmatched">Not Matched</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <HostLink :hostname="rowData.scope.hostname" class="first-col" />
        <TdContent :value="rowData.scope.dbName" />
        <TdContent :value="rowData.scope.pdbName" />
        <TdIcon
          v-if="rowData.scope.flag !== 'N/A'"
          :value="['circle', rowData.scope.flagType, '', 'fa-lg']"
          @click.native="handleClickedRow([rowData.scope])"
        />
        <TdContent v-else :value="rowData.scope.flag" />
        <TdArrayMore
          v-if="rowData.scope.policiesAudit.length > 0"
          :value="rowData.scope.policiesAudit"
        />
        <TdArrayMore v-else :value="'-'" />
        <TdArrayMore
          v-if="rowData.scope.policiesAuditConfigured.length > 0"
          :value="rowData.scope.policiesAuditConfigured"
        />
        <TdArrayMore v-else :value="'-'" />
        <TdArrayMore
          v-if="rowData.scope.matched.length > 0"
          :value="rowData.scope.matched"
        />
        <TdArrayMore v-else :value="'-'" />
        <TdArrayMore
          v-if="rowData.scope.notmatched.length > 0"
          :value="rowData.scope.notmatched"
        />
        <TdArrayMore v-else :value="'-'" />
      </template>

      <ExportButton
        slot="export"
        url="hosts/technologies/oracle/databases/pdbs/policies-audit"
        expName="oraclePolicyAudit"
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
import TdArrayMore from '@/components/common/Table/TdArrayMore.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import PolicyAuditFilters from '@/components/databases/oracle/policyAudit/Filters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'oracle-databases-policy-audit-page',
  mixins: [hostnameLinkRow],
  components: {
    ToggleColumns,
    FullTable,
    HostLink,
    ExportButton,
    TdContent,
    TdArrayMore,
    TdIcon,
    PolicyAuditFilters,
    Loading,
  },
  data() {
    return {
      keys: [
        'hostname',
        'dbName',
        'pdbName',
        'flag',
        'policiesAudit',
        'policiesAuditConfigured',
        'matched',
        'notmatched',
      ],
      isMounted: false,
    }
  },
  beforeMount() {
    this.getOraclePolicyAudit().then(() => {
      bus.$emit('data', this.getPolicyAudit)
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getOraclePolicyAudit']),
  },
  computed: {
    ...mapGetters(['getPolicyAudit', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
