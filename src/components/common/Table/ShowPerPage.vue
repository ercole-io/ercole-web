<template>
  <div class="is-size-7 has-text-weight-medium">
    Showing {{ totalItems > perPage ? perPage : totalItems }} of
    {{ totalItems }} items
  </div>
</template>

<script>
export default {
  props: {
    totalItems: {
      type: Number
    },
    perPage: {
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped></style>
