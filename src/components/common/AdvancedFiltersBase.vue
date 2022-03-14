<template>
  <BoxContent :title="title" border :mbottom="false">
    <form
      @submit.prevent="submitAction"
      class="scrollbar-x"
      id="style-1"
      :style="`min-height: ${setMinHeight}px;`"
    >
      <slot />
      <ActionButtons
        :applyText="apply"
        :cancelText="reset"
        :isDisabled="isDisabled"
        :isFixed="isFixed"
        :class="verifySetMinHeight"
      />
    </form>
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
      default: null,
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
  max-height: 499px;
  position: relative;
  padding: 20px 20px 0 20px;
}
</style>
