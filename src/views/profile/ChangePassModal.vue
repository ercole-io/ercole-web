<template>
  <div class="modal-card" style="width: 350px">
    <header class="modal-card-head">
      <p class="modal-card-title">Change Password</p>
    </header>
    <section class="modal-card-body">
      <b-field
        label="Old Password"
        custom-class="is-small"
        :type="{
          'is-danger': $v.changePassForm.oldPassword.$error,
        }"
      >
        <b-input
          type="password"
          size="is-small"
          v-model="changePassForm.oldPassword"
          @blur="$v.changePassForm.oldPassword.$touch()"
          @input="$v.changePassForm.oldPassword.$touch()"
          password-reveal
        />
        <template #message>
          <div
            v-if="
              !$v.changePassForm.oldPassword.required &&
              $v.changePassForm.oldPassword.$error
            "
          >
            {{ $i18n.t('common.validations.requiredAlt') }}
          </div>
        </template>
      </b-field>

      <b-field
        label="New Password"
        custom-class="is-small"
        :type="{
          'is-danger': $v.changePassForm.newPassword.$error,
        }"
      >
        <b-input
          type="password"
          size="is-small"
          v-model="changePassForm.newPassword"
          @blur="$v.changePassForm.newPassword.$touch()"
          @input="$v.changePassForm.newPassword.$touch()"
          password-reveal
        />
        <template #message>
          <div
            v-if="
              !$v.changePassForm.newPassword.required &&
              $v.changePassForm.newPassword.$error
            "
          >
            {{ $i18n.t('common.validations.requiredAlt') }}
          </div>
        </template>
      </b-field>

      <b-field
        label="Confirm Password"
        custom-class="is-small"
        :type="{
          'is-danger': $v.changePassForm.confirmedPassword.$error,
        }"
      >
        <b-input
          type="password"
          size="is-small"
          v-model="changePassForm.confirmedPassword"
          @blur="$v.changePassForm.confirmedPassword.$touch()"
          @input="$v.changePassForm.confirmedPassword.$touch()"
          password-reveal
        />
        <template #message>
          <div
            v-if="
              !$v.changePassForm.confirmedPassword.required &&
              $v.changePassForm.confirmedPassword.$error
            "
          >
            Confirm password must match with password field.
          </div>
        </template>
      </b-field>
    </section>
    <footer class="modal-card-foot is-justify-content-flex-end">
      <b-button label="Close" @click="$parent.close()" />
      <b-button
        label="Confirm"
        type="is-primary"
        @click="modifyPass"
        :disabled="$v.$invalid"
      />
    </footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { required, sameAs } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      changePassForm: {
        oldPassword: '',
        newPassword: '',
        confirmedPassword: '',
      },
    }
  },
  validations() {
    return {
      changePassForm: {
        oldPassword: { required },
        newPassword: { required },
        confirmedPassword: {
          sameAs: sameAs((val) => val.newPassword),
          $lazy: true,
        },
      },
    }
  },
  methods: {
    ...mapActions(['changePassword']),
    modifyPass() {
      this.changePassword({
        username: localStorage.getItem('username'),
        data: this.changePassForm,
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
