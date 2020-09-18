<template>
  <td v-tooltip="options(value)">
    <a v-if="link" @click="link(value)">
      {{ value }}
    </a>
    <span v-if="!link">{{ value ? value : '-' }}</span>
  </td>
</template>

<script>
import TooltipMixin from '@/mixins/tooltipMixin.js'

export default {
  mixins: [TooltipMixin],
  props: {
    link: {
      type: Function
    }
  }
}
</script>

<style lang="scss" scoped></style>
