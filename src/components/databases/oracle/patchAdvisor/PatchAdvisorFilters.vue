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

        <CustomField :label="$t('common.fields.dbs')">
          <CustomAutocomplete
            v-model="filters.dbname"
            :filterResult="filtereddbname"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.version')">
          <CustomSelect v-model="filters.dbver" :options="filtereddbver" />
        </CustomField>

        <CustomField :label="$t('common.fields.psu')">
          <CustomSelect
            v-model="filters.description"
            :options="filtereddescription"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.months', ['4'])">
          <CustomRadio v-model="filters.fourMonths" />
        </CustomField>

        <CustomField :label="$t('common.fields.months', ['6'])">
          <CustomRadio v-model="filters.sixMonths" />
        </CustomField>

        <CustomField :label="$t('common.fields.months', ['12'])">
          <CustomRadio v-model="filters.twelveMonths" />
        </CustomField>
      </template>
    </Collapse>
  </AdvancedFiltersBase>
</template>

<script>
import { mapGetters } from 'vuex'
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
      autocompletes: ['hostname', 'dbname'],
      selects: ['dbver', 'description'],
      filters: {
        fourMonths: '',
        sixMonths: '',
        twelveMonths: '',
      },
    }
  },
  created() {
    this.fullData = this.getOraclePatchAdvisor
  },
  methods: {
    resetFilters() {
      this.filters = {
        fourMonths: '',
        sixMonths: '',
        twelveMonths: '',
      }
    },
  },
  computed: {
    ...mapGetters(['getOraclePatchAdvisor']),
  },
}
</script>

<style lang="scss" scoped></style>
