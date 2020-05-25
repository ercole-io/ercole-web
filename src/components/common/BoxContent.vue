<template>
  <section>
    <h2 class="sub-title" v-if="title">
      {{ title }}
    </h2>
    <article :class="title ? 'box-content' : ''">
      <slot />
    </article>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.box-content {
  padding: 1rem;
}

.sub-title {
  font-size: 1em;
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 0;
}
</style>
