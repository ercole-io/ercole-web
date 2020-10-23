<template>
  <DrawerRight>
    <BoxContent slot="drawer-content" :title="title" class="mt-5">
      <slot />
    </BoxContent>
  </DrawerRight>
</template>

<script>
import DrawerRight from '@/components/common/DrawerRight.vue'
import BoxContent from '@/components/common/BoxContent.vue'

export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    DrawerRight,
    BoxContent
  }
}
</script>

<style lang="scss" scoped></style>
