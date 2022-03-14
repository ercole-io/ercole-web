<template>
  <AdvancedFiltersBase :submitAction="apply">
    <Collapse :collapses="collapses">
      <template slot="General">
        <CustomField :label="$t('common.fields.name')">
          <CustomAutocomplete
            v-model="filters.name"
            :filterResult="filteredname"
            :filterMethod="setAutocompletes"
          />
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

        <CustomField :label="$t('common.fields.pluggable')">
          <CustomRadio v-model="filters.isCDB" />
        </CustomField>

        <CustomField :label="$t('common.fields.services')">
          <CustomAutocomplete
            v-model="filters.services"
            :filterResult="filteredservices"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.work')">
          <CustomSlider
            v-model="filters.work"
            :ticks="[minwork, maxwork]"
            :steps="1"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.cpuCount')">
          <CustomSlider
            v-model="filters.cpuCount"
            :ticks="[mincpuCount, maxcpuCount]"
            :steps="1"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.blockSize')">
          <CustomSlider
            v-model="filters.blockSize"
            :ticks="[minblockSize, maxblockSize]"
            :steps="1"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.status')">
          <CustomSelect v-model="filters.status" :options="filteredstatus" />
        </CustomField>

        <CustomField :label="$t('common.fields.uniqueName')">
          <CustomAutocomplete
            v-model="filters.uniqueName"
            :filterResult="filtereduniqueName"
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

        <CustomField :label="$t('common.fields.archMode')">
          <CustomRadio v-model="filters.archivelog" />
        </CustomField>

        <CustomField :label="$t('common.fields.disRecovery')">
          <CustomRadio v-model="filters.dataguard" />
        </CustomField>

        <CustomField :label="$t('common.fields.highAvail')">
          <CustomRadio v-model="filters.ha" />
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
            v-model="filters.segmentsSize"
            :ticks="[minsegmentsSize, maxsegmentsSize]"
            :steps="0.001"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.charset')">
          <CustomAutocomplete
            v-model="filters.charset"
            :filterResult="filteredcharset"
            :filterMethod="setAutocompletes"
          />
        </CustomField>
      </template>
    </Collapse>
  </AdvancedFiltersBase>
</template>

<script>
import { mapGetters } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import Collapse from '@/components/common/Collapse.vue'

export default {
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: [
        'name',
        'version',
        'hostname',
        'uniqueName',
        'charset',
        'services',
      ],
      selects: ['status', 'environment'],
      sliders: [
        'work',
        'cpuCount',
        'blockSize',
        'memory',
        'datafileSize',
        'segmentsSize',
      ],
      filters: {
        archivelog: '',
        dataguard: '',
        ha: '',
        isCDB: '',
      },
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
        ha: '',
        isCDB: '',
      }
    },
  },
  computed: {
    ...mapGetters(['getAllOracleDBs']),
  },
}
</script>

<style lang="scss" scoped></style>
