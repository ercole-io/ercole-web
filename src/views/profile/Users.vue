<template>
  <div class="columns">
    <div class="column is-9">
      <FullTable
        placeholder="Users"
        :keys="keys"
        :tableData="showUsers"
        :isLoadingTable="loadingTableStatus"
      >
        <template slot="headData">
          <th colspan="2" style="text-align: center !important">
            {{ $t('common.collumns.actions') }}
          </th>
          <v-th sortKey="firstName">First Name</v-th>
          <v-th sortKey="lastName">Last Name</v-th>
          <v-th sortKey="username">Username</v-th>
          <v-th sortKey="groups">Groups</v-th>
        </template>

        <template slot="bodyData" slot-scope="rowData">
          <td style="min-width: 0; text-align: center">
            <b-icon
              v-tooltip="options($t('common.general.edit'))"
              type="is-info"
              class="edit-icon"
              pack="fas"
              icon="edit"
              @click.native="upUser(rowData.scope)"
            />
          </td>
          <td style="min-width: 0">
            <b-icon
              v-tooltip="options($t('common.general.delete'))"
              type="is-danger"
              class="delete-icon"
              pack="fas"
              icon="trash-alt"
              @click.native="delUser(rowData.scope.username)"
            />
          </td>
          <TdContent :value="rowData.scope.firstName" />
          <TdContent :value="rowData.scope.lastName" />
          <TdContent :value="rowData.scope.username" />
          <TdArrayMore :value="rowData.scope.groups" />
        </template>
      </FullTable>
    </div>
    <div class="column is-3">
      <AdvancedFiltersBase
        filterTitle="Add or Update an User"
        :submitAction="createUpdateUser"
        :isDisabled="$v.$invalid"
        :applyText="
          isUpdate ? $t('common.forms.update') : $t('common.forms.add')
        "
        :cancelText="$t('common.forms.cancel')"
        setMinHeight="600"
      >
        <b-field
          label="First Name"
          custom-class="is-small"
          :type="{
            'is-danger': $v.userForm.firstName.$error,
          }"
        >
          <b-input
            type="text"
            size="is-small"
            v-model="userForm.firstName"
            @blur="$v.userForm.firstName.$touch()"
            @input="$v.userForm.firstName.$touch()"
            :disabled="isUpdate"
          />
          <template #message>
            <div
              v-if="
                !$v.userForm.firstName.required && $v.userForm.firstName.$error
              "
            >
              {{ $i18n.t('common.validations.requiredAlt') }}
            </div>
          </template>
        </b-field>

        <b-field
          label="Last Name"
          custom-class="is-small"
          :type="{
            'is-danger': $v.userForm.lastName.$error,
          }"
        >
          <b-input
            type="text"
            size="is-small"
            v-model="userForm.lastName"
            @blur="$v.userForm.lastName.$touch()"
            @input="$v.userForm.lastName.$touch()"
            :disabled="isUpdate"
          />
          <template #message>
            <div
              v-if="
                !$v.userForm.lastName.required && $v.userForm.lastName.$error
              "
            >
              {{ $i18n.t('common.validations.requiredAlt') }}
            </div>
          </template>
        </b-field>

        <b-field
          label="Username"
          custom-class="is-small"
          :type="{
            'is-danger': $v.userForm.username.$error,
          }"
        >
          <b-input
            type="text"
            size="is-small"
            v-model="userForm.username"
            @blur="$v.userForm.username.$touch()"
            @input="$v.userForm.username.$touch()"
            :disabled="isUpdate"
          />
          <template #message>
            <div
              v-if="
                !$v.userForm.username.required && $v.userForm.username.$error
              "
            >
              {{ $i18n.t('common.validations.requiredAlt') }}
            </div>
          </template>
        </b-field>

        <b-field
          label="Password"
          custom-class="is-small"
          :type="{
            'is-danger': $v.userForm.password.$error,
          }"
        >
          <b-input
            type="password"
            size="is-small"
            v-model="userForm.password"
            @blur="$v.userForm.password.$touch()"
            @input="$v.userForm.password.$touch()"
            password-reveal
          />
          <template #message>
            <div
              v-if="
                !$v.userForm.password.required && $v.userForm.password.$error
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
            'is-danger': $v.userForm.confirmPassword.$error,
          }"
        >
          <b-input
            type="password"
            size="is-small"
            v-model="userForm.confirmPassword"
            @blur="$v.userForm.confirmPassword.$touch()"
            @input="$v.userForm.confirmPassword.$touch()"
            password-reveal
          />
          <template #message>
            <div
              v-if="
                !$v.userForm.confirmPassword.required &&
                $v.userForm.confirmPassword.$error
              "
            >
              Confirm password must match with password field.
            </div>
          </template>
        </b-field>

        <b-field label="Groups" custom-class="is-small">
          <b-select
            size="is-small"
            multiple
            native-size="7"
            v-model="userForm.groups"
            expanded
          >
            <option
              v-for="group in showGroups"
              :key="group.name"
              :value="group.name"
            >
              {{ group.name }}
            </option>
          </b-select>
        </b-field>
      </AdvancedFiltersBase>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import { required, requiredIf, sameAs } from 'vuelidate/lib/validators'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdArrayMore from '@/components/common/Table/TdArrayMore.vue'
import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'

export default {
  mixins: [TooltipMixin],
  components: {
    FullTable,
    TdContent,
    TdArrayMore,
    AdvancedFiltersBase,
  },
  data() {
    return {
      keys: ['firstName', 'lastName', 'username', 'lastLogin', 'groups'],
      userForm: {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        groups: [],
      },
      isUpdate: false,
      confirmPassword: '',
    }
  },
  validations() {
    return {
      userForm: {
        firstName: { required },
        lastName: { required },
        username: { required },
        password: {
          required: requiredIf(() => !this.isUpdate),
        },
        confirmPassword: {
          sameAs: sameAs((val) => val.password),
          $lazy: true,
        },
      },
    }
  },
  async beforeMount() {
    await this.getUsers()
    await this.getGroups()

    bus.$on('onResetAction', () => this.resetForm())
  },
  methods: {
    ...mapActions([
      'getUsers',
      'createUser',
      'updateUser',
      'deleteUser',
      'getGroups',
    ]),
    createUpdateUser() {
      delete this.userForm.confirmPassword
      if (this.isUpdate) {
        this.updateUser({
          data: this.userForm,
          username: this.userForm.username,
        }).then(() => {
          this.resetForm()
        })
      } else {
        this.createUser(this.userForm).then(() => {
          this.resetForm()
        })
      }
    },
    upUser(data) {
      this.isUpdate = true
      this.userForm = {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        groups: _.isArray(data.groups) ? data.groups : [],
      }
    },
    delUser(username) {
      this.$buefy.dialog.confirm({
        title: 'Delete User',
        message: `Are you sure you want to <b>delete</b> the user <b>${username}</b>? This action cannot be undone.`,
        confirmText: 'Confirm',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.deleteUser(username)
        },
      })
    },
    resetForm() {
      this.isUpdate = false
      this.userForm = {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        groups: [],
      }
    },
  },
  computed: {
    ...mapGetters(['showUsers', 'showGroups', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
