<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title card-title">
        {{ cardTitle }}
      </p>
    </header>
    <div
      class="card-content"
      :style="`font-size: ${cotentSize}em; padding: ${contentPadding}rem;`"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardTitle: {
      type: String
    },
    cotentSize: {
      type: String,
      default: '0.8'
    },
    contentPadding: {
      type: String,
      default: '0.5'
    }
  }
}
</script>

<style lang="scss">
.card {
  min-height: 100%;
}

.card-title {
  font-weight: 500;
  padding: 0.5rem 1rem;
  font-size: 0.9em;
}

.card-list li {
  flex-wrap: wrap;
}
</style>
