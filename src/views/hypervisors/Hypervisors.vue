<template>
  <BaseLayoutColumns
    v-if="isMounted"
    :pageCols="[
      { colsize: '3', slotName: 'filters' },
      { colsize: '6', slotName: 'content' },
      { colsize: '3', slotName: 'side' }
    ]"
  >
    <HypervisorsFilters slot="filters" />
    <FullTable
      slot="content"
      placeholder="Search on Hypervisors"
      :keys="keys"
      :tableData="getHypervisors"
      @clickedRow="handleClickedRow"
      isClickable
    >
      <template slot="headData">
        <v-th sortKey="name">Cluster Name</v-th>
        <v-th sortKey="type">Type</v-th>
        <v-th sortKey="cpu">Core</v-th>
        <v-th sortKey="sockets">Socket</v-th>
        <v-th sortKey="virtualizationNodes">Physical Host</v-th>
        <v-th sortKey="vmsCount">Total VM</v-th>
        <v-th sortKey="vmsErcoleAgentCount">Total VM Ercole</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.name" />
        <TdContent :value="rowData.scope.type" />
        <TdContent :value="rowData.scope.cpu" />
        <TdContent :value="rowData.scope.sockets" />
        <TdContent :value="rowData.scope.virtualizationNodes" />
        <TdContent :value="rowData.scope.vmsCount" />
        <TdContent :value="rowData.scope.vmsErcoleAgentCount" />
      </template>

      <exportButton
        slot="export"
        url="hosts/clusters"
        expName="clusters-data"
      />
    </FullTable>
    <div slot="side">
      <BoxContent title="Cluster" border>
        <div class="is-flex" style="justify-content: space-around;">
          <p class="is-size-7 has-text-centered">
            With Ercole <br />
            <span class="is-size-5 has-text-weight-medium">
              {{ getErcoleClusterCount.withErcole }}
            </span>
          </p>
          <p class="is-size-7 has-text-centered">
            Without Ercole <br />
            <span class="is-size-5 has-text-weight-medium">
              {{ getErcoleClusterCount.withoutErcole }}
            </span>
          </p>
        </div>
      </BoxContent>
      <BoxContent title="Type Of Virtualization" border>
        <ColumnChart
          chartId="columnChart"
          :columnChartData="getVirtualizationChartData.finalData"
          :colors="getVirtualizationChartData.colors"
          stacked
        />
      </BoxContent>
    </div>
  </BaseLayoutColumns>
</template>

<script>
import techTypePrettyName from '@/mixins/techTypePrettyName.js'
import { mapActions, mapGetters } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import BaseLayoutColumns from '@/components/common/BaseLayoutColumns.vue'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import ColumnChart from '@/components/common/charts/ColumnChart.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import HypervisorsFilters from '@/components/hypervisors/HypervisorsFilters.vue'

export default {
  mixins: [techTypePrettyName, localFiltersMixin],
  components: {
    BaseLayoutColumns,
    BoxContent,
    FullTable,
    exportButton,
    ColumnChart,
    TdContent,
    HypervisorsFilters
  },
  data() {
    return {
      keys: [
        'name',
        'cpu',
        'type',
        'sockets',
        'virtualizationNodes',
        'vmsCount',
        'vmsErcoleAgentCount'
      ],
      isMounted: false
    }
  },
  async beforeMount() {
    await this.getClusters().then(() => (this.isMounted = true))
  },
  methods: {
    ...mapActions(['getClusters']),
    handleClickedRow($event) {
      if ($event.length > 0) {
        const selectedRow = $event[0].name
        this.$router.push({
          name: 'cluster-details',
          params: { clustername: selectedRow }
        })
      }
    }
  },
  computed: {
    ...mapGetters([
      'getErcoleClusterCount',
      'getVirtualizationChartData',
      'getHypervisors'
    ])
  }
}
</script>

<style lang="scss" scoped></style>
