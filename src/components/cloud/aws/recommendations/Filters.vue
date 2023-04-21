<template>
  <AdvancedFiltersBase :submitAction="apply">
    <Collapse :collapses="collapses">
      <template slot="General">
        <CustomField :label="$t('common.fields.category')">
          <CustomSelect
            v-model="filters.category"
            :options="filteredcategory"
          />
        </CustomField>

        <CustomField label="Object Type">
          <CustomSelect
            v-model="filters.objectType"
            :options="filteredobjectType"
          />
        </CustomField>

        <CustomField label="Suggestion">
          <CustomSelect
            v-model="filters.suggestion"
            :options="filteredsuggestion"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.repoName')">
          <CustomAutocomplete
            v-model="filters.name"
            :filterResult="filteredname"
            :filterMethod="setAutocompletes"
          />
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
  name: 'cloud-aws-recommendations-filters-component',
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: ['name'],
      selects: ['category', 'suggestion', 'objectType'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
