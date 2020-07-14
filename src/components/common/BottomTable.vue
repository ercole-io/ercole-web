<template>
  <div>
    <div class="is-size-7 has-text-weight-medium has-text-centered">
      <slot name="info" />
    </div>

    <div class="is-flex" style="justify-content: space-between; margin: 10px 0">
      <slot />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
