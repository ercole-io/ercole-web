<template>
  <ToggleColumns
    getPage="services"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <ServiceFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </ServiceFilters>

    <FullTable
      slot="center"
      :placeholder="$t('menu.services')"
      :keys="keys"
      :tableData="getOracleServices"
      @clickedRow="handleClickedRow"
      isClickable
      :isLoadingTable="loadingTableStatus"
    >
      <template slot="headData">
        <v-th sortKey="hostname">{{ $t('common.collumns.hostname') }}</v-th>
        <v-th sortKey="dbName">{{ $t('common.collumns.name') }}</v-th>
        <v-th sortKey="servName">Service Name</v-th>
        <v-th sortKey="container">Container Name</v-th>
        <v-th sortKey="servEnabled">Enabled</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <HostLink :hostname="rowData.scope.hostname" class="first-col" />
        <TdContent :value="rowData.scope.dbName" />
        <TdContent :value="rowData.scope.servName" />
        <TdContent :value="rowData.scope.container" />
        <TdIcon :value="rowData.scope.servEnabled" />
      </template>

      <ExportButton
        slot="export"
        url="hosts/technologies/oracle/databases/service-list"
        expName="oracleServices"
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
import TdIcon from '@/components/common/Table/TDIcon.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import ServiceFilters from '@/components/databases/oracle/services/Filters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'oracle-databases-services-page',
  mixins: [hostnameLinkRow],
  components: {
    ToggleColumns,
    FullTable,
    ExportButton,
    TdContent,
    TdIcon,
    HostLink,
    ServiceFilters,
    Loading,
  },
  data() {
    return {
      keys: ['hostname', 'name', 'servName', 'servEnabled', 'container'],
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getServices().then(() => {
      bus.$emit('data', this.getOracleServices)
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getServices']),
  },
  computed: {
    ...mapGetters(['getOracleServices', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
