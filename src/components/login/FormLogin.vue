<template>
  <form @submit.prevent="authLogin" class="login-form">
    <CustomField>
      <CustomSelect
        v-model="loginType"
        :options="['Basic Auth', 'LDAP']"
        size=""
        :hasReset="false"
      />
    </CustomField>

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
        password-reveal
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

    <a
      href="#"
      @click="forgotPassModal"
      class="is-flex is-justify-content-center has-text-grey-lighter mt-2"
    >
      Forgot Password
    </a>

    <ErrorMsg />
  </form>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import ErrorMsg from '@/components/login/ErrorMsg.vue'
import CustomField from '@/components/common/Form/CustomField.vue'
import CustomSelect from '@/components/common/Form/CustomSelect.vue'
import ChangePassModal from '@/views/profile/ChangePassModal.vue'

export default {
  name: 'login-form-component',
  components: {
    ErrorMsg,
    CustomField,
    CustomSelect,
  },
  data() {
    return {
      username: '',
      password: '',
      loginType: 'Basic Auth',
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
  beforeMount() {
    bus.$on('isLimited', () => {
      this.$buefy.modal.open({
        parent: this,
        component: ChangePassModal,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
        props: {
          limitedUsername: this.username,
          oldPassword: this.password,
        },
      })
    })
  },
  methods: {
    ...mapActions(['login']),
    authLogin() {
      this.login({
        credentials: {
          username: this.username,
          password: this.password,
        },
        type: this.loginType,
      })
    },
    required(field) {
      return this.$i18n.t('common.validations.required', [field])
    },
    forgotPassModal() {
      this.$buefy.dialog.alert({
        title: 'Forgot Password',
        message: 'To recover your lost password please contact your admin!',
        confirmText: 'Ok',
        type: 'is-primary',
      })
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
