<template>
  <vueMultiSelect
    v-model="selectedData"
    search
    :filters="filters"
    :position="position"
    :options="options"
    :selectOptions="dataOptions"
    historyButton
    :searchPlaceholder="placeholderName"
    :emptyTabText="noDataText"
    :btnLabel="() => btnLabelText"
    class="custom-multi-select"
  />
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import vueMultiSelect from 'vue-multi-select'

export default {
  props: {
    selected: {
      type: Array,
      required: true
    },
    dataOptions: {
      type: Array,
      required: true
    },
    placeholderName: {
      type: String,
      default: ''
    },
    noDataText: {
      type: String,
      default: 'No results found!'
    },
    btnLabelText: {
      type: String,
      default: 'Multi Select'
    }
  },
  components: {
    vueMultiSelect
  },
  data() {
    return {
      filters: [
        {
          nameAll: 'Select all',
          nameNotAll: 'Deselect all',
          func() {
            return true
          }
        }
      ],
      options: {
        multi: true,
        cssSelected: option =>
          option.selected ? { 'background-color': '#679189' } : ''
      },
      position: 'bottom-right'
    }
  },
  computed: {
    selectedData: {
      get() {
        return this.selected
      },
      set(val) {
        bus.$emit('selectedData', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
