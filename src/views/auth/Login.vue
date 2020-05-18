<template>
  <div class="login has-background-dark">
    <div class="colunms">
      <div class="colunm">
        <div class="logo">
          <img src="@/assets/ercole-logo.png" alt="Ercole" />
        </div>
      </div>
      <div class="colunm">
        <form @submit.prevent="login" class="has-background-grey-lighter">
          <b-field label-for="username">
            <b-input
              v-model="username"
              icon-pack="fas"
              icon="user"
              placeholder="Username"
            />
          </b-field>
          <b-field label-for="password">
            <b-input
              v-model="password"
              icon-pack="fas"
              icon="lock"
              placeholder="Password"
            />
          </b-field>
          <b-button type="is-primary" native-type="submit" expanded>
            Sign in
          </b-button>

          <b-notification class="notification" type="is-dark" :closable="false">
            The username is "user", the password is "password"
          </b-notification>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      const loginData = {
        username: this.username,
        password: this.password
      }
      this.$store.dispatch('login', {
        username: loginData.username,
        password: loginData.password
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .logo {
    text-align: center;
    margin-bottom: 1.5rem;

    img {
      min-width: 13rem;
    }
  }

  form {
    max-width: 500px;
    padding: 3rem;
    margin: 2rem;
    border-radius: 4px;

    .notification {
      font-size: 14px;
      margin-top: 20px;
    }
  }
}
</style>
