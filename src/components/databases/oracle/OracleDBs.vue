<template>
  <div class="columns">
    <div class="column is-4">
      <MoreInfoButtons :buttonItems="moreInfoButtons" />
      <OracleFilters />
    </div>
    <div class="column is-8">
      <FullTable
        :placeholder="$t('menu.oracle')"
        :keys="keys"
        :tableData="getAllOracleDBs"
        @clickedRow="handleClickedRow"
        isClickable
      >
        <template slot="headData">
          <v-th sortKey="name">{{ $t('common.collumns.name') }}</v-th>
          <v-th sortKey="uniqueName">{{
            $t('common.collumns.uniqueName')
          }}</v-th>
          <v-th
            sortKey="archivelog"
            class="reliability"
            :class="{ 'is-hidden': moreInfoToggle.hiddenReliabilityOracle }"
            >{{ $t('common.collumns.archivelog') }}</v-th
          >
          <v-th
            sortKey="dataguard"
            class="reliability"
            :class="{ 'is-hidden': moreInfoToggle.hiddenReliabilityOracle }"
            >{{ $t('common.collumns.disasterRecovery') }}</v-th
          >
          <v-th
            sortKey="ha"
            class="reliability"
            :class="{ 'is-hidden': moreInfoToggle.hiddenReliabilityOracle }"
            >{{ $t('common.collumns.highAvailability') }}</v-th
          >
          <v-th
            sortKey="datafileSize"
            class="spaceUsed"
            :class="{ 'is-hidden': moreInfoToggle.hiddenSpaceUsed }"
            >{{ $t('common.collumns.datafileSize') }}</v-th
          >
          <v-th
            sortKey="segmentsSize"
            class="spaceUsed"
            :class="{ 'is-hidden': moreInfoToggle.hiddenSpaceUsed }"
            >{{ $t('common.collumns.segmentSize') }}</v-th
          >
          <v-th
            sortKey="charset"
            class="charset"
            :class="{ 'is-hidden': moreInfoToggle.hiddenCharset }"
            >{{ $t('common.collumns.charset') }}</v-th
          >
          <v-th sortKey="version">{{ $t('common.collumns.version') }}</v-th>
          <v-th sortKey="work">{{ $t('common.collumns.work') }}</v-th>
          <v-th sortKey="cpuCount">{{ $t('common.collumns.cpuCount') }}</v-th>
          <v-th sortKey="blockSize">{{ $t('common.collumns.blockSize') }}</v-th>
          <v-th sortKey="status">{{ $t('common.collumns.status') }}</v-th>
          <v-th sortKey="memory">{{ $t('common.collumns.memory') }}</v-th>
          <v-th sortKey="hostname">{{ $t('common.collumns.hostname') }}</v-th>
          <v-th sortKey="environment">{{
            $t('common.collumns.environment')
          }}</v-th>
        </template>

        <template slot="bodyData" slot-scope="rowData">
          <TdContent :value="rowData.scope.name" />
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
          <HostLink :hostname="[rowData.scope.hostname, rowData.scope.name]" />
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
import FullTable from '@/components/common/Table/FullTable.vue'
import ExportButton from '@/components/common/exportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import OracleFilters from '@/components/databases/oracle/OracleFilters.vue'
import MoreInfoButtons from '@/components/common/MoreInfoButtons.vue'

export default {
  mixins: [hostnameLinkRow],
  components: {
    FullTable,
    ExportButton,
    TdContent,
    TdIcon,
    HostLink,
    OracleFilters,
    MoreInfoButtons
  },
  data() {
    return {
      keys: [
        'name',
        'version',
        'hostname',
        'environment',
        'charset',
        'memory',
        'datafileSize',
        'segmentsSize',
        'archivelog',
        'dataguard',
        'ha',
        'work',
        'blockSize',
        'cpuCount',
        'status',
        'uniqueName'
      ],
      moreInfoButtons: [
        {
          name: 'ReliabilityOracle',
          text: this.$i18n.t('common.collumns.reliability')
        },
        {
          name: 'SpaceUsed',
          text: this.$i18n.t('common.collumns.spaceUsed')
        },
        {
          name: 'Charset',
          text: this.$i18n.t('common.collumns.charset')
        }
      ]
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
