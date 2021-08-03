<template>
  <div class="columns">
    <div class="column is-4">
      <MoreInfoButtons :buttonItems="oraclesMoreInfo" />
      <OracleFilters />
    </div>
    <div class="column is-8">
      <FullTable
        :placeholder="$t('menu.oracle')"
        :keys="getHeadKeys(oracleHead)"
        :tableData="getAllOracleDBs"
        @clickedRow="handleClickedRow"
        isClickable
      >
        <DynamicHeading
          slot="headData"
          v-for="head in oracleHead"
          :key="head.sort"
          :data="head"
        />

        <template slot="bodyData" slot-scope="rowData">
          <TdContent :value="rowData.scope.name" />
          <HostLink :hostname="[rowData.scope.hostname, rowData.scope.name]" />
          <TdContent :value="rowData.scope.uniqueName" />
          <TdIcon
            :value="rowData.scope.archivelog"
            :class="{ 'is-hidden': moreInfoToggle.hiddenReliabilityOracle }"
          />
          <TdIcon
            :value="rowData.scope.dataguard"
            :class="{ 'is-hidden': moreInfoToggle.hiddenReliabilityOracle }"
          />
          <TdIcon
            :value="rowData.scope.ha"
            :class="{ 'is-hidden': moreInfoToggle.hiddenReliabilityOracle }"
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
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import getHeadKeys from '@/mixins/dynamicHeadingMixin.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import OracleFilters from '@/components/databases/oracle/OracleFilters.vue'
import MoreInfoButtons from '@/components/common/MoreInfoButtons.vue'
import oraclesMoreInfo from '@/components/databases/oracle/oracle-more-info.json'
import DynamicHeading from '@/components/common/Table/DynamicHeading.vue'
import oracleHead from '@/components/databases/oracle/oracle-head.json'

export default {
  mixins: [hostnameLinkRow, getHeadKeys],
  components: {
    FullTable,
    ExportButton,
    TdContent,
    TdIcon,
    HostLink,
    OracleFilters,
    MoreInfoButtons,
    DynamicHeading
  },
  data() {
    return {
      oraclesMoreInfo: oraclesMoreInfo,
      oracleHead: oracleHead
    }
  },
  computed: {
    ...mapGetters(['getAllOracleDBs']),
    ...mapState(['moreInfoToggle'])
  }
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
