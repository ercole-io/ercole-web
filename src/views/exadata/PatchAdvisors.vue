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
        <TdContent class="no-click" :value="rowData.scope.hostname" />
        <TdContent class="no-click" :value="rowData.scope.rackID" />
        <TdContent class="no-click" :value="rowData.scope.imageVersion" />
        <TdContent class="no-click" :value="rowData.scope.date" />
        <TdIcon class="no-click" :value="rowData.scope.fourMonths" />
        <TdIcon class="no-click" :value="rowData.scope.sixMonths" />
        <TdIcon class="no-click" :value="rowData.scope.twelveMonths" />
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
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import ExadataPaFilters from '@/components/exadata/exadatas/patchAdvisors/Filters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'exadata-patch-advisor-page',
  components: {
    ToggleColumns,
    FullTable,
    ExportButton,
    TdContent,
    TdIcon,
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

<style lang="scss" scoped>
.no-click {
  cursor: default;
}
</style>
