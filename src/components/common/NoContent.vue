<template>
  <span class="no-content is-size-7 has-text-weight-medium">
    {{ noContentText }}
  </span>
</template>

<script>
export default {
  props: {
    noContentText: {
      type: String,
      default: 'There are no content to show'
    }
  }
}
</script>

<style lang="scss" scoped>
.no-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90%;
  text-align: center;
}
</style>
