<template>
  <b-button
    v-tooltip="options(tooltipText)"
    slot="customTopHeader"
    type="is-primary"
    icon-pack="fas"
    icon-right="filter"
    size="is-small"
    @click="isOpened"
    class="openDrawerButton"
  />
</template>

<script>
import TooltipMixin from '@/mixins/tooltipMixin.js'
import { bus } from '@/helpers/eventBus.js'

export default {
  mixins: [TooltipMixin],
  props: {
    tooltipText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isOpenFilters: false
    }
  },
  created() {
    bus.$on('closeFilters', val => {
      this.isOpenFilters = val
    })
  },
  methods: {
    isOpened() {
      this.isOpenFilters = !this.isOpenFilters
      bus.$emit('openFilters', this.isOpenFilters)
    }
  }
}
</script>

<style lang="scss" scoped>
.openDrawerButton {
  margin-right: auto;
  margin-left: 10px;
}
</style>
