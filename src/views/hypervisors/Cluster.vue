<template>
  <section>
    <DrawerRight>
      <BoxContent slot="drawer-content" title="Cluster Filters" class="mt-5">
        <form @submit.prevent="applyFilters">
          <b-field label="Physical Host" custom-class="is-small">
            <b-autocomplete
              v-model="clusterFilters.virtualizationNode"
              size="is-small"
              type="number"
              clearable
              :data="filteredPhysicalHosts"
              @typing="getAutocompleteData($event, 'virtualizationNode')"
              :open-on-focus="true"
            >
              <template slot="empty">No results found</template>
            </b-autocomplete>
          </b-field>

          <b-field label="Hostname" custom-class="is-small">
            <b-autocomplete
              v-model="clusterFilters.hostname"
              size="is-small"
              type="number"
              clearable
              :data="filteredHostnames"
              @typing="getAutocompleteData($event, 'hostname')"
              :open-on-focus="true"
            >
              <template slot="empty">No results found</template>
            </b-autocomplete>
          </b-field>

          <b-field label="VM Name" custom-class="is-small">
            <b-autocomplete
              v-model="clusterFilters.name"
              size="is-small"
              type="number"
              clearable
              :data="filteredVMname"
              @typing="getAutocompleteData($event, 'name')"
              :open-on-focus="true"
            >
              <template slot="empty">No results found</template>
            </b-autocomplete>
          </b-field>

          <b-field label="Capped CPU" custom-class="is-small">
            <div class="is-flex" style="justify-content: space-around;">
              <b-radio
                size="is-small"
                v-model="clusterFilters.cappedCPU"
                :native-value="true"
              >
                Yes
              </b-radio>
              <b-radio
                size="is-small"
                v-model="clusterFilters.cappedCPU"
                :native-value="false"
              >
                No
              </b-radio>
              <b-radio
                size="is-small"
                v-model="clusterFilters.cappedCPU"
                native-value=""
              >
                All
              </b-radio>
            </div>
          </b-field>

          <div
            class="buttons is-flex mt-5"
            style="justify-content: space-between;"
          >
            <b-button type="is-danger" size="is-small" @click="resetFilters">
              Reset
            </b-button>
            <b-button type="is-primary" size="is-small" native-type="submit">
              Apply
            </b-button>
          </div>
        </form>
      </BoxContent>
    </DrawerRight>

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
                      {{ getTechTypePrettyName(getCurrentCluster.type) }}
                    </span>
                  </p>
                  <p class="is-size-7 has-text-centered">
                    Physical Host <br />
                    <span class="is-size-5 has-text-weight-medium">
                      {{ getCurrentCluster.virtualizationNodesCount }}
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
                      {{ getCurrentCluster.cpu }}
                    </span>
                  </p>
                  <p class="is-size-7 has-text-centered">
                    Sockets <br />
                    <span class="is-size-5 has-text-weight-medium">
                      {{ getCurrentCluster.sockets }}
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
              <TdContent :value="rowData.scope.virtualizationNode" />
              <HostLink :hostname="rowData.scope.hostname" />
              <TdContent :value="rowData.scope.name" />
              <TdIcon :value="bindIcon(rowData.scope.cappedCPU)" />
            </template>

            <exportButton
              slot="export"
              :url="`hosts/clusters/${clustername}`"
              :expName="`cluster-${clustername}`"
            />
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
import {
  mapBooleanIcon,
  organizeKeysBeforeFilter,
  returnAutocompleteData,
  prepareDataForAutocomplete
} from '@/helpers/helpers.js'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import BarChart from '@/components/common/charts/BarChart.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import DrawerButton from '@/components/common/DrawerButton.vue'
import DrawerRight from '@/components/common/DrawerRight.vue'

export default {
  mixins: [techTypePrettyName],
  props: ['clustername'],
  components: {
    BoxContent,
    FullTable,
    exportButton,
    BarChart,
    TdContent,
    HostLink,
    TdIcon,
    DrawerButton,
    DrawerRight
  },
  data() {
    return {
      keys: ['virtualizationNode', 'name', 'hostname', 'cappedCPU'],
      clusterFilters: {
        cappedCPU: ''
      },
      filteredPhysicalHosts: [],
      filteredHostnames: [],
      filteredVMname: []
    }
  },
  async beforeMount() {
    await this.getClusterByName(this.clustername)
    bus.$emit('dynamicTitle', this.clustername)

    this.filteredPhysicalHosts = prepareDataForAutocomplete(
      this.getCurrentClusterVms,
      'virtualizationNode'
    )
    this.filteredHostnames = prepareDataForAutocomplete(
      this.getCurrentClusterVms,
      'hostname'
    )
    this.filteredVMname = prepareDataForAutocomplete(
      this.getCurrentClusterVms,
      'name'
    )
  },
  methods: {
    ...mapActions(['getClusterByName']),
    applyFilters() {
      this.$store.commit('SET_CLUSTER_FILTERS', {
        status: true,
        filters: organizeKeysBeforeFilter(this.clusterFilters)
      })
    },
    resetFilters() {
      this.clusterFilters = {
        cappedCPU: ''
      }
      this.$store.commit('SET_CLUSTER_FILTERS', {
        status: false,
        filters: []
      })
    },
    getAutocompleteData(text, toFilter) {
      const filtered = returnAutocompleteData(
        text,
        this.getCurrentClusterVms,
        toFilter
      )

      switch (toFilter) {
        case 'virtualizationNode':
          this.filteredPhysicalHosts = filtered
          break
        case 'hostname':
          this.filteredHostnames = filtered
          break
        case 'name':
          this.filteredVMname = filtered
          break
        default:
          break
      }
    },
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
