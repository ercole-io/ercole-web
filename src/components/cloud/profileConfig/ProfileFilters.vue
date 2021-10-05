<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Profile Name">
      <CustomAutocomplete
        v-model="filters.Profile"
        :filterResult="filteredProfile"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField label="Tenancy OCID">
      <CustomSelect
        v-model="filters.TenancyOCID"
        :options="filteredTenancyOCID"
      />
    </CustomField>

    <CustomField label="User OCID">
      <CustomSelect v-model="filters.UserOCID" :options="filteredUserOCID" />
    </CustomField>

    <CustomField label="Key Fingerprint">
      <CustomSelect
        v-model="filters.KeyFingerprint"
        :options="filteredKeyFingerprint"
      />
    </CustomField>

    <CustomField label="Region">
      <CustomSelect v-model="filters.Region" :options="filteredRegion" />
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
      autocompletes: ['Profile'],
      selects: ['type', 'TenancyOCID', 'UserOCID', 'KeyFingerprint', 'Region']
    }
  },
  created() {
    this.fullData = this.getProfileList
  },
  computed: {
    ...mapGetters(['getProfileList'])
  }
}
</script>

<style lang="scss" scoped></style>
