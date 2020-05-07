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
  font-size: 1.2em;
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 0;
}
</style>
