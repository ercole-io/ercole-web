<template>
  <AdvancedFiltersBase :submitAction="apply">
    <Collapse :collapses="collapses">
      <template slot="General">
        <CustomField label="Type">
          <CustomSelect v-model="filters.type" :options="filteredtype" />
        </CustomField>

        <CustomField :label="$t('common.fields.agreeNumber')">
          <CustomAutocomplete
            v-model="filters.contractID"
            :filterResult="filteredcontractID"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.csi')">
          <CustomAutocomplete
            v-model="filters.csi"
            :filterResult="filteredcsi"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.numberLicenses')">
          <CustomAutocomplete
            v-model="filters.numberOfLicenses"
            :filterResult="filterednumberOfLicenses"
            :filterMethod="setAutocompletes"
          />
        </CustomField>
      </template>
    </Collapse>

    <slot />
  </AdvancedFiltersBase>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
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
      autocompletes: ['contractID', 'csi', 'numberOfLicenses'],
      selects: ['type'],
    }
  },
  mounted() {
    bus.$on('onTabChange', (value) => {
      if (value === 1) {
        this.reset()
        bus.$emit('data', this.returnLicensesContracts('mysql'))
      }
    })
  },
  computed: {
    ...mapGetters(['returnLicensesContracts']),
  },
}
</script>

<style lang="scss" scoped></style>
