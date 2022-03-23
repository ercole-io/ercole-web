<template>
  <ToggleColumns
    getPage="databasesOracle"
    :leftButton="$t('common.forms.advancedFilters')"
    :rightButton="$t('common.general.sideInfo')"
    v-if="isMounted"
  >
    <GhostLoading
      v-if="loadingTableStatus"
      :isLoading="loadingTableStatus"
      setHeight="640"
      slot="left"
    />
    <OracleFilters v-if="!loadingTableStatus" slot="left" />

    <FullTable
      slot="center"
      :placeholder="$t('menu.oracle')"
      :keys="getHeadKeys(oracleHead)"
      :tableData="getAllOracleDBs"
      @clickedRow="handleClickedRow"
      isClickable
      :isLoadingTable="loadingTableStatus"
    >
      <MoreInfoButtons :buttonItems="oraclesMoreInfo" slot="customTopHeader" />

      <DynamicHeading
        slot="headData"
        v-for="head in oracleHead"
        :key="head.sort"
        :data="head"
      />

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.name" class="first-col" />
        <TdContent :value="rowData.scope.uniqueName" />
        <HostLink :hostname="[rowData.scope.hostname, rowData.scope.name]" />
        <TdIcon
          :value="rowData.scope.archivelog"
          :class="{ 'is-hidden': moreInfoToggle.hiddenReliabilityOracle }"
          @click.native="handleClickedRow([rowData.scope])"
        />
        <TdIcon
          :value="rowData.scope.dataguard"
          :class="{ 'is-hidden': moreInfoToggle.hiddenReliabilityOracle }"
          @click.native="handleClickedRow([rowData.scope])"
        />
        <TdIcon
          :value="rowData.scope.ha"
          :class="{ 'is-hidden': moreInfoToggle.hiddenReliabilityOracle }"
          @click.native="handleClickedRow([rowData.scope])"
        />
        <TdContent
          :value="rowData.scope.datafileSize | formatNumber('0.00')"
          :class="{ 'is-hidden': moreInfoToggle.hiddenSpaceUsed }"
        />
        <TdContent
          :value="rowData.scope.segmentsSize | formatNumber('0.00')"
          :class="{ 'is-hidden': moreInfoToggle.hiddenSpaceUsed }"
        />
        <TdContent
          :value="rowData.scope.charset"
          :class="{ 'is-hidden': moreInfoToggle.hiddenCharset }"
        />
        <TdContent :value="rowData.scope.version" />
        <TdIcon
          :value="rowData.scope.isCDB"
          @click.native="handleClickedRow([rowData.scope])"
        />
        <TdArrayMore
          v-if="rowData.scope.services.length > 5"
          :value="rowData.scope.services"
        />
        <TdArrayMore
          v-else
          :value="rowData.scope.services"
          @click.native="handleClickedRow([rowData.scope])"
        />
        <TdContent :value="rowData.scope.work | formatNumber('0')" />
        <TdContent :value="rowData.scope.cpuCount" />
        <TdContent :value="rowData.scope.blockSize" />
        <TdContent :value="rowData.scope.status" />
        <TdContent :value="rowData.scope.memory | formatNumber('0.00')" />
        <TdContent :value="rowData.scope.environment" />
      </template>

      <ExportButton
        slot="export"
        url="hosts/technologies/oracle/databases"
        expName="oracleDbs"
      />
    </FullTable>

    <div slot="right">
      <BaseLayoutColumns
        :pageCols="[
          { colsize: '6', slotName: 'cpu' },
          { colsize: '6', slotName: 'memory' },
        ]"
      >
        <OracleCpu slot="cpu" />
        <OracleMemory slot="memory" />
      </BaseLayoutColumns>

      <BaseLayoutColumns :pageCols="[{ colSize: '12', slotName: 'storage' }]">
        <OracleStorage slot="storage" />
      </BaseLayoutColumns>

      <OracleCharts slot="charts" />
    </div>

    <div class="columns" slot="bottom">
      <Top3Workload slot="workload" class="column is-6" />
      <Top3Reclaimable slot="reclaimable" class="column is-6" />
    </div>
  </ToggleColumns>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import getHeadKeys from '@/mixins/dynamicHeadingMixin.js'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import BaseLayoutColumns from '@/components/common/BaseLayoutColumns.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import TdArrayMore from '@/components/common/Table/TdArrayMore.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import OracleFilters from '@/components/databases/oracle/OracleFilters.vue'
import MoreInfoButtons from '@/components/common/MoreInfoButtons.vue'
import oraclesMoreInfo from '@/components/databases/oracle/oracle-more-info.json'
import DynamicHeading from '@/components/common/Table/DynamicHeading.vue'
import oracleHead from '@/components/databases/oracle/oracle-head.json'
import Top3Workload from '@/components/databases/oracle/Top3Workload.vue'
import Top3Reclaimable from '@/components/databases/oracle/Top3Reclaimable.vue'
import OracleCharts from '@/components/databases/oracle/OracleCharts.vue'
import OracleCpu from '@/components/databases/oracle/OracleCpu.vue'
import OracleMemory from '@/components/databases/oracle/OracleMemory.vue'
import OracleStorage from '@/components/databases/oracle/OracleStorage.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  mixins: [hostnameLinkRow, getHeadKeys],
  components: {
    ToggleColumns,
    BaseLayoutColumns,
    FullTable,
    ExportButton,
    TdContent,
    TdIcon,
    TdArrayMore,
    HostLink,
    OracleFilters,
    MoreInfoButtons,
    DynamicHeading,
    Top3Workload,
    Top3Reclaimable,
    OracleCharts,
    OracleCpu,
    OracleMemory,
    OracleStorage,
    GhostLoading,
  },
  data() {
    return {
      oraclesMoreInfo: oraclesMoreInfo,
      oracleHead: oracleHead,
      isMounted: false,
    }
  },
  mounted() {
    this.isMounted = true
  },
  computed: {
    ...mapGetters(['getAllOracleDBs', 'loadingTableStatus']),
    ...mapState(['moreInfoToggle']),
  },
}
</script>

<style lang="scss" scoped>
.hide {
  display: none;
}

.reliability {
  box-shadow: inset 0 -14px 0 -10px #f37021 !important;
}
.spaceUsed {
  box-shadow: inset 0 -14px 0 -10px #fcd217 !important;
}
.charset {
  box-shadow: inset 0 -14px 0 -10px #9c4d1e !important;
}
</style>
