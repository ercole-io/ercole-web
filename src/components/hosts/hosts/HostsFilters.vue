<template>
  <DrawerFilters title="Hosts Filters">
    <form @submit.prevent="apply">
      <CustomField label="Hostname">
        <b-autocomplete
          v-model="filters.hostname"
          size="is-small"
          clearable
          :data="filteredData"
          @typing="setFilteredAutocomplete($event, 'hostname', getAllHosts)"
        />
      </CustomField>

      <CustomField label="Env">
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
      </CustomField>

      <CustomField label="DBs">
        <b-autocomplete
          v-model="filters.databases"
          size="is-small"
          clearable
          :data="filteredData"
          @typing="setFilteredAutocomplete($event, 'databases', getAllHosts)"
        />
      </CustomField>

      <CustomField label="Tech">
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
      </CustomField>

      <CustomField label="OS">
        <b-autocomplete
          v-model="filters.os"
          size="is-small"
          clearable
          :data="filteredData"
          @typing="setFilteredAutocomplete($event, 'os', getAllHosts)"
        />
      </CustomField>

      <CustomField label="Clust">
        <div class="is-flex" style="justify-content: space-around;">
          <b-radio
            size="is-small"
            v-model="filters.iconCluster"
            native-value="true"
          >
            Yes
          </b-radio>
          <b-radio
            size="is-small"
            v-model="filters.iconCluster"
            native-value="false"
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
      </CustomField>

      <CustomField label="Kernel">
        <b-autocomplete
          v-model="filters.kernel"
          size="is-small"
          clearable
          :data="filteredData"
          @typing="setFilteredAutocomplete($event, 'kernel', getAllHosts)"
        />
      </CustomField>

      <CustomField label="Memory">
        <b-slider
          v-model="filters.memorytotal"
          :min="minmemorytotal"
          :max="maxmemorytotal"
        >
          <b-slider-tick :value="minmemorytotal">
            {{ minmemorytotal }}
          </b-slider-tick>
          <b-slider-tick :value="maxmemorytotal">
            {{ maxmemorytotal }}
          </b-slider-tick>
        </b-slider>
      </CustomField>

      <CustomField label="Swap">
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
      </CustomField>

      <CustomField label="Updated">
        <b-datepicker
          v-model="startDate"
          size="is-small"
          placeholder="Start Date"
          position="is-bottom-right"
          icon="calendar-today"
          :max-date="new Date()"
          :date-formatter="formatDate"
          class="mr-1"
          trap-focus
        />
        <!-- <b-datepicker
            v-model="filters.endDate"
            size="is-small"
            placeholder="End Date"
            position="is-bottom-left"
            icon="calendar-today"
            :min-date="filters.startDate"
            :max-date="new Date()"
            :date-formatter="formatDate"
            class="ml-1"
            trap-focus
          /> -->
      </CustomField>

      <Collapse title="Virtual" id="virtual" padding margin>
        <CustomField label="Platform">
          <b-select
            v-model="filters.platform"
            size="is-small"
            placeholder="Select a Platform"
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
        </CustomField>

        <CustomField label="Cluster">
          <b-autocomplete
            v-model="filters.cluster"
            size="is-small"
            clearable
            :data="filteredData"
            @typing="setFilteredAutocomplete($event, 'cluster', getAllHosts)"
          >
            <template slot="empty">No results found</template>
          </b-autocomplete>
        </CustomField>

        <CustomField label="Node">
          <b-autocomplete
            v-model="filters.virtNode"
            size="is-small"
            clearable
            :data="filteredData"
            @typing="setFilteredAutocomplete($event, 'virtNode', getAllHosts)"
          >
            <template slot="empty">No results found</template>
          </b-autocomplete>
        </CustomField>
      </Collapse>

      <Collapse title="CPU" id="cpu" padding margin>
        <CustomField label="Processor Model">
          <b-autocomplete
            v-model="filters.model"
            size="is-small"
            clearable
            :data="filteredData"
            @typing="setFilteredAutocomplete($event, 'model', getAllHosts)"
          >
            <template slot="empty">No results found</template>
          </b-autocomplete>
        </CustomField>

        <CustomField label="threads">
          <b-slider
            v-model="filters.threads"
            :min="minthreads"
            :max="maxthreads"
          >
            <template v-for="val in filteredthreads">
              <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
            </template>
          </b-slider>
        </CustomField>

        <CustomField label="Cores">
          <b-slider v-model="filters.cores" :min="mincores" :max="maxcores">
            <template v-for="val in filteredcores">
              <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
            </template>
          </b-slider>
        </CustomField>

        <CustomField label="Socket">
          <b-slider v-model="filters.socket" :min="minsocket" :max="maxsocket">
            <template v-for="val in filteredsocket">
              <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
            </template>
          </b-slider>
        </CustomField>
      </Collapse>

      <Collapse title="Agent" id="agent" padding margin>
        <CustomField label="Version">
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
        </CustomField>
      </Collapse>

      <FiltersButtons />
    </form>
  </DrawerFilters>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapActions } from 'vuex'
import {
  prepareDataForAutocomplete,
  formatDatepickerDate
} from '@/helpers/helpers.js'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import DrawerFilters from '@/components/common/DrawerFilters.vue'
import FiltersButtons from '@/components/common/Filters/FiltersButtons.vue'
import CustomField from '@/components/common/Filters/CustomField.vue'
import Collapse from '@/components/common/Collapse.vue'
import formatDate from '@/filters/formatDate.js'

export default {
  mixins: [localFiltersMixin],
  components: {
    DrawerFilters,
    FiltersButtons,
    CustomField,
    Collapse
  },
  data() {
    return {
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
      minsocket: null,
      maxsocket: null,
      filteredmemorytotal: [],
      minmemorytotal: null,
      maxmemorytotal: null,
      minswaptotal: null,
      maxswaptotal: null,
      startDate: null
    }
  },
  beforeMount() {
    this.configAutocomplete()
    this.setSlider()

    bus.$on('resetFilters', () => this.reset(this.resetFilters))
  },
  methods: {
    ...mapActions(['getHosts']),
    resetFilters() {
      this.setSlider()
      this.startDate = null
    },
    configAutocomplete() {
      this.setAutocompleteData('hostname', this.getAllHosts)
      this.setAutocompleteData('databases', this.getAllHosts)
      this.setAutocompleteData('model', this.getAllHosts)
      this.setAutocompleteData('os', this.getAllHosts)
      this.setAutocompleteData('kernel', this.getAllHosts)
      this.setAutocompleteData('cluster', this.getAllHosts)
      this.setAutocompleteData('virtNode', this.getAllHosts)

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
    formatDate(date) {
      return formatDate(date)
    }
  },
  computed: {
    ...mapGetters(['getAllHosts'])
  },
  watch: {
    startDate(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getHosts(formatDatepickerDate(this.startDate))
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
