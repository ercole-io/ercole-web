<template>
  <section>
    <div class="error-header">
      <ErcoleLogo />
    </div>
    <slot />
  </section>
</template>

<script>
import ErcoleLogo from '@/components/common/ErcoleLogo.vue'

export default {
  components: {
    ErcoleLogo
  }
}
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
    width: 25rem;
  }
}
</style>
