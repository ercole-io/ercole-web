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
          <CustomSelect
            v-model="filters.platform"
            :options="filteredplatform"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.version')">
          <CustomSelect v-model="filters.version" :options="filteredversion" />
        </CustomField>

        <CustomField :label="$t('common.fields.highAvail')">
          <CustomRadio v-model="filters.highAvailability" />
        </CustomField>
      </template>
    </Collapse>

    <slot />
  </AdvancedFiltersBase>
</template>

<script>
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import Collapse from '@/components/common/Collapse.vue'

export default {
  name: 'databases-mysql-filters-component',
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: ['name', 'hostname'],
      selects: [
        'environment',
        'charsetSystem',
        'architecture',
        'edition',
        'engine',
        'platform',
        'version',
      ],
      sliders: ['bufferPoolSize'],
      filters: {
        highAvailability: '',
      },
    }
  },
  methods: {
    resetFilters() {
      this.filters = {
        highAvailability: '',
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
