<template>
  <section>
    <b-sidebar
      type="is-white"
      :fullheight="true"
      :fullwidth="false"
      :overlay="false"
      :right="true"
      position="absolute"
      v-model="isOpenFilters"
    >
      <div
        style="padding: 100px 20px 60px 20px; border-left: 5px solid #679189; height: 100%; position: relative;"
      >
        <b-button
          size="is-small"
          type="is-dark"
          inverted
          icon-pack="fas"
          icon-right="times"
          style="position: absolute; top: 90px; right: 5px;"
          @click="isOpenFilters = false"
        />
        <BoxContent title="Cluster Filters" class="mt-5">
          <form @submit.prevent="applyFilterCluster">
            <b-field label="Physical Host" custom-class="is-small">
              <b-autocomplete
                v-model="clusterFilters.virtualizationNode"
                size="is-small"
                type="number"
                clearable
                :data="filteredPhysicalHosts"
                @typing="
                  getFilteredClusterAutocomplete($event, 'virtualizationNode')
                "
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
                @typing="getFilteredClusterAutocomplete($event, 'hostname')"
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
                @typing="getFilteredClusterAutocomplete($event, 'name')"
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
              <b-button type="is-danger" size="is-small" @click="cancelFilters">
                Cancel
              </b-button>
              <b-button type="is-primary" size="is-small" native-type="submit">
                Apply
              </b-button>
            </div>
          </form>
        </BoxContent>
      </div>
    </b-sidebar>
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
            <b-button
              v-tooltip="options('More Filters')"
              slot="customTopHeader"
              type="is-primary"
              icon-pack="fas"
              icon-right="filter"
              size="is-small"
              @click="isOpenFilters = !isOpenFilters"
              style="margin-right: auto; margin-left: 10px;"
            />

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
import _ from 'lodash'
import techTypePrettyName from '@/mixins/techTypePrettyName.js'
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import { mapBooleanIcon } from '@/helpers/helpers.js'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import BarChart from '@/components/common/charts/BarChart.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import TooltipMixin from '@/mixins/tooltipMixin.js'

export default {
  mixins: [techTypePrettyName, TooltipMixin],
  props: ['clustername'],
  components: {
    BoxContent,
    FullTable,
    exportButton,
    BarChart,
    TdContent,
    HostLink,
    TdIcon
  },
  data() {
    return {
      keys: ['virtualizationNode', 'name', 'hostname', 'cappedCPU'],
      isOpenFilters: false,
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

    this.filteredPhysicalHosts = this.clusterFiltersAutocomplete(
      'virtualizationNode'
    )
    this.filteredHostnames = this.clusterFiltersAutocomplete('hostname')
    this.filteredVMname = this.clusterFiltersAutocomplete('name')
  },
  methods: {
    ...mapActions(['getClusterByName']),
    applyFilterCluster() {
      const organizeFilters = _.pickBy(this.clusterFilters, _.identity)

      const filtersToApply = []
      _.forEach(organizeFilters, (val, key) => {
        filtersToApply.push({
          Field: key,
          Values: [val]
        })
      })

      this.$store.commit('SET_CLUSTER_FILTERS', {
        status: true,
        filters: filtersToApply
      })
    },
    cancelFilters() {
      this.clusterFilters = {
        cappedCPU: ''
      }
      this.$store.commit('SET_CLUSTER_FILTERS', {
        status: false,
        filters: []
      })
    },
    getFilteredClusterAutocomplete(text, toFilter) {
      const filtered = this.clusterFiltersAutocomplete(toFilter).filter(
        option => {
          return option.toString().indexOf(text) >= 0
        }
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
      'getCurrentClusterVms',
      'clusterFiltersAutocomplete'
    ])
  }
}
</script>

<style lang="scss" scoped></style>
