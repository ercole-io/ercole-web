<template>
  <Drawer>
    <BoxContent slot="drawer-content" :title="title" class="mt-5">
      <slot />
    </BoxContent>
  </Drawer>
</template>

<script>
import Drawer from '@/components/common/Drawer.vue'
import BoxContent from '@/components/common/BoxContent.vue'

export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    Drawer,
    BoxContent
  }
}
</script>

<style lang="scss" scoped></style>
