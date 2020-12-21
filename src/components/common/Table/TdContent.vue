<template>
  <td v-tooltip="options(value, dataType)">
    <template v-if="link">
      <a @click="link(value)">
        <span v-html="highlight(value || '-')"></span>
      </a>
    </template>
    <template v-if="!link">
      <span v-if="!dataType" v-html="highlight(value || '-')"> </span>
      <span v-if="dataType" v-html="highlight(formatDate(value || '-'))">
      </span>
    </template>
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
      type: Function
    },
    dataType: {
      type: String,
      default: ''
    }
  },
  methods: {
    formatDate(date) {
      return formatDateTime(date)
    }
  }
}
</script>

<style lang="scss" scoped></style>
