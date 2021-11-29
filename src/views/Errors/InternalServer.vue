<template>
  <ErrorCode
    code="500"
    :codeText="$t('common.errors.500')"
    :codeDesc="$t('common.errors.500msg')"
  >
    <b-button type="is-primary" @click="$router.go(-1)" slot="actions">
      {{ $t('common.general.goBack') }}
    </b-button>
  </ErrorCode>
</template>

<script>
import ErrorCode from '@/components/common/ErrorCode.vue'

export default {
  components: {
    ErrorCode
  }
}
</script>

<style lang="scss" scoped></style>
