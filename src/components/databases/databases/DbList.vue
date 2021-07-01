<template>
  <div class="columns">
    <div class="column is-4">
      <ButtonGroup :groupTitle="`${$t('common.general.moreInfo')}`">
        <b-button
          class="mr-1"
          size="is-small"
          :type="hideReliability ? 'is-light' : 'is-light reliability'"
          @click="hideReliability = !hideReliability"
        >
          {{ $t('common.collumns.reliability') }}
        </b-button>
      </ButtonGroup>
      <DbFilters />
    </div>
    <div class="column is-8">
      <FullTable
        placeholder="Databases"
        :keys="keys"
        :tableData="getAllDatabases"
        @clickedRow="handleClickedRow"
        isClickable
      >
        <template slot="headData">
          <v-th sortKey="name">{{ $t('common.collumns.name') }}</v-th>
          <v-th
            sortKey="archivelog"
            class="reliability"
            :class="{ hide: hideReliability }"
            >{{ $t('common.collumns.archivelog') }}</v-th
          >
          <v-th
            sortKey="dataguard"
            class="reliability"
            :class="{ hide: hideReliability }"
            >{{ $t('common.collumns.disasterRecovery') }}</v-th
          >
          <v-th
            sortKey="ha"
            class="reliability"
            :class="{ hide: hideReliability }"
            >{{ $t('common.collumns.highAvailability') }}</v-th
          >
          <v-th sortKey="type">{{ $t('common.collumns.type') }}</v-th>
          <v-th sortKey="version">{{ $t('common.collumns.version') }}</v-th>
          <v-th sortKey="hostname">{{ $t('common.collumns.hostname') }}</v-th>
          <v-th sortKey="environment">{{
            $t('common.collumns.environment')
          }}</v-th>
          <v-th sortKey="charset">{{ $t('common.collumns.charset') }}</v-th>
          <v-th sortKey="memory">{{ $t('common.collumns.memory') }}</v-th>
          <v-th sortKey="datafileSize">{{
            $t('common.collumns.datafileSize')
          }}</v-th>
          <v-th sortKey="segmentSize">{{
            $t('common.collumns.segmentSize')
          }}</v-th>
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
          <TdContent
            :value="rowData.scope.datafileSize | formatNumber('0.00')"
          />
          <TdContent
            :value="rowData.scope.segmentSize | formatNumber('0.00')"
          />
        </template>

        <ExportButton
          slot="export"
          url="hosts/technologies/oracle/databases"
          expName="databases"
        />
      </FullTable>
    </div>
  </div>
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
import DbFilters from '@/components/databases/databases/DbFilters.vue'

export default {
  mixins: [hostnameLinkRow],
  components: {
    FullTable,
    ExportButton,
    TdContent,
    TdIcon,
    HostLink,
    ButtonGroup,
    DbFilters
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
