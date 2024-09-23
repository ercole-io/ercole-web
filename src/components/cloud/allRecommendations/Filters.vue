<template>
  <AdvancedFiltersBase :submitAction="apply">
    <Collapse :collapses="collapses">
      <template slot="General">
        <CustomField label="Cloud">
          <CustomSelect v-model="filters.cloud" :options="filteredcloud" />
        </CustomField>

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
      </template>

      <template slot="Oracle">
        <CustomField :label="$t('common.fields.repoName')">
          <CustomAutocomplete
            v-model="filters.ociName"
            :filterResult="filteredociName"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.compartmentName')">
          <CustomAutocomplete
            v-model="filters.ociCompartmentName"
            :filterResult="filteredociCompartmentName"
            :filterMethod="setAutocompletes"
          />
        </CustomField>
      </template>

      <template slot="AWS">
        <CustomField :label="$t('common.fields.repoName')">
          <CustomAutocomplete
            v-model="filters.awsName"
            :filterResult="filteredawsName"
            :filterMethod="setAutocompletes"
          />
        </CustomField>
      </template>

      <template slot="Google">
        <CustomField label="Project Name">
          <CustomAutocomplete
            v-model="filters.gcpProjectName"
            :filterResult="filteredgcpProjectName"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Profile ID">
          <CustomAutocomplete
            v-model="filters.gcpProfileID"
            :filterResult="filteredgcpProfileID"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Resource Name">
          <CustomAutocomplete
            v-model="filters.gcpResourceName"
            :filterResult="filteredgcpResourceName"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Resource ID">
          <CustomAutocomplete
            v-model="filters.gcpResourceID"
            :filterResult="filteredgcpResourceID"
            :filterMethod="setAutocompletes"
          />
        </CustomField>
      </template>
    </Collapse>
  </AdvancedFiltersBase>
</template>

<script>
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import Collapse from '@/components/common/Collapse.vue'

export default {
  name: 'cloud-all-recommendations-filters-component',
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General', 'Oracle', 'AWS', 'Google'],
      autocompletes: [
        'ociName',
        'ociCompartmentName',
        'awsName',
        'gcpProjectName',
        'gcpProfileID',
        'gcpResourceName',
        'gcpResourceID',
      ],
      selects: ['cloud', 'category', 'suggestion', 'objectType'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
