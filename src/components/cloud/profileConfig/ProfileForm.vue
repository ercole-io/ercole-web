<template>
  <AdvancedFiltersBase
    filterTitle="Add or Update a Profile"
    :submitAction="addUpdateProfile"
    :isDisabled="$v.$invalid"
    applyText="Add/Update"
    cancelText="Cancel"
  >
    <b-field
      label="Profile Name *"
      custom-class="is-small"
      expanded
      :type="{
        'is-danger': $v.profileForm.Profile.$error
      }"
    >
      <b-input
        @blur="$v.profileForm.Profile.$touch()"
        @input="$v.profileForm.Profile.$touch()"
        size="is-small"
        type="text"
        v-model="profileForm.Profile"
      />
      <template #message>
        <div
          v-if="
            !$v.profileForm.Profile.required && $v.profileForm.Profile.$error
          "
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
      </template>
    </b-field>

    <b-field
      label="Tenancy OCID *"
      custom-class="is-small"
      expanded
      :type="{
        'is-danger': $v.profileForm.TenancyOCID.$error
      }"
    >
      <b-input
        @blur="$v.profileForm.TenancyOCID.$touch()"
        @input="$v.profileForm.TenancyOCID.$touch()"
        size="is-small"
        type="text"
        v-model="profileForm.TenancyOCID"
      />
      <template #message>
        <div
          v-if="
            !$v.profileForm.TenancyOCID.required &&
              $v.profileForm.TenancyOCID.$error
          "
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
      </template>
    </b-field>

    <b-field
      label="User OCID *"
      custom-class="is-small"
      expanded
      :type="{
        'is-danger': $v.profileForm.UserOCID.$error
      }"
    >
      <b-input
        @blur="$v.profileForm.UserOCID.$touch()"
        @input="$v.profileForm.UserOCID.$touch()"
        size="is-small"
        type="text"
        v-model="profileForm.UserOCID"
      />
      <template #message>
        <div
          v-if="
            !$v.profileForm.UserOCID.required && $v.profileForm.UserOCID.$error
          "
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
      </template>
    </b-field>

    <b-field
      label="Key Fingerprint *"
      custom-class="is-small"
      expanded
      :type="{
        'is-danger': $v.profileForm.KeyFingerprint.$error
      }"
    >
      <b-input
        @blur="$v.profileForm.KeyFingerprint.$touch()"
        @input="$v.profileForm.KeyFingerprint.$touch()"
        size="is-small"
        type="text"
        v-model="profileForm.KeyFingerprint"
      />
      <template #message>
        <div
          v-if="
            !$v.profileForm.KeyFingerprint.required &&
              $v.profileForm.KeyFingerprint.$error
          "
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
      </template>
    </b-field>

    <b-field
      label="Region *"
      custom-class="is-small"
      expanded
      :type="{
        'is-danger': $v.profileForm.Region.$error
      }"
    >
      <b-input
        @blur="$v.profileForm.Region.$touch()"
        @input="$v.profileForm.Region.$touch()"
        size="is-small"
        type="text"
        v-model="profileForm.Region"
      />
      <template #message>
        <div
          v-if="!$v.profileForm.Region.required && $v.profileForm.Region.$error"
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
      </template>
    </b-field>

    <b-field
      label="Private Key *"
      custom-class="is-small"
      expanded
      :type="{
        'is-danger': $v.profileForm.PrivateKey.$error
      }"
    >
      <b-input
        @blur="$v.profileForm.PrivateKey.$touch()"
        @input="$v.profileForm.PrivateKey.$touch()"
        size="is-small"
        type="textarea"
        v-model="profileForm.PrivateKey"
      />
      <template #message>
        <div
          v-if="
            !$v.profileForm.PrivateKey.required &&
              $v.profileForm.PrivateKey.$error
          "
        >
          {{ $i18n.t('common.validations.requiredAlt') }}
        </div>
      </template>
    </b-field>
  </AdvancedFiltersBase>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { required } from 'vuelidate/lib/validators'
import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'

export default {
  components: {
    AdvancedFiltersBase
  },
  validations: {
    profileForm: {
      Profile: { required },
      TenancyOCID: { required },
      UserOCID: { required },
      KeyFingerprint: { required },
      Region: { required },
      PrivateKey: { required }
    }
  },
  beforeMount() {
    bus.$on('onResetAction', () => (this.profileForm = {}))
    bus.$on('editProfile', data => {
      bus.$emit('onToggleEdit', true)
      this.editProfile(data)
    })
  },
  data() {
    return {
      profileForm: {}
    }
  },
  methods: {
    addUpdateProfile() {
      console.log(this.profileForm)
    },
    editProfile(data) {
      this.profileForm = {
        Profile: data.Profile,
        TenancyOCID: data.TenancyOCID,
        UserOCID: data.UserOCID,
        KeyFingerprint: data.KeyFingerprint,
        Region: data.Region,
        PrivateKey: data.PrivateKey
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
