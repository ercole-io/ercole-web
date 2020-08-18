<template>
  <div>Showing {{ totalItems }} filtered results on this page</div>
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
