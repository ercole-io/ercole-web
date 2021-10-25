<template>
  <FullTable
    slot="center"
    placeholder="Profile"
    :keys="keys"
    :tableData="getOciProfiles"
  >
    <template slot="headData">
      <th style="text-align: center !important;">
        {{ $t('common.collumns.activeProfiles') }}
      </th>
      <th colspan="2" style="text-align: center !important;">
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
      <v-th sortKey="privateKey">
        {{ $t('common.collumns.privateKey') }}
      </v-th>
    </template>

    <template slot="bodyData" slot-scope="rowData">
      <td style="min-width: 0; text-align: center !important;">
        <b-checkbox
          v-model="activeOciProfiles"
          :native-value="rowData.scope.id"
        />
      </td>
      <td style="min-width: 0;">
        <b-icon
          v-tooltip="options($t('common.general.edit'))"
          type="is-info"
          class="edit-icon"
          pack="fas"
          icon="edit"
          @click.native="editProfile(rowData.scope)"
        />
      </td>
      <td style="min-width: 0;">
        <b-icon
          v-tooltip="options($t('common.general.delete'))"
          type="is-danger"
          class="delete-icon"
          pack="fas"
          icon="trash-alt"
          @click.native="deleteProfile(rowData.scope.id, rowData.scope.profile)"
        />
      </td>
      <TdContent :value="rowData.scope.profile" />
      <TdContent :value="rowData.scope.tenancyOCID" />
      <TdContent :value="rowData.scope.userOCID" />
      <TdContent :value="rowData.scope.keyFingerprint" />
      <TdContent :value="rowData.scope.region" />
      <TdContent :value="rowData.scope.privateKey" />
    </template>
  </FullTable>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { bus } from '@/helpers/eventBus.js'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  mixins: [TooltipMixin],
  components: {
    FullTable,
    TdContent
  },
  data() {
    return {
      keys: [
        'profile',
        'tenancyOCID',
        'userOCID',
        'keyFingerprint',
        'region',
        'privateKey'
      ],
      activeOciProfiles: []
    }
  },
  beforeMount() {
    this.activeOciProfiles = this.getOciActiveProfiles
  },
  methods: {
    ...mapActions(['removeProfile']),
    ...mapMutations(['SET_OCI_ACTIVE_PROFILE']),
    editProfile(profile) {
      bus.$emit('editProfile', profile)
    },
    deleteProfile(id, profile) {
      if (_.includes(this.activeOciProfiles, id)) {
        this.$buefy.dialog.alert(this.$i18n.t('views.cloud.cannotDelete'))
      } else {
        this.$buefy.dialog.confirm({
          title: this.$i18n.t('views.cloud.deleteTitle'),
          message: this.$i18n.t('views.cloud.deleteCheck', {
            profile: profile
          }),
          confirmText: this.$i18n.t('common.general.yes'),
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => {
            this.removeProfile(id).then(() => {
              this.$buefy.toast.open({
                message: this.$i18n.t('views.cloud.deleteSuccess', {
                  profile: profile
                }),
                type: 'is-success',
                duration: 5000,
                position: 'is-bottom'
              })
            })
          },
          cancelText: this.$i18n.t('common.general.no')
        })
      }
    }
  },
  computed: {
    ...mapGetters(['getOciProfiles', 'getOciActiveProfiles'])
  },
  watch: {
    activeOciProfiles(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.SET_OCI_ACTIVE_PROFILE(newValue)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
