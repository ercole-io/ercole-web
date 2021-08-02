<template>
  <p
    data-errormsg
    class="help is-danger has-text-centered is-size-6 mt-4"
    v-if="getErrMsg"
  >
    {{ getErrMsg }}
  </p>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getErrMsg'])
  }
}
</script>

<style lang="scss" scoped></style>
