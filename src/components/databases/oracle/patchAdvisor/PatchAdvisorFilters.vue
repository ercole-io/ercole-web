<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Hostname">
      <b-autocomplete
        v-model="filters.hostname"
        size="is-small"
        clearable
        :data="filteredData"
        @typing="
          setFilteredAutocomplete($event, 'hostname', getOraclePatchAdvisor)
        "
      />
    </CustomField>

    <CustomField label="Database">
      <b-autocomplete
        v-model="filters.dbname"
        size="is-small"
        clearable
        :data="filteredData"
        @typing="
          setFilteredAutocomplete($event, 'dbname', getOraclePatchAdvisor)
        "
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
        <option v-for="(env, index) in filteredDbver" :key="index">
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
        <option v-for="(env, index) in filteredDescription" :key="index">
          {{ env }}
        </option>
      </b-select>
    </CustomField>
  </AdvancedFiltersBase>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapActions } from 'vuex'
import { prepareDataForAutocomplete } from '@/helpers/helpers.js'
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
      filteredDbver: [],
      filteredDescription: []
    }
  },
  beforeMount() {
    this.filteredDbver = prepareDataForAutocomplete(
      this.getOraclePatchAdvisor,
      'dbver'
    )
    this.filteredDescription = prepareDataForAutocomplete(
      this.getOraclePatchAdvisor,
      'description'
    )

    bus.$on('onResetAction', () => this.reset(this.resetFilters))
  },
  methods: {
    ...mapActions(['getPatchAdvisor']),
    resetFilters() {
      this.startDate = null
    }
  },
  computed: {
    ...mapGetters(['getOraclePatchAdvisor'])
  }
}
</script>

<style lang="scss" scoped></style>
