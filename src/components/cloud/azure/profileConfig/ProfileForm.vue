<template>
  <AdvancedFiltersBase
    filterTitle="Add or Update a Profile"
    :submitAction="addUpdateProfile"
    :isDisabled="$v.$invalid"
    applyText="Add/Update"
    cancelText="Cancel"
  >
    <b-field label="Active Profile" custom-class="is-small" expanded>
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
    </b-field>

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
      label="Tenant ID *"
      custom-class="is-small"
      expanded
      :type="{
        'is-danger': $v.profileForm.tenantid.$error,
      }"
    >
      <b-input
        @blur="$v.profileForm.tenantid.$touch()"
        @input="$v.profileForm.tenantid.$touch()"
        size="is-small"
        type="text"
        v-model="profileForm.tenantid"
      />
      <template #message>
        <div
          v-if="
            !$v.profileForm.tenantid.required && $v.profileForm.tenantid.$error
          "
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
      </template>
    </b-field>

    <b-field
      label="Client ID *"
      custom-class="is-small"
      expanded
      :type="{
        'is-danger': $v.profileForm.clientid.$error,
      }"
    >
      <b-input
        @blur="$v.profileForm.clientid.$touch()"
        @input="$v.profileForm.clientid.$touch()"
        size="is-small"
        type="text"
        v-model="profileForm.clientid"
      />
      <template #message>
        <div
          v-if="
            !$v.profileForm.clientid.required && $v.profileForm.clientid.$error
          "
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
      </template>
    </b-field>

    <b-field
      label="Subscription ID *"
      custom-class="is-small"
      expanded
      :type="{
        'is-danger': $v.profileForm.subscriptionid.$error,
      }"
    >
      <b-input
        @blur="$v.profileForm.subscriptionid.$touch()"
        @input="$v.profileForm.subscriptionid.$touch()"
        size="is-small"
        type="text"
        v-model="profileForm.subscriptionid"
      />
      <template #message>
        <div
          v-if="
            !$v.profileForm.subscriptionid.required &&
            $v.profileForm.subscriptionid.$error
          "
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
      </template>
    </b-field>

    <b-field
      :label="`${$t('common.collumns.region')} *`"
      custom-class="is-small"
      expanded
      :type="{
        'is-danger': $v.profileForm.region.$error,
      }"
    >
      <b-input
        @blur="$v.profileForm.region.$touch()"
        @input="$v.profileForm.region.$touch()"
        size="is-small"
        type="text"
        v-model="profileForm.region"
      />
      <template #message>
        <div
          v-if="!$v.profileForm.region.required && $v.profileForm.region.$error"
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
      </template>
    </b-field>

    <b-checkbox v-if="isEditing" size="is-small" v-model="editPrivateKey">
      Update Client Secret
    </b-checkbox>
    <b-field
      v-if="!isEditing || (isEditing && editPrivateKey)"
      :label="`Client Secret ${showRequiredSymble}`"
      custom-class="is-small"
      expanded
      :type="{
        'is-danger': $v.profileForm.clientsecret.$error,
      }"
    >
      <b-input
        @blur="$v.profileForm.clientsecret.$touch()"
        @input="$v.profileForm.clientsecret.$touch()"
        size="is-small"
        type="textarea"
        v-model="profileForm.clientsecret"
      />
      <template #message>
        <div
          v-if="
            !$v.profileForm.clientsecret.required &&
            $v.profileForm.clientsecret.$error
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
import {
  required,
  requiredIf,
  // helpers
} from 'vuelidate/lib/validators'
import profileFormMixin from '@/mixins/cloud/profileForm.js'

// const isTenantid = helpers.regex('isTenantid', /^ocid+\d+\.tenant[a-z\d.]*$/)
// const isClientid = helpers.regex('isClientid', /^ocid+\d+\.client[a-z\d.]*$/)

export default {
  name: 'cloud-azure-profileconfig-form-component',
  mixins: [profileFormMixin],
  methods: {
    editProfile(data) {
      this.profileForm = {
        selected: data.selected,
        id: data.id,
        name: data.name,
        tenantid: data.tenantid,
        clientid: data.clientid,
        clientsecret: data.clientsecret,
        subscriptionid: data.subscriptionid,
        region: data.region,
      }
      this.isEditing = false
      this.editPrivateKey = false
    },
  },
  computed: {
    validationFormFields() {
      return {
        name: { required },
        tenantid: {
          required,
          // isTenantid,
        },
        clientid: {
          required,
          // isClientid
        },
        clientsecret: {
          required: requiredIf(() => {
            return !this.isEditing
          }),
        },
        subscriptionid: { required },
        region: { required },
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
