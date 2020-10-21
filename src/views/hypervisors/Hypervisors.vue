<template>
  <section>
    <DrawerRight>
      <BoxContent
        slot="drawer-content"
        title="Hypervisors Filters"
        class="mt-5"
      >
        <form @submit.prevent="applyFilters">
          <b-field label="Cluster Name" custom-class="is-small">
            <b-autocomplete
              v-model="hypervisorsFilters.name"
              size="is-small"
              type="number"
              clearable
              :data="filteredClusterNames"
              @typing="getAutocompleteData($event, 'name')"
            >
              <template slot="empty">No results found</template>
            </b-autocomplete>
          </b-field>

          <b-field label="Type" custom-class="is-small">
            <b-select
              v-model="hypervisorsFilters.type"
              size="is-small"
              placeholder="Select an Type"
              expanded
            >
              <option :value="null" v-if="hypervisorsFilters.type">
                Reset
              </option>
              <option v-for="(type, index) in filteredType" :key="index">
                {{ type }}
              </option>
            </b-select>
          </b-field>

          <b-field label="Core" custom-class="is-small">
            <b-field label="Min" custom-class="small-label">
              <b-autocomplete
                class="mr-1"
                v-model="coreMin"
                size="is-small"
                :data="filteredCore"
                @typing="getAutocompleteData($event, 'cpu')"
              />
            </b-field>
            <b-field label="Max" custom-class="small-label-next">
              <b-autocomplete
                class="ml-1"
                v-model="coreMax"
                size="is-small"
                :data="filteredCore"
                @typing="getAutocompleteData($event, 'cpu')"
              />
            </b-field>
          </b-field>

          <b-field label="Socket" custom-class="is-small">
            <b-slider
              v-model="hypervisorsFilters.sockets"
              :min="socketMin"
              :max="socketMax"
            >
              <template v-for="val in filteredSocket">
                <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
              </template>
            </b-slider>
          </b-field>

          <b-field label="Physical Host" custom-class="is-small">
            <b-autocomplete
              v-model="hypervisorsFilters.virtualizationNodes"
              size="is-small"
              type="number"
              clearable
              :data="filteredPhysicalHost"
              @typing="getAutocompleteData($event, 'virtualizationNodes')"
            >
              <template slot="empty">No results found</template>
            </b-autocomplete>
          </b-field>

          <b-field label="Total VM" custom-class="is-small">
            <b-slider
              v-model="hypervisorsFilters.vmsCount"
              :min="totalVmMin"
              :max="totalVmMax"
            >
              <!-- <template v-for="val in filteredTotalVM">
                <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
              </template> -->
            </b-slider>
          </b-field>

          <b-field label="Total VM Ercole" custom-class="is-small">
            <b-slider
              v-model="hypervisorsFilters.vmsErcoleAgentCount"
              :min="ercoleVmMin"
              :max="ercoleVmMax"
            >
              <template v-for="val in filteredErcoleVM">
                <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
              </template>
            </b-slider>
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
    <BoxContent>
      <div class="columns">
        <div class="column is-3">
          <div class="columns">
            <div class="column is-12">
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
            </div>
          </div>
          <div class="columns">
            <div class="column is-12">
              <BoxContent title="Type Of Virtualization" border>
                <ColumnChart
                  chartId="columnChart"
                  :columnChartData="getVirtualizationChartData.finalData"
                  :colors="getVirtualizationChartData.colors"
                  stacked
                />
              </BoxContent>
            </div>
          </div>
        </div>

        <div class="column is-9">
          <FullTable
            placeholder="Search on Hypervisors"
            :keys="keys"
            :tableData="getHypervisors"
            @clickedRow="handleClickedRow"
            isClickable
          >
            <DrawerButton slot="customTopHeader" tooltipText="More Filters" />

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
              <TdContent :value="getTechTypePrettyName(rowData.scope.type)" />
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
        </div>
      </div>
    </BoxContent>
  </section>
</template>

<script>
import _ from 'lodash'
import techTypePrettyName from '@/mixins/techTypePrettyName.js'
import { mapActions, mapGetters } from 'vuex'
import {
  organizeKeysBeforeFilter,
  returnAutocompleteData,
  prepareDataForAutocomplete
} from '@/helpers/helpers.js'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import ColumnChart from '@/components/common/charts/ColumnChart.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import DrawerButton from '@/components/common/DrawerButton.vue'
import DrawerRight from '@/components/common/DrawerRight.vue'

export default {
  mixins: [techTypePrettyName],
  components: {
    BoxContent,
    FullTable,
    exportButton,
    ColumnChart,
    TdContent,
    DrawerButton,
    DrawerRight
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
      hypervisorsFilters: {
        sockets: []
      },
      filteredClusterNames: [],
      filteredType: [],
      filteredCore: [],
      coreMin: null,
      coreMax: null,
      filteredSocket: [],
      socketMin: 0,
      socketMax: 0,
      filteredPhysicalHost: [],
      filteredTotalVM: [],
      totalVmMin: 0,
      totalVmMax: 0,
      filteredErcoleVM: [],
      ercoleVmMin: 0,
      ercoleVmMax: 0
    }
  },
  async beforeMount() {
    await this.getClusters()

    this.filteredClusterNames = prepareDataForAutocomplete(
      this.getHypervisors,
      'name'
    )

    this.filteredType = prepareDataForAutocomplete(this.getHypervisors, 'type')

    this.getFilteredCore()

    this.getFilteredSocket()

    this.filteredPhysicalHost = prepareDataForAutocomplete(
      this.getHypervisors,
      'virtualizationNodes'
    )

    this.getFilteredTotalVM()

    this.getFilteredErcoleVM()
  },
  methods: {
    ...mapActions(['getClusters']),
    applyFilters() {
      if (this.coreMax) {
        this.hypervisorsFilters.cpu = [
          Number(this.coreMin),
          Number(this.coreMax)
        ]
      } else {
        this.hypervisorsFilters.cpu = Number(this.coreMin)
      }

      this.$store.commit('SET_FILTERS', {
        status: true,
        filters: organizeKeysBeforeFilter(this.hypervisorsFilters)
      })
    },
    resetFilters() {
      this.$store.commit('SET_FILTERS', {
        status: false,
        filters: []
      })

      this.hypervisorsFilters = {}
      this.getFilteredCore()
      this.getFilteredSocket()
      this.getFilteredTotalVM()
      this.getFilteredErcoleVM()
    },
    getAutocompleteData(text, toFilter) {
      const autocomplete = returnAutocompleteData(
        text,
        this.getHypervisors,
        toFilter
      )

      switch (toFilter) {
        case 'name':
          this.filteredClusterNames = autocomplete
          break
        case 'cpu':
          this.filteredCore = autocomplete
          break
        case 'virtualizationNodes':
          this.filteredPhysicalHost = autocomplete
          break
        default:
          break
      }
    },
    getFilteredCore() {
      this.filteredCore = prepareDataForAutocomplete(this.getHypervisors, 'cpu')
      this.coreMin = this.filteredCore[0]
      this.coreMax = _.last(this.filteredCore)
    },
    getFilteredSocket() {
      this.filteredSocket = prepareDataForAutocomplete(
        this.getHypervisors,
        'sockets'
      )
      this.hypervisorsFilters.sockets = [
        this.filteredSocket[0],
        _.last(this.filteredSocket)
      ]
      this.socketMin = this.filteredSocket[0]
      this.socketMax = _.last(this.filteredSocket)
    },
    getFilteredTotalVM() {
      this.filteredTotalVM = prepareDataForAutocomplete(
        this.getHypervisors,
        'vmsCount'
      )
      this.hypervisorsFilters.vmsCount = [
        this.filteredTotalVM[0],
        _.last(this.filteredTotalVM)
      ]
      this.totalVmMin = this.filteredTotalVM[0]
      this.totalVmMax = _.last(this.filteredTotalVM)
    },
    getFilteredErcoleVM() {
      this.filteredErcoleVM = prepareDataForAutocomplete(
        this.getHypervisors,
        'vmsErcoleAgentCount'
      )
      this.hypervisorsFilters.vmsErcoleAgentCount = [
        this.filteredErcoleVM[0],
        _.last(this.filteredErcoleVM)
      ]
      this.ercoleVmMin = this.filteredErcoleVM[0]
      this.ercoleVmMax = _.last(this.filteredErcoleVM)
    },
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
  },
  beforeDestroy() {
    this.resetFilters()
  }
}
</script>

<style lang="scss" scoped></style>
