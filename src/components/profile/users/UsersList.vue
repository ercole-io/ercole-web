<template>
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
    </template>

    <template slot="bodyData" slot-scope="rowData">
      <template v-if="isAdmin">
        <td
          style="min-width: 0; text-align: center"
          :data-cy="`edit-${rowData.scope.username}`"
        >
          <b-icon
            v-tooltip="options($t('common.general.edit'))"
            type="is-info"
            pack="fas"
            icon="edit"
            @click.native="upUser(rowData.scope)"
            v-if="verifyShowing(rowData.scope)"
          />
        </td>
        <td style="min-width: 0" :data-cy="`reset-${rowData.scope.username}`">
          <b-button
            v-tooltip="`Reset Password`"
            type="is-ghost"
            icon-pack="fas"
            icon-right="repeat"
            size="is-small"
            @click.native="newPass(rowData.scope.username)"
            v-if="verifyShowing(rowData.scope)"
            :loading="resetPassLoading"
          />
        </td>
        <td style="min-width: 0" :data-cy="`delete-${rowData.scope.username}`">
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
      </template>
      <TdContent :value="rowData.scope.firstName" />
      <TdContent :value="rowData.scope.lastName" />
      <TdContent :value="rowData.scope.username" />
      <TdArrayMore :value="rowData.scope.groups" />
    </template>
  </FullTable>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdArrayMore from '@/components/common/Table/TdArrayMore.vue'
import ResetPassModal from '@/views/profile/ResetPassModal.vue'

export default {
  name: 'profile-list-component',
  mixins: [TooltipMixin],
  components: {
    FullTable,
    TdContent,
    TdArrayMore,
  },
  data() {
    return {
      keys: ['firstName', 'lastName', 'username', 'lastLogin', 'groups'],
      resetPassLoading: false,
    }
  },
  methods: {
    ...mapActions(['resetPassword', 'deleteUser']),
    upUser(data) {
      bus.$emit('updateUser', { user: data })
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
    delUser(username) {
      this.$buefy.dialog.confirm({
        title: 'Delete User',
        message: `Are you sure you want to <b>delete</b> the user <b>${username}</b>? This action cannot be undone.`,
        confirmText: 'Confirm',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.deleteUser({ username: username })
        },
      })
    },
    verifyShowing(data) {
      return data.username !== 'ercole' && this.isAdmin
    },
  },
  computed: {
    ...mapGetters([
      'showUsers',
      'loadingTableStatus',
      'isAdmin',
      'showResetPassword',
    ]),
  },
}
</script>

<style lang="scss" scoped></style>
