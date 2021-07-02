<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField :label="$t('common.fields.name')">
      <CustomAutocomplete
        v-model="filters.name"
        :filterResult="filteredname"
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
      <CustomSelect
        v-model="filters.charsetSystem"
        :options="filteredcharsetSystem"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.architecture')">
      <CustomSelect
        v-model="filters.architecture"
        :options="filteredarchitecture"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.buffer')">
      <CustomSlider
        v-model="filters.bufferPoolSize"
        :ticks="[minbufferPoolSize, maxbufferPoolSize]"
        :steps="1"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.edition')">
      <CustomSelect v-model="filters.edition" :options="filterededition" />
    </CustomField>

    <CustomField :label="$t('common.fields.engine')">
      <CustomSelect v-model="filters.engine" :options="filteredengine" />
    </CustomField>

    <CustomField :label="$t('common.fields.platform')">
      <CustomSelect v-model="filters.platform" :options="filteredplatform" />
    </CustomField>

    <CustomField :label="$t('common.fields.version')">
      <CustomSelect v-model="filters.version" :options="filteredversion" />
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
