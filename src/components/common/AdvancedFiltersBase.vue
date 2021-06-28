<template>
  <BoxContent :title="title" border :mbottom="false">
    <div class="static-filters scrollbar-x" id="style-1">
      <form @submit.prevent="submitAction">
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
      required: false
    },
    submitAction: {
      type: Function,
      required: true
    },
    applyText: {
      type: String,
      required: false
    },
    cancelText: {
      type: String,
      required: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    isFixed: {
      type: Boolean,
      default: true
    }
  },
  components: {
    BoxContent,
    ActionButtons
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
    }
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
