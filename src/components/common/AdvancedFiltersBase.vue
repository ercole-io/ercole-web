<template>
  <BoxContent :title="filterTitle" border :mbottom="false">
    <div class="static-filters scrollbar-x" id="style-1">
      <slot />
    </div>
  </BoxContent>
</template>

<script>
import BoxContent from '@/components/common/BoxContent.vue'

export default {
  props: {
    filterTitle: {
      type: String,
      default: ''
    }
  },
  components: {
    BoxContent
  }
}
</script>

<style lang="scss" scoped>
.static-filters {
  padding: 25px 20px 0 20px;
  background-color: #f5f5f5;
  overflow: auto;
  max-height: 500px;
  position: relative;
}
</style>
