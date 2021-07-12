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
    :emptyTabText="noDataFound"
    :btnLabel="() => btLabel"
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
      required: false
    },
    btnLabelText: {
      type: String,
      required: false
    }
  },
  components: {
    vueMultiSelect
  },
  data() {
    return {
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
        return this.selected.slice(0, 10)
      },
      set(val) {
        bus.$emit('selectedData', val)
      }
    },
    filters() {
      return [
        {
          nameAll: this.$i18n.t('views.hostDetails.selectAll'),
          nameNotAll: this.$i18n.t('views.hostDetails.deselectAll'),
          func() {
            return true
          }
        }
      ]
    },
    noDataFound() {
      return this.noDataText
        ? this.noDataText
        : this.$i18n.t('views.hostDetails.noResults')
    },
    btLabel() {
      return this.btnLabelText
        ? this.btnLabelText
        : this.$i18n.t('views.hostDetails.multiSelect')
    }
  }
}
</script>

<style lang="scss" scoped>
.selected-text {
  position: absolute;
  top: 40px;
  left: 5px;
  font-size: 12px;
  font-weight: normal;

  span {
    font-weight: 500;
  }
}
</style>
