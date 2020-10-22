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
              :data="filteredname"
              @typing="setFilteredAutocomplete($event, 'name')"
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
              <option v-for="(type, index) in filteredtype" :key="index">
                {{ type }}
              </option>
            </b-select>
          </b-field>

          <b-field label="Core" custom-class="is-small">
            <b-slider
              v-model="hypervisorsFilters.cpu"
              :min="mincpu"
              :max="maxcpu"
            >
              <b-slider-tick :value="mincpu">
                {{ mincpu }}
              </b-slider-tick>
              <b-slider-tick :value="maxcpu">
                {{ maxcpu }}
              </b-slider-tick>
            </b-slider>
          </b-field>

          <b-field label="Socket" custom-class="is-small">
            <b-slider
              v-model="hypervisorsFilters.sockets"
              :min="minsockets"
              :max="maxsockets"
            >
              <template v-for="val in filteredsockets">
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
              :data="filteredvirtualizationNodes"
              @typing="setFilteredAutocomplete($event, 'virtualizationNodes')"
            >
              <template slot="empty">No results found</template>
            </b-autocomplete>
          </b-field>

          <b-field label="Total VM" custom-class="is-small">
            <b-slider
              v-model="hypervisorsFilters.vmsCount"
              :min="minvmsCount"
              :max="maxvmsCount"
            >
              <b-slider-tick :value="minvmsCount">
                {{ minvmsCount }}
              </b-slider-tick>
              <b-slider-tick :value="maxvmsCount">
                {{ maxvmsCount }}
              </b-slider-tick>
            </b-slider>
          </b-field>

          <b-field label="Total VM Ercole" custom-class="is-small">
            <b-slider
              v-model="hypervisorsFilters.vmsErcoleAgentCount"
              :min="minvmsErcoleAgentCount"
              :max="maxvmsErcoleAgentCount"
            >
              <b-slider-tick :value="minvmsErcoleAgentCount">
                {{ minvmsErcoleAgentCount }}
              </b-slider-tick>
              <b-slider-tick :value="maxvmsErcoleAgentCount">
                {{ maxvmsErcoleAgentCount }}
              </b-slider-tick>
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
      hypervisorsFilters: {},
      filteredname: [],
      filteredtype: [],
      filteredvirtualizationNodes: [],
      filteredcpu: [],
      mincpu: 0,
      maxcpu: 0,
      filteredsockets: [],
      minsockets: 0,
      maxsockets: 0,
      filteredvmsCount: [],
      minvmsCount: 0,
      maxvmsCount: 0,
      filteredvmsErcoleAgentCount: [],
      minvmsErcoleAgentCount: 0,
      maxvmsErcoleAgentCount: 0
    }
  },
  async beforeMount() {
    await this.getClusters()

    this.setAutocompleteData('name')
    this.setAutocompleteData('type')
    this.setAutocompleteData('virtualizationNodes')

    this.setSliderFilterConfig('cpu')
    this.setSliderFilterConfig('sockets')
    this.setSliderFilterConfig('vmsCount')
    this.setSliderFilterConfig('vmsErcoleAgentCount')
  },
  methods: {
    ...mapActions(['getClusters']),
    applyFilters() {
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
      this.setSliderFilterConfig('cpu')
      this.setSliderFilterConfig('sockets')
      this.setSliderFilterConfig('vmsCount')
      this.setSliderFilterConfig('vmsErcoleAgentCount')
    },
    setAutocompleteData(value) {
      this['filtered' + value] = prepareDataForAutocomplete(
        this.getHypervisors,
        value
      )
    },
    setFilteredAutocomplete(text, toFilter) {
      const autocomplete = returnAutocompleteData(
        text,
        this.getHypervisors,
        toFilter
      )

      switch (toFilter) {
        case 'name':
          this.filteredname = autocomplete
          break
        case 'virtualizationNodes':
          this.filteredvirtualizationNodes = autocomplete
          break
        default:
          break
      }
    },
    setSliderFilterConfig(value) {
      const fillNumbers = prepareDataForAutocomplete(this.getHypervisors, value)
      this.resolveSliderData(value, fillNumbers)
    },
    resolveSliderData(value, numbers) {
      this['filtered' + value] = numbers

      this.hypervisorsFilters[value] = [
        this['filtered' + value][0],
        _.last(this['filtered' + value])
      ]

      this['min' + value] = this['filtered' + value][0]
      this['max' + value] = _.last(this['filtered' + value])
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
