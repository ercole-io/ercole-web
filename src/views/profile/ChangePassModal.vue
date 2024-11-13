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
          data-cy="old-pass"
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
          data-cy="new-pass"
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
          data-cy="confirm-pass"
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
        data-cy="confirm-change"
        label="Confirm"
        type="is-primary"
        @click="modifyPass"
        :disabled="$v.$invalid"
        :loading="changeLoading"
      />
    </footer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'change-password-modal',
  props: {
    limitedUsername: {
      type: String,
      required: false,
    },
    oldPassword: {
      type: String,
      required: false,
    },
  },
  beforeMount() {
    if (this.oldPassword) {
      this.isLimited = true
      this.changePassForm.oldPassword = this.oldPassword
    }
  },
  data() {
    return {
      changePassForm: {
        oldPassword: '',
        newPassword: '',
        confirmedPassword: '',
      },
      changeLoading: false,
      isLimited: false,
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
    ...mapActions(['changePassword', 'logout']),
    modifyPass() {
      this.changeLoading = true

      let body
      if (this.isLimited) {
        body = {
          username: this.limitedUsername,
          data: this.changePassForm,
          admin: this.admin,
        }
      } else {
        body = {
          username: this.getUsername,
          data: this.changePassForm,
          admin: this.admin,
        }
      }

      this.changePassword(body)
        .then(() => {
          this.$parent.close()
          this.$buefy.dialog.alert({
            message: 'Your Password has been changed!',
            confirmText: 'login',
            type: 'is-primary',
            onConfirm: () => {
              if (this.isLimited) {
                localStorage.removeItem('token')
              } else {
                this.logout()
              }
            },
          })
        })
        .then(() => {
          this.isLimited = false
        })
        .catch(() => {
          this.$parent.close()
          this.$buefy.dialog.alert({
            message: 'Something went wrong! Please try again',
            confirmText: 'ok',
            type: 'is-danger',
          })
        })
    },
  },
  computed: {
    ...mapGetters(['isAdmin', 'getUsername']),
  },
}
</script>

<style lang="scss" scoped></style>
