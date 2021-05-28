<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Name">
      <CustomAutocomplete
        v-model="filters.name"
        :filterResult="filteredname"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField label="Version">
      <CustomAutocomplete
        v-model="filters.version"
        :filterResult="filteredversion"
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

    <CustomField label="Environment">
      <CustomSelect
        v-model="filters.environment"
        :options="filteredenvironment"
      />
    </CustomField>

    <CustomField label="Work">
      <CustomSlider
        v-model="filters.work"
        :ticks="[minwork, maxwork]"
        :steps="1"
      />
    </CustomField>

    <CustomField label="CPU Count">
      <CustomSlider
        v-model="filters.cpuCount"
        :ticks="[mincpuCount, maxcpuCount]"
        :steps="1"
      />
    </CustomField>

    <CustomField label="Block Size">
      <CustomSlider
        v-model="filters.blockSize"
        :ticks="[minblockSize, maxblockSize]"
        :steps="1"
      />
    </CustomField>

    <CustomField label="Status">
      <CustomSelect v-model="filters.status" :options="filteredstatus" />
    </CustomField>

    <CustomField label="Unique Name">
      <CustomAutocomplete
        v-model="filters.uniqueName"
        :filterResult="filtereduniqueName"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField label="Memory">
      <CustomSlider
        v-model="filters.memory"
        :ticks="[minmemory, maxmemory]"
        :steps="0.001"
      />
    </CustomField>

    <CustomField label="Archivelog Mode">
      <CustomRadio v-model="filters.archivelog" />
    </CustomField>

    <CustomField label="Disaster Recovery">
      <CustomRadio v-model="filters.dataguard" />
    </CustomField>

    <CustomField label="High Availability">
      <CustomRadio v-model="filters.ha" />
    </CustomField>

    <CustomField label="DataFile">
      <CustomSlider
        v-model="filters.datafileSize"
        :ticks="[mindatafileSize, maxdatafileSize]"
        :steps="0.001"
      />
    </CustomField>

    <CustomField label="Segmemnt">
      <CustomSlider
        v-model="filters.segmentsSize"
        :ticks="[minsegmentsSize, maxsegmentsSize]"
        :steps="0.001"
      />
    </CustomField>

    <CustomField label="Charset">
      <CustomAutocomplete
        v-model="filters.charset"
        :filterResult="filteredcharset"
        :filterMethod="setAutocompletes"
      />
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
      autocompletes: ['name', 'version', 'hostname', 'uniqueName', 'charset'],
      selects: ['status', 'environment'],
      sliders: [
        'work',
        'cpuCount',
        'blockSize',
        'memory',
        'datafileSize',
        'segmentsSize'
      ],
      filters: {
        archivelog: '',
        dataguard: '',
        ha: ''
      }
    }
  },
  created() {
    this.fullData = this.getAllOracleDBs
  },
  methods: {
    resetFilters() {
      this.filters = {
        archivelog: '',
        dataguard: '',
        ha: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getAllOracleDBs'])
  }
}
</script>

<style lang="scss" scoped></style>
