<template>
  <span
    class="no-content is-size-7 has-text-weight-medium"
    :style="{ height: noContentHeight }"
  >
    {{ noContentText }}
  </span>
</template>

<script>
export default {
  name: 'commom-nocontent-component',
  props: {
    noContentText: {
      type: String,
      default: 'There are no content to show',
    },
    noContentHeight: {
      type: String,
      default: '0',
    },
  },
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
