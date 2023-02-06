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
  name: 'login-errormsg-component',
  computed: {
    ...mapGetters(['getErrMsg']),
  },
}
</script>

<style lang="scss" scoped>
P {
  font-size: 1.1rem !important;
  opacity: 0.9;
  border-radius: 4px;
  font-weight: bold;
  text-shadow: 2px 0 40px #fff, -2px 0 40px #fff, 0 2px 40px #fff,
    0 -2px 40px #fff, 1px 1px 5px #fff, -1px -1px 5px #fff, 1px -1px 5px #fff,
    -1px 1px 5px #fff;
}
</style>
