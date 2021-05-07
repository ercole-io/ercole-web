<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Name">
      <b-autocomplete
        v-model="filters.name"
        size="is-small"
        clearable
        :data="filteredData"
        @typing="setFilteredAutocomplete($event, 'name', getAllDatabases)"
      />
    </CustomField>

    <CustomField label="Type">
      <b-select
        v-model="filters.type"
        size="is-small"
        placeholder="Select a Type"
        expanded
      >
        <option :value="null" v-if="filters.type">
          Reset
        </option>
        <option v-for="(type, index) in filteredType" :key="index">
          {{ type }}
        </option>
      </b-select>
    </CustomField>

    <CustomField label="Version">
      <b-autocomplete
        v-model="filters.version"
        size="is-small"
        clearable
        :data="filteredData"
        @typing="setFilteredAutocomplete($event, 'version', getAllDatabases)"
      />
    </CustomField>

    <CustomField label="Hostname">
      <b-autocomplete
        v-model="filters.hostname"
        size="is-small"
        clearable
        :data="filteredData"
        @typing="setFilteredAutocomplete($event, 'hostname', getAllDatabases)"
      />
    </CustomField>

    <CustomField label="Environment">
      <b-select
        v-model="filters.environment"
        size="is-small"
        placeholder="Select an Environment"
        expanded
      >
        <option :value="null" v-if="filters.environment">
          Reset
        </option>
        <option v-for="(env, index) in filteredEnv" :key="index">
          {{ env }}
        </option>
      </b-select>
    </CustomField>

    <CustomField label="Charset">
      <b-autocomplete
        v-model="filters.charset"
        size="is-small"
        clearable
        :data="filteredData"
        @typing="setFilteredAutocomplete($event, 'charset', getAllDatabases)"
      />
    </CustomField>

    <CustomField label="Memory">
      <b-slider
        v-model="filters.memory"
        :min="minmemory"
        :max="maxmemory"
        :step="0.001"
      >
        <b-slider-tick :value="minmemory">
          {{ minmemory | formatNumber('0') }}
        </b-slider-tick>
        <b-slider-tick :value="maxmemory">
          {{ maxmemory | formatNumber('0') }}
        </b-slider-tick>
      </b-slider>
    </CustomField>

    <CustomField label="DataFile">
      <b-slider
        v-model="filters.datafileSize"
        :min="mindatafileSize"
        :max="maxdatafileSize"
        :step="0.001"
      >
        <b-slider-tick :value="mindatafileSize">
          {{ mindatafileSize | formatNumber('0') }}
        </b-slider-tick>
        <b-slider-tick :value="maxdatafileSize">
          {{ maxdatafileSize | formatNumber('0') }}
        </b-slider-tick>
      </b-slider>
    </CustomField>

    <CustomField label="Segmemnt">
      <b-slider
        v-model="filters.segmentSize"
        :min="minsegmentSize"
        :max="maxsegmentSize"
        :step="0.001"
      >
        <b-slider-tick :value="minsegmentSize">
          {{ minsegmentSize | formatNumber('0') }}
        </b-slider-tick>
        <b-slider-tick :value="maxsegmentSize">
          {{ maxsegmentSize | formatNumber('0') }}
        </b-slider-tick>
      </b-slider>
    </CustomField>

    <CustomField label="Archivelog Mode">
      <div class="is-flex" style="justify-content: space-around;">
        <b-radio
          size="is-small"
          v-model="filters.archivelog"
          native-value="true"
        >
          Yes
        </b-radio>
        <b-radio
          size="is-small"
          v-model="filters.archivelog"
          native-value="false"
        >
          No
        </b-radio>
        <b-radio size="is-small" v-model="filters.archivelog" native-value="">
          All
        </b-radio>
      </div>
    </CustomField>

    <CustomField label="Disaster Recovery">
      <div class="is-flex" style="justify-content: space-around;">
        <b-radio
          size="is-small"
          v-model="filters.disasterRecovery"
          native-value="true"
        >
          Yes
        </b-radio>
        <b-radio
          size="is-small"
          v-model="filters.disasterRecovery"
          native-value="false"
        >
          No
        </b-radio>
        <b-radio
          size="is-small"
          v-model="filters.disasterRecovery"
          native-value=""
        >
          All
        </b-radio>
      </div>
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
      filteredType: [],
      filteredEnv: [],
      filters: {
        archivelog: '',
        disasterRecovery: '',
        highAvailability: ''
      }
    }
  },
  beforeMount() {
    this.filteredType = prepareDataForAutocomplete(this.getAllDatabases, 'type')
    this.filteredEnv = prepareDataForAutocomplete(
      this.getAllDatabases,
      'environment'
    )
    this.setSlider()

    bus.$on('onResetAction', () => this.reset(this.resetFilters))
  },
  methods: {
    resetFilters() {
      this.filters = {
        archivelog: '',
        disasterRecovery: '',
        highAvailability: ''
      }
      this.setSlider()
    },
    setSlider() {
      this.setSliderFilterConfig('memory', this.getAllDatabases)
      this.setSliderFilterConfig('datafileSize', this.getAllDatabases)
      this.setSliderFilterConfig('segmentSize', this.getAllDatabases)
    }
  },
  computed: {
    ...mapGetters(['getAllDatabases'])
  }
}
</script>

<style lang="scss" scoped></style>
