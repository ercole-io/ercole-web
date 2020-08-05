<template>
  <section>
    <h2 class="sub-title" v-if="title" :class="{ 'border-bottom': border }">
      {{ title }}
      <slot name="customTitle" />
    </h2>
    <article class="box-content">
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
    }
  }
}
</script>

<style lang="scss" scoped>
.box-content {
  padding: 0 0.5rem;
  height: 100%;
  margin-bottom: 20px;
}

.sub-title {
  font-size: 0.9em;
  margin-bottom: 10px;
  padding: 5px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.border-bottom {
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
  margin-bottom: 15px;
}
</style>
