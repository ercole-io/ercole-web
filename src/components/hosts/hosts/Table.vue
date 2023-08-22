<template>
  <FullTable
    :tableData="getAllHosts"
    sortField="hostname"
    :fnCallback="() => getHosts()"
    hasExportButton
    :exportInfo="['hosts', 'hosts-data']"
    hasRefreshButton
    :refreshButtonAction="updateHosts"
    :rowClick="handleSimpleClickRow"
    hasMoreInfo
    :moreInfoItems="hostsMoreInfo"
  >
    <template slot="cols">
      <b-table-column
        field="hostname"
        label="Hostname"
        sortable
        v-slot="props"
        cell-class="first-col"
        width="250"
      >
        <b-icon
          v-if="props.row.obsolete"
          size="is-medium"
          custom-size="mdi-18px"
          icon="alert"
          type="is-warning"
          v-tooltip="options(props.row.obsoleteDiff)"
        />
        <b-icon
          v-if="props.row.isMissingDb"
          size="is-medium"
          custom-size="mdi-18px"
          icon="database"
          type="is-danger"
          v-tooltip="options('Missing Databases')"
        />
        <span
          v-tooltip="options(props.row.hostname)"
          v-html="highlight(props.row.hostname)"
        />
      </b-table-column>
      <b-table-column
        field="platform"
        label="Platform"
        centered
        v-slot="props"
        header-class="color-1"
        :visible="!moreInfoToggle.hiddenVirtual"
      >
        <span
          v-tooltip="options(props.row.platform)"
          v-html="highlight(props.row.platform)"
        />
      </b-table-column>
      <b-table-column
        field="cluster"
        label="Cluster"
        centered
        v-slot="props"
        header-class="color-1"
        :visible="!moreInfoToggle.hiddenVirtual"
      >
        <TdArrayMore
          v-if="props.row.cluster.length > 5"
          :value="props.row.cluster"
          noTD
        />
        <TdArrayMore v-else :value="props.row.cluster" noTD />
      </b-table-column>
      <b-table-column
        field="virtNode"
        label="Node"
        centered
        v-slot="props"
        header-class="color-1"
        :visible="!moreInfoToggle.hiddenVirtual"
      >
        <span
          v-tooltip="options(props.row.virtNode)"
          v-html="highlight(props.row.virtNode)"
        />
      </b-table-column>
      <b-table-column
        field="model"
        label="Model"
        centered
        v-slot="props"
        header-class="color-2"
        :visible="!moreInfoToggle.hiddenCpu"
      >
        <span
          v-tooltip="options(props.row.model)"
          v-html="highlight(props.row.model)"
        />
      </b-table-column>
      <b-table-column
        field="threads"
        label="Threads"
        centered
        v-slot="props"
        header-class="color-2"
        :visible="!moreInfoToggle.hiddenCpu"
      >
        <span
          v-tooltip="options(props.row.threads)"
          v-html="highlight(props.row.threads)"
        />
      </b-table-column>
      <b-table-column
        field="cores"
        label="Cores"
        centered
        v-slot="props"
        header-class="color-2"
        :visible="!moreInfoToggle.hiddenCpu"
      >
        <span
          v-tooltip="options(props.row.cores)"
          v-html="highlight(props.row.cores)"
        />
      </b-table-column>
      <b-table-column
        field="socket"
        label="Socket"
        centered
        v-slot="props"
        header-class="color-2"
        :visible="!moreInfoToggle.hiddenCpu"
      >
        <span
          v-tooltip="options(props.row.socket)"
          v-html="highlight(props.row.socket)"
        />
      </b-table-column>
      <b-table-column
        field="version"
        label="Version"
        centered
        v-slot="props"
        header-class="color-3"
        :visible="!moreInfoToggle.hiddenAgent"
      >
        <span
          v-tooltip="options(props.row.version)"
          v-html="highlight(props.row.version)"
        />
      </b-table-column>
      <b-table-column
        field="updated"
        label="Updated"
        centered
        v-slot="props"
        header-class="color-3"
        :visible="!moreInfoToggle.hiddenAgent"
      >
        <b-icon
          v-if="props.row.obsolete"
          size="is-medium"
          custom-size="mdi-18px"
          icon="alert"
          type="is-warning"
          v-tooltip="options(props.row.obsoleteDiff)"
        />
        <span
          v-tooltip="options(setFormatDateTime(props.row.updated))"
          v-html="highlight(setFormatDateTime(props.row.updated))"
        />
      </b-table-column>
      <b-table-column
        field="environment"
        label="Environment"
        centered
        v-slot="props"
      >
        <span
          v-tooltip="options(props.row.environment)"
          v-html="highlight(props.row.environment)"
        />
      </b-table-column>
      <b-table-column
        field="databases"
        label="Databases"
        centered
        v-slot="props"
      >
        <TdArrayMore
          v-if="props.row.databases.length > 5"
          :value="props.row.databases"
          noTD
        />
        <TdArrayMore v-else :value="props.row.databases" noTD />
      </b-table-column>
      <b-table-column
        field="techType"
        label="Technology"
        centered
        v-slot="props"
      >
        <span
          v-tooltip="options(props.row.techType)"
          v-html="highlight(props.row.techType)"
        />
      </b-table-column>
      <b-table-column
        field="os"
        label="Operating System"
        centered
        v-slot="props"
      >
        <span
          v-tooltip="options(props.row.os)"
          v-html="highlight(props.row.os)"
        />
      </b-table-column>
      <b-table-column field="iconCluster" label="Clust" centered v-slot="props">
        <TdIcon :value="props.row.iconCluster" noTd />
      </b-table-column>
      <b-table-column field="kernel" label="Kernel" centered v-slot="props">
        <span
          v-tooltip="options(props.row.kernel)"
          v-html="highlight(props.row.kernel)"
        />
      </b-table-column>
      <b-table-column
        field="memorytotal"
        label="Memory"
        centered
        v-slot="props"
      >
        <span
          v-tooltip="options(props.row.memorytotal)"
          v-html="highlight(props.row.memorytotal)"
        />
      </b-table-column>
      <b-table-column field="swaptotal" label="Swap" centered v-slot="props">
        <span
          v-tooltip="options(props.row.swaptotal)"
          v-html="highlight(props.row.swaptotal)"
        />
      </b-table-column>
    </template>

    <ExportButton
      url="hosts"
      expName="hosts-lms-data"
      :text="`${$t('common.general.exportLms')}`"
      type="LMS"
      slot="extra-export"
    />
  </FullTable>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import hostnameLinkRowMixin from '@/mixins/hostnameLinkRow.js'
import formatDateTime from '@/filters/formatDateTime.js'
import hostsMoreInfo from '@/views/hosts/hosts-more-info.json'
import FullTable from '@/components/common/Table/buefy/FullTable.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import TdArrayMore from '@/components/common/Table/TdArrayMore.vue'
import ExportButton from '@/components/common/ExportButton.vue'

export default {
  name: 'hosts-table-component',
  mixins: [TooltipMixin, HighlightSearchMixin, hostnameLinkRowMixin],
  components: {
    FullTable,
    TdIcon,
    TdArrayMore,
    ExportButton,
  },
  data() {
    return {
      hostsMoreInfo: hostsMoreInfo,
    }
  },
  methods: {
    ...mapActions(['getHosts']),
    ...mapMutations(['SET_PAGE_NUM']),
    updateHosts() {
      this.SET_PAGE_NUM(1)
      this.getHosts()
    },
    setFormatDateTime(val) {
      return formatDateTime(val)
    },
  },
  computed: {
    ...mapGetters(['getAllHosts', 'loadingTableStatus']),
    ...mapState(['moreInfoToggle']),
  },
}
</script>

<style lang="scss" scoped></style>
