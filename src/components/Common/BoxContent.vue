<template>
  <section>
    <PageTitle :pageTitle="title" v-if="title" />
    <article :class="title ? 'box-content' : ''">
      <slot />
    </article>
  </section>
</template>

<script>
import PageTitle from '@/components/Common/PageTitle.vue'

export default {
  props: {
    title: {
      type: String,
      default: null
    }
  },
  components: {
    PageTitle
  }
}
</script>

<style lang="scss" scoped>
.box-content {
  padding: 1rem;
}
</style>
