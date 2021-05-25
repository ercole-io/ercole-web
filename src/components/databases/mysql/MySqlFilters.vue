<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Name">
      <b-autocomplete
        v-model="filters.name"
        size="is-small"
        clearable
        :data="filteredname"
        @typing="setAutocompletes($event)"
      />
    </CustomField>

    <CustomField label="Hostname">
      <b-autocomplete
        v-model="filters.hostname"
        size="is-small"
        clearable
        :data="filteredhostname"
        @typing="setAutocompletes($event)"
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
        <option v-for="(ver, index) in filteredenvironment" :key="index">
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
        <option v-for="(char, index) in filteredcharsetSystem" :key="index">
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
        <option v-for="(char, index) in filteredarchitecture" :key="index">
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
        <option v-for="(edit, index) in filterededition" :key="index">
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
        <option v-for="(edit, index) in filteredengine" :key="index">
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
        <option v-for="(plat, index) in filteredplatform" :key="index">
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
        <option v-for="(ver, index) in filteredversion" :key="index">
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
      autocompletes: ['name', 'hostname'],
      selects: [
        'environment',
        'charsetSystem',
        'architecture',
        'edition',
        'engine',
        'platform',
        'version'
      ],
      sliders: ['bufferPoolSize'],
      filters: {
        highAvailability: ''
      }
    }
  },
  created() {
    this.fullData = this.getAllMysqlDbs

    bus.$on('onResetAction', () => this.reset(this.resetFilters))
  },
  methods: {
    resetFilters() {
      this.filters = {
        highAvailability: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getAllMysqlDbs'])
  }
}
</script>

<style lang="scss" scoped></style>
