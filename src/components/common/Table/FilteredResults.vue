<template>
  <div class="is-size-7 has-text-weight-medium">
    Showing {{ totalItems }} filtered results on this page
  </div>
</template>

<script>
export default {
  props: {
    totalItems: {
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped></style>
