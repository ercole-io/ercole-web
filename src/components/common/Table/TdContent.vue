<template>
  <td v-tooltip="options(value)">
    {{ value ? value : '-' }}
  </td>
</template>

<script>
import TooltipMixin from '@/mixins/tooltipMixin.js'

export default {
  mixins: [TooltipMixin]
}
</script>

<style lang="scss" scoped></style>
