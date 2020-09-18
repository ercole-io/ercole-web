<template>
  <ErrorCode
    code="404"
    codeText="Page Not Found"
    codeDesc="The page you are looking for does not seem to exist."
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
