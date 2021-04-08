<template>
  <DrawerFilters title="Licenses Used Filters">
    <form @submit.prevent="apply">
      <CustomField label="Hostname">
        <b-autocomplete
          v-model="filters.hostname"
          size="is-small"
          type="number"
          clearable
          :data="filteredData"
          @typing="setFilteredAutocomplete($event, 'hostname', getUsedLicenses)"
        />
      </CustomField>

      <CustomField label="DB Name">
        <b-autocomplete
          v-model="filters.dbName"
          size="is-small"
          type="number"
          clearable
          :data="filteredData"
          @typing="setFilteredAutocomplete($event, 'dbName', getUsedLicenses)"
        />
      </CustomField>

      <CustomField label="Part Number">
        <b-autocomplete
          v-model="filters.licenseTypeID"
          size="is-small"
          type="number"
          clearable
          :data="filteredData"
          @typing="
            setFilteredAutocomplete($event, 'licenseTypeID', getUsedLicenses)
          "
        />
      </CustomField>

      <CustomField label="Used Licenses">
        <b-slider
          v-model="filters.usedLicenses"
          :min="minusedLicenses"
          :max="maxusedLicenses"
          :step="0.5"
        >
          <!-- <template v-for="val in filteredusedLicenses">
            <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
          </template> -->

          <b-slider-tick :value="minusedLicenses">
            {{ minusedLicenses }}
          </b-slider-tick>
          <b-slider-tick :value="maxusedLicenses">
            {{ maxusedLicenses }}
          </b-slider-tick>
        </b-slider>
      </CustomField>

      <ActionButtons />
    </form>
  </DrawerFilters>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import DrawerFilters from '@/components/common/DrawerFilters.vue'
import ActionButtons from '@/components/common/Form/ActionButtons.vue'
import CustomField from '@/components/common/Form/CustomField.vue'

export default {
  mixins: [localFiltersMixin],
  components: {
    DrawerFilters,
    ActionButtons,
    CustomField
  },
  data() {
    return {
      filteredusedLicenses: [],
      minusedLicenses: null,
      maxusedLicenses: null
    }
  },
  beforeMount() {
    this.setSlider()

    bus.$on('onResetAction', () => this.reset(this.resetFilters))
  },
  methods: {
    resetFilters() {
      this.setSlider()
    },
    setSlider() {
      this.setSliderFilterConfig('usedLicenses', this.getUsedLicenses)
    }
  },
  computed: {
    ...mapGetters(['getUsedLicenses'])
  }
}
</script>

<style lang="scss" scoped></style>
