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
      default: 'Advanced Filters'
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
  min-height: 600px;
  position: relative;

  form {
    padding: 25px 20px;
    // min-height: calc(100vh - 250px);
    height: 600px;
  }
}
</style>
