<template>
  <AdvancedFiltersBase :submitAction="apply">
    <Collapse :collapses="collapses">
      <template slot="General">
        <CustomField :label="$t('common.collumns.profileName')">
          <CustomAutocomplete
            v-model="filters.name"
            :filterResult="filteredname"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Tenant ID">
          <CustomSelect
            v-model="filters.tenantid"
            :options="filteredtenantid"
          />
        </CustomField>

        <CustomField label="Client ID">
          <CustomSelect
            v-model="filters.clientid"
            :options="filteredclientid"
          />
        </CustomField>

        <CustomField label="Subscription ID">
          <CustomSelect
            v-model="filters.subscriptionid"
            :options="filteredsubscriptionid"
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
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: ['name'],
      selects: ['tenantid', 'clientid', 'subscriptionid', 'region'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
