<template>
  <AdvancedFiltersBase
    filterTitle="Add or Update a Profile"
    :submitAction="addUpdateProfile"
    :isDisabled="$v.$invalid"
    applyText="Add/Update"
    cancelText="Cancel"
  >
    <!-- <b-field label="Active Profile" custom-class="is-small" expanded>
      <div class="is-flex is-justify-content-space-around mb-4">
        <b-radio
          size="is-small"
          v-model="profileForm.selected"
          :native-value="true"
        >
          {{ $t('common.forms.yes') }}
        </b-radio>
        <b-radio
          size="is-small"
          v-model="profileForm.selected"
          :native-value="false"
        >
          {{ $t('common.forms.no') }}
        </b-radio>
      </div>
    </b-field> -->

    <b-field
      :label="`${$t('common.collumns.profileName')} *`"
      custom-class="is-small"
      expanded
      :type="{
        'is-danger': $v.profileForm.name.$error,
      }"
    >
      <b-input
        @blur="$v.profileForm.name.$touch()"
        @input="$v.profileForm.name.$touch()"
        size="is-small"
        type="text"
        v-model="profileForm.name"
      />
      <template #message>
        <div v-if="!$v.profileForm.name.required && $v.profileForm.name.$error">
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
      </template>
    </b-field>

    <b-field
      label="Client Mail *"
      custom-class="is-small"
      expanded
      :type="{
        'is-danger': $v.profileForm.clientemail.$error,
      }"
    >
      <b-input
        @blur="$v.profileForm.clientemail.$touch()"
        @input="$v.profileForm.clientemail.$touch()"
        size="is-small"
        type="text"
        v-model="profileForm.clientemail"
      />
      <template #message>
        <div
          v-if="
            !$v.profileForm.clientemail.required &&
            $v.profileForm.clientemail.$error
          "
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
      </template>
    </b-field>

    <b-checkbox v-if="isEditing" size="is-small" v-model="editPrivateKey">
      Update Private Key
    </b-checkbox>
    <b-field
      v-if="!isEditing || (isEditing && editPrivateKey)"
      :label="`${$t('common.collumns.privateKey')} ${showRequiredSymble}`"
      custom-class="is-small"
      expanded
      :type="{
        'is-danger': $v.profileForm.privatekey.$error,
      }"
    >
      <b-input
        @blur="$v.profileForm.privatekey.$touch()"
        @input="$v.profileForm.privatekey.$touch()"
        size="is-small"
        type="textarea"
        v-model="profileForm.privatekey"
      />
      <template #message>
        <div
          v-if="
            !$v.profileForm.privatekey.required &&
            $v.profileForm.privatekey.$error
          "
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
      </template>
    </b-field>

    <slot />
  </AdvancedFiltersBase>
</template>

<script>
import { required, requiredIf, email } from 'vuelidate/lib/validators'
import profileFormMixin from '@/mixins/cloud/profileForm.js'

export default {
  name: 'cloud-google-profileconfig-form-component',
  mixins: [profileFormMixin],
  methods: {
    editProfile(data) {
      this.profileForm = {
        selected: data.selected,
        id: data.id,
        name: data.name,
        privatekey: data.privatekey,
        clientemail: data.clientemail,
      }
      this.isEditing = false
      this.editPrivateKey = false
    },
  },
  computed: {
    validationFormFields() {
      return {
        name: { required },
        clientemail: { required, email },
        privatekey: {
          required: requiredIf(() => {
            return !this.isEditing
          }),
        },
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
