<template>
  <ToggleColumns
    getPage="exadataPatchAdvisor"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <ExadataPaFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </ExadataPaFilters>

    <FullTable
      slot="center"
      :placeholder="$t('menu.patAdvisor')"
      :keys="keys"
      :tableData="getExadataPA"
      @clickedRow="handleClickedRow"
      isClickable
      :isLoadingTable="loadingTableStatus"
    >
      <template slot="headData">
        <v-th sortKey="hostname">{{ $t('common.collumns.hostname') }}</v-th>
        <v-th sortKey="rackID">Rack ID</v-th>
        <v-th sortKey="imageVersion">Image Version</v-th>
        <v-th sortKey="releaseDate">Release Date</v-th>
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
        <HostLink :hostname="rowData.scope.hostname" class="first-col" />
        <TdContent :value="rowData.scope.rackID" />
        <TdContent :value="rowData.scope.imageVersion" />
        <TdContent :value="rowData.scope.date" />
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
        url="exadata/patch-advisors"
        expName="exadataPatchAdvisor"
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
import ExadataPaFilters from '@/components/exadata/exadatas/patchAdvisors/Filters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'exadata-patch-advisor-page',
  mixins: [hostnameLinkRow],
  components: {
    ToggleColumns,
    FullTable,
    ExportButton,
    TdContent,
    TdIcon,
    HostLink,
    ExadataPaFilters,
    Loading,
  },
  data() {
    return {
      keys: [
        'fourMonthsText',
        'hostname',
        'imageVersion',
        'rackID',
        'date',
        'sixMonthsText',
        'twelveMonthsText',
      ],
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.requestExadatPA().then(() => {
      bus.$emit('data', this.getExadataPA)
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['requestExadatPA']),
  },
  computed: {
    ...mapGetters(['getExadataPA', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
