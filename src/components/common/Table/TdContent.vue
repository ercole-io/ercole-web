<template>
  <td
    v-if="link && !isSlot"
    v-tooltip="options(setValue, dataType)"
    :class="setHighlight === '-' ? 'has-text-centered' : ''"
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
    v-tooltip="options(setValue, dataType)"
    v-html="setHighlight"
    :class="setHighlight === '-' ? 'has-text-centered' : ''"
  />

  <td
    v-else-if="!link && dataType && !isSlot"
    v-tooltip="options(setValue, dataType)"
    v-html="setHighlightDate"
    :class="setHighlightDate === '-' ? 'has-text-centered' : ''"
  />

  <td v-else-if="isSlot" v-tooltip="options(setValue, dataType)">
    <slot />
  </td>
</template>

<script>
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import formatDateTime from '@/filters/formatDateTime.js'

export default {
  name: 'commom-table-tdcontent-component',
  mixins: [HighlightSearchMixin, TooltipMixin],
  props: {
    link: {
      type: Function,
    },
    dataType: {
      type: String,
      default: '',
    },
    isSlot: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    setValue() {
      if (typeof this.value === 'number') {
        return this.value
        // return this.$sanitize(this.value)
      } else {
        return this.value || '-'
        // return this.$sanitize(this.value) || '-'
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
