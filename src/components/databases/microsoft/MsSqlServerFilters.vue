<template>
  <AdvancedFiltersBase :submitAction="apply">
    <Collapse :collapses="collapses">
      <template slot="General">
        <CustomField :label="$t('common.fields.name')">
          <CustomAutocomplete
            v-model="filters.name"
            :filterResult="filteredname"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.hostname')">
          <CustomAutocomplete
            v-model="filters.hostname"
            :filterResult="filteredhostname"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.edition')">
          <CustomSelect v-model="filters.edition" :options="filterededition" />
        </CustomField>

        <CustomField :label="$t('common.fields.state')">
          <CustomSelect
            v-model="filters.stateDesc"
            :options="filteredstateDesc"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.collation')">
          <CustomSelect
            v-model="filters.collationName"
            :options="filteredcollationName"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.version')">
          <CustomSelect v-model="filters.version" :options="filteredversion" />
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
      autocompletes: ['name', 'hostname'],
      selects: ['edition', 'stateDesc', 'collationName', 'version'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
