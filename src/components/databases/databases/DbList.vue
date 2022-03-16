<template>
  <ToggleColumns
    getPage="databases"
    :leftButton="$t('common.forms.advancedFilters')"
    :rightButton="$t('common.general.sideInfo')"
  >
    <div slot="left">
      <MoreInfoButtons :buttonItems="databasesMoreInfo" />
      <DbFilters />
    </div>

    <FullTable
      slot="center"
      :placeholder="$t('menu.databases')"
      :keys="getHeadKeys(databasesHead)"
      :tableData="getAllDatabases"
      @clickedRow="handleClickedRow"
      isClickable
      :isLoadingTable="loadingTableStatus"
    >
      <DynamicHeading
        slot="headData"
        v-for="head in databasesHead"
        :key="head.sort"
        :data="head"
      />

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.name" class="first-col" />
        <HostLink :hostname="[rowData.scope.hostname, rowData.scope.name]" />
        <TdIcon
          :value="rowData.scope.archivelog"
          :class="{ 'is-hidden': moreInfoToggle.hiddenReliabilityDB }"
          @click.native="handleClickedRow([rowData.scope])"
        />
        <TdIcon
          :value="rowData.scope.disasterRecovery"
          :class="{ 'is-hidden': moreInfoToggle.hiddenReliabilityDB }"
          @click.native="handleClickedRow([rowData.scope])"
        />
        <TdIcon
          :value="rowData.scope.highAvailability"
          :class="{ 'is-hidden': moreInfoToggle.hiddenReliabilityDB }"
          @click.native="handleClickedRow([rowData.scope])"
        />
        <TdContent :value="rowData.scope.type" />
        <TdContent :value="rowData.scope.version" />
        <TdContent :value="rowData.scope.environment" />
        <TdContent :value="rowData.scope.charset" />
        <TdContent :value="rowData.scope.memory | formatNumber('0.00')" />
        <TdContent :value="rowData.scope.datafileSize | formatNumber('0.00')" />
        <TdContent :value="rowData.scope.segmentSize | formatNumber('0.00')" />
      </template>

      <ExportButton
        slot="export"
        url="/hosts/technologies/oracle/databases"
        expName="databases"
      />
    </FullTable>

    <div slot="right">
      <DbTotalMemorySize class="mb-4" />
      <DbTotalSegmentSize class="mb-4" />
      <DbCharts
        id="databasesChart"
        chartHeight="500px"
        :xAxesConfig="[true, 'top']"
      />
    </div>
  </ToggleColumns>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import getHeadKeys from '@/mixins/dynamicHeadingMixin.js'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import DbFilters from '@/components/databases/databases/DbFilters.vue'
import MoreInfoButtons from '@/components/common/MoreInfoButtons.vue'
import DynamicHeading from '@/components/common/Table/DynamicHeading.vue'
import databasesMoreInfo from '@/components/databases/databases/databases-more-info.json'
import databasesHead from '@/components/databases/databases/databases-head.json'
import DbCharts from '@/components/databases/databases/DbCharts.vue'
import DbTotalMemorySize from '@/components/databases/databases/DbTotalMemorySize.vue'
import DbTotalSegmentSize from '@/components/databases/databases/DbTotalSegmentSize.vue'

export default {
  mixins: [hostnameLinkRow, getHeadKeys],
  components: {
    ToggleColumns,
    FullTable,
    ExportButton,
    TdContent,
    TdIcon,
    HostLink,
    DbFilters,
    MoreInfoButtons,
    DynamicHeading,
    DbCharts,
    DbTotalMemorySize,
    DbTotalSegmentSize,
  },
  data() {
    return {
      databasesHead: databasesHead,
      databasesMoreInfo: databasesMoreInfo,
    }
  },
  computed: {
    ...mapGetters(['getAllDatabases', 'loadingTableStatus']),
    ...mapState(['moreInfoToggle']),
  },
}
</script>

<style lang="scss" scoped></style>
