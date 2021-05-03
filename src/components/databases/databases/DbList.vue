<template>
  <section>
    <ButtonGroup
      groupTitle="Show more info:"
      hAlign="is-justify-content-flex-start"
    >
      <b-button
        class="mr-1"
        size="is-small"
        :type="hideReliability ? 'is-light' : 'is-light reliability'"
        @click="hideReliability = !hideReliability"
      >
        Reliability
      </b-button>
    </ButtonGroup>
    <FullTable
      placeholder="Search on Databases"
      :keys="keys"
      :tableData="getAllDatabases"
      @clickedRow="handleClickedRow"
      isClickable
    >
      <template slot="headData">
        <v-th sortKey="name">DB Name</v-th>
        <v-th
          sortKey="archivelog"
          class="reliability"
          :class="{ hide: hideReliability }"
          >Archivelog Mode</v-th
        >
        <v-th
          sortKey="dataguard"
          class="reliability"
          :class="{ hide: hideReliability }"
          >DR</v-th
        >
        <v-th
          sortKey="ha"
          class="reliability"
          :class="{ hide: hideReliability }"
          >HA</v-th
        >
        <v-th sortKey="type">DB Type</v-th>
        <v-th sortKey="version">DB Version</v-th>
        <v-th sortKey="hostname">Hostname</v-th>
        <v-th sortKey="environment">Env.</v-th>
        <v-th sortKey="charset">Charset</v-th>
        <v-th sortKey="memory">Memory (GB)</v-th>
        <v-th sortKey="datafileSize">Datafile Size (GB)</v-th>
        <v-th sortKey="segmentSize">Segment Size (GB)</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.name" />
        <TdIcon
          :value="rowData.scope.archivelog"
          :class="{ hide: hideReliability }"
        />
        <TdIcon
          :value="rowData.scope.disasterRecovery"
          :class="{ hide: hideReliability }"
        />
        <TdIcon
          :value="rowData.scope.highAvailability"
          :class="{ hide: hideReliability }"
        />
        <TdContent :value="rowData.scope.type" />
        <TdContent :value="rowData.scope.version" />
        <HostLink :hostname="[rowData.scope.hostname, rowData.scope.name]" />
        <TdContent :value="rowData.scope.environment" />
        <TdContent :value="rowData.scope.charset" />
        <TdContent :value="rowData.scope.memory | formatNumber('0.00')" />
        <TdContent :value="rowData.scope.datafileSize | formatNumber('0.00')" />
        <TdContent :value="rowData.scope.segmentSize | formatNumber('0.00')" />
      </template>

      <ExportButton
        slot="export"
        url="hosts/technologies/oracle/databases"
        expName="databases"
      />
    </FullTable>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import ExportButton from '@/components/common/exportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import ButtonGroup from '@/components/common/ButtonGroup.vue'

export default {
  mixins: [hostnameLinkRow],
  components: {
    FullTable,
    ExportButton,
    TdContent,
    TdIcon,
    HostLink,
    ButtonGroup
  },
  data() {
    return {
      keys: [
        'name',
        'type',
        'version',
        'hostname',
        'environment',
        'charset',
        'memory',
        'datafileSize',
        'segmentSize',
        'archivelog',
        'disasterRecovery',
        'highAvailability'
      ],
      hideReliability: true
    }
  },
  computed: {
    ...mapGetters(['getAllDatabases'])
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
</style>
