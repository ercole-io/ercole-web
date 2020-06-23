<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title card-title">
        {{ cardTitle }}
      </p>
    </header>
    <div class="card-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ['cardTitle']
}
</script>

<style lang="scss" scoped>
.card-title {
  font-weight: 500;
  padding: 0.5rem 1rem;
  font-size: 0.9em;
}

.card-content {
  padding: 1rem;
  font-size: 0.8em;
}
</style>
