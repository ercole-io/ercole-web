<template>
  <BoxContent
    v-if="hostname"
    class="column is-4"
    :title="`GPUGrowth of ${hostname}`"
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
