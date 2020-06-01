<template>
  <section>
    <div class="error-header">
      <img src="@/assets/images/ercole-logo.png" alt="Ercole" />
    </div>
    <slot />
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.error-header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #363636;
  height: 200px;
  padding: 30px;

  img {
    width: 300px;
  }
}
</style>
