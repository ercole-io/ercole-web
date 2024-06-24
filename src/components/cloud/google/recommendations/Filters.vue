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

        <CustomField label="Project ID">
          <CustomAutocomplete
            v-model="filters.projectID"
            :filterResult="filteredprojectID"
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

        <CustomField label="Instance ID">
          <CustomAutocomplete
            v-model="filters.instanceID"
            :filterResult="filteredinstanceID"
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
      autocompletes: ['projectID', 'projectName', 'profileID', 'instanceID'],
      selects: ['category', 'suggestion', 'objectType'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
