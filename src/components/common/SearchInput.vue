<template>
  <b-input
    type="text"
    icon="magnify"
    icon-right="close-circle"
    icon-right-clickable
    @icon-right-click="onClear"
    size="is-small"
    style="height: 30px; margin-left: auto"
    :placeholder="searchPlaceholder"
    @blur="onBlur"
    @input="emitSearchTherm"
    v-model="searchTherm"
  />
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'

export default {
  name: 'commom-searchinput-component',
  props: {
    value: {
      type: String,
      default: '',
    },
    searchPlaceholder: {
      type: String,
      default: 'Search',
    },
    urlParam: {
      type: String,
      default: '',
      required: false,
    },
    onBlur: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      searchTherm: '',
    }
  },
  mounted() {
    this.searchTherm = this.urlParam
    this.emitSearchTherm(this.searchTherm)

    bus.$on('searchOnDbs', (val) => {
      this.searchTherm = val
    })

    bus.$on('changePerPage', () => {
      setTimeout(() => {
        this.emitSearchTherm(this.searchTherm)
      }, 10)
    })

    bus.$on('onChangeDbTab', () => {
      if (this.searchTherm) {
        setTimeout(() => {
          bus.$emit('highlightSearch', this.searchTherm)
        }, 10)
      }
    })
  },
  methods: {
    emitSearchTherm(value) {
      if (this.hostDetailsHighlightSearch) {
        bus.$emit('highlightSearch', value)
      } else if (this.otherPagesHighlightSearch) {
        bus.$emit('highlightSearch', value)
      }
      this.$emit('input', value)
    },
    onClear() {
      this.searchTherm = ''
      this.emitSearchTherm(this.searchTherm)
    },
  },
  computed: {
    ...mapGetters(['returnSelectedKeys']),
    hostDetailsHighlightSearch() {
      return (
        this.$route.name === 'hosts-details' &&
        (this.returnSelectedKeys.length > 1 ||
          this.returnSelectedKeys[0] !== 'name')
      )
    },
    otherPagesHighlightSearch() {
      return this.$route.name !== 'hosts-details'
    },
  },
}
</script>

<style lang="scss" scoped></style>
