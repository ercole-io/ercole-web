<template>
  <td
    v-if="link && !isSlot"
    v-tooltip="options(setValue, dataType, tooltipPlace)"
  >
    <a
      @click.left="link($event)"
      @click.middle="link($event)"
      @click.right="link($event)"
      v-html="setHighlight"
    />
  </td>

  <td
    v-else-if="!link && !dataType && !isSlot"
    v-tooltip="options(setValue, dataType, tooltipPlace)"
    v-html="setHighlight"
  />

  <td
    v-else-if="!link && dataType && !isSlot"
    v-tooltip="options(setValue, dataType, tooltipPlace)"
    v-html="setHighlightDate"
  />

  <td v-else-if="isSlot" v-tooltip="options(setValue, dataType, tooltipPlace)">
    <slot />
  </td>
</template>

<script>
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import formatDateTime from '@/filters/formatDateTime.js'

export default {
  mixins: [HighlightSearchMixin, TooltipMixin],
  props: {
    link: {
      type: Function,
    },
    dataType: {
      type: String,
      default: '',
    },
    tooltipPlace: {
      type: String,
      default: 'auto',
    },
    isSlot: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    setValue() {
      if (typeof this.value === 'number') {
        return this.$sanitize(this.value)
      } else {
        return this.$sanitize(this.value) || '-'
      }
    },
    setHighlight() {
      return this.highlight(this.setValue) || '-'
    },
    setHighlightDate() {
      return this.highlight(formatDateTime(this.setValue)) || '-'
    },
  },
}
</script>

<style lang="scss" scoped></style>
