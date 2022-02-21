<template>
  <td @click="setUrl" v-tooltip="options(value)">
    <span v-html="highlight(value) || '-'" />
  </td>
</template>

<script>
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import TooltipMixin from '@/mixins/tooltipMixin.js'

export default {
  mixins: [HighlightSearchMixin, TooltipMixin],
  props: {
    value: {},
    setUrl: {
      type: Function,
    },
  },
}
</script>

<style lang="scss" scoped></style>
