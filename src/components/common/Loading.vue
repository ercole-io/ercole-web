<template>
  <b-loading
    :is-full-page="isFullPage"
    :active.sync="isLoading"
    :can-cancel="canCancel"
  />
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    isFullPage: {
      type: Boolean,
      default: false,
    },
    canCancel: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped></style>
