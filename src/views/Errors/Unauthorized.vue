<template>
  <ErrorCode
    code="401"
    codeText="Unauthorized"
    codeDesc="Your token has expired. Please login again."
  >
    <LoginForm slot="actions" />
  </ErrorCode>
</template>

<script>
import ErrorCode from '@/components/common/ErrorCode.vue'
import LoginForm from '@/components/login/form.vue'

export default {
  components: {
    ErrorCode,
    LoginForm
  }
}
</script>

<style lang="scss" scoped></style>
