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
      label="Access Key ID *"
      custom-class="is-small"
      expanded
      :type="{
        'is-danger': $v.profileForm.accesskeyid.$error,
      }"
    >
      <b-input
        @blur="$v.profileForm.accesskeyid.$touch()"
        @input="$v.profileForm.accesskeyid.$touch()"
        size="is-small"
        type="text"
        v-model="profileForm.accesskeyid"
      />
      <template #message>
        <div
          v-if="
            !$v.profileForm.accesskeyid.required &&
            $v.profileForm.accesskeyid.$error
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

    <b-checkbox
      v-if="isEditing"
      size="is-small"
      v-model="editPrivateKey"
      class="mb-2"
    >
      Update Private Key
    </b-checkbox>
    <b-field
      v-if="!isEditing || (isEditing && editPrivateKey)"
      :label="`Secret Access Key ${showRequiredSymble}`"
      custom-class="is-small"
      expanded
      :type="{
        'is-danger': $v.profileForm.secretaccesskey.$error,
      }"
    >
      <b-input
        @blur="$v.profileForm.secretaccesskey.$touch()"
        @input="$v.profileForm.secretaccesskey.$touch()"
        size="is-small"
        type="textarea"
        v-model="profileForm.secretaccesskey"
      />
      <template #message>
        <div
          v-if="
            !$v.profileForm.secretaccesskey.required &&
            $v.profileForm.secretaccesskey.$error
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
    ...mapActions(['createAwsProfile', 'updateAwsProfile']),
    addUpdateProfile() {
      if (this.isEditing) {
        this.updateAwsProfile(this.profileForm).then(() => this.resetForm())
      } else {
        this.createAwsProfile(this.profileForm).then(() => this.resetForm())
      }
      this.isEditing = false
      this.editPrivateKey = false
    },
    editProfile(data) {
      this.profileForm = {
        selected: data.selected,
        id: data.id,
        accesskeyid: data.accesskeyid,
        secretaccesskey: data.secretaccesskey,
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
        accesskeyid: { required },
        secretaccesskey: {
          required: requiredIf(() => {
            return !this.isEditing
          }),
        },
        region: { required },
      }
    },
    showRequiredSymble() {
      return this.isEditing ? '' : '*'
    },
  },
}
</script>

<style lang="scss" scoped></style>
