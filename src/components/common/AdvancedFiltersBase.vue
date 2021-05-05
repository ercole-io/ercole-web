<template>
  <BoxContent :title="filterTitle" border :mbottom="false">
    <div class="static-filters scrollbar-x" id="style-1">
      <form @submit.prevent="submitAction">
        <slot />
        <ActionButtons />
      </form>
    </div>
  </BoxContent>
</template>

<script>
import BoxContent from '@/components/common/BoxContent.vue'
import ActionButtons from '@/components/common/Form/ActionButtons.vue'

export default {
  props: {
    filterTitle: {
      type: String,
      default: ''
    },
    submitAction: {
      type: Function,
      required: true
    }
  },
  components: {
    BoxContent,
    ActionButtons
  }
}
</script>

<style lang="scss" scoped>
.static-filters {
  background-color: #f5f5f5;
  overflow: auto;
  max-height: 515px;
  position: relative;

  form {
    padding: 25px 20px 0 20px;
  }
}
</style>
