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
        placeholder="Roles"
        :keys="keys"
        :tableData="showRoles"
        :isLoadingTable="loadingTableStatus"
      >
        <template slot="headData">
          <th colspan="2" style="text-align: center !important">
            {{ $t('common.collumns.actions') }}
          </th>
          <v-th sortKey="name">Role Name</v-th>
          <v-th sortKey="location">Location</v-th>
          <v-th sortKey="permission">Permission</v-th>
          <v-th sortKey="description">Role Description</v-th>
        </template>

        <template slot="bodyData" slot-scope="rowData">
          <td style="min-width: 0; text-align: center" v-if="isAdmin">
            <b-icon
              v-tooltip="options($t('common.general.edit'))"
              type="is-info"
              class="edit-icon"
              pack="fas"
              icon="edit"
              @click.native="upRole(rowData.scope)"
            />
          </td>
          <td style="min-width: 0" v-if="isAdmin">
            <b-icon
              v-tooltip="options($t('common.general.delete'))"
              type="is-danger"
              class="delete-icon"
              pack="fas"
              icon="trash-alt"
              @click.native="delRole(rowData.scope.name)"
            />
          </td>
          <TdContent :value="rowData.scope.name" />
          <TdContent :value="rowData.scope.location" />
          <TdContent :value="rowData.scope.permission" />
          <TdContent :value="rowData.scope.description" />
        </template>
      </FullTable>
    </div>
    <div class="column is-3" v-if="isAdmin">
      <AdvancedFiltersBase
        filterTitle="Add or Update a Role"
        :submitAction="createUpdateRole"
        :applyText="
          isUpdate ? $t('common.forms.update') : $t('common.forms.add')
        "
        :isDisabled="$v.$invalid"
        :cancelText="$t('common.forms.cancel')"
        setMinHeight="580"
      >
        <b-field
          label="Role Name"
          custom-class="is-small"
          :type="{
            'is-danger': $v.roleForm.name.$error,
          }"
        >
          <b-input
            type="text"
            size="is-small"
            v-model="roleForm.name"
            @blur="$v.roleForm.name.$touch()"
            @input="$v.roleForm.name.$touch()"
            :disabled="isUpdate"
          />
          <template #message>
            <div v-if="!$v.roleForm.name.required && $v.roleForm.name.$error">
              {{ $i18n.t('common.validations.requiredAlt') }}
            </div>
            <div v-if="!$v.roleForm.name.noSpaces && $v.roleForm.name.$error">
              This field does not allow spaces
            </div>
          </template>
        </b-field>

        <b-field
          label="Location"
          custom-class="is-small"
          :type="{
            'is-danger': $v.roleForm.location.$error,
          }"
        >
          <b-select
            @blur="$v.roleForm.location.$touch()"
            @input="$v.roleForm.location.$touch()"
            size="is-small"
            placeholder="Select"
            v-model="roleForm.location"
            expanded
          >
            <option
              v-for="location in getLocations"
              :key="location"
              :value="location"
            >
              {{ location }}
            </option>
          </b-select>
          <template #message>
            <div
              v-if="
                !$v.roleForm.location.required && $v.roleForm.location.$error
              "
            >
              {{ $i18n.t('common.validations.requiredAlt') }}
            </div>
          </template>
        </b-field>

        <b-field
          label="Permission"
          custom-class="is-small"
          :type="{
            'is-danger': $v.roleForm.permission.$error,
          }"
        >
          <b-input
            type="text"
            size="is-small"
            v-model="roleForm.permission"
            @blur="$v.roleForm.permission.$touch()"
            @input="$v.roleForm.permission.$touch()"
          />
          <template #message>
            <div
              v-if="
                !$v.roleForm.permission.required &&
                $v.roleForm.permission.$error
              "
            >
              {{ $i18n.t('common.validations.requiredAlt') }}
            </div>
          </template>
        </b-field>

        <b-field
          label="Role Description"
          custom-class="is-small"
          :type="{
            'is-danger': $v.roleForm.description.$error,
          }"
        >
          <b-input
            type="textarea"
            size="is-small"
            rows="4"
            v-model="roleForm.description"
            @blur="$v.roleForm.description.$touch()"
            @input="$v.roleForm.description.$touch()"
          />
          <template #message>
            <div
              v-if="
                !$v.roleForm.description.required &&
                $v.roleForm.description.$error
              "
            >
              {{ $i18n.t('common.validations.requiredAlt') }}
            </div>
          </template>
        </b-field>
      </AdvancedFiltersBase>
    </div>
  </div>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import { helpers, required } from 'vuelidate/lib/validators'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'

const noSpaces = helpers.regex('noSpaces', /^\S*$/)

export default {
  mixins: [TooltipMixin],
  components: {
    FullTable,
    TdContent,
    AdvancedFiltersBase,
  },
  data() {
    return {
      keys: ['name', 'description', 'location', 'permission'],
      roleForm: {
        name: '',
        description: '',
        location: '',
        permission: '',
      },
      isUpdate: false,
    }
  },
  validations() {
    return {
      roleForm: {
        name: { required, noSpaces },
        description: { required },
        location: { required },
        permission: { required },
      },
    }
  },
  async beforeMount() {
    await this.getRoles()
    await this.getGlobalFiltersLocations()

    bus.$on('onResetAction', () => this.resetForm())
  },
  methods: {
    ...mapActions([
      'getRoles',
      'deleteRole',
      'updateRole',
      'createRole',
      'getGlobalFiltersLocations',
    ]),
    createUpdateRole() {
      if (this.isUpdate) {
        this.updateRole({
          data: this.roleForm,
          rolename: this.roleForm.name,
        }).then(() => {
          this.resetForm()
        })
      } else {
        this.createRole(this.roleForm).then(() => {
          this.resetForm()
        })
      }
    },
    upRole(data) {
      this.isUpdate = true
      this.roleForm = {
        name: data.name,
        description: data.description,
        location: data.location,
        permission: data.permission,
      }
    },
    delRole(rolename) {
      this.$buefy.dialog.confirm({
        title: 'Delete Role',
        message: `Are you sure you want to <b>delete</b> the role <b>${rolename}</b>? This action cannot be undone.`,
        confirmText: 'Confirm',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.deleteRole(rolename).catch((err) => {
            this.$buefy.dialog.alert({
              title: 'Delete Role Warning',
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
      this.roleForm = {
        name: '',
        description: '',
        location: '',
        permission: '',
      }
    },
  },
  computed: {
    ...mapGetters([
      'showRoles',
      'loadingTableStatus',
      'isAdmin',
      'getLocations',
    ]),
  },
}
</script>

<style lang="scss" scoped></style>
