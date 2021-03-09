<template>
  <b-input
    type="text"
    icon="magnify"
    icon-right="close-circle"
    icon-right-clickable
    @icon-right-click="onClear"
    size="is-small"
    style="height: 30px;"
    :placeholder="searchPlaceholder"
    @input.native="onInput"
    @blur="onBlur"
    v-model="typedSearch"
  />
</template>

<script>
import { bus } from '@/helpers/eventBus.js'

export default {
  props: {
    value: {
      type: String
    },
    searchPlaceholder: {
      type: String,
      default: 'Search'
    },
    urlParam: {
      type: String,
      required: false
    },
    onBlur: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    onInput() {
      bus.$emit('searchTerm', this.typedSearch)
    },
    onClear() {
      this.typedSearch = ''
      bus.$emit('searchTerm', '')
    }
  },
  computed: {
    typedSearch: {
      get() {
        if (this.urlParam) {
          return this.urlParam
        } else {
          return this.value
        }
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
