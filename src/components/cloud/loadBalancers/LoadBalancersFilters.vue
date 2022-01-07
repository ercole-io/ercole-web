<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField :label="$t('common.fields.type')">
      <CustomSelect v-model="filters.type" :options="filteredtype" />
    </CustomField>

    <CustomField :label="$t('common.fields.compartmentName')">
      <CustomAutocomplete
        v-model="filters.compartmentName"
        :filterResult="filteredcompartmentName"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.repoName')">
      <CustomAutocomplete
        v-model="filters.name"
        :filterResult="filteredname"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField :label="$t('common.fields.resourceID')">
      <CustomAutocomplete
        v-model="filters.resourceID"
        :filterResult="filteredresourceID"
        :filterMethod="setAutocompletes"
      />
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
      autocompletes: ['name', 'compartmentName', 'resourceID'],
      selects: ['type'],
    }
  },
  created() {
    this.fullData = this.getMergedData
  },
  computed: {
    ...mapGetters(['getMergedData']),
  },
}
</script>

<style lang="scss" scoped></style>
