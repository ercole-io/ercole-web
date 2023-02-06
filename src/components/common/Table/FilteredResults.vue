<template>
  <div class="is-size-7 has-text-weight-medium">
    Showing {{ totalItems }} filtered results on this page
  </div>
</template>

<script>
export default {
  name: 'commom-table-filteredresults-component',
  props: {
    totalItems: {
      type: Number,
    },
  },
}
</script>

<style lang="scss" scoped></style>
