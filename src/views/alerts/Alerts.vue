<template>
  <section>
    <PageTitle />

    <div>Recieved parameters to filter alerts: {{ type }} {{ flag }}</div>
  </section>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'

export default {
  props: {
    type: {
      type: String,
      default: null
    },
    flag: {
      type: String,
      default: null
    }
  },
  components: {
    PageTitle
  }
}
</script>

<style lang="scss" scoped></style>
