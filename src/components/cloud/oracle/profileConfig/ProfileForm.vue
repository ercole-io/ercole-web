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
        'is-danger': $v.profileForm.profile.$error,
      }"
    >
      <b-input
        @blur="$v.profileForm.profile.$touch()"
        @input="$v.profileForm.profile.$touch()"
        size="is-small"
        type="text"
        v-model="profileForm.profile"
      />
      <template #message>
        <div
          v-if="
            !$v.profileForm.profile.required && $v.profileForm.profile.$error
          "
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
      </template>
    </b-field>

    <b-field
      :label="`${$t('common.collumns.tenancy')} *`"
      custom-class="is-small"
      expanded
      :type="{
        'is-danger': $v.profileForm.tenancyOCID.$error,
      }"
    >
      <b-input
        @blur="$v.profileForm.tenancyOCID.$touch()"
        @input="$v.profileForm.tenancyOCID.$touch()"
        size="is-small"
        type="text"
        v-model="profileForm.tenancyOCID"
      />
      <template #message>
        <div
          v-if="
            !$v.profileForm.tenancyOCID.required &&
            $v.profileForm.tenancyOCID.$error
          "
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
      </template>
    </b-field>

    <b-field
      :label="`${$t('common.collumns.userOCID')} *`"
      custom-class="is-small"
      expanded
      :type="{
        'is-danger': $v.profileForm.userOCID.$error,
      }"
    >
      <b-input
        @blur="$v.profileForm.userOCID.$touch()"
        @input="$v.profileForm.userOCID.$touch()"
        size="is-small"
        type="text"
        v-model="profileForm.userOCID"
      />
      <template #message>
        <div
          v-if="
            !$v.profileForm.userOCID.required && $v.profileForm.userOCID.$error
          "
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
      </template>
    </b-field>

    <b-field
      :label="`${$t('common.collumns.keyFingerprint')} *`"
      custom-class="is-small"
      expanded
      :type="{
        'is-danger': $v.profileForm.keyFingerprint.$error,
      }"
    >
      <b-input
        @blur="$v.profileForm.keyFingerprint.$touch()"
        @input="$v.profileForm.keyFingerprint.$touch()"
        size="is-small"
        type="text"
        v-model="profileForm.keyFingerprint"
      />
      <template #message>
        <div
          v-if="
            !$v.profileForm.keyFingerprint.required &&
            $v.profileForm.keyFingerprint.$error
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
      Update Private Key
    </b-checkbox>
    <b-field
      v-if="!isEditing || (isEditing && editPrivateKey)"
      :label="`${$t('common.collumns.privateKey')} ${showRequiredSymble}`"
      custom-class="is-small"
      expanded
      :type="{
        'is-danger': $v.profileForm.privateKey.$error,
      }"
    >
      <b-input
        @blur="$v.profileForm.privateKey.$touch()"
        @input="$v.profileForm.privateKey.$touch()"
        size="is-small"
        type="textarea"
        v-model="profileForm.privateKey"
      />
      <template #message>
        <div
          v-if="
            !$v.profileForm.privateKey.required &&
            $v.profileForm.privateKey.$error
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
import { required, requiredIf, helpers } from 'vuelidate/lib/validators'
import profileFormMixin from '@/mixins/cloud/profileForm.js'

const isTenancyOcid = helpers.regex(
  'isTenancyOcid',
  /^ocid+\d+\.tenancy[a-z\d.]*$/
)

const isUserOcid = helpers.regex('isTenancyOcid', /^ocid+\d+\.user[a-z\d.]*$/)

export default {
  name: 'cloud-oracle-profileconfig-form-component',
  mixins: [profileFormMixin],
  methods: {
    editProfile(data) {
      this.profileForm = {
        selected: data.selected,
        id: data.id,
        profile: data.profile,
        tenancyOCID: data.tenancyOCID,
        userOCID: data.userOCID,
        keyFingerprint: data.keyFingerprint,
        region: data.region,
      }
      this.isEditing = false
      this.editPrivateKey = false
    },
  },
  computed: {
    validationFormFields() {
      return {
        profile: { required },
        tenancyOCID: {
          required,
          isTenancyOcid,
        },
        userOCID: { required, isUserOcid },
        keyFingerprint: { required },
        region: { required },
        privateKey: {
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
