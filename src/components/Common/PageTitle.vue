<template>
  <h1 class="page-title">
    {{ pageTitle }}
  </h1>
</template>

<script>
export default {
  props: {
    pageTitle: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.page-title {
  font-size: 17px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
}
</style>
