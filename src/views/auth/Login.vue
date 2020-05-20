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
          <b-field
            label-for="username"
            :type="{
              'is-danger': $v.username.$error,
              'is-success': !$v.username.$invalid
            }"
            :message="{
              'The username field is required':
                !$v.username.required && $v.username.$error,
              'Username must have at least 4 caracters':
                !$v.username.minLen && $v.username.$error
            }"
          >
            <b-input
              v-model="username"
              icon-pack="fas"
              icon="user"
              placeholder="Username"
              @blur="$v.username.$touch()"
            />
          </b-field>

          <b-field
            label-for="password"
            :type="{
              'is-danger': $v.password.$error,
              'is-success': !$v.password.$invalid
            }"
            :message="{
              'The password field is required':
                !$v.password.required && $v.password.$error,
              'password must have at least 8 caracters':
                !$v.password.minLen && $v.password.$error
            }"
          >
            <b-input
              type="password"
              v-model="password"
              icon-pack="fas"
              icon="lock"
              placeholder="Password"
              @blur="$v.password.$touch()"
            />
          </b-field>
          <b-button
            type="is-primary"
            native-type="submit"
            :disabled="$v.$invalid"
            expanded
          >
            Sign in
          </b-button>

          <p class="help is-danger has-text-centered" v-if="getErrMsg">
            {{ getErrMsg }}
          </p>

          <b-notification class="notification" type="is-dark" :closable="false">
            The username is "user", the password is "password"
          </b-notification>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  validations: {
    username: {
      required,
      minLen: minLength(4)
    },
    password: {
      required,
      minLen: minLength(8)
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
  },
  computed: {
    ...mapGetters(['getErrMsg'])
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
