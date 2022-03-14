<template>
  <form
    @submit.prevent="
      login({
        username: username,
        password: password,
      })
    "
    class="login-form"
  >
    <b-field
      label-for="username"
      :type="{
        'is-danger': $v.username.$error,
        'is-success': !$v.username.$invalid,
      }"
    >
      <b-input
        v-model="username"
        icon-pack="fas"
        icon="user"
        :placeholder="$t('common.fields.username')"
        @blur="$v.username.$touch()"
        data-username
      />
      <template #message>
        <div v-if="!$v.username.required && $v.username.$error" class="error">
          {{ required($t('common.fields.username')) }}
        </div>
      </template>
    </b-field>

    <b-field
      label-for="password"
      :type="{
        'is-danger': $v.password.$error,
        'is-success': !$v.password.$invalid,
      }"
    >
      <b-input
        type="password"
        v-model="password"
        icon-pack="fas"
        icon="lock"
        :placeholder="$t('common.fields.password')"
        @blur="$v.password.$touch()"
        data-password
      />
      <template #message>
        <div v-if="!$v.password.required && $v.password.$error" class="error">
          {{ required($t('common.fields.password')) }}
        </div>
      </template>
    </b-field>
    <b-button
      type="is-custom-primary"
      native-type="submit"
      :disabled="$v.$invalid"
      expanded
      data-submit
    >
      {{ $t('common.forms.signIn') }}
    </b-button>

    <ErrorMsg />
  </form>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import ErrorMsg from '@/components/login/ErrorMsg.vue'

export default {
  components: {
    ErrorMsg,
  },
  data() {
    return {
      username: '',
      password: '',
    }
  },
  validations: {
    username: {
      required,
    },
    password: {
      required,
    },
  },
  methods: {
    ...mapActions(['login']),
    required(field) {
      return this.$i18n.t('common.validations.required', [field])
    },
  },
}
</script>

<style lang="scss" scoped>
.login-form {
  width: 500px;
  padding: 3rem;
  margin: 2rem;
  border-radius: 4px;
  background-color: transparent;

  button[disabled] {
    opacity: 1;
  }

  .error {
    font-size: 14px;
    padding: 2px 5px;
    opacity: 0.9;
    border-radius: 4px;
    font-weight: bold;
    text-shadow: 2px 0 40px #fff, -2px 0 40px #fff, 0 2px 40px #fff,
      0 -2px 40px #fff, 1px 1px 5px #fff, -1px -1px 5px #fff, 1px -1px 5px #fff,
      -1px 1px 5px #fff;
  }

  .notification {
    font-size: 14px;
    margin-top: 20px;
  }
}
</style>
