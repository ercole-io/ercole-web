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
      <!-- <div class="is-flex py-3 is-justify-content-space-around">
        <b-radio
          v-model="provider"
          size="is-small"
          name="name"
          native-value="basic"
        >
          Basic
        </b-radio>
        <b-radio
          v-model="provider"
          size="is-small"
          name="name"
          native-value="ldap"
        >
          LDAP
        </b-radio>
      </div> -->

      <template v-if="provider === 'basic'">
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

      <!-- <template v-if="provider === 'ldap'">
        <AdvancedFiltersBase
          filterTitle="Add or Update an LDAP User"
          :submitAction="createUpdateUserLdap"
          :applyText="
            isUpdateLdap ? $t('common.forms.update') : $t('common.forms.add')
          "
          :isDisabled="$v.userLdapForm.$invalid"
          :cancelText="$t('common.forms.cancel')"
          setMinHeight="600"
        >
          <b-field
            label="Username"
            custom-class="is-small"
            :type="{
              'is-danger': $v.userLdapForm.Uid.$error,
            }"
          >
            <b-autocomplete
              v-model="userLdapForm.Uid"
              size="is-small"
              type="text"
              icon="magnify"
              field="uid"
              :data="ldapUsersData"
              @blur="$v.userLdapForm.Uid.$touch()"
              @input="$v.userLdapForm.Uid.$touch()"
              @typing="filteredLdapUsers($event)"
              @select="selecteLdapUser"
              @icon-right-click="clearLdapUsersSearch"
              icon-right="close-circle"
              icon-right-clickable
              :disabled="isUpdateLdap"
            >
              <template slot-scope="props">
                <div class="media media-custom">
                  <div class="media-content">
                    <b>{{ props.option.uid }}</b> -
                    <small>
                      {{ props.option.givenName }} {{ props.option.sn }}
                    </small>
                  </div>
                </div>
              </template>
              <template slot="empty">
                {{ ldapUserError }}
              </template>
            </b-autocomplete>

            <template #message>
              <div
                v-if="
                  !$v.userLdapForm.Uid.required && $v.userLdapForm.Uid.$error
                "
              >
                {{ $i18n.t('common.validations.requiredAlt') }}
              </div>
              <div
                v-if="
                  !$v.userLdapForm.Uid.noSpaces && $v.userLdapForm.Uid.$error
                "
              >
                This field does not allow spaces
              </div>
            </template>
          </b-field>

          <b-field
            label="First Name"
            custom-class="is-small"
            :type="{
              'is-danger': $v.userLdapForm.GivenName.$error,
            }"
          >
            <b-input
              type="text"
              size="is-small"
              v-model="userLdapForm.GivenName"
              @blur="$v.userLdapForm.GivenName.$touch()"
              @input="$v.userLdapForm.GivenName.$touch()"
              :disabled="isUpdateLdap"
            />
            <template #message>
              <div
                v-if="
                  !$v.userLdapForm.GivenName.required &&
                  $v.userLdapForm.GivenName.$error
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
              'is-danger': $v.userLdapForm.Sn.$error,
            }"
          >
            <b-input
              type="text"
              size="is-small"
              v-model="userLdapForm.Sn"
              @blur="$v.userLdapForm.Sn.$touch()"
              @input="$v.userLdapForm.Sn.$touch()"
              :disabled="isUpdateLdap"
            />
            <template #message>
              <div
                v-if="!$v.userLdapForm.Sn.required && $v.userLdapForm.Sn.$error"
              >
                {{ $i18n.t('common.validations.requiredAlt') }}
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
                  v-model="userLdapForm.groups"
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
      </template> -->
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
// import { axiosRequest } from '@/services/services.js'
import { helpers, requiredIf, sameAs } from 'vuelidate/lib/validators'
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
      provider: 'basic',
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
        firstName: {
          required: requiredIf(() => this.provider === 'basic'),
        },
        lastName: {
          required: requiredIf(() => this.provider === 'basic'),
        },
        username: {
          required: requiredIf(() => this.provider === 'basic'),
          noSpaces,
        },
        password: {
          required: requiredIf(
            () => !this.isUpdateBasic && this.provider === 'basic'
          ),
          noSpaces,
        },
        confirmPassword: {
          sameAs: sameAs((val) => val.password),
          noSpaces,
          $lazy: true,
        },
      },
      // userLdapForm: {
      //   GivenName: {
      //     required: requiredIf(() => this.provider === 'ldap'),
      //   },
      //   Sn: {
      //     required: requiredIf(() => this.provider === 'ldap'),
      //   },
      //   Uid: {
      //     required: requiredIf(() => this.provider === 'ldap'),
      //     noSpaces,
      //   },
      // },
    }
  },
  async beforeMount() {
    await this.getUsers()
    await this.getGroups()

    bus.$on('onResetAction', () => this.resetForm())
    bus.$on('updateUser', (data) => {
      this.provider = data.provider

      // if (this.provider === 'ldap') {
      //   this.isUpdateBasic = false
      //   this.resetBasicForm()

      //   this.isUpdateLdap = true

      //   this.userLdapForm = {
      //     GivenName: data.user.firstName,
      //     Sn: data.user.lastName,
      //     Uid: data.user.username,
      //     groups: _.isArray(data.user.groups) ? data.user.groups : [],
      //   }
      // }

      if (this.provider === 'basic') {
        // this.isUpdateLdap = false
        // this.resetLdapForm()

        this.isUpdateBasic = true

        this.userBasicForm = {
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          username: data.user.username,
          groups: _.isArray(data.user.groups) ? data.user.groups : [],
        }
      }
    })
  },
  methods: {
    ...mapActions(['getUsers', 'createUser', 'updateUser', 'getGroups']),
    createUpdateUserBasic() {
      delete this.userBasicForm.confirmPassword
      if (this.isUpdateBasic) {
        this.updateUser({
          data: this.userBasicForm,
          username: this.userBasicForm.username,
          provider: this.provider,
        }).then(() => {
          this.resetForm()
        })
      } else {
        this.createUser({
          data: this.userBasicForm,
          provider: this.provider,
        }).then(() => {
          this.resetForm()
        })
      }
    },
    // createUpdateUserLdap() {
    //   if (this.isUpdateLdap) {
    //     this.updateUser({
    //       data: {
    //         groups: this.userLdapForm.groups,
    //       },
    //       username: this.userLdapForm.Uid,
    //       provider: this.provider,
    //     }).then(() => {
    //       this.resetForm()
    //     })
    //   } else {
    //     this.createUser({
    //       data: {
    //         userLdap: {
    //           GivenName: this.userLdapForm.GivenName,
    //           Sn: this.userLdapForm.Sn,
    //           Uid: this.userLdapForm.Uid,
    //         },
    //         groups: this.userLdapForm.groups,
    //       },
    //       provider: this.provider,
    //     }).then(() => {
    //       this.resetForm()
    //     })
    //   }
    // },
    // resetLdapForm() {
    //   this.userLdapForm = {
    //     GivenName: '',
    //     Sn: '',
    //     Uid: '',
    //     groups: [],
    //   }
    //   this.isUpdateLdap = false
    // },
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
      if (this.provider === 'basic') {
        this.resetBasicForm()
      }

      // if (this.provider === 'ldap') {
      //   this.resetLdapForm()
      // }
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
    // filteredLdapUsers: _.debounce(function (username) {
    //   if (!username.length) {
    //     this.ldapUsersData = []
    //     return
    //   }

    //   const config = {
    //     method: 'get',
    //     url: `users/ldap/${username}`,
    //   }

    //   axiosRequest('baseApi', config)
    //     .then((res) => {
    //       this.ldapUsersData = res.data
    //     })
    //     .catch((err) => {
    //       this.ldapUserError = err.data.error
    //     })
    // }, 1000),
    // selecteLdapUser(option) {
    //   if (option) {
    //     this.userLdapForm = {
    //       GivenName: option.givenName,
    //       Sn: option.sn,
    //       Uid: option.uid,
    //       groups: [],
    //     }
    //   } else {
    //     this.resetLdapForm()
    //     this.ldapUsersData = []
    //   }
    // },
    // clearLdapUsersSearch() {
    //   this.userLdapForm = {
    //     GivenName: '',
    //     Sn: '',
    //     Uid: '',
    //   }
    //   this.ldapUsersData = []
    // },
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
