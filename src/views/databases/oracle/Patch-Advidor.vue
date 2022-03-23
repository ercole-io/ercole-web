<template>
  <ToggleColumns
    getPage="patchAdvisor"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <GhostLoading
      v-if="loadingTableStatus"
      :isLoading="loadingTableStatus"
      setHeight="640"
      slot="left"
    />
    <PatchAdvisorFilters v-if="!loadingTableStatus" slot="left" />

    <FullTable
      slot="center"
      :placeholder="$t('menu.patAdvisor')"
      :keys="keys"
      :tableData="getOraclePatchAdvisor"
      @clickedRow="handleClickedRow"
      isClickable
      :isLoadingTable="loadingTableStatus"
    >
      <template slot="headData">
        <v-th sortKey="hostname">{{ $t('common.collumns.hostname') }}</v-th>
        <v-th sortKey="dbname">{{ $t('common.collumns.databases') }}</v-th>
        <v-th sortKey="dbver">{{ $t('common.collumns.version') }}</v-th>
        <v-th sortKey="date">{{ $t('common.collumns.releaseDate') }}</v-th>
        <v-th sortKey="description">{{ $t('common.collumns.psu') }}</v-th>
        <v-th sortKey="fourMonthsText">{{
          $t('common.collumns.months', ['4'])
        }}</v-th>
        <v-th sortKey="sixMonthsText">{{
          $t('common.collumns.months', ['6'])
        }}</v-th>
        <v-th sortKey="twelveMonthsText">{{
          $t('common.collumns.months', ['12'])
        }}</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <HostLink
          :hostname="[rowData.scope.hostname, rowData.scope.dbname]"
          class="first-col"
        />
        <TdContent :value="rowData.scope.dbname" />
        <TdContent :value="rowData.scope.dbver" />
        <TdContent :value="rowData.scope.date" />
        <TdContent :value="rowData.scope.description" />
        <TdIcon
          :value="rowData.scope.fourMonths"
          @click.native="handleClickedRow([rowData.scope])"
        />
        <TdIcon
          :value="rowData.scope.sixMonths"
          @click.native="handleClickedRow([rowData.scope])"
        />
        <TdIcon
          :value="rowData.scope.twelveMonths"
          @click.native="handleClickedRow([rowData.scope])"
        />
      </template>

      <ExportButton
        slot="export"
        url="hosts/technologies/oracle/databases/patch-advisors"
        expName="oraclePatchAdvisor"
      />
    </FullTable>
  </ToggleColumns>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import PatchAdvisorFilters from '@/components/databases/oracle/patchAdvisor/PatchAdvisorFilters.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  mixins: [hostnameLinkRow],
  components: {
    ToggleColumns,
    FullTable,
    ExportButton,
    TdContent,
    TdIcon,
    HostLink,
    PatchAdvisorFilters,
    GhostLoading,
  },
  data() {
    return {
      keys: [
        'hostname',
        'dbname',
        'dbver',
        'date',
        'description',
        'fourMonthsText',
        'sixMonthsText',
        'twelveMonthsText',
      ],
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getPatchAdvisor()
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getPatchAdvisor']),
  },
  computed: {
    ...mapGetters(['getOraclePatchAdvisor', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
