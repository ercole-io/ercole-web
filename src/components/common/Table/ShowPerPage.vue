<template>
  <div class="is-size-7 has-text-weight-medium">
    {{ showing }}
    {{ totalItems > perPage ? perPage : totalItems }}
    {{ of }} {{ totalItems }} {{ items }}
  </div>
</template>

<script>
import i18n from '@/i18n.js'

export default {
  name: 'commom-table-showperpage-component',
  props: {
    totalItems: {
      type: Number,
    },
    perPage: {
      type: Number,
    },
  },
  computed: {
    showing() {
      return `${i18n.t('common.table.showing')}`
    },
    of() {
      return `${i18n.t('common.table.of')}`
    },
    items() {
      return `${i18n.t('common.table.items')}`
    },
  },
}
</script>

<style lang="scss" scoped></style>
