<template>
  <b-autocomplete
    v-model="inputVal"
    size="is-small"
    type="number"
    icon="magnify"
    :placeholder="setPlaceholder"
    :data="filterResult"
    :open-on-focus="openOnFocus"
    :append-to-body="appendToBody"
    @typing="filterMethod($event)"
    @input="inputMethod"
    clearable
  >
    <template #empty>{{ $i18n.t('common.validations.noResults') }}</template>
  </b-autocomplete>
</template>

<script>
export default {
  props: {
    value: {},
    filterResult: {
      type: Array,
      required: true
    },
    filterMethod: {
      type: Function,
      default: () => {}
    },
    inputMethod: {
      type: Function,
      default: () => {}
    },
    setPlaceholder: {
      type: String,
      default: ''
    },
    openOnFocus: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    inputVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style lang="scss">
.autocomplete {
  .dropdown-menu {
    min-width: 30%;
  }
  .dropdown-item {
    font-size: 0.8em;
    padding: 0.2rem 1rem;
  }
}
</style>
