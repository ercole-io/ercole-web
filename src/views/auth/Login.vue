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
        <div class="colunm">
          <LoginForm />

          <hr style="background-color: #5fd8df; height: 1px" />

          <div class="is-flex is-justify-content-center">
            <b-button
              @click="loginSSO"
              style="background-color: #054759; color: white"
            >
              SSO Login
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LoginForm from '@/components/login/FormLogin.vue'
import ErcoleLogo from '@/components/common/ErcoleLogo.vue'
import { mapActions } from 'vuex'
import axios from 'axios'
// import LocaleSwitcher from '@/components/LocaleSwitcher.vue'

export default {
  name: 'login-page',
  components: {
    LoginForm,
    ErcoleLogo,
    // LocaleSwitcher
  },
  methods: {
    ...mapActions(['fetchConfigSSO']),
    loginSSO() {
      this.fetchConfigSSO().then((res) => {
        const api = res.data.api_url
        const client = res.data.client_id
        const response = res.data.response_type
        const redirect = res.data.redirect_uri
        const scope = res.data.scope

        axios
          .get(
            `${api}?client_id=${client}&response_type=${response}&redirect_uri=${redirect}&scope=${scope}`
          )
          .then((res) => {
            console.log(res)
          })
      })
    },
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
