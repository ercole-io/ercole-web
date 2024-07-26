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

        <CustomField label="Project Name">
          <CustomAutocomplete
            v-model="filters.projectName"
            :filterResult="filteredprojectName"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Profile ID">
          <CustomAutocomplete
            v-model="filters.profileID"
            :filterResult="filteredprofileID"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Resource Name">
          <CustomAutocomplete
            v-model="filters.resourceName"
            :filterResult="filteredresourceName"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Resource ID">
          <CustomAutocomplete
            v-model="filters.resourceID"
            :filterResult="filteredresourceID"
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
  name: 'cloud-google-recommendations-filters-component',
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: ['resourceName', 'projectName', 'profileID', 'resourceID'],
      selects: ['category', 'suggestion', 'objectType'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
