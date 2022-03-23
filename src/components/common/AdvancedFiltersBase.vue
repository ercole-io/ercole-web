<template>
  <BoxContent :title="title" border :mbottom="false">
    <div class="static-filters scrollbar-x">
      <form
        @submit.prevent="submitAction"
        :style="`min-height: ${setMinHeight}px`"
      >
        <slot />
        <ActionButtons
          :applyText="apply"
          :cancelText="reset"
          :isDisabled="isDisabled"
          :isFixed="isFixed"
        />
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
      required: false,
    },
    submitAction: {
      type: Function,
      required: true,
    },
    applyText: {
      type: String,
      required: false,
    },
    cancelText: {
      type: String,
      required: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isFixed: {
      type: Boolean,
      default: true,
    },
    setMinHeight: {
      type: String,
      default: '610',
    },
  },
  components: {
    BoxContent,
    ActionButtons,
  },
  computed: {
    title() {
      return this.filterTitle
        ? this.filterTitle
        : this.$i18n.t('common.forms.advancedFilters')
    },
    apply() {
      return this.applyText
        ? this.applyText
        : this.$i18n.t('common.forms.apply')
    },
    reset() {
      return this.cancelText
        ? this.cancelText
        : this.$i18n.t('common.forms.reset')
    },
  },
}
</script>

<style lang="scss" scoped>
form {
  background-color: #f5f5f5;
  overflow: auto;
  height: 500px;
  position: relative;
  padding: 10px 15px 0 15px;
}
</style>
