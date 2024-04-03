<template>
  <div class="columns">
    <div
      class="column"
      :class="{
        'is-9': isAdmin,
        'is-12': !isAdmin,
      }"
    >
      <UsersList />
    </div>
    <div class="column is-3" v-if="isAdmin">
      <template>
        <AdvancedFiltersBase
          filterTitle="Add or Update an Basic User"
          :submitAction="createUpdateUserBasic"
          :applyText="
            isUpdateBasic ? $t('common.forms.update') : $t('common.forms.add')
          "
          :isDisabled="$v.userBasicForm.$invalid"
          :cancelText="$t('common.forms.cancel')"
          setMinHeight="600"
        >
          <b-field
            label="First Name"
            custom-class="is-small"
            :type="{
              'is-danger': $v.userBasicForm.firstName.$error,
            }"
          >
            <b-input
              type="text"
              size="is-small"
              v-model="userBasicForm.firstName"
              @blur="$v.userBasicForm.firstName.$touch()"
              @input="$v.userBasicForm.firstName.$touch()"
              :disabled="isUpdateBasic"
              data-cy="first-name"
            />
            <template #message>
              <div
                v-if="
                  !$v.userBasicForm.firstName.required &&
                  $v.userBasicForm.firstName.$error
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
              'is-danger': $v.userBasicForm.lastName.$error,
            }"
          >
            <b-input
              type="text"
              size="is-small"
              v-model="userBasicForm.lastName"
              @blur="$v.userBasicForm.lastName.$touch()"
              @input="$v.userBasicForm.lastName.$touch()"
              :disabled="isUpdateBasic"
              data-cy="last-name"
            />
            <template #message>
              <div
                v-if="
                  !$v.userBasicForm.lastName.required &&
                  $v.userBasicForm.lastName.$error
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
              'is-danger': $v.userBasicForm.username.$error,
            }"
          >
            <b-input
              type="text"
              size="is-small"
              v-model="userBasicForm.username"
              @blur="$v.userBasicForm.username.$touch()"
              @input="$v.userBasicForm.username.$touch()"
              :disabled="isUpdateBasic"
              data-cy="user-name"
            />
            <template #message>
              <div
                v-if="
                  !$v.userBasicForm.username.required &&
                  $v.userBasicForm.username.$error
                "
              >
                {{ $i18n.t('common.validations.requiredAlt') }}
              </div>
              <div
                v-if="
                  !$v.userBasicForm.username.noSpaces &&
                  $v.userBasicForm.username.$error
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
              'is-danger': $v.userBasicForm.password.$error,
            }"
            v-if="!isUpdateBasic"
          >
            <b-input
              type="password"
              size="is-small"
              v-model="userBasicForm.password"
              @blur="$v.userBasicForm.password.$touch()"
              @input="$v.userBasicForm.password.$touch()"
              password-reveal
              data-cy="password"
            />
            <template #message>
              <div
                v-if="
                  !$v.userBasicForm.password.required &&
                  $v.userBasicForm.password.$error
                "
              >
                {{ $i18n.t('common.validations.requiredAlt') }}
              </div>
              <div
                v-if="
                  !$v.userBasicForm.password.noSpaces &&
                  $v.userBasicForm.password.$error
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
              'is-danger': $v.userBasicForm.confirmPassword.$error,
            }"
            v-if="!isUpdateBasic"
            data-cy="confirm-password"
          >
            <b-input
              type="password"
              size="is-small"
              v-model="userBasicForm.confirmPassword"
              @blur="$v.userBasicForm.confirmPassword.$touch()"
              @input="$v.userBasicForm.confirmPassword.$touch()"
              password-reveal
            />
            <template #message>
              <div
                v-if="
                  !$v.userBasicForm.confirmPassword.required &&
                  $v.userBasicForm.confirmPassword.$error
                "
              >
                Confirm password must match with password field.
              </div>
              <div
                v-if="
                  !$v.userBasicForm.confirmPassword.noSpaces &&
                  $v.userBasicForm.confirmPassword.$error
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
                data-cy="groups"
              />

              <div
                class="custom-checkbox-control"
                v-if="filteredGroups().length > 0"
              >
                <b-checkbox-button
                  v-model="userBasicForm.groups"
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
      </template>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
// import { axiosRequest } from '@/services/services.js'
import { helpers, sameAs } from 'vuelidate/lib/validators'
import UsersList from '@/components/profile/users/UsersList.vue'
import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'

const stringSearch = (str, srch) => {
  return str.toString().toUpperCase().includes(srch.toString().toUpperCase())
}

const noSpaces = helpers.regex('noSpaces', /^\S*$/)

export default {
  name: 'users-page',
  components: {
    UsersList,
    AdvancedFiltersBase,
  },
  data() {
    return {
      userBasicForm: {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
        groups: [],
      },
      // userLdapForm: {
      //   GivenName: '',
      //   Sn: '',
      //   Uid: '',
      //   groups: [],
      // },
      // isUpdateLdap: false,
      isUpdateBasic: false,
      searchGroup: '',
      // ldapUsersData: [],
      // ldapUserSelected: null,
      // ldapUserError: '',
    }
  },
  validations() {
    return {
      userBasicForm: {
        firstName: {},
        lastName: {},
        username: {
          noSpaces,
        },
        password: {
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
    bus.$on('updateUser', (data) => {
      this.isUpdateBasic = true

      this.userBasicForm = {
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        username: data.user.username,
        groups: _.isArray(data.user.groups) ? data.user.groups : [],
      }
    })
  },
  methods: {
    ...mapActions([
      'getUsers',
      'createUser',
      'updateUser',
      'getGroups',
      'offLoadingTable',
    ]),
    createUpdateUserBasic() {
      delete this.userBasicForm.confirmPassword
      if (this.isUpdateBasic) {
        this.updateUser({
          data: this.userBasicForm,
          username: this.userBasicForm.username,
        }).then(() => {
          this.resetForm()
        })
      } else {
        this.createUser({
          data: this.userBasicForm,
        })
          .then(() => {
            this.resetForm()
          })
          .catch((err) => {
            if (err.status === 422) {
              this.offLoadingTable()
              this.$buefy.dialog.alert({
                title: 'Username aleardy exists!',
                message: `
                <p class="has-text-weight-bold">Please choose another username.</p>
              `,
                cancelButton: false,
                type: 'is-warning',
              })
            }
          })
      }
    },

    resetBasicForm() {
      this.userBasicForm = {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        groups: [],
      }
      this.isUpdateBasic = false
    },
    resetForm() {
      this.resetBasicForm()
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
    ...mapGetters(['showGroups', 'isAdmin', 'getProvider']),
  },
}
</script>

<style lang="scss" scoped>
.custom-checkbox-control {
  height: 110px;
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
