import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'

import {
  prepareDataForAutocomplete,
  organizeKeysBeforeFilter,
  returnAutocompleteData,
} from '@/helpers/helpers.js'

import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'
import CustomField from '@/components/common/Form/CustomField.vue'
import CustomAutocomplete from '@/components/common/Form/CustomAutocomplete.vue'
import CustomSelect from '@/components/common/Form/CustomSelect.vue'
import CustomSlider from '@/components/common/Form/CustomSlider.vue'
import CustomRadio from '@/components/common/Form/CustomRadio.vue'
import CustomDatepicker from '@/components/common/Form/CustomDatepicker.vue'

export default {
  components: {
    AdvancedFiltersBase,
    CustomField,
    CustomAutocomplete,
    CustomSelect,
    CustomSlider,
    CustomRadio,
    CustomDatepicker,
  },
  data() {
    return {
      fullData: [],
      filters: {},
    }
  },
  created() {
    bus.$on('onResetAction', () => this.reset(this.resetFilters))
  },
  beforeMount() {
    this.setAutocompletes()
    this.setSelects()
    this.setSliders()
  },
  methods: {
    apply() {
      this.$store.commit('SET_FILTERS', {
        status: true,
        filters: organizeKeysBeforeFilter(this.filters),
        showCheckbox: [this.alertStatus, this.filters.alertCategory],
        selectList: this.selects,
      })
    },
    reset(cb = () => {}) {
      this.$store.commit('SET_FILTERS', {
        status: false,
        filters: [],
        showCheckbox: [],
      })
      this.filters = {}

      cb()

      this.setSliders()
    },

    // input autocompletes
    setAutocompletes(text = '') {
      _.forEach(this.autocompletes, (val) => {
        this['filtered' + val] = returnAutocompleteData(
          text,
          this.fullData,
          val
        )
      })
    },

    // selects
    setSelects() {
      _.forEach(this.selects, (val) => {
        const fillNumbers = prepareDataForAutocomplete(this.fullData, val)
        this['filtered' + val] = this.clearFilteredResult(fillNumbers)
      })
    },

    // sliders
    setSliders() {
      _.forEach(this.sliders, (val) => {
        const fillNumbers = prepareDataForAutocomplete(this.fullData, val)
        this.resolveSliders(val, fillNumbers)
      })
    },
    resolveSliders(value, numbers) {
      this['filtered' + value] = this.clearFilteredResult(numbers)

      this.filters[value] = [
        this['filtered' + value][0],
        _.last(this['filtered' + value]),
      ]

      this['min' + value] = this['filtered' + value][0]
      this['max' + value] = _.last(this['filtered' + value])
    },
    clearFilteredResult(numbers) {
      return _.without(numbers, undefined, null, '')
    },
  },
  beforeDestroy() {
    this.fullData = []
    this.reset()
  },
}
