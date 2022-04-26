<template>
  <vueMultiSelect
    v-model="cpuChartSelected"
    :search="false"
    :filters="filters"
    :position="position"
    :options="options"
    :selectOptions="dataOptions"
    historyButton
    :searchPlaceholder="placeholderName"
    :emptyTabText="noDataFound"
    :btnLabel="() => btLabel"
    class="custom-multi-select"
  >
    <template v-slot:option="{ option }">
      <span>{{ option.name }}</span>
    </template>
  </vueMultiSelect>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import vueMultiSelect from 'vue-multi-select'

export default {
  props: {
    selected: {
      type: Array,
      required: true,
    },
    dataOptions: {
      type: Array,
      required: true,
    },
    placeholderName: {
      type: String,
      default: '',
    },
    noDataText: {
      type: String,
      required: false,
    },
    btnLabelText: {
      type: String,
      required: false,
    },
  },
  components: {
    vueMultiSelect,
  },
  data() {
    return {
      options: {
        multi: true,
        labelName: 'id',
        labelValue: 'id',
        cssSelected: (option) =>
          option['selected'] ? { 'background-color': '#2bad84' } : '',
      },
      position: 'bottom-right',
    }
  },
  computed: {
    cpuChartSelected: {
      get() {
        return this.selected.slice(0, 10)
      },
      set(val) {
        bus.$emit('cpuChartSelected', val)
      },
    },
    filters() {
      return [
        {
          nameAll: this.$i18n.t('views.hostDetails.selectAll'),
          nameNotAll: this.$i18n.t('views.hostDetails.deselectAll'),
          func() {
            return true
          },
        },
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
    },
  },
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
