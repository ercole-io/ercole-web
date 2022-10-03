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
          <TdContent :value="rowData.scope.username" />
          <TdArrayMore :value="rowData.scope.groups" />
        </template>
      </FullTable>
    </div>
    <div class="column is-3">
      <AdvancedFiltersBase
        filterTitle="Add or Update an User"
        :submitAction="createUpdateUser"
        :applyText="
          isUpdate ? $t('common.forms.update') : $t('common.forms.add')
        "
        :cancelText="$t('common.forms.cancel')"
        setMinHeight="540"
      >
        <b-field label="Username">
          <b-input
            type="text"
            size="is-small"
            v-model="userForm.username"
            :readonly="isUpdate"
          />
        </b-field>

        <b-field label="Password">
          <b-input
            type="password"
            size="is-small"
            v-model="userForm.password"
            password-reveal
          />
        </b-field>

        <b-field label="Groups">
          <b-select
            size="is-small"
            multiple
            native-size="10"
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
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
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
      keys: ['username', 'lastLogin', 'groups'],
      userForm: {
        username: '',
        password: '',
        groups: [],
      },
      isUpdate: false,
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
        username: data.username,
        groups: data.groups,
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
