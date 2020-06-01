<template>
  <ErrorCode
    code="401"
    codeText="Unauthorized"
    codeDesc="Your token has expired. Please login again."
  >
    <b-button
      type="is-primary"
      @click="$store.dispatch('logout')"
      slot="actions"
      >go to Login</b-button
    >
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
