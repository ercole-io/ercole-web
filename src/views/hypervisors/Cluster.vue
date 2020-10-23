<template>
  <section>
    <DrawerFilters title="Cluster Filters">
      <form @submit.prevent="applyFilters">
        <b-field label="Physical Host" custom-class="is-small">
          <b-autocomplete
            v-model="clusterFilters.virtualizationNode"
            size="is-small"
            type="number"
            clearable
            :data="filteredvirtualizationNode"
            @typing="setFilteredAutocomplete($event, 'virtualizationNode')"
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
            :data="filteredhostname"
            @typing="setFilteredAutocomplete($event, 'hostname')"
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
            :data="filteredname"
            @typing="setFilteredAutocomplete($event, 'name')"
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
    </DrawerFilters>

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
import { mapBooleanIcon, returnAutocompleteData } from '@/helpers/helpers.js'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import BarChart from '@/components/common/charts/BarChart.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import DrawerButton from '@/components/common/DrawerButton.vue'
import DrawerFilters from '@/components/common/DrawerFilters.vue'

export default {
  mixins: [techTypePrettyName, localFiltersMixin],
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
    DrawerFilters
  },
  data() {
    return {
      keys: ['virtualizationNode', 'name', 'hostname', 'cappedCPU'],
      clusterFilters: {
        cappedCPU: ''
      },
      filteredvirtualizationNode: [],
      filteredhostname: [],
      filteredname: []
    }
  },
  async beforeMount() {
    await this.getClusterByName(this.clustername)
    bus.$emit('dynamicTitle', this.clustername)

    this.setAutocompleteData('virtualizationNode', this.getCurrentClusterVms)
    this.setAutocompleteData('hostname', this.getCurrentClusterVms)
    this.setAutocompleteData('name', this.getCurrentClusterVms)
  },
  methods: {
    ...mapActions(['getClusterByName']),
    applyFilters() {
      this.apply(this.clusterFilters)
    },
    resetFilters() {
      this.reset()
      this.clusterFilters = {
        cappedCPU: ''
      }
    },
    setFilteredAutocomplete(text, toFilter) {
      const autocomplete = returnAutocompleteData(
        text,
        this.getCurrentClusterVms,
        toFilter
      )

      switch (toFilter) {
        case 'virtualizationNode':
          this.filteredvirtualizationNode = autocomplete
          break
        case 'hostname':
          this.filteredhostname = autocomplete
          break
        case 'name':
          this.filteredname = autocomplete
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
