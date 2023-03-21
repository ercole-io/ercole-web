<template>
  <section>
    <div class="login has-background-dark">
      <!-- <LocaleSwitcher dropitemPosition="is-bottom-left" isAbsolute /> -->
      <div class="colunms">
        <div class="colunm">
          <div class="logo">
            <ErcoleLogo />
          </div>
        </div>
        <div class="colunm" v-if="!isRedirecting">
          <LoginForm />

          <template v-if="isSsoVisible.sso_visible">
            <hr style="background-color: #5fd8df; height: 1px" />

            <div class="is-flex is-justify-content-center">
              <b-button @click="fetchSSO" type="is-primary">
                SSO Login
              </b-button>
            </div>
          </template>
        </div>
        <div class="column" v-else>
          <p class="is-flex is-justify-content-center is-size-2 has-text-light">
            Single Sign On Redirecting...
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LoginForm from '@/components/login/FormLogin.vue'
import ErcoleLogo from '@/components/common/ErcoleLogo.vue'
import { mapActions, mapState } from 'vuex'
// import axios from 'axios'
// import LocaleSwitcher from '@/components/LocaleSwitcher.vue'

export default {
  name: 'login-page',
  components: {
    LoginForm,
    ErcoleLogo,
    // LocaleSwitcher
  },
  data() {
    return {
      isRedirecting: false,
    }
  },
  beforeMount() {
    if (this.$route.query.code) {
      this.isRedirecting = true
      const code = this.$route.query.code
      localStorage.setItem('sso_auth_code', code)
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.$route.query.code) {
        this.loginSSO({
          sso: JSON.parse(sessionStorage.getItem('sso')),
          auth_code: localStorage.getItem('sso_auth_code'),
        })
      }
    }, 1000)
  },
  methods: {
    ...mapActions(['loginSSO']),
    fetchSSO() {
      const sso_data = JSON.parse(sessionStorage.getItem('sso'))

      window.location.replace(
        `${sso_data.auth_url}?client_id=${sso_data.client_id}&response_type=${sso_data.response_type}&scope=${sso_data.scope}&redirect_uri=${sso_data.redirect_uri}`
      )
    },
  },
  computed: {
    ...mapState({ isSsoVisible: 'auth' }),
  },
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #101336 !important;
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  background-image: url('../../assets/images/ercole_login_bg_opt.png');

  .logo {
    text-align: center;
    margin-bottom: 1.5rem;

    img {
      width: 25rem;
    }
  }
}
</style>
