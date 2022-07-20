<template>
  <AdvancedFiltersBase :submitAction="apply">
    <Collapse :collapses="collapses">
      <template slot="General">
        <CustomField label="ID">
          <CustomAutocomplete
            v-model="filters.id"
            :filterResult="filteredid"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Access Key ID">
          <CustomSelect
            v-model="filters.accesskeyid"
            :options="filteredaccesskeyid"
          />
        </CustomField>

        <CustomField :label="$t('common.collumns.region')">
          <CustomSelect v-model="filters.region" :options="filteredregion" />
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
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: ['id'],
      selects: ['accesskeyid', 'region'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
