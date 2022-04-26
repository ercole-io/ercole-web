<template>
  <ErrorCode
    code="401"
    :codeText="$t('common.errors.401')"
    :codeDesc="$t('common.errors.401msg', [countDown])"
  >
    <b-button
      slot="actions"
      type="is-ercole-blue"
      size="is-medium"
      @click="logout"
    >
      {{ $t('common.general.goLogin') }}
    </b-button>
  </ErrorCode>
</template>

<script>
import { mapActions } from 'vuex'
import ErrorCode from '@/components/common/ErrorCode.vue'

export default {
  components: {
    ErrorCode,
  },
  data() {
    return {
      countDown: 5,
    }
  },
  created() {
    this.countDownTimer()
  },
  methods: {
    ...mapActions(['logout']),
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown--
          this.countDownTimer()
        }, 1000)
      } else {
        this.logout()
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
