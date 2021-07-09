<template>
  <td v-tooltip="options(setValue, dataType, tooltipPlace)">
    <template v-if="link">
      <a @click.prevent="link(setValue)" @contextmenu="rightClick($event)">
        <span v-html="highlight(setValue) || '-'" />
      </a>
    </template>
    <template v-if="!link">
      <span v-if="!dataType" v-html="highlight(setValue) || '-'" />
      <span v-if="dataType" v-html="highlight(formatDate(setValue)) || '-'" />
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
    rightClick: {
      type: Function
    },
    dataType: {
      type: String,
      default: ''
    },
    tooltipPlace: {
      type: String,
      default: 'bottom'
    }
  },
  methods: {
    formatDate(date) {
      return formatDateTime(date)
    }
  },
  computed: {
    setValue() {
      if (typeof this.value === 'number') {
        return this.value
      } else {
        return this.value || '-'
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
