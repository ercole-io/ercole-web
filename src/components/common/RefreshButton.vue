<template>
  <b-button
    type="is-ercole-blue"
    icon-right="sync-alt"
    icon-pack="fas"
    size="is-small"
    @click="refreshData"
    v-tooltip="options(tooltipMsg, null, 'auto')"
    class="mr-2"
  />
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import TooltipMixin from '@/mixins/tooltipMixin.js'

export default {
  name: 'commom-refreshbutton-component',
  mixins: [TooltipMixin],
  props: {
    tooltipMsg: {
      type: String,
      default: 'Update Data',
    },
  },
  methods: {
    refreshData() {
      bus.$emit('refreshPageData')
    },
  },
}
</script>

<style lang="scss" scoped></style>
