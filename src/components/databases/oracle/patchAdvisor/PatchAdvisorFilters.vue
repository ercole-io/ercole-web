<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Hostname">
      <b-autocomplete
        v-model="filters.hostname"
        size="is-small"
        clearable
        :data="filteredhostname"
        @typing="setAutocompletes($event)"
      />
    </CustomField>

    <CustomField label="Database">
      <b-autocomplete
        v-model="filters.dbname"
        size="is-small"
        clearable
        :data="filtereddbname"
        @typing="setAutocompletes($event)"
      />
    </CustomField>

    <CustomField label="Version">
      <b-select
        v-model="filters.dbver"
        size="is-small"
        placeholder="Select a Version"
        expanded
      >
        <option :value="null" v-if="filters.dbver">
          Reset
        </option>
        <option v-for="(env, index) in filtereddbver" :key="index">
          {{ env }}
        </option>
      </b-select>
    </CustomField>

    <CustomField label="PSU">
      <b-select
        v-model="filters.description"
        size="is-small"
        placeholder="Select a PSU"
        expanded
      >
        <option :value="null" v-if="filters.description">
          Reset
        </option>
        <option v-for="(env, index) in filtereddescription" :key="index">
          {{ env }}
        </option>
      </b-select>
    </CustomField>

    <CustomField label="4 Months">
      <div class="is-flex" style="justify-content: space-around;">
        <b-radio
          size="is-small"
          v-model="filters.fourMonths"
          native-value="true"
        >
          Yes
        </b-radio>
        <b-radio
          size="is-small"
          v-model="filters.fourMonths"
          native-value="false"
        >
          No
        </b-radio>
        <b-radio size="is-small" v-model="filters.fourMonths" native-value="">
          All
        </b-radio>
      </div>
    </CustomField>

    <CustomField label="6 Months">
      <div class="is-flex" style="justify-content: space-around;">
        <b-radio
          size="is-small"
          v-model="filters.sixMonths"
          native-value="true"
        >
          Yes
        </b-radio>
        <b-radio
          size="is-small"
          v-model="filters.sixMonths"
          native-value="false"
        >
          No
        </b-radio>
        <b-radio size="is-small" v-model="filters.sixMonths" native-value="">
          All
        </b-radio>
      </div>
    </CustomField>

    <CustomField label="12 Months">
      <div class="is-flex" style="justify-content: space-around;">
        <b-radio
          size="is-small"
          v-model="filters.twelveMonths"
          native-value="true"
        >
          Yes
        </b-radio>
        <b-radio
          size="is-small"
          v-model="filters.twelveMonths"
          native-value="false"
        >
          No
        </b-radio>
        <b-radio size="is-small" v-model="filters.twelveMonths" native-value="">
          All
        </b-radio>
      </div>
    </CustomField>
  </AdvancedFiltersBase>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'
import CustomField from '@/components/common/Form/CustomField.vue'

export default {
  mixins: [localFiltersMixin],
  components: {
    AdvancedFiltersBase,
    CustomField
  },
  data() {
    return {
      autocompletes: ['hostname', 'dbname'],
      selects: ['dbver', 'description'],
      filters: {
        fourMonths: '',
        sixMonths: '',
        twelveMonths: ''
      }
    }
  },
  created() {
    this.fullData = this.getOraclePatchAdvisor

    bus.$on('onResetAction', () => this.reset(this.resetFilters))
  },
  methods: {
    resetFilters() {
      this.filters = {
        fourMonths: '',
        sixMonths: '',
        twelveMonths: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getOraclePatchAdvisor'])
  }
}
</script>

<style lang="scss" scoped></style>
