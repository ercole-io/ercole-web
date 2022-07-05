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
import { bus } from '@/helpers/eventBus.js'
import { mapActions } from 'vuex'
import { required, requiredIf } from 'vuelidate/lib/validators'
import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'

export default {
  components: {
    AdvancedFiltersBase,
  },
  validations() {
    return {
      profileForm: this.validationFormFields,
    }
  },
  data() {
    return {
      profileForm: {
        selected: false,
      },
      isEditing: false,
      editPrivateKey: false,
    }
  },
  beforeMount() {
    bus.$on('onResetAction', () => this.resetForm())

    bus.$on('editProfile', (data) => {
      bus.$emit('onToggleEdit', true)
      this.editProfile(data)
      this.isEditing = true
    })
  },
  methods: {
    ...mapActions(['createProfile', 'updateProfile']),
    addUpdateProfile() {
      if (this.profileForm.id) {
        this.updateProfile(this.profileForm).then(() => this.resetForm())
      } else {
        this.createProfile(this.profileForm).then(() => this.resetForm())
      }
      this.isEditing = false
      this.editPrivateKey = false
    },
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
    resetForm() {
      this.profileForm = {
        selected: false,
      }
      this.isEditing = false
      this.editPrivateKey = false
    },
  },
  computed: {
    validationFormFields() {
      return {
        profile: { required },
        tenancyOCID: { required },
        userOCID: { required },
        keyFingerprint: { required },
        region: { required },
        privateKey: {
          required: requiredIf(() => {
            return !this.isEditing
          }),
        },
      }
    },
    showRequiredSymble() {
      return this.isEditing ? '' : '*'
    },
  },
}
</script>

<style lang="scss" scoped></style>