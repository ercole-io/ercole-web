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
        placeholder="Groups"
        :keys="keys"
        :tableData="showGroups"
        :isLoadingTable="loadingTableStatus"
      >
        <template slot="headData">
          <th colspan="2" style="text-align: center !important" v-if="isAdmin">
            {{ $t('common.collumns.actions') }}
          </th>
          <v-th sortKey="name">Group Name</v-th>
          <v-th sortKey="name">Group Description</v-th>
          <v-th sortKey="roles">Roles</v-th>
          <v-th sortKey="tags">Tags</v-th>
        </template>

        <template slot="bodyData" slot-scope="rowData">
          <td style="min-width: 0; text-align: center" v-if="isAdmin">
            <b-icon
              v-tooltip="options($t('common.general.edit'))"
              type="is-info"
              class="edit-icon"
              pack="fas"
              icon="edit"
              @click.native="upGroup(rowData.scope)"
            />
          </td>
          <td style="min-width: 0" v-if="isAdmin">
            <b-icon
              v-tooltip="options($t('common.general.delete'))"
              type="is-danger"
              class="delete-icon"
              pack="fas"
              icon="trash-alt"
              @click.native="delGroup(rowData.scope.name)"
            />
          </td>
          <TdContent :value="rowData.scope.name" />
          <TdContent :value="rowData.scope.description" />
          <TdArrayMore :value="rowData.scope.roles" />
          <TdArrayMore :value="rowData.scope.tags || []" />
        </template>
      </FullTable>
    </div>
    <div class="column is-3" v-if="isAdmin">
      <AdvancedFiltersBase
        filterTitle="Add or Update a Group"
        :submitAction="createUpdateGroup"
        :applyText="
          isUpdate ? $t('common.forms.update') : $t('common.forms.add')
        "
        :isDisabled="$v.$invalid"
        :cancelText="$t('common.forms.cancel')"
        setMinHeight="680"
      >
        <b-field
          label="Group Name"
          custom-class="is-small"
          :type="{
            'is-danger': $v.groupForm.name.$error,
          }"
        >
          <b-input
            type="text"
            size="is-small"
            v-model="groupForm.name"
            @blur="$v.groupForm.name.$touch()"
            @input="$v.groupForm.name.$touch()"
            :disabled="isUpdate"
          />
          <template #message>
            <div v-if="!$v.groupForm.name.required && $v.groupForm.name.$error">
              {{ $i18n.t('common.validations.requiredAlt') }}
            </div>
            <div v-if="!$v.groupForm.name.noSpaces && $v.groupForm.name.$error">
              This field does not allow spaces
            </div>
          </template>
        </b-field>

        <b-field
          label="Group Description"
          custom-class="is-small"
          :type="{
            'is-danger': $v.groupForm.description.$error,
          }"
        >
          <b-input
            type="textarea"
            size="is-small"
            rows="2"
            v-model="groupForm.description"
            @blur="$v.groupForm.description.$touch()"
            @input="$v.groupForm.description.$touch()"
            :disabled="isUpdate"
          />
          <template #message>
            <div
              v-if="
                !$v.groupForm.description.required &&
                $v.groupForm.description.$error
              "
            >
              {{ $i18n.t('common.validations.requiredAlt') }}
            </div>
          </template>
        </b-field>

        <b-field label="Roles" custom-class="is-small">
          <div class="is-flex is-flex-direction-column">
            <b-input
              placeholder="Search Role"
              type="text"
              size="is-small"
              icon="magnify"
              icon-right="close-circle"
              icon-right-clickable
              @icon-right-click="onSearchRoleClear"
              @input="filteredRoles"
              v-model="searchRole"
              v-if="filteredRoles().length > 0 || searchRole !== ''"
            />

            <div
              class="custom-checkbox-control"
              v-if="filteredRoles().length > 0"
            >
              <b-checkbox-button
                v-model="groupForm.roles"
                type="is-primary"
                size="is-small"
                v-for="role in filteredRoles()"
                :key="role.name"
                :native-value="role.name"
              >
                <span>
                  <p>{{ role.name }}</p>
                  <small>{{ role.description }}</small>
                </span>
              </b-checkbox-button>
            </div>
            <div
              class="custom-checkbox-control is-justify-content-center is-align-items-center is-size-7"
              v-else
            >
              There are no roles!
            </div>
          </div>
        </b-field>

        <b-field label="Tags" custom-class="is-small">
          <div class="is-flex is-flex-direction-column">
            <b-input
              placeholder="Search Tags"
              type="text"
              size="is-small"
              icon="magnify"
              icon-right="close-circle"
              icon-right-clickable
              @icon-right-click="onSearchTagClear"
              @input="filteredTags"
              v-model="searchTag"
              v-if="filteredTags().length > 0 || searchTag !== ''"
            />

            <div
              class="custom-checkbox-control"
              v-if="filteredTags().length > 0"
            >
              <b-checkbox-button
                v-model="groupForm.tags"
                type="is-primary"
                size="is-small"
                v-for="tag in filteredTags()"
                :key="tag"
                :native-value="tag"
              >
                <span>
                  <p>{{ tag }}</p>
                </span>
              </b-checkbox-button>
            </div>
            <div
              class="custom-checkbox-control is-justify-content-center is-align-items-center is-size-7"
              v-else
            >
              There are no tags!
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
import { helpers, required } from 'vuelidate/lib/validators'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdArrayMore from '@/components/common/Table/TdArrayMore.vue'
import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'

const stringSearch = (str, srch) => {
  return str.toString().toUpperCase().includes(srch.toString().toUpperCase())
}

const noSpaces = helpers.regex('noSpaces', /^\S*$/)

export default {
  name: 'groups-page',
  mixins: [TooltipMixin],
  components: {
    FullTable,
    TdContent,
    TdArrayMore,
    AdvancedFiltersBase,
  },
  data() {
    return {
      keys: ['name', 'description', 'roles', 'tags'],
      groupForm: {
        name: '',
        description: '',
        roles: [],
        tags: [],
      },
      isUpdate: false,
      searchRole: '',
      searchTag: '',
    }
  },
  validations() {
    return {
      groupForm: {
        name: { required, noSpaces },
        description: { required },
      },
    }
  },
  async beforeMount() {
    await this.getGroups()

    if (this.isAdmin) {
      await this.getRoles()
    }

    bus.$on('onResetAction', () => this.resetForm())
  },
  methods: {
    ...mapActions([
      'getGroups',
      'createGroup',
      'updateGroup',
      'deleteGroup',
      'getRoles',
      'createRole',
    ]),
    createUpdateGroup() {
      if (this.isUpdate) {
        this.updateGroup({
          data: this.groupForm,
          groupname: this.groupForm.name,
        }).then(() => {
          this.resetForm()
        })
      } else {
        this.createGroup(this.groupForm).then(() => {
          this.resetForm()
        })
      }
    },
    upGroup(data) {
      this.isUpdate = true
      this.groupForm = {
        name: data.name,
        description: data.description,
        roles: data.roles,
        tags: data.tags,
      }
    },
    delGroup(name) {
      this.$buefy.dialog.confirm({
        title: 'Delete Group',
        message: `Are you sure you want to <b>delete</b> the group <b>${name}</b>? This action cannot be undone.`,
        confirmText: 'Confirm',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.deleteGroup(name).catch((err) => {
            this.$buefy.dialog.alert({
              title: 'Delete Group Warning',
              message: err.error,
              confirmText: 'OK',
              type: 'is-warning',
              hasIcon: true,
            })
          })
        },
      })
    },
    resetForm() {
      this.isUpdate = false
      this.groupForm = {
        name: '',
        description: '',
        roles: [],
        tags: [],
      }
    },
    onSearchRoleClear() {
      this.searchRole = ''
    },
    filteredRoles() {
      if (this.searchRole !== '') {
        return _.filter(this.showRoles, (role) => {
          return (
            stringSearch(role.name, this.searchRole) ||
            stringSearch(role.description, this.searchRole)
          )
        })
      }
      return this.showRoles
    },
    onSearchTagClear() {
      this.searchTag = ''
    },
    filteredTags() {
      this.showTags = []
      if (this.searchTag !== '') {
        return _.filter(this.showTags, (tag) => {
          return stringSearch(tag, this.searchTag)
        })
      }
      return this.showTags
    },
  },
  computed: {
    ...mapGetters(['showGroups', 'showRoles', 'loadingTableStatus', 'isAdmin']),
  },
}
</script>

<style lang="scss">
.custom-checkbox-control {
  height: 300px;
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
