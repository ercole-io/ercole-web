<template>
  <div class="is-size-7 has-text-weight-medium">
    {{ $t('common.table.showing') }}
    {{ totalItems > perPage ? perPage : totalItems }}
    {{ $t('common.table.of') }} {{ totalItems }} {{ $t('common.table.items') }}
  </div>
</template>

<script>
export default {
  props: {
    totalItems: {
      type: Number
    },
    perPage: {
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped></style>
