<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField :label="$t('common.fields.name')">
      <CustomAutocomplete
        v-model="filters.name"
        :filterResult="filteredname"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.type')">
      <CustomSelect v-model="filters.type" :options="filteredtype" />
    </CustomField>

    <CustomField :label="$t('common.fields.version')">
      <CustomAutocomplete
        v-model="filters.version"
        :filterResult="filteredversion"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.hostname')">
      <CustomAutocomplete
        v-model="filters.hostname"
        :filterResult="filteredhostname"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.env')">
      <CustomSelect
        v-model="filters.environment"
        :options="filteredenvironment"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.charset')">
      <CustomAutocomplete
        v-model="filters.charset"
        :filterResult="filteredcharset"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.memory')">
      <CustomSlider
        v-model="filters.memory"
        :ticks="[minmemory, maxmemory]"
        :steps="0.001"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.datafile')">
      <CustomSlider
        v-model="filters.datafileSize"
        :ticks="[mindatafileSize, maxdatafileSize]"
        :steps="0.001"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.segment')">
      <CustomSlider
        v-model="filters.segmentSize"
        :ticks="[minsegmentSize, maxsegmentSize]"
        :steps="0.001"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.archMode')">
      <CustomRadio v-model="filters.archivelog" />
    </CustomField>

    <CustomField :label="$t('common.fields.disRecovery')">
      <CustomRadio v-model="filters.disasterRecovery" />
    </CustomField>

    <CustomField :label="$t('common.fields.highAvail')">
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
      autocompletes: ['name', 'version', 'hostname', 'charset'],
      selects: ['type', 'environment'],
      sliders: ['memory', 'datafileSize', 'segmentSize'],
      filters: {
        archivelog: '',
        disasterRecovery: '',
        highAvailability: ''
      }
    }
  },
  created() {
    this.fullData = this.getAllDatabases
  },
  methods: {
    resetFilters() {
      this.filters = {
        archivelog: '',
        disasterRecovery: '',
        highAvailability: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getAllDatabases'])
  }
}
</script>

<style lang="scss" scoped></style>
