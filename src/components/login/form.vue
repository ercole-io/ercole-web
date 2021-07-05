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
    >
      <b-input
        v-model="username"
        icon-pack="fas"
        icon="user"
        placeholder="Username"
        @blur="$v.username.$touch()"
        data-username
      />
      <template #message>
        <div v-if="!$v.username.required && $v.username.$error">
          {{ required('username') }}
        </div>
        <div v-if="!$v.username.minLen && $v.username.$error">
          {{ characters('username', '4') }}
        </div>
      </template>
    </b-field>

    <b-field
      label-for="password"
      :type="{
        'is-danger': $v.password.$error,
        'is-success': !$v.password.$invalid
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
      <template #message>
        <div v-if="!$v.password.required && $v.password.$error">
          {{ required('password') }}
        </div>
        <div v-if="!$v.password.minLen && $v.password.$error">
          {{ characters('password', '8') }}
        </div>
      </template>
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
    ...mapActions(['login']),
    required(field) {
      return this.$i18n.t('common.validations.required', [field])
    },
    characters(field, char) {
      return this.$i18n.t('common.validations.characters', [field, char])
    }
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
