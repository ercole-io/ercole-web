<template>
  <BoxContent :title="title" border :mbottom="false">
    <div class="static-filters scrollbar-x">
      <form
        @submit.prevent="submitAction"
        :style="`min-height: ${setMinHeight}px`"
      >
        <div :style="`min-height: ${setMinHeight - 54}px`">
          <slot />
        </div>

        <ActionButtons
          :applyText="apply"
          :cancelText="reset"
          :isDisabled="isDisabled"
        />
      </form>
    </div>
  </BoxContent>
</template>

<script>
import BoxContent from '@/components/common/BoxContent.vue'
import ActionButtons from '@/components/common/Form/ActionButtons.vue'

export default {
  name: 'commom-advancedfilters-component',
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
    setMinHeight: {
      type: String,
      default: '619',
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
  height: 0;
  position: relative;
  padding: 10px 15px 0 15px;
}
</style>
