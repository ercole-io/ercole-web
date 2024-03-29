<template>
  <ToggleColumns
    getPage="hypervisors"
    :leftButton="$t('common.forms.advancedFilters')"
    :rightButton="$t('common.general.sideInfo')"
    v-if="isMounted"
  >
    <HypervisorsFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </HypervisorsFilters>

    <FullTable
      slot="center"
      :placeholder="$t('menu.hypervisors')"
      :keys="keys"
      :tableData="getHypervisors"
      @clickedRow="handleClickedRow"
      isClickable
      :isLoadingTable="loadingTableStatus"
    >
      <template slot="headData">
        <v-th sortKey="name">VCenter</v-th>
        <v-th sortKey="name">{{ $t('common.collumns.clusterName') }}</v-th>
        <v-th sortKey="type">Type</v-th>
        <v-th sortKey="cpu">{{ $t('common.collumns.cores') }}</v-th>
        <v-th sortKey="sockets">{{ $t('common.collumns.socket') }}</v-th>
        <v-th sortKey="virtualizationNodes">
          {{ $t('common.collumns.physicalHost') }} - Physical Server Model Names
        </v-th>
        <v-th sortKey="vmsCount">{{ $tc('common.collumns.totalVM', 1) }}</v-th>
        <v-th sortKey="vmsErcoleAgentCount">{{
          $tc('common.collumns.totalVM', 2)
        }}</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.fetchEndpoint" class="first-col" />
        <TdContent :value="rowData.scope.name" />
        <TdContent :value="rowData.scope.type" />
        <TdContent :value="rowData.scope.cpu" />
        <TdContent :value="rowData.scope.sockets" />
        <TdArrayMore
          :value="rowData.scope.virtualizationNodes"
          v-if="rowData.scope.virtualizationNodes.length > 0"
        />
        <TdContent value="-" v-else />
        <TdContent :value="rowData.scope.vmsCount" />
        <TdContent :value="rowData.scope.vmsErcoleAgentCount" />
      </template>

      <ExportButton
        slot="export"
        url="hosts/clusters"
        expName="clusters-data"
      />
    </FullTable>
    <div slot="right">
      <BoxContent title="Cluster" border>
        <div class="is-flex" style="justify-content: space-around">
          <GhostLoading
            :isLoading="loadingTableStatus"
            setWidth="62"
            setHeight="48"
          >
            <p class="is-size-7 has-text-centered">
              {{ $t('views.hypervisors.with') }} Ercole <br />
              <span class="is-size-5 has-text-weight-medium">
                {{ getErcoleClusterCount.withErcole }}
              </span>
            </p>
          </GhostLoading>
          <GhostLoading
            :isLoading="loadingTableStatus"
            setWidth="62"
            setHeight="48"
          >
            <p class="is-size-7 has-text-centered">
              {{ $t('views.hypervisors.without') }} Ercole <br />
              <span class="is-size-5 has-text-weight-medium">
                {{ getErcoleClusterCount.withoutErcole }}
              </span>
            </p>
          </GhostLoading>
        </div>
      </BoxContent>
      <BoxContent :title="$t('views.hypervisors.typeVirt')" border>
        <GhostLoading :isLoading="loadingTableStatus" setHeight="510">
          <ColumnChart
            chartId="columnChart"
            :columnChartData="getVirtualizationChartData.finalData"
            :colors="getVirtualizationChartData.colors"
            stacked
            chartHeight="510px"
          />
        </GhostLoading>
      </BoxContent>
    </div>
  </ToggleColumns>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import techTypePrettyName from '@/mixins/techTypePrettyName.js'
import { mapActions, mapGetters } from 'vuex'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import ColumnChart from '@/components/common/charts/ColumnChart.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdArrayMore from '@/components/common/Table/TdArrayMore.vue'
import HypervisorsFilters from '@/components/hypervisors/HypervisorsFilters.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'hypervisors-page',
  mixins: [techTypePrettyName, localFiltersMixin, TooltipMixin],
  components: {
    ToggleColumns,
    BoxContent,
    FullTable,
    ExportButton,
    ColumnChart,
    TdContent,
    TdArrayMore,
    HypervisorsFilters,
    GhostLoading,
    Loading,
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
        'vmsErcoleAgentCount',
      ],
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getClusters().then(() => {
      bus.$emit('data', this.getHypervisors)
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getClusters']),
    handleClickedRow($event) {
      if ($event.length > 0) {
        const selectedRow = $event[0].name
        this.$router.push({
          name: 'cluster-details',
          params: { clustername: selectedRow },
        })
      }
    },
  },
  computed: {
    ...mapGetters([
      'getErcoleClusterCount',
      'getVirtualizationChartData',
      'getHypervisors',
      'loadingTableStatus',
    ]),
  },
}
</script>

<style lang="scss" scoped></style>
