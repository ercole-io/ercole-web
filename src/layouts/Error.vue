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
    ErcoleLogo,
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables';

.error-header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $ercole-blue;
  height: 200px;
  padding: 30px;

  img {
    width: 25rem;
  }
}
</style>
