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

        <CustomField label="Resource ID">
          <CustomAutocomplete
            v-model="filters.resourceID"
            :filterResult="filteredresourceID"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Profile ID">
          <CustomSelect
            v-model="filters.profileID"
            :options="filteredprofileID"
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
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: ['name', 'resourceID'],
      selects: ['category', 'suggestion', 'objectType', 'profileID'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
