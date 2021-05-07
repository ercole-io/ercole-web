<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Name">
      <b-autocomplete
        v-model="filters.name"
        size="is-small"
        clearable
        :data="filteredData"
        @typing="setFilteredAutocomplete($event, 'name', getAllMysqlDbs)"
      />
    </CustomField>

    <CustomField label="Hostname">
      <b-autocomplete
        v-model="filters.hostname"
        size="is-small"
        clearable
        :data="filteredData"
        @typing="setFilteredAutocomplete($event, 'hostname', getAllMysqlDbs)"
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
        <option v-for="(ver, index) in filteredEnvironment" :key="index">
          {{ ver }}
        </option>
      </b-select>
    </CustomField>

    <CustomField label="Charset">
      <b-select
        v-model="filters.charsetSystem"
        size="is-small"
        placeholder="Select a Charset"
        expanded
      >
        <option :value="null" v-if="filters.charsetSystem">
          Reset
        </option>
        <option v-for="(char, index) in filteredCharsetSystem" :key="index">
          {{ char }}
        </option>
      </b-select>
    </CustomField>

    <CustomField label="Architecture">
      <b-select
        v-model="filters.architecture"
        size="is-small"
        placeholder="Select an Architecture"
        expanded
      >
        <option :value="null" v-if="filters.architecture">
          Reset
        </option>
        <option v-for="(char, index) in filteredArchitecture" :key="index">
          {{ char }}
        </option>
      </b-select>
    </CustomField>

    <CustomField label="Buffer">
      <b-slider
        v-model="filters.bufferPoolSize"
        :min="minbufferPoolSize"
        :max="maxbufferPoolSize"
      >
        <b-slider-tick :value="minbufferPoolSize">
          {{ minbufferPoolSize }}
        </b-slider-tick>
        <b-slider-tick :value="maxbufferPoolSize">
          {{ maxbufferPoolSize }}
        </b-slider-tick>
      </b-slider>
    </CustomField>

    <CustomField label="Edition">
      <b-select
        v-model="filters.edition"
        size="is-small"
        placeholder="Select an Edition"
        expanded
      >
        <option :value="null" v-if="filters.edition">
          Reset
        </option>
        <option v-for="(edit, index) in filteredEdition" :key="index">
          {{ edit }}
        </option>
      </b-select>
    </CustomField>

    <CustomField label="Engine">
      <b-select
        v-model="filters.engine"
        size="is-small"
        placeholder="Select an Engine"
        expanded
      >
        <option :value="null" v-if="filters.engine">
          Reset
        </option>
        <option v-for="(edit, index) in filteredEngine" :key="index">
          {{ edit }}
        </option>
      </b-select>
    </CustomField>

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
        <option v-for="(plat, index) in filteredPlatform" :key="index">
          {{ plat }}
        </option>
      </b-select>
    </CustomField>

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
        <option v-for="(ver, index) in filteredVersion" :key="index">
          {{ ver }}
        </option>
      </b-select>
    </CustomField>

    <CustomField label="High Availability">
      <div class="is-flex" style="justify-content: space-around;">
        <b-radio
          size="is-small"
          v-model="filters.highAvailability"
          native-value="true"
        >
          Yes
        </b-radio>
        <b-radio
          size="is-small"
          v-model="filters.highAvailability"
          native-value="false"
        >
          No
        </b-radio>
        <b-radio
          size="is-small"
          v-model="filters.highAvailability"
          native-value=""
        >
          All
        </b-radio>
      </div>
    </CustomField>
  </AdvancedFiltersBase>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
import { prepareDataForAutocomplete } from '@/helpers/helpers.js'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'
import CustomField from '@/components/common/Form/CustomField.vue'

export default {
  mixins: [localFiltersMixin],
  components: {
    AdvancedFiltersBase,
    CustomField
  },
  data() {
    return {
      filteredVersion: [],
      filteredEnvironment: [],
      filteredCharsetSystem: [],
      filteredArchitecture: [],
      filteredEdition: [],
      filteredEngine: [],
      filteredPlatform: [],
      filters: {
        highAvailability: ''
      }
    }
  },
  beforeMount() {
    this.filteredEnvironment = prepareDataForAutocomplete(
      this.getAllMysqlDbs,
      'environment'
    )
    this.filteredCharsetSystem = prepareDataForAutocomplete(
      this.getAllMysqlDbs,
      'charsetSystem'
    )
    this.filteredArchitecture = prepareDataForAutocomplete(
      this.getAllMysqlDbs,
      'architecture'
    )
    this.filteredEdition = prepareDataForAutocomplete(
      this.getAllMysqlDbs,
      'edition'
    )
    this.filteredEngine = prepareDataForAutocomplete(
      this.getAllMysqlDbs,
      'engine'
    )
    this.filteredPlatform = prepareDataForAutocomplete(
      this.getAllMysqlDbs,
      'platform'
    )
    this.filteredVersion = prepareDataForAutocomplete(
      this.getAllMysqlDbs,
      'version'
    )
    this.setSlider()

    bus.$on('onResetAction', () => this.reset(this.resetFilters))
  },
  methods: {
    resetFilters() {
      this.filters = {
        highAvailability: ''
      }
      this.setSlider()
    },
    setSlider() {
      this.setSliderFilterConfig('bufferPoolSize', this.getAllMysqlDbs)
    }
  },
  computed: {
    ...mapGetters(['getAllMysqlDbs'])
  }
}
</script>

<style lang="scss" scoped></style>
