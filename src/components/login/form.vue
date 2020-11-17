<template>
  <form
    @submit.prevent="
      login({
        username: username,
        password: password
      })
    "
    class="login-form has-background-grey-lighter"
  >
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
        data-username
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
        data-password
      />
    </b-field>
    <b-button
      type="is-primary"
      native-type="submit"
      :disabled="$v.$invalid"
      expanded
      data-submit
    >
      Sign in
    </b-button>

    <errorMsg />
  </form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import errorMsg from '@/components/login/errorMsg.vue'

export default {
  components: {
    errorMsg
  },
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
    ...mapActions(['login'])
  }
}
</script>

<style lang="scss" scoped>
.login-form {
  width: 400px;
  padding: 3rem;
  margin: 2rem;
  border-radius: 4px;

  .notification {
    font-size: 14px;
    margin-top: 20px;
  }
}
</style>
