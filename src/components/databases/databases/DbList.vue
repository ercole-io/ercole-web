<template>
  <div class="columns">
    <div class="column is-4">
      <MoreInfoButtons :buttonItems="databasesMoreInfo" />
      <DbFilters />
    </div>
    <div class="column is-8">
      <FullTable
        :placeholder="$t('menu.databases')"
        :keys="getHeadKeys(databasesHead)"
        :tableData="getAllDatabases"
        @clickedRow="handleClickedRow"
        isClickable
      >
        <DynamicHeading
          slot="headData"
          v-for="head in databasesHead"
          :key="head.sort"
          :data="head"
        />

        <template slot="bodyData" slot-scope="rowData">
          <TdContent :value="rowData.scope.name" />
          <TdIcon
            :value="rowData.scope.archivelog"
            :class="{ 'is-hidden': moreInfoToggle.hiddenReliabilityDB }"
          />
          <TdIcon
            :value="rowData.scope.disasterRecovery"
            :class="{ 'is-hidden': moreInfoToggle.hiddenReliabilityDB }"
          />
          <TdIcon
            :value="rowData.scope.highAvailability"
            :class="{ 'is-hidden': moreInfoToggle.hiddenReliabilityDB }"
          />
          <TdContent :value="rowData.scope.type" />
          <TdContent :value="rowData.scope.version" />
          <HostLink :hostname="[rowData.scope.hostname, rowData.scope.name]" />
          <TdContent :value="rowData.scope.environment" />
          <TdContent :value="rowData.scope.charset" />
          <TdContent :value="rowData.scope.memory | formatNumber('0.00')" />
          <TdContent
            :value="rowData.scope.datafileSize | formatNumber('0.00')"
          />
          <TdContent
            :value="rowData.scope.segmentSize | formatNumber('0.00')"
          />
        </template>

        <ExportButton
          slot="export"
          url="/hosts/technologies/oracle/databases"
          expName="databases"
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
import DbFilters from '@/components/databases/databases/DbFilters.vue'
import MoreInfoButtons from '@/components/common/MoreInfoButtons.vue'
import DynamicHeading from '@/components/common/Table/DynamicHeading.vue'
import databasesMoreInfo from '@/components/databases/databases/databases-more-info.json'
import databasesHead from '@/components/databases/databases/databases-head.json'

export default {
  mixins: [hostnameLinkRow, getHeadKeys],
  components: {
    FullTable,
    ExportButton,
    TdContent,
    TdIcon,
    HostLink,
    DbFilters,
    MoreInfoButtons,
    DynamicHeading
  },
  data() {
    return {
      databasesHead: databasesHead,
      databasesMoreInfo: databasesMoreInfo
    }
  },
  computed: {
    ...mapGetters(['getAllDatabases']),
    ...mapState(['moreInfoToggle'])
  }
}
</script>

<style lang="scss" scoped></style>
