<template>
  <div class="top-table">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'commom-table-toptable-component',
}
</script>

<style lang="scss" scoped>
.top-table {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}
</style>
