<template>
  <section>
    <ClusterFilters v-if="isMounted" />

    <boxContent>
      <div class="columns">
        <div class="column is-3">
          <div class="columns">
            <div class="column is-12">
              <BoxContent :title="`Cluster: ${clustername}`" border>
                <div class="is-flex" style="justify-content: space-around;">
                  <p class="is-size-7 has-text-centered">
                    Type <br />
                    <span class="is-size-5 has-text-weight-medium">
                      {{ getTechTypePrettyName(getCurrentCluster.Type) || '-' }}
                    </span>
                  </p>
                  <p class="is-size-7 has-text-centered">
                    Physical Host <br />
                    <span class="is-size-5 has-text-weight-medium">
                      {{ getCurrentCluster.VirtualizationNodesCount || '-' }}
                    </span>
                  </p>
                </div>
              </BoxContent>
            </div>
          </div>
          <div class="columns">
            <div class="column is-12">
              <BoxContent>
                <div class="is-flex" style="justify-content: space-around;">
                  <p class="is-size-7 has-text-centered">
                    CPU <br />
                    <span class="is-size-5 has-text-weight-medium">
                      {{ getCurrentCluster.CPU || '-' }}
                    </span>
                  </p>
                  <p class="is-size-7 has-text-centered">
                    Sockets <br />
                    <span class="is-size-5 has-text-weight-medium">
                      {{ getCurrentCluster.Sockets || '-' }}
                    </span>
                  </p>
                </div>
              </BoxContent>
            </div>
          </div>
          <div class="columns">
            <div class="column is-12">
              <BarChart
                chartId="barChart"
                :barChartData="getClusterChartData"
                stacked
              />
            </div>
          </div>
        </div>

        <div class="column is-9">
          <FullTable
            placeholder="Search on Cluster"
            :keys="keys"
            :tableData="getCurrentClusterVms"
            :clickedRow="() => []"
          >
            <DrawerButton slot="customTopHeader" tooltipText="More Filters" />

            <template slot="headData">
              <v-th sortKey="virtualizationNode">Physical Host</v-th>
              <v-th sortKey="hostname">Hostname</v-th>
              <v-th sortKey="name">VM Name</v-th>
              <v-th sortKey="cappedCPU">Capped CPU</v-th>
            </template>

            <template slot="bodyData" slot-scope="rowData">
              <TdContent :value="rowData.scope.VirtualizationNode" />
              <HostLink :hostname="rowData.scope.Hostname" />
              <TdContent :value="rowData.scope.Name" />
              <TdIcon :value="bindIcon(rowData.scope.CappedCPU)" />
            </template>
          </FullTable>
        </div>
      </div>
    </boxContent>
  </section>
</template>

<script>
import techTypePrettyName from '@/mixins/techTypePrettyName.js'
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import { mapBooleanIcon } from '@/helpers/helpers.js'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
// import exportButton from '@/components/common/exportButton.vue'
import BarChart from '@/components/common/charts/BarChart.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import DrawerButton from '@/components/common/DrawerButton.vue'
import ClusterFilters from '@/components/hypervisors/ClusterFilters.vue'

export default {
  mixins: [techTypePrettyName, localFiltersMixin],
  props: ['clustername'],
  components: {
    BoxContent,
    FullTable,
    // exportButton,
    BarChart,
    TdContent,
    HostLink,
    TdIcon,
    DrawerButton,
    ClusterFilters
  },
  data() {
    return {
      keys: ['virtualizationNode', 'name', 'hostname', 'cappedCPU'],
      isMounted: false
    }
  },
  async beforeMount() {
    await this.getClusterByName(this.clustername).then(
      () => (this.isMounted = true)
    )
    bus.$emit('dynamicTitle', this.clustername)
  },
  methods: {
    ...mapActions(['getClusterByName']),
    bindIcon(value) {
      return mapBooleanIcon(value)
    }
  },
  computed: {
    ...mapGetters([
      'getClusterChartData',
      'getCurrentCluster',
      'getCurrentClusterVms'
    ])
  }
}
</script>

<style lang="scss" scoped></style>
