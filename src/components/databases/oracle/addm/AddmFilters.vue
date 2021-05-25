<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Performance Impact">
      <b-slider
        v-model="filters.benefit"
        :min="minbenefit"
        :max="maxbenefit"
        :step="0.11"
      >
        <b-slider-tick :value="minbenefit">
          {{ minbenefit }}
        </b-slider-tick>
        <b-slider-tick :value="maxbenefit">
          {{ maxbenefit }}
        </b-slider-tick>
      </b-slider>
    </CustomField>

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

    <CustomField label="Finding">
      <b-select
        v-model="filters.finding"
        size="is-small"
        placeholder="Select an Finding"
        expanded
      >
        <option :value="null" v-if="filters.finding">
          Reset
        </option>
        <option v-for="(env, index) in filteredfinding" :key="index">
          {{ env }}
        </option>
      </b-select>
    </CustomField>

    <CustomField label="Recommendation">
      <b-select
        v-model="filters.recommendation"
        size="is-small"
        placeholder="Select an Recommendation"
        expanded
      >
        <option :value="null" v-if="filters.recommendation">
          Reset
        </option>
        <option v-for="(env, index) in filteredrecommendation" :key="index">
          {{ env }}
        </option>
      </b-select>
    </CustomField>

    <CustomField label="Action">
      <b-autocomplete
        v-model="filters.action"
        size="is-small"
        clearable
        :data="filteredaction"
        @typing="setAutocompletes($event)"
      />
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
      autocompletes: ['hostname', 'dbname', 'action'],
      selects: ['finding', 'recommendation'],
      sliders: ['benefit']
    }
  },
  created() {
    this.fullData = this.getOracleAddms

    bus.$on('onResetAction', () => this.reset())
  },
  computed: {
    ...mapGetters(['getOracleAddms'])
  }
}
</script>

<style lang="scss" scoped></style>
