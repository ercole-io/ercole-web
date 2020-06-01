<template>
  <ErrorCode
    code="500"
    codeText="Internal Server Error"
    codeDesc="Somenthing went wrong. Please try again."
  >
    <b-button type="is-primary" tag="router-link" to="/dashboard" slot="actions"
      >back to Home</b-button
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
