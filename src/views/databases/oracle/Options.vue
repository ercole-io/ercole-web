<template>
  <ToggleColumns
    getPage="options"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <OptionsFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </OptionsFilters>

    <FullTable
      slot="center"
      :placeholder="$t('menu.options')"
      :keys="keys"
      :tableData="getOracleOptions"
      @clickedRow="handleClickedRow"
      isClickable
      :isLoadingTable="loadingTableStatus"
    >
      <template slot="headData">
        <v-th sortKey="hostname">{{ $t('common.collumns.hostname') }}</v-th>
        <v-th sortKey="dbName">{{ $t('common.collumns.name') }}</v-th>
        <v-th sortKey="firstUsageDate">First</v-th>
        <v-th sortKey="lastUsageDate">Last</v-th>
        <v-th sortKey="detectedUsages">Detected</v-th>
        <v-th sortKey="product">Product</v-th>
        <v-th sortKey="currentlyUsed">Currently</v-th>
        <v-th sortKey="extraFeatureInfo">Extra</v-th>
        <v-th sortKey="feature">Feature</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <HostLink :hostname="rowData.scope.hostname" class="first-col" />
        <TdContent :value="rowData.scope.dbName" />
        <TdContent :value="rowData.scope.firstUsageDate" />
        <TdContent :value="rowData.scope.lastUsageDate" />
        <TdContent :value="rowData.scope.detectedUsages" />
        <TdContent :value="rowData.scope.product" />
        <TdIcon :value="rowData.scope.currentlyUsed" />
        <TdContent :value="rowData.scope.extraFeatureInfo" />
        <TdContent :value="rowData.scope.feature" />
      </template>

      <ExportButton
        slot="export"
        url="hosts/technologies/oracle/databases/option-list"
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
import TdIcon from '@/components/common/Table/TDIcon.vue'
import OptionsFilters from '@/components/databases/oracle/options/Filters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  mixins: [hostnameLinkRow],
  components: {
    ToggleColumns,
    FullTable,
    ExportButton,
    TdContent,
    HostLink,
    TdIcon,
    OptionsFilters,
    Loading,
  },
  data() {
    return {
      keys: [
        'hostname',
        'dbName',
        'lastUsageDate',
        'detectedUsages',
        'product',
        'currentlyUsed',
        'extraFeatureInfo',
        'feature',
        'firstUsageDate',
      ],
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getOptions().then(() => {
      bus.$emit('data', this.getOracleOptions)
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getOptions']),
  },
  computed: {
    ...mapGetters(['getOracleOptions', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
