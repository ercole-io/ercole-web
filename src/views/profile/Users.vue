<template>
  <div class="columns">
    <div
      class="column"
      :class="{
        'is-9': isAdmin,
        'is-12': !isAdmin,
      }"
    >
      <FullTable
        placeholder="Users"
        :keys="keys"
        :tableData="showUsers"
        :isLoadingTable="loadingTableStatus"
      >
        <template slot="headData">
          <th colspan="3" style="text-align: center !important" v-if="isAdmin">
            {{ $t('common.collumns.actions') }}
          </th>
          <v-th sortKey="firstName">First Name</v-th>
          <v-th sortKey="lastName">Last Name</v-th>
          <v-th sortKey="username">Username</v-th>
          <v-th sortKey="groups">Groups</v-th>
          <v-th sortKey="provider">Provider</v-th>
        </template>

        <template slot="bodyData" slot-scope="rowData">
          <td style="min-width: 0; text-align: center" v-if="isAdmin">
            <b-icon
              v-tooltip="options($t('common.general.edit'))"
              type="is-info"
              pack="fas"
              icon="edit"
              @click.native="upUser(rowData.scope)"
              v-if="rowData.scope.username !== 'ercole' && isAdmin"
            />
          </td>
          <td style="min-width: 0" v-if="isAdmin">
            <b-button
              v-tooltip="`Reset Password`"
              type="is-ghost"
              icon-pack="fas"
              icon-right="repeat"
              size="is-small"
              @click.native="newPass(rowData.scope.username)"
              v-if="
                rowData.scope.username !== 'ercole' &&
                isAdmin &&
                rowData.scope.provider === 'basic'
              "
              :loading="resetPassLoading"
            />
          </td>
          <td style="min-width: 0" v-if="isAdmin">
            <b-icon
              v-tooltip="options($t('common.general.delete'))"
              type="is-danger"
              pack="fas"
              icon="trash-alt"
              size="is-small"
              @click.native="delUser(rowData.scope.username)"
              v-if="rowData.scope.username !== 'ercole' && isAdmin"
            />
          </td>
          <TdContent :value="rowData.scope.firstName" />
          <TdContent :value="rowData.scope.lastName" />
          <TdContent :value="rowData.scope.username" />
          <TdArrayMore :value="rowData.scope.groups" />
          <TdContent :value="rowData.scope.provider" />
        </template>
      </FullTable>
    </div>
    <div class="column is-3" v-if="isAdmin">
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
            <div
              v-if="
                !$v.userForm.username.noSpaces && $v.userForm.username.$error
              "
            >
              This field does not allow spaces
            </div>
          </template>
        </b-field>

        <b-field
          label="Password"
          custom-class="is-small"
          :type="{
            'is-danger': $v.userForm.password.$error,
          }"
          v-if="!isUpdate"
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
            <div
              v-if="
                !$v.userForm.password.noSpaces && $v.userForm.password.$error
              "
            >
              This field does not allow spaces
            </div>
          </template>
        </b-field>

        <b-field
          label="Confirm Password"
          custom-class="is-small"
          :type="{
            'is-danger': $v.userForm.confirmPassword.$error,
          }"
          v-if="!isUpdate"
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
            <div
              v-if="
                !$v.userForm.confirmPassword.noSpaces &&
                $v.userForm.confirmPassword.$error
              "
            >
              This field does not allow spaces
            </div>
          </template>
        </b-field>

        <b-field label="Groups" custom-class="is-small">
          <div class="is-flex is-flex-direction-column">
            <b-input
              placeholder="Search Group"
              type="text"
              size="is-small"
              icon="magnify"
              icon-right="close-circle"
              icon-right-clickable
              @icon-right-click="onSearchGroupClear"
              @input="filteredGroups"
              v-model="searchGroup"
              v-if="filteredGroups().length > 0 || searchGroup !== ''"
            />

            <div
              class="custom-checkbox-control"
              v-if="filteredGroups().length > 0"
            >
              <b-checkbox-button
                v-model="userForm.groups"
                type="is-primary"
                size="is-small"
                v-for="group in filteredGroups()"
                :key="group.name"
                :native-value="group.name"
              >
                <span>
                  <p>{{ group.name }}</p>
                  <small>{{ group.description }}</small>
                </span>
              </b-checkbox-button>
            </div>
            <div
              class="custom-checkbox-control is-justify-content-center is-align-items-center is-size-7"
              v-else
            >
              There are no groups!
            </div>
          </div>
        </b-field>
      </AdvancedFiltersBase>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import { helpers, required, requiredIf, sameAs } from 'vuelidate/lib/validators'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdArrayMore from '@/components/common/Table/TdArrayMore.vue'
import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'
import ResetPassModal from '@/views/profile/ResetPassModal.vue'

const stringSearch = (str, srch) => {
  return str.toString().toUpperCase().includes(srch.toString().toUpperCase())
}

const noSpaces = helpers.regex('noSpaces', /^\S*$/)

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
      keys: [
        'firstName',
        'lastName',
        'username',
        'lastLogin',
        'groups',
        'provider',
      ],
      userForm: {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
        groups: [],
      },
      isUpdate: false,
      resetPassLoading: false,
      searchGroup: '',
    }
  },
  validations() {
    return {
      userForm: {
        firstName: { required },
        lastName: { required },
        username: { required, noSpaces },
        password: {
          required: requiredIf(() => !this.isUpdate),
          noSpaces,
        },
        confirmPassword: {
          sameAs: sameAs((val) => val.password),
          noSpaces,
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
      'resetPassword',
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
    newPass(username) {
      this.resetPassLoading = true
      this.resetPassword(username).then(() => {
        this.resetPassLoading = false
        this.$buefy.modal.open({
          parent: this,
          component: ResetPassModal,
          hasModalCard: true,
          customClass: 'custom-class custom-class-2',
          trapFocus: true,
          props: {
            newPass: this.showResetPassword,
          },
        })
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
    onSearchGroupClear() {
      this.searchGroup = ''
    },
    filteredGroups() {
      if (this.searchGroup !== '') {
        return _.filter(this.showGroups, (role) => {
          return stringSearch(role.name, this.searchGroup)
        })
      }
      return this.showGroups
    },
  },
  computed: {
    ...mapGetters([
      'showUsers',
      'showGroups',
      'loadingTableStatus',
      'isAdmin',
      'showResetPassword',
      'getProvider',
    ]),
  },
}
</script>

<style lang="scss" scoped>
.custom-checkbox-control {
  height: 150px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border: 1px solid #dbdbdb;
  border-top: none;

  .control {
    .checkbox {
      height: auto;
      display: block;
      text-align: left;

      p {
        font-weight: bold;
        margin-bottom: 0;
      }
      small {
        white-space: pre-wrap;
      }
    }
  }
}
</style>