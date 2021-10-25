<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField :label="$t('common.collumns.profileName')">
      <CustomAutocomplete
        v-model="filters.profile"
        :filterResult="filteredprofile"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField :label="$t('common.collumns.tenancy')">
      <CustomSelect
        v-model="filters.tenancyOCID"
        :options="filteredtenancyOCID"
      />
    </CustomField>

    <CustomField :label="$t('common.collumns.userOCID')">
      <CustomSelect v-model="filters.userOCID" :options="filtereduserOCID" />
    </CustomField>

    <CustomField :label="$t('common.collumns.keyFingerprint')">
      <CustomSelect
        v-model="filters.keyFingerprint"
        :options="filteredkeyFingerprint"
      />
    </CustomField>

    <CustomField :label="$t('common.collumns.region')">
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
