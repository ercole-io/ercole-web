<template>
  <ErrorCode
    code="500"
    codeText="Internal Server Error"
    codeDesc="Somenthing went wrong. Please try again."
  >
    <b-button type="is-primary" @click="$router.go(-1)" slot="actions">
      go back
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
