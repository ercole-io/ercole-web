<template>
  <FullTable
    slot="center"
    placeholder="Profile"
    :keys="keys"
    :tableData="getOciProfiles"
    :isLoadingTable="loadingTableStatus"
  >
    <template slot="headData">
      <th style="text-align: center !important">
        {{ $t('common.collumns.activeProfiles') }}
      </th>
      <th colspan="2" style="text-align: center !important">
        {{ $t('common.collumns.actions') }}
      </th>
      <v-th sortKey="profile">
        {{ $t('common.collumns.profileName') }}
      </v-th>
      <v-th sortKey="tenancyOCID">
        {{ $t('common.collumns.tenancy') }}
      </v-th>
      <v-th sortKey="userOCID">
        {{ $t('common.collumns.userOCID') }}
      </v-th>
      <v-th sortKey="keyFingerprint">
        {{ $t('common.collumns.keyFingerprint') }}
      </v-th>
      <v-th sortKey="region">
        {{ $t('common.collumns.region') }}
      </v-th>
    </template>

    <template slot="bodyData" slot-scope="rowData">
      <td style="min-width: 0; text-align: center !important">
        <!-- <b-checkbox
          v-model="rowData.scope.selected"
          @change.native="
            toggleProfile(rowData.scope.id, rowData.scope.selected)
          "
        /> -->
        <b-button
          @click="toggleProfile(rowData.scope.id, !rowData.scope.selected)"
          class="button-checkbox"
          type="is-primary"
          :icon-right="
            rowData.scope.selected
              ? 'checkbox-marked'
              : 'checkbox-blank-outline'
          "
          size="is-small"
          inverted
        />
      </td>
      <td style="min-width: 0">
        <b-icon
          v-tooltip="options($t('common.general.edit'))"
          type="is-info"
          class="edit-icon"
          pack="fas"
          icon="edit"
          @click.native="editProfile(rowData.scope)"
        />
      </td>
      <td style="min-width: 0">
        <b-icon
          v-tooltip="options($t('common.general.delete'))"
          type="is-danger"
          class="delete-icon"
          pack="fas"
          icon="trash-alt"
          @click.native="
            deleteProfile(
              rowData.scope.id,
              rowData.scope.profile,
              rowData.scope.selected
            )
          "
        />
      </td>
      <TdContent :value="rowData.scope.profile" />
      <TdContent :value="rowData.scope.tenancyOCID" />
      <TdContent :value="rowData.scope.userOCID" />
      <TdContent :value="rowData.scope.keyFingerprint" />
      <TdContent :value="rowData.scope.region" />
    </template>
  </FullTable>
</template>

<script>
import i18n from '@/i18n.js'
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  mixins: [TooltipMixin],
  components: {
    FullTable,
    TdContent,
  },
  data() {
    return {
      keys: [
        'profile',
        'tenancyOCID',
        'userOCID',
        'keyFingerprint',
        'region',
        'privateKey',
      ],
    }
  },
  methods: {
    ...mapActions(['getProfiles', 'removeProfile', 'activateProfile']),
    toggleProfile(id, selected) {
      this.$buefy.dialog.alert({
        title: 'Profile Activating/Deactivating Warning',
        type: 'is-warning',
        message:
          "<p>It's recommended to retrieve updates on the <b>Recommendations page</b> <br> after <b>Activating/Deactivating</b> a profile to get updated information!<p>",
        confirmText: i18n.t('common.general.yes'),
        cancelText: i18n.t('common.general.close'),
        canCancel: true,
        hasIcon: true,
        icon: 'alert',
        iconPack: 'mdi',
        onConfirm: () => {
          this.activateProfile({
            id: id,
            isActive: selected,
          }).then(() => {
            this.getProfiles()
          })
        },
      })
    },
    editProfile(profile) {
      bus.$emit('editProfile', profile)
    },
    deleteProfile(id, profile, isActive) {
      if (isActive) {
        this.$buefy.dialog.alert(this.$i18n.t('views.cloud.cannotDelete'))
      } else {
        this.$buefy.dialog.confirm({
          title: this.$i18n.t('views.cloud.deleteTitle'),
          message: this.$i18n.t('views.cloud.deleteCheck', {
            profile: profile,
          }),
          confirmText: this.$i18n.t('common.general.yes'),
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => {
            this.removeProfile(id).then(() => {
              this.$buefy.toast.open({
                message: this.$i18n.t('views.cloud.deleteSuccess', {
                  profile: profile,
                }),
                type: 'is-success',
                duration: 5000,
                position: 'is-bottom',
              })
            })
          },
          cancelText: this.$i18n.t('common.general.no'),
        })
      }
    },
  },
  computed: {
    ...mapGetters(['getOciProfiles', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped>
.button-checkbox {
  padding: 0;
  font-size: 1rem;
  height: inherit;
  background-color: transparent !important;
}
</style>
