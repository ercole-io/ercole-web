<template>
  <section>
    <h2 class="sub-title" v-if="title" :class="{ 'border-bottom': border }">
      {{ title }}
    </h2>
    <article :class="{ 'box-content': padding, 'margin-bottom': !padding }">
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
    },
    border: {
      type: Boolean,
      default: false
    },
    padding: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.box-content {
  padding: 1rem;
}

.margin-bottom {
  margin-bottom: 20px;
}

.sub-title {
  font-size: 1em;
  margin-bottom: 10px;
  padding-left: 5px;
}

.border-bottom {
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
  margin-bottom: 10px;
}
</style>
