<template>
  <div :class="`${cardType}`">
    <header :class="`${cardType}-header`">
      <p :class="`${cardType}-title`">
        {{ cardTitle }}
      </p>
    </header>
    <div
      class="card-content"
      :style="`font-size: ${contentSize}em; padding: ${contentPadding};`"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardType: {
      type: String,
      default: 'card',
    },
    cardTitle: {
      type: String,
    },
    contentSize: {
      type: String,
      default: '1',
    },
    contentPadding: {
      type: String,
      default: '0.5rem 0rem',
    },
  },
}
</script>

<style lang="scss">
.card-title {
  font-weight: 500;
  padding: 0.5rem 1rem;
  font-size: 0.9em;
}

.card-list li {
  flex-wrap: wrap;
}

.custom-title {
  box-shadow: 0 0.08em 0 lightslategrey;
  font-weight: 600;
  text-transform: uppercase;
  padding-left: 0;
  padding: 0 5px;
  font-size: 0.7em;
}
</style>
