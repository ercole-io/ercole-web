<template>
  <section>
    <DrawerFilters title="Hosts Filters">
      <form @submit.prevent="apply">
        <b-field label="Hostname" custom-class="is-small">
          <b-autocomplete
            v-model="filters.hostname"
            size="is-small"
            type="number"
            clearable
            :data="filteredData"
            @typing="setFilteredAutocomplete($event, 'hostname', getAllHosts)"
          >
            <template slot="empty">No results found</template>
          </b-autocomplete>
        </b-field>

        <b-field label="Env" custom-class="is-small">
          <b-select
            v-model="filters.environment"
            size="is-small"
            placeholder="Select an Env"
            expanded
          >
            <option :value="null" v-if="filters.environment">
              Reset
            </option>
            <option
              v-for="(env, index) in environmentOptions"
              :key="index"
              :value="env"
            >
              {{ env }}
            </option>
          </b-select>
        </b-field>

        <b-field label="DBs" custom-class="is-small">
          <b-autocomplete
            v-model="filters.databases"
            size="is-small"
            type="number"
            clearable
            :data="filteredData"
            @typing="setFilteredAutocomplete($event, 'databases', getAllHosts)"
          >
            <template slot="empty">No results found</template>
          </b-autocomplete>
        </b-field>

        <b-field label="Tech" custom-class="is-small">
          <b-select
            v-model="filters.techType"
            size="is-small"
            placeholder="Select a Tech"
            expanded
          >
            <option :value="null" v-if="filters.techType">
              Reset
            </option>
            <option
              v-for="(tec, index) in techTypeOptions"
              :key="index"
              :value="tec"
            >
              {{ tec }}
            </option>
          </b-select>
        </b-field>

        <b-field label="OS" custom-class="is-small">
          <b-autocomplete
            v-model="filters.os"
            size="is-small"
            type="number"
            clearable
            :data="filteredData"
            @typing="setFilteredAutocomplete($event, 'os', getAllHosts)"
          >
            <template slot="empty">No results found</template>
          </b-autocomplete>
        </b-field>

        <b-field label="Clust" custom-class="is-small">
          <div class="is-flex" style="justify-content: space-around;">
            <b-radio
              size="is-small"
              v-model="filters.iconCluster"
              :native-value="true"
            >
              Yes
            </b-radio>
            <b-radio
              size="is-small"
              v-model="filters.iconCluster"
              :native-value="false"
            >
              No
            </b-radio>
            <b-radio
              size="is-small"
              v-model="filters.iconCluster"
              native-value=""
            >
              All
            </b-radio>
          </div>
        </b-field>

        <b-field label="Kernel" custom-class="is-small">
          <b-autocomplete
            v-model="filters.kernel"
            size="is-small"
            type="number"
            clearable
            :data="filteredData"
            @typing="setFilteredAutocomplete($event, 'kernel', getAllHosts)"
          >
            <template slot="empty">No results found</template>
          </b-autocomplete>
        </b-field>

        <b-field label="Memory" custom-class="is-small">
          <b-slider
            v-model="filters.memorytotal"
            :min="minmemorytotal"
            :max="maxmemorytotal"
          >
            <template v-for="val in filteredmemorytotal">
              <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
            </template>
          </b-slider>
        </b-field>

        <b-field label="Swap" custom-class="is-small">
          <b-slider
            v-model="filters.swaptotal"
            :min="minswaptotal"
            :max="maxswaptotal"
          >
            <b-slider-tick :value="minswaptotal">
              {{ minswaptotal }}
            </b-slider-tick>
            <b-slider-tick :value="maxswaptotal">
              {{ maxswaptotal }}
            </b-slider-tick>
          </b-slider>
        </b-field>

        <Collapse title="Virtual" id="virtual" padding margin>
          <b-field label="Platform" custom-class="is-small">
            <b-select
              v-model="filters.platform"
              size="is-small"
              placeholder="Select an Env"
              expanded
            >
              <option :value="null" v-if="filters.platform">
                Reset
              </option>
              <option
                v-for="(plat, index) in platformOptions"
                :key="index"
                :value="plat"
              >
                {{ plat }}
              </option>
            </b-select>
          </b-field>

          <b-field label="Cluster" custom-class="is-small">
            <b-autocomplete
              v-model="filters.cluster"
              size="is-small"
              type="number"
              clearable
              :data="filteredData"
              @typing="setFilteredAutocomplete($event, 'cluster', getAllHosts)"
            >
              <template slot="empty">No results found</template>
            </b-autocomplete>
          </b-field>

          <b-field label="Node" custom-class="is-small">
            <b-autocomplete
              v-model="filters.virtNode"
              size="is-small"
              type="number"
              clearable
              :data="filteredData"
              @typing="setFilteredAutocomplete($event, 'virtNode', getAllHosts)"
            >
              <template slot="empty">No results found</template>
            </b-autocomplete>
          </b-field>
        </Collapse>

        <Collapse title="CPU" id="cpu" padding margin>
          <b-field label="Node" custom-class="is-small">
            <b-autocomplete
              v-model="filters.model"
              size="is-small"
              type="number"
              clearable
              :data="filteredData"
              @typing="setFilteredAutocomplete($event, 'model', getAllHosts)"
            >
              <template slot="empty">No results found</template>
            </b-autocomplete>
          </b-field>

          <b-field label="threads" custom-class="is-small">
            <b-slider
              v-model="filters.threads"
              :min="minthreads"
              :max="maxthreads"
            >
              <template v-for="val in filteredthreads">
                <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
              </template>
            </b-slider>
          </b-field>

          <b-field label="Cores" custom-class="is-small">
            <b-slider v-model="filters.cores" :min="mincores" :max="maxcores">
              <template v-for="val in filteredcores">
                <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
              </template>
            </b-slider>
          </b-field>

          <b-field label="Socket" custom-class="is-small">
            <b-slider
              v-model="filters.socket"
              :min="minsocket"
              :max="maxsocket"
            >
              <template v-for="val in filteredsocket">
                <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
              </template>
            </b-slider>
          </b-field>
        </Collapse>

        <Collapse title="Agent" id="agent" padding margin>
          <b-field label="Version" custom-class="is-small">
            <b-select
              v-model="filters.version"
              size="is-small"
              placeholder="Select a Version"
              expanded
            >
              <option :value="null" v-if="filters.version">
                Reset
              </option>
              <option
                v-for="(ver, index) in versionOptions"
                :key="index"
                :value="ver"
              >
                {{ ver }}
              </option>
            </b-select>
          </b-field>
        </Collapse>

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
    <BoxContent>
      <FullTable
        placeholder="Search on Hosts"
        :keys="keys"
        :tableData="getAllHosts"
        @clickedRow="handleClickedRow"
        isClickable
      >
        <template slot="customTopHeader">
          <DrawerButton tooltipText="More Filters" />

          <div style="margin-right: auto;">
            <span class="is-size-7 has-text-weight-medium">
              Show more info:
            </span>
            <b-button
              size="is-small"
              :type="hideVirtual ? 'is-light' : 'is-primary'"
              @click="hideVirtual = !hideVirtual"
              rounded
            >
              Virtual
            </b-button>
            <b-button
              size="is-small"
              :type="hideCPU ? 'is-light' : 'is-primary'"
              @click="hideCPU = !hideCPU"
              rounded
            >
              CPU
            </b-button>
            <b-button
              size="is-small"
              :type="hideAgent ? 'is-light' : 'is-primary'"
              @click="hideAgent = !hideAgent"
              rounded
            >
              Agent
            </b-button>
          </div>
        </template>

        <template slot="customHeadData">
          <tr
            :class="{
              'has-background-grey-light':
                !hideVirtual || !hideCPU || !hideAgent
            }"
          >
            <th colspan="4"></th>
            <th
              colspan="3"
              class="has-text-centered border-left border-right"
              :class="{ hide: hideVirtual }"
            >
              Virtual
            </th>
            <th colspan="5"></th>
            <th
              colspan="4"
              class="has-text-centered border-left"
              :class="{ hide: hideCPU }"
            >
              CPU
            </th>
            <th
              colspan="2"
              class="has-text-centered border-left"
              :class="{ hide: hideAgent }"
            >
              Agent
            </th>
          </tr>
        </template>

        <template slot="headData">
          <v-th sortKey="hostname">Hostname</v-th>
          <v-th sortKey="environment">Env</v-th>
          <v-th sortKey="databases">DBs</v-th>
          <v-th sortKey="techType">Tech</v-th>
          <v-th
            sortKey="platform"
            class="border-left"
            :class="{ hide: hideVirtual }"
          >
            Platform
          </v-th>
          <v-th sortKey="cluster" :class="{ hide: hideVirtual }">Cluster</v-th>
          <v-th
            sortKey="virtNode"
            :class="{ hide: hideVirtual }"
            class="border-right"
          >
            Node
          </v-th>
          <v-th sortKey="os">OS</v-th>
          <v-th sortKey="iconCluster">Clust</v-th>
          <v-th sortKey="kernel">kernel</v-th>
          <v-th sortKey="memorytotal">Mem.</v-th>
          <v-th sortKey="swaptotal">Swap</v-th>

          <v-th sortKey="model" class="border-left" :class="{ hide: hideCPU }">
            Processor Model
          </v-th>
          <v-th sortKey="threads" :class="{ hide: hideCPU }">Threa</v-th>
          <v-th sortKey="cores" :class="{ hide: hideCPU }">Cores</v-th>
          <v-th sortKey="socket" :class="{ hide: hideCPU }">Socket</v-th>
          <v-th
            sortKey="version"
            class="border-left"
            :class="{ hide: hideAgent }"
          >
            Version
          </v-th>
          <v-th sortKey="updated" :class="{ hide: hideAgent }">Updated</v-th>
        </template>

        <template slot="bodyData" slot-scope="rowData">
          <TdContent :value="rowData.scope.hostname" />
          <TdContent :value="rowData.scope.environment" />
          <TdArray :value="rowData.scope.databases" />
          <TdContent :value="rowData.scope.techType" />
          <TdContent
            :value="rowData.scope.platform"
            class="border-left"
            :class="{ hide: hideVirtual }"
          />
          <TdContent
            :value="rowData.scope.cluster"
            :class="{ hide: hideVirtual }"
          />
          <TdContent
            :value="rowData.scope.virtNode"
            class="border-right"
            :class="{ hide: hideVirtual }"
          />
          <TdContent :value="rowData.scope.os" />
          <TdIcon :value="rowData.scope.iconCluster" />
          <TdContent :value="rowData.scope.kernel" />
          <TdContent :value="rowData.scope.memorytotal" />
          <TdContent :value="rowData.scope.swaptotal" />
          <TdContent
            :value="rowData.scope.model"
            class="border-left"
            :class="{ hide: hideCPU }"
          />
          <TdContent
            :value="rowData.scope.threads"
            :class="{ hide: hideCPU }"
          />
          <TdContent :value="rowData.scope.cores" :class="{ hide: hideCPU }" />
          <TdContent :value="rowData.scope.socket" :class="{ hide: hideCPU }" />
          <TdContent
            :value="rowData.scope.version"
            class="border-left"
            :class="{ hide: hideAgent }"
          />
          <TdContent
            :value="rowData.scope.updated"
            dataType="date"
            :class="{ hide: hideAgent }"
          />
        </template>

        <template slot="export">
          <exportButton url="hosts" expName="hosts-data" />
          <exportButton
            url="hosts"
            expName="hosts-lms-data"
            text="LMS Audit File"
            type="LMS"
          />
        </template>
      </FullTable>
    </BoxContent>
  </section>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapActions } from 'vuex'
import { prepareDataForAutocomplete } from '@/helpers/helpers.js'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import TdArray from '@/components/common/Table/TdArray.vue'
import exportButton from '@/components/common/exportButton.vue'
import DrawerButton from '@/components/common/DrawerButton.vue'
import DrawerFilters from '@/components/common/DrawerFilters.vue'
import Collapse from '@/components/common/Collapse.vue'

export default {
  mixins: [localFiltersMixin],
  components: {
    BoxContent,
    FullTable,
    TdContent,
    TdIcon,
    TdArray,
    exportButton,
    DrawerButton,
    DrawerFilters,
    Collapse
  },
  data() {
    return {
      keys: [
        'hostname',
        'environment',
        'databases',
        'techType',
        'platform',
        'cluster',
        'virtNode',
        'os',
        'kernel',
        'memorytotal',
        'swaptotal',
        'iconCluster',
        'model',
        'threads',
        'cores',
        'socket',
        'version',
        'updated'
      ],
      hideVirtual: true,
      hideCPU: true,
      hideAgent: true,
      environmentOptions: [],
      techTypeOptions: [],
      platformOptions: [],
      versionOptions: [],
      filteredthreads: [],
      minthreads: null,
      maxthreads: null,
      filteredcores: [],
      mincores: null,
      maxcores: null,
      filteredsocket: [],
      minsocket: 0,
      maxsocket: 0,
      filteredmemorytotal: [],
      minmemorytotal: 0,
      maxmemorytotal: 0,
      minswaptotal: 0,
      maxswaptotal: 0,
      filters: {
        iconCluster: ''
      }
    }
  },
  async beforeMount() {
    await this.getHosts()

    this.configAutocomplete()
    this.setSlider()

    bus.$on('hostDismissedMsg', value => {
      this.$buefy.toast.open({
        message: `The host ${value} was successfully dismissed!`,
        type: 'is-success',
        duration: 5000
      })
    })
  },
  methods: {
    ...mapActions(['getHosts']),
    resetFilters() {
      this.reset()
      this.setSlider()
      this.filters.iconCluster = ''
    },
    configAutocomplete() {
      this.setAutocompleteData('hostname', this.getAllHosts)
      this.setAutocompleteData('databases', this.getAllHosts)
      this.setAutocompleteData('cluster', this.getAllHosts)
      this.setAutocompleteData('virtNode', this.getAllHosts)
      this.setAutocompleteData('model', this.getAllHosts)
      this.setAutocompleteData('os', this.getAllHosts)
      this.setAutocompleteData('kernel', this.getAllHosts)
      this.environmentOptions = prepareDataForAutocomplete(
        this.getAllHosts,
        'environment'
      )
      this.techTypeOptions = prepareDataForAutocomplete(
        this.getAllHosts,
        'techType'
      )
      this.platformOptions = prepareDataForAutocomplete(
        this.getAllHosts,
        'platform'
      )
      this.versionOptions = prepareDataForAutocomplete(
        this.getAllHosts,
        'version'
      )
    },
    setSlider() {
      this.setSliderFilterConfig('threads', this.getAllHosts)
      this.setSliderFilterConfig('cores', this.getAllHosts)
      this.setSliderFilterConfig('socket', this.getAllHosts)
      this.setSliderFilterConfig('memorytotal', this.getAllHosts)
      this.setSliderFilterConfig('swaptotal', this.getAllHosts)
    },
    handleClickedRow(value) {
      if (value.length > 0) {
        const selectedRow = value[0].hostname
        this.$router.push({
          name: 'hosts-details',
          params: { hostname: selectedRow }
        })
      }
    }
  },
  computed: {
    ...mapGetters(['getAllHosts'])
  }
}
</script>

<style lang="scss">
.no-margin-bottom {
  margin-bottom: 0 !important;
}

.hide {
  display: none;
}
</style>
