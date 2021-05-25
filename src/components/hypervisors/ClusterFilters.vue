<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Physical Host">
      <b-autocomplete
        v-model="filters.virtualizationNode"
        size="is-small"
        type="number"
        clearable
        :data="filteredvirtualizationNode"
        @typing="setAutocompletes($event)"
      />
    </CustomField>

    <CustomField label="Hostname">
      <b-autocomplete
        v-model="filters.hostname"
        size="is-small"
        type="number"
        clearable
        :data="filteredhostname"
        @typing="setAutocompletes($event)"
      />
    </CustomField>

    <CustomField label="VM Name">
      <b-autocomplete
        v-model="filters.name"
        size="is-small"
        type="number"
        clearable
        :data="filteredname"
        @typing="setAutocompletes($event)"
      />
    </CustomField>

    <CustomField label="Capped CPU">
      <div class="is-flex" style="justify-content: space-around;">
        <b-radio
          size="is-small"
          v-model="filters.cappedCPU"
          :native-value="true"
        >
          Yes
        </b-radio>
        <b-radio
          size="is-small"
          v-model="filters.cappedCPU"
          :native-value="false"
        >
          No
        </b-radio>
        <b-radio size="is-small" v-model="filters.cappedCPU" native-value="">
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
      autocompletes: ['virtualizationNode', 'hostname', 'name'],
      filters: {
        cappedCPU: ''
      }
    }
  },
  created() {
    this.fullData = this.getCurrentClusterVms

    bus.$on('onResetAction', () => this.reset(this.resetFilters))
  },
  methods: {
    resetFilters() {
      this.filters = {
        cappedCPU: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getCurrentClusterVms'])
  }
}
</script>

<style lang="scss" scoped></style>
