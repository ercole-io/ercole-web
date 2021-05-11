<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Cluster Name">
      <b-autocomplete
        v-model="filters.name"
        size="is-small"
        type="number"
        clearable
        :data="filteredData"
        @typing="setFilteredAutocomplete($event, 'name', getHypervisors)"
      />
    </CustomField>

    <CustomField label="Type">
      <b-select
        v-model="filters.type"
        size="is-small"
        placeholder="Select a Type"
        expanded
      >
        <option :value="null" v-if="filters.type">
          Reset
        </option>
        <option v-for="(type, index) in filteredtype" :key="index">
          {{ type }}
        </option>
      </b-select>
    </CustomField>

    <CustomField label="Core">
      <b-slider v-model="filters.cpu" :min="mincpu" :max="maxcpu">
        <b-slider-tick :value="mincpu">
          {{ mincpu }}
        </b-slider-tick>
        <b-slider-tick :value="maxcpu">
          {{ maxcpu }}
        </b-slider-tick>
      </b-slider>
    </CustomField>

    <CustomField label="Socket">
      <b-slider v-model="filters.sockets" :min="minsockets" :max="maxsockets">
        <template v-for="val in filteredsockets">
          <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
        </template>
      </b-slider>
    </CustomField>

    <CustomField label="Physical Host">
      <b-autocomplete
        v-model="filters.virtualizationNodes"
        size="is-small"
        type="number"
        clearable
        :data="filteredData"
        @typing="
          setFilteredAutocomplete($event, 'virtualizationNodes', getHypervisors)
        "
      />
    </CustomField>

    <CustomField label="Total VM">
      <b-slider
        v-model="filters.vmsCount"
        :min="minvmsCount"
        :max="maxvmsCount"
      >
        <b-slider-tick :value="minvmsCount">
          {{ minvmsCount }}
        </b-slider-tick>
        <b-slider-tick :value="maxvmsCount">
          {{ maxvmsCount }}
        </b-slider-tick>
      </b-slider>
    </CustomField>

    <CustomField label="Total VM Ercole">
      <b-slider
        v-model="filters.vmsErcoleAgentCount"
        :min="minvmsErcoleAgentCount"
        :max="maxvmsErcoleAgentCount"
      >
        <b-slider-tick :value="minvmsErcoleAgentCount">
          {{ minvmsErcoleAgentCount }}
        </b-slider-tick>
        <b-slider-tick :value="maxvmsErcoleAgentCount">
          {{ maxvmsErcoleAgentCount }}
        </b-slider-tick>
      </b-slider>
    </CustomField>
  </AdvancedFiltersBase>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
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
      filteredtype: [],
      filteredsockets: []
    }
  },
  beforeMount() {
    this.setAutocomplete()
    this.setSlider()

    bus.$on('onResetAction', () => this.reset(this.resetFilters))
  },
  methods: {
    resetFilters() {
      this.setSlider()
    },
    setAutocomplete() {
      this.setAutocompleteData('name', this.getHypervisors)
      this.setAutocompleteData('type', this.getHypervisors)
      this.filteredtype = prepareDataForAutocomplete(
        this.getHypervisors,
        'type'
      )
      this.setAutocompleteData('virtualizationNodes', this.getHypervisors)
    },
    setSlider() {
      this.setSliderFilterConfig('cpu', this.getHypervisors)
      this.setSliderFilterConfig('sockets', this.getHypervisors)
      this.setSliderFilterConfig('vmsCount', this.getHypervisors)
      this.setSliderFilterConfig('vmsErcoleAgentCount', this.getHypervisors)
    }
  },
  computed: {
    ...mapGetters(['getHypervisors'])
  }
}
</script>

<style lang="scss" scoped></style>
