<template>
  <b-loading
    :is-full-page="false"
    :active.sync="isLoading"
    :can-cancel="false"
  />
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped></style>
