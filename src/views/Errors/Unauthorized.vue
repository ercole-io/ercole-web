<template>
  <ErrorCode
    code="401"
    codeText="Unauthorized"
    :codeDesc="
      `YOUR TOKEN HAS EXPIRED AND YOU WILL BE REDIRECTED TO THE LOGIN PAGE IN ${countDown} SECONDS.`
    "
  >
    <b-button
      slot="actions"
      type="is-link is-light"
      size="is-medium"
      @click="logout"
    >
      go to login
    </b-button>
  </ErrorCode>
</template>

<script>
import { mapActions } from 'vuex'
import ErrorCode from '@/components/common/ErrorCode.vue'

export default {
  components: {
    ErrorCode
  },
  data() {
    return {
      countDown: 5
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
    }
  }
}
</script>

<style lang="scss" scoped></style>
