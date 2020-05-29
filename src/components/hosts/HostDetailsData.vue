<template>
  <BoxContent
    v-if="hostname"
    class="column is-8"
    :title="`Databases of ${hostname}`"
  ></BoxContent>
</template>

<script>
import BoxContent from '@/components/common/BoxContent.vue'

export default {
  props: {
    hostname: {
      type: String,
      required: true,
      default: ''
    }
  },
  components: {
    BoxContent
  }
}
</script>

<style lang="scss" scoped></style>
