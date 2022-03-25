<template>
  <ToggleColumns
    getPage="clusters"
    :leftButton="$t('common.forms.advancedFilters')"
    :rightButton="$t('common.general.sideInfo')"
    v-if="isMounted"
  >
    <ClusterFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </ClusterFilters>

    <FullTable
      slot="center"
      :placeholder="$t('menu.clusters')"
      :keys="keys"
      :tableData="getCurrentClusterVms"
      @clickedRow="handleClickedRow"
      isClickable
      :isLoadingTable="loadingTableStatus"
    >
      <template slot="headData">
        <v-th sortKey="virtualizationNode">{{
          $t('common.collumns.physicalHost')
        }}</v-th>
        <v-th sortKey="hostname">{{ $t('common.collumns.hostname') }}</v-th>
        <v-th sortKey="name">{{ $t('common.collumns.vmName') }}</v-th>
        <v-th sortKey="cappedCPU">{{ $t('common.collumns.cappedCpu') }}</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.virtualizationNode" />
        <HostLink :hostname="rowData.scope.hostname" />
        <TdContent :value="rowData.scope.name" />
        <TdIcon
          :value="rowData.scope.cappedCPU"
          @click.native="handleClickedRow([rowData.scope])"
        />
      </template>

      <ExportButton
        slot="export"
        :url="`hosts/clusters/${clustername}`"
        :expName="`cluster-${clustername}-data`"
      />
    </FullTable>
    <div slot="right">
      <BoxContent :title="`Cluster: ${clustername}`" border>
        <div class="is-flex" style="justify-content: space-around">
          <GhostLoading
            :isLoading="loadingTableStatus"
            setWidth="62"
            setHeight="48"
          >
            <p class="is-size-7 has-text-centered">
              {{ $t('views.hypervisors.type') }} <br />
              <span class="is-size-5 has-text-weight-medium">
                {{ getTechTypePrettyName(getCurrentCluster.type) || '-' }}
              </span>
            </p>
          </GhostLoading>
          <GhostLoading
            :isLoading="loadingTableStatus"
            setWidth="62"
            setHeight="48"
          >
            <p class="is-size-7 has-text-centered">
              {{ $t('views.hypervisors.physicalHost') }} <br />
              <span class="is-size-5 has-text-weight-medium">
                {{ getCurrentCluster.virtualizationNodesCount || '-' }}
              </span>
            </p>
          </GhostLoading>
        </div>
      </BoxContent>
      <BoxContent>
        <div class="is-flex" style="justify-content: space-around">
          <GhostLoading
            :isLoading="loadingTableStatus"
            setWidth="62"
            setHeight="48"
          >
            <p class="is-size-7 has-text-centered">
              Cores <br />
              <span class="is-size-5 has-text-weight-medium">
                {{ getCurrentCluster.cpu || '-' }}
              </span>
            </p>
          </GhostLoading>
          <GhostLoading
            :isLoading="loadingTableStatus"
            setWidth="62"
            setHeight="48"
          >
            <p class="is-size-7 has-text-centered">
              Sockets <br />
              <span class="is-size-5 has-text-weight-medium">
                {{ getCurrentCluster.sockets || '-' }}
              </span>
            </p>
          </GhostLoading>
        </div>
      </BoxContent>
      <GhostLoading :isLoading="loadingTableStatus" setHeight="300">
        <BarChart
          chartId="barChart"
          :barChartData="getClusterChartData"
          stacked
        />
      </GhostLoading>
    </div>
  </ToggleColumns>
</template>

<script>
import techTypePrettyName from '@/mixins/techTypePrettyName.js'
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import BarChart from '@/components/common/charts/BarChart.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import ClusterFilters from '@/components/hypervisors/ClusterFilters.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  mixins: [techTypePrettyName, localFiltersMixin, hostnameLinkRow],
  props: ['clustername'],
  components: {
    ToggleColumns,
    BoxContent,
    FullTable,
    ExportButton,
    BarChart,
    TdContent,
    HostLink,
    TdIcon,
    ClusterFilters,
    GhostLoading,
    Loading,
  },
  data() {
    return {
      keys: ['virtualizationNode', 'name', 'hostname', 'cappedCPU'],
      isMounted: false,
      chartHeight: 100,
    }
  },
  async beforeMount() {
    await this.getClusterByName(this.clustername).then(() => {
      bus.$emit('data', this.getCurrentClusterVms)
    })
    bus.$emit('dynamicTitle', this.clustername)
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getClusterByName']),
  },
  computed: {
    ...mapGetters([
      'getClusterChartData',
      'getCurrentCluster',
      'getCurrentClusterVms',
      'loadingTableStatus',
    ]),
  },
}
</script>

<style lang="scss" scoped></style>
