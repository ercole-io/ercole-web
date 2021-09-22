<template>
  <b-input
    type="text"
    icon="magnify"
    icon-right="close-circle"
    icon-right-clickable
    @icon-right-click="onClear"
    size="is-small"
    style="height: 30px; margin-left: auto;"
    :placeholder="searchPlaceholder"
    @blur="onBlur"
    v-model="searchTherm"
  />
</template>

<script>
import { bus } from '@/helpers/eventBus.js'

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    searchPlaceholder: {
      type: String,
      default: 'Search'
    },
    urlParam: {
      type: String,
      default: '',
      required: false
    },
    onBlur: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      searchTherm: ''
    }
  },
  mounted() {
    this.searchTherm = this.urlParam
    this.emitSearchTherm(this.searchTherm)

    bus.$on('sendSearchVal', val => {
      this.searchTherm = val
    })
  },
  methods: {
    emitSearchTherm(value) {
      bus.$emit('searchTerm', value)
      this.$emit('input', value)
    },
    onClear() {
      this.searchTherm = ''
      this.emitSearchTherm(this.searchTherm)
    }
  },
  watch: {
    searchTherm(value) {
      if (value) {
        this.emitSearchTherm(value)
      } else {
        this.emitSearchTherm('')
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
