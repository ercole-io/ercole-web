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

        <CustomField :label="$t('common.fields.environment')">
          <CustomSelect
            v-model="filters.environment"
            :options="filteredenvironment"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.location')">
          <CustomSelect
            v-model="filters.location"
            :options="filteredlocation"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.state')">
          <CustomSelect v-model="filters.charset" :options="filteredcharset" />
        </CustomField>

        <CustomField :label="$t('common.fields.version')">
          <CustomSelect v-model="filters.version" :options="filteredversion" />
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
  name: 'databases-mongodb-filters-component',
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: ['dbName', 'hostname'],
      selects: ['environment', 'charset', 'version', 'location'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
