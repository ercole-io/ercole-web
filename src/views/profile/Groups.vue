<template>
  <div class="columns">
    <div class="column is-9">
      <FullTable
        placeholder="Groups"
        :keys="keys"
        :tableData="showGroups"
        :isLoadingTable="loadingTableStatus"
      >
        <template slot="headData">
          <th colspan="2" style="text-align: center !important">
            {{ $t('common.collumns.actions') }}
          </th>
          <v-th sortKey="name">Group Name</v-th>
          <v-th sortKey="roles">Roles</v-th>
        </template>

        <template slot="bodyData" slot-scope="rowData">
          <td style="min-width: 0; text-align: center">
            <b-icon
              v-tooltip="options($t('common.general.edit'))"
              type="is-info"
              class="edit-icon"
              pack="fas"
              icon="edit"
              @click.native="upGroup(rowData.scope)"
            />
          </td>
          <td style="min-width: 0">
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
          <TdArrayMore :value="rowData.scope.roles" />
        </template>
      </FullTable>
    </div>
    <div class="column is-3">
      <AdvancedFiltersBase
        filterTitle="Add or Update an User"
        :submitAction="createUpdateGroup"
        :applyText="
          isUpdate ? $t('common.forms.update') : $t('common.forms.add')
        "
        :cancelText="$t('common.forms.cancel')"
        setMinHeight="540"
      >
        <b-field label="Group Name">
          <b-input
            type="text"
            size="is-small"
            v-model="groupForm.name"
            :readonly="isUpdate"
          />
        </b-field>

        <b-field label="Roles" class="is-relative">
          <b-icon
            v-tooltip="options('Create a New Role')"
            type="is-primary"
            class="createRole is-clickable"
            pack="fas"
            icon="plus"
            @click.native="addRole"
          />
          <b-icon
            v-tooltip="options('Delete Role')"
            type="is-danger"
            class="deleteRole is-clickable"
            pack="fas"
            icon="trash-alt"
            @click.native="delRole"
          />
          <b-select
            size="is-small"
            multiple
            native-size="10"
            v-model="groupForm.roles"
            expanded
          >
            <option
              v-for="role in showRoles"
              :key="role.name"
              :value="role.name"
              class="is-relative"
            >
              {{ role.name }}
            </option>
          </b-select>
        </b-field>
      </AdvancedFiltersBase>

      <b-modal
        :active.sync="isCreateRoleModalActive"
        :width="300"
        :can-cancel="false"
      >
        <CreateRoleModal />
      </b-modal>

      <b-modal
        :active.sync="isDeleteRoleModalActive"
        :width="300"
        :can-cancel="false"
      >
        <DeleteRoleModal :roleList="showRoles" />
      </b-modal>
    </div>
  </div>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdArrayMore from '@/components/common/Table/TdArrayMore.vue'
import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'
import CreateRoleModal from '@/views/profile/CreateRoleModal.vue'
import DeleteRoleModal from '@/views/profile/DeleteRoleModal.vue'

export default {
  mixins: [TooltipMixin],
  components: {
    FullTable,
    TdContent,
    TdArrayMore,
    AdvancedFiltersBase,
    CreateRoleModal,
    DeleteRoleModal,
  },
  data() {
    return {
      keys: ['name', 'roles'],
      groupForm: {
        name: '',
        roles: [],
      },
      isUpdate: false,
      isDeleteRoleModalActive: false,
      isCreateRoleModalActive: false,
    }
  },
  async beforeMount() {
    await this.getGroups()
    await this.getRoles()

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
        roles: data.roles,
      }
    },
    delGroup(name) {
      this.$buefy.dialog.confirm({
        title: 'Delete User',
        message: `Are you sure you want to <b>delete</b> the group <b>${name}</b>? This action cannot be undone.`,
        confirmText: 'Confirm',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.deleteGroup(name)
        },
      })
    },
    resetForm() {
      this.isUpdate = false
      this.groupForm = {
        name: '',
        roles: [],
      }
    },
    addRole() {
      this.isCreateRoleModalActive = true
    },
    delRole() {
      this.isDeleteRoleModalActive = true
    },
  },
  computed: {
    ...mapGetters(['showGroups', 'showRoles', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped>
.createRole {
  position: absolute;
  top: 3px;
  right: 0;
}
.deleteRole {
  position: absolute;
  top: 3px;
  right: 30px;
}
</style>
