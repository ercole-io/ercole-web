<template>
  <ToggleColumns
    getPage="addm"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <AddmFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </AddmFilters>

    <FullTable
      slot="center"
      :placeholder="$t('menu.addm')"
      :keys="keys"
      :tableData="getOracleAddms"
      @clickedRow="handleClickedRow"
      isClickable
      :isLoadingTable="loadingTableStatus"
    >
      <template slot="headData">
        <v-th sortKey="benefit" defaultSort="desc">{{
          $t('common.collumns.perfImpact')
        }}</v-th>
        <v-th sortKey="hostname">{{ $t('common.collumns.hostname') }}</v-th>
        <v-th sortKey="dbname">{{ $t('common.collumns.databases') }}</v-th>
        <v-th sortKey="finding">{{ $t('common.collumns.finding') }}</v-th>
        <v-th sortKey="recommendation">{{
          $t('common.collumns.recommendation')
        }}</v-th>
        <v-th sortKey="action">{{ $t('common.collumns.action') }}</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent
          :value="rowData.scope.benefit"
          class="first-col findingColumn"
        />
        <HostLink :hostname="[rowData.scope.hostname, rowData.scope.dbname]" />
        <TdContent :value="rowData.scope.dbname" />
        <TdContent :value="rowData.scope.finding" />
        <TdContent :value="rowData.scope.recommendation" />
        <TdContent :value="rowData.scope.action" class="actionColumn" />
      </template>

      <ExportButton
        slot="export"
        url="hosts/technologies/oracle/databases/addms"
        expName="oracleADDM"
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
import AddmFilters from '@/components/databases/oracle/addm/AddmFilters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'oracle-databases-addm-page',
  mixins: [hostnameLinkRow],
  components: {
    ToggleColumns,
    FullTable,
    ExportButton,
    TdContent,
    HostLink,
    AddmFilters,
    Loading,
  },
  data() {
    return {
      keys: [
        'benefit',
        'hostname',
        'dbname',
        'finding',
        'recommendation',
        'action',
      ],
      isMounted: false,
    }
  },
  async created() {
    await this.getAddms().then(() => {
      bus.$emit('data', this.getOracleAddms)
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getAddms']),
  },
  computed: {
    ...mapGetters(['getOracleAddms', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped>
.findingColumn {
  width: 10%;
}
.actionColumn {
  width: 50%;
}
</style>
