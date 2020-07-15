<template>
  <span class="has-text-weight-medium	is-size-7">
    Notification from the last week:
    <span class="has-text-weight-light">Licenses:</span> {{ info.licenses }}
  </span>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped></style>
