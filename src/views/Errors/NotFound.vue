<template>
  <ErrorCode
    code="404"
    :codeText="$t('common.errors.404')"
    :codeDesc="$t('common.errors.404msg')"
  >
    <b-button type="is-ercole-blue" @click="$router.go(-1)" slot="actions">
      {{ $t('common.general.goBack') }}
    </b-button>
  </ErrorCode>
</template>

<script>
import ErrorCode from '@/components/common/ErrorCode.vue'

export default {
  components: {
    ErrorCode,
  },
}
</script>

<style lang="scss" scoped></style>
