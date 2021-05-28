<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Name">
      <CustomAutocomplete
        v-model="filters.name"
        :filterResult="filteredname"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField label="Hostname">
      <CustomAutocomplete
        v-model="filters.hostname"
        :filterResult="filteredhostname"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField label="Env">
      <CustomSelect
        v-model="filters.environment"
        :options="filteredenvironment"
      />
    </CustomField>

    <CustomField label="Charset">
      <CustomSelect
        v-model="filters.charsetSystem"
        :options="filteredcharsetSystem"
      />
    </CustomField>

    <CustomField label="Architecture">
      <CustomSelect
        v-model="filters.architecture"
        :options="filteredarchitecture"
      />
    </CustomField>

    <CustomField label="Buffer">
      <CustomSlider
        v-model="filters.bufferPoolSize"
        :ticks="[minbufferPoolSize, maxbufferPoolSize]"
        :steps="1"
      />
    </CustomField>

    <CustomField label="Edition">
      <CustomSelect v-model="filters.edition" :options="filterededition" />
    </CustomField>

    <CustomField label="Engine">
      <CustomSelect v-model="filters.engine" :options="filteredengine" />
    </CustomField>

    <CustomField label="Platform">
      <CustomSelect v-model="filters.platform" :options="filteredplatform" />
    </CustomField>

    <CustomField label="Version">
      <CustomSelect v-model="filters.version" :options="filteredversion" />
    </CustomField>

    <CustomField label="High Availability">
      <CustomRadio v-model="filters.highAvailability" />
    </CustomField>
  </AdvancedFiltersBase>
</template>

<script>
import { mapGetters } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'

export default {
  mixins: [localFiltersMixin],
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
