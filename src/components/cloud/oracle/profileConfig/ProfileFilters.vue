<template>
  <AdvancedFiltersBase :submitAction="apply">
    <Collapse :collapses="collapses">
      <template slot="General">
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
          <CustomSelect
            v-model="filters.userOCID"
            :options="filtereduserOCID"
          />
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
      </template>
    </Collapse>

    <slot />
  </AdvancedFiltersBase>
</template>

<script>
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import Collapse from '@/components/common/Collapse.vue'

export default {
  name: 'cloud-oracle-profileconfig-filters-component',
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: ['profile'],
      selects: ['tenancyOCID', 'userOCID', 'keyFingerprint', 'region'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
