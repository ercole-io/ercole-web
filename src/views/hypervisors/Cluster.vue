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
      @clickedRow="checkIfErcoleIsInstalled"
      isClickable
      :isLoadingTable="loadingTableStatus"
    >
      <template slot="headData">
        <v-th sortKey="virtualizationNode">
          {{ $t('common.collumns.physicalHost') }}
        </v-th>
        <v-th sortKey="hostname">{{ $t('common.collumns.hostname') }}</v-th>
        <v-th sortKey="name">{{ $t('common.collumns.vmName') }}</v-th>
        <v-th sortKey="physicalServerModelName">
          Physical Server Model Name
        </v-th>
        <v-th sortKey="cappedCPU">{{ $t('common.collumns.cappedCpu') }}</v-th>
        <v-th sortKey="isErcoleInstalled"> Ercole Installed? </v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent
          :value="rowData.scope.virtualizationNode"
          class="first-col"
        />
        <HostLink
          :hostname="rowData.scope.hostname"
          v-if="rowData.scope.isErcoleInstalled"
        />
        <TdContent :value="rowData.scope.hostname" v-else />
        <TdContent :value="rowData.scope.name" />
        <TdContent :value="rowData.scope.physicalServerModelName" />
        <TdIcon
          :value="rowData.scope.cappedCPU"
          @click.native="checkIfErcoleIsInstalled([rowData.scope])"
        />
        <TdIcon
          :value="rowData.scope.isErcoleInstalled"
          @click.native="checkIfErcoleIsInstalled([rowData.scope])"
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
      <GhostLoading :isLoading="loadingTableStatus" setHeight="485">
        <BarChart
          chartId="barChart"
          :barChartData="getClusterChartData"
          stacked
          chartHeight="485px"
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
  name: 'cluster-page',
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
      keys: [
        'virtualizationNode',
        'name',
        'hostname',
        'cappedCPU',
        'isErcoleInstalled',
      ],
      isMounted: false,
      chartHeight: 100,
    }
  },
  async beforeMount() {
    await this.getClusterByName(this.clustername).then(() => {
      bus.$emit('data', this.getCurrentClusterVms)
    })

    this.getClusterNames()

    bus.$emit('dynamicTitle', this.clustername)
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getClusterByName', 'getClusterNames']),
    checkIfErcoleIsInstalled(data) {
      if (data[0] && data[0].isErcoleInstalled) {
        this.handleClickedRow(data)
      } else {
        return null
      }
    },
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
