<template>
  <b-autocomplete
    v-model="inputVal"
    size="is-small"
    type="text"
    icon="magnify"
    :placeholder="setPlaceholder"
    :data="filterResult"
    :open-on-focus="openOnFocus"
    :append-to-body="appendToBody"
    @typing="filterMethod($event)"
    @input="inputMethod"
    @select="onSelect"
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
    onSelect: {
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
  .dropdown-content {
    padding-top: 0.1rem;
    padding-bottom: 0;
  }

  .dropdown-menu {
    min-width: 100%;
  }
  .dropdown-item {
    font-size: 0.8em;
    padding: 0.15rem 0.7rem;
    border-bottom: 1px dotted #dbdbdb;
  }
}
</style>
