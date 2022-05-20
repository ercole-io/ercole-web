<template>
  <AdvancedFiltersBase :submitAction="apply">
    <Collapse :collapses="collapses">
      <template slot="General">
        <CustomField :label="$t('common.fields.hostname')">
          <CustomAutocomplete
            v-model="filters.hostname"
            :filterResult="filteredhostname"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Grantee">
          <CustomSelect v-model="filters.grantee" :options="filteredgrantee" />
        </CustomField>

        <CustomField label="Admin Option">
          <CustomSelect
            v-model="filters.adminOption"
            :options="filteredadminOption"
          />
        </CustomField>

        <CustomField label="Default Role">
          <CustomSelect
            v-model="filters.defaultRole"
            :options="filtereddefaultRole"
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
      autocompletes: ['hostname'],
      selects: ['grantee', 'adminOption', 'defaultRole'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
