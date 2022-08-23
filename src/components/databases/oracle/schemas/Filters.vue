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

        <CustomField :label="$t('common.fields.name')">
          <CustomAutocomplete
            v-model="filters.dbName"
            :filterResult="filtereddbName"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="User">
          <CustomSelect v-model="filters.user" :options="filtereduser" />
        </CustomField>

        <CustomField label="Total">
          <CustomSlider
            v-model="filters.total"
            :ticks="[mintotal, maxtotal]"
            :steps="1"
          />
        </CustomField>

        <CustomField label="Tables">
          <CustomSlider
            v-model="filters.tables"
            :ticks="[mintables, maxtables]"
            :steps="1"
          />
        </CustomField>

        <CustomField label="Indexes">
          <CustomSlider
            v-model="filters.indexes"
            :ticks="[minindexes, maxindexes]"
            :steps="1"
          />
        </CustomField>

        <CustomField label="LOB">
          <CustomSlider
            v-model="filters.lob"
            :ticks="[minlob, maxlob]"
            :steps="1"
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
      autocompletes: ['hostname', 'dbName'],
      selects: ['user'],
      sliders: ['total', 'tables', 'indexes', 'lob'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
