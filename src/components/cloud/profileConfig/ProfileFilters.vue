<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Profile Name">
      <CustomAutocomplete
        v-model="filters.profile"
        :filterResult="filteredprofile"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField label="Tenancy OCID">
      <CustomSelect
        v-model="filters.tenancyOCID"
        :options="filteredtenancyOCID"
      />
    </CustomField>

    <CustomField label="User OCID">
      <CustomSelect v-model="filters.userOCID" :options="filtereduserOCID" />
    </CustomField>

    <CustomField label="Key Fingerprint">
      <CustomSelect
        v-model="filters.keyFingerprint"
        :options="filteredkeyFingerprint"
      />
    </CustomField>

    <CustomField label="Region">
      <CustomSelect v-model="filters.region" :options="filteredregion" />
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
      autocompletes: ['profile'],
      selects: ['tenancyOCID', 'userOCID', 'keyFingerprint', 'region']
    }
  },
  created() {
    this.fullData = this.getOciProfiles
  },
  computed: {
    ...mapGetters(['getOciProfiles'])
  }
}
</script>

<style lang="scss" scoped></style>
