<template>
  <BoxContent :title="title" border :mbottom="false">
    <GhostLoading :isLoading="loading" setHeight="500">
      <form
        @submit.prevent="submitAction"
        :style="`min-height: ${setMinHeight}px;`"
      >
        <slot />
        <ActionButtons
          :applyText="apply"
          :cancelText="reset"
          :isDisabled="isDisabled"
          :isFixed="isFixed"
        />
      </form>
    </GhostLoading>
  </BoxContent>
</template>

<script>
import { mapGetters } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import ActionButtons from '@/components/common/Form/ActionButtons.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'

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
    loadingStatus: {
      type: Boolean,
      required: false,
    },
  },
  components: {
    BoxContent,
    ActionButtons,
    GhostLoading,
  },
  computed: {
    ...mapGetters(['loadingTableStatus']),
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
    loading() {
      if (this.loadingTableStatus) {
        return this.loadingTableStatus
      } else {
        return this.loadingStatus
      }
    },
  },
}
</script>

<style lang="scss" scoped>
form {
  background-color: #f5f5f5;
  overflow: auto;
  max-height: 499px;
  min-height: 119px;
  position: relative;
  padding: 10px 15px 0 15px;
}
</style>
