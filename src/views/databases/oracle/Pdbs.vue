<template>
  <BoxContent
    title="Pluggable Databases"
    border
    hasShadow
    :mbottom="false"
    customStyle="padding-left: 1rem"
  >
    <CustomSelect
      v-model="selectedHost"
      :options="getOracleHostsPdbs"
      :hasReset="false"
      style="width: 15%"
    />

    <!-- {{ getOraclePdbs(selectedHost) }} -->
    <FullTable
      :tableData="getOraclePdbs(selectedHost)"
      :keys="['name', 'status', 'allocable', 'datafileSize', 'segmentsSize']"
      :isLoadingTable="false"
    >
      <template slot="headData">
        <v-th sortKey="name">PDB Name</v-th>
        <v-th sortKey="status">Status</v-th>
        <v-th sortKey="allocable">Allocable</v-th>
        <v-th sortKey="datafileSize">DatafileSize</v-th>
        <v-th sortKey="segmentsSize">SegmentsSize</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.name" />
        <TdContent :value="rowData.scope.status" />
        <TdContent :value="rowData.scope.allocable" />
        <TdContent :value="rowData.scope.datafileSize" />
        <TdContent :value="rowData.scope.segmentsSize" />
      </template>
    </FullTable>

    <!-- <FullTable :tableData="getOraclePdbs(selectedHost)" sortField="name">
      <template slot="cols">
        <b-table-column
          field="name"
          label="PDB Name"
          centered
          sortable
          v-slot="props"
        >
          <span
            v-tooltip="options(props.row.name)"
            v-html="highlight(props.row.name)"
          />
        </b-table-column>
      </template>
    </FullTable> -->
  </BoxContent>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import BoxContent from '@/components/common/BoxContent.vue'
import CustomSelect from '@/components/common/Form/CustomSelect.vue'
// import FullTable from '@/components/common/Table/buefy/FullTable.vue'

import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
// import TdIcon from '@/components/common/Table/TDIcon.vue'
// import NoContent from '@/components/common/NoContent.vue'
// import RangeDates from '@/components/common/RangeDates.vue'
// import DbGrowth from '@/components/common/DbGrowth.vue'

export default {
  name: 'oracle-databases-pdbs-page',
  mixins: [TooltipMixin, HighlightSearchMixin],
  components: {
    BoxContent,
    CustomSelect,
    FullTable,
    // FullTable,
    TdContent,
    // TdIcon,
    // NoContent,
    // RangeDates,
    // DbGrowth,
  },
  data() {
    return {
      isMounted: false,
      selectedHost: '',
    }
  },
  async beforeMount() {
    await this.getPdbs()
      .then(async () => {
        this.selectedHost = this.getOracleHostsPdbs[0]
        // this.getPdbsByHostDbGrothData(this.selectedHost)
      })
      .then(() => {
        this.isMounted = true
      })
  },
  methods: {
    ...mapActions(['getPdbs', 'getPdbsByHostDbGrothData']),
    ...mapMutations(['SET_RANGE_DATES_ALT']),
  },
  computed: {
    ...mapGetters([
      'getOracleHostsPdbs',
      'getOraclePdbs',
      'getOraclePdbsDbGrowth',
      'loadingTableStatus',
    ]),
  },
}
</script>

<style lang="scss" scoped></style>
