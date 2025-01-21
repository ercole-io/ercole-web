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
        placeholder="Nodes"
        :keys="keys"
        :tableData="getDynamicMenu"
        :isLoadingTable="loadingTableStatus"
      >
        <template slot="headData">
          <th colspan="2" style="text-align: center !important">
            {{ $t('common.collumns.actions') }}
          </th>
          <v-th sortKey="name">Node Name</v-th>
          <v-th sortKey="parent">Parent Name</v-th>
        </template>

        <template slot="bodyData" slot-scope="rowData">
          <td
            style="min-width: 0; text-align: center"
            v-if="isAdmin"
            :data-cy="`edit-${rowData.scope.name}`"
          >
            <b-icon
              v-tooltip="options($t('common.general.edit'))"
              type="is-info"
              class="edit-icon"
              pack="fas"
              icon="edit"
              @click.native="upNode(rowData.scope)"
            />
          </td>
          <td
            style="min-width: 0"
            v-if="isAdmin"
            :data-cy="`delete-${rowData.scope.name}`"
          >
            <b-icon
              v-tooltip="options($t('common.general.delete'))"
              type="is-danger"
              class="delete-icon"
              pack="fas"
              icon="trash-alt"
              @click.native="delNode(rowData.scope.name)"
            />
          </td>
          <TdContent :value="rowData.scope.name" />
          <TdContent :value="rowData.scope.parent" />
        </template>
      </FullTable>
    </div>
    <div class="column is-3" v-if="isAdmin">
      <AdvancedFiltersBase
        filterTitle="Add or Update a Node"
        :submitAction="createUpdateNode"
        :applyText="
          isUpdate ? $t('common.forms.update') : $t('common.forms.add')
        "
        :isDisabled="$v.$invalid"
        :cancelText="$t('common.forms.cancel')"
        setMinHeight="580"
      >
        <b-field
          label="Node Name"
          custom-class="is-small"
          :type="{
            'is-danger': $v.nodeForm.name.$error,
          }"
        >
          <b-input
            type="text"
            size="is-small"
            v-model="nodeForm.name"
            @blur="$v.nodeForm.name.$touch()"
            @input="$v.nodeForm.name.$touch()"
            :disabled="isUpdate"
            data-cy="node-name"
          />
          <template #message>
            <div v-if="!$v.nodeForm.name.required && $v.nodeForm.name.$error">
              {{ $i18n.t('common.validations.requiredAlt') }}
            </div>
            <div v-if="!$v.nodeForm.name.noSpaces && $v.nodeForm.name.$error">
              This field does not allow spaces
            </div>
          </template>
        </b-field>

        <b-field
          label="Parent Name"
          custom-class="is-small"
          :type="{
            'is-danger': $v.nodeForm.parent.$error,
          }"
        >
          <b-input
            type="text"
            size="is-small"
            v-model="nodeForm.parent"
            @blur="$v.nodeForm.parent.$touch()"
            @input="$v.nodeForm.parent.$touch()"
            :disabled="isUpdate"
            data-cy="node-name"
          />
          <template #message>
            <div
              v-if="!$v.nodeForm.parent.noSpaces && $v.nodeForm.parent.$error"
            >
              This field does not allow spaces
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
              data-cy="group-roles"
            />

            <div
              class="custom-checkbox-control"
              v-if="filteredRoles().length > 0"
            >
              <b-checkbox-button
                v-model="nodeForm.roles"
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
import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'

const stringSearch = (str, srch) => {
  return str.toString().toUpperCase().includes(srch.toString().toUpperCase())
}

const noSpaces = helpers.regex('noSpaces', /^\S*$/)

export default {
  name: 'nodes-page',
  mixins: [TooltipMixin],
  components: {
    FullTable,
    TdContent,
    AdvancedFiltersBase,
  },
  data() {
    return {
      keys: ['name', 'parent', 'roles'],
      nodeForm: {
        name: '',
        parent: '',
        roles: [],
      },
      isUpdate: false,
      searchRole: '',
    }
  },
  validations() {
    return {
      nodeForm: {
        name: { required, noSpaces },
        parent: { noSpaces },
        roles: {},
      },
    }
  },
  async beforeMount() {
    if (this.isAdmin) {
      await this.getRoles()
    }

    bus.$on('onResetAction', () => this.resetForm())
  },
  methods: {
    ...mapActions([
      'getNode',
      'deleteNode',
      'updateNode',
      'createNode',
      'getRoles',
    ]),
    createUpdateNode() {
      if (this.isUpdate) {
        this.updateNode({
          data: this.nodeForm,
          nodename: this.nodeForm.name,
        }).then(() => {
          this.resetForm()
        })
      } else {
        this.createNode(this.nodeForm).then(() => {
          this.resetForm()
        })
      }
    },
    upNode(data) {
      this.isUpdate = true
      this.getNode(data.name).then((res) => {
        this.nodeForm = {
          name: data.name,
          parent: data.parent,
          roles: res.data.roles,
        }
      })
    },
    delNode(nodename) {
      this.$buefy.dialog.confirm({
        title: 'Delete Node',
        message: `Are you sure you want to <b>delete</b> the role <b>${nodename}</b>? This action cannot be undone.`,
        confirmText: 'Confirm',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.deleteNode(nodename).catch((err) => {
            this.$buefy.dialog.alert({
              title: 'Delete Node Warning',
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
      this.nodeForm = {
        name: '',
        parent: '',
        roles: [],
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
  },
  computed: {
    ...mapGetters([
      'getDynamicMenu',
      'loadingTableStatus',
      'isAdmin',
      'showRoles',
    ]),
  },
}
</script>

<style lang="scss" scoped>
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
