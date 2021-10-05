<template>
  <FullTable
    slot="center"
    placeholder="Profile"
    :keys="keys"
    :tableData="getProfileList"
  >
    <template slot="headData">
      <th colspan="2" style="text-align: center !important;">
        {{ $t('common.collumns.actions') }}
      </th>
      <v-th sortKey="Profile">
        Profile Name
      </v-th>
      <v-th sortKey="TenancyOCID">
        Tenancy OCID
      </v-th>
      <v-th sortKey="UserOCID">
        User OCID
      </v-th>
      <v-th sortKey="KeyFingerprint">
        Key Fingerprint
      </v-th>
      <v-th sortKey="Region">
        Region
      </v-th>
      <v-th sortKey="PrivateKey">
        Private Key
      </v-th>
    </template>

    <template slot="bodyData" slot-scope="rowData">
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
          @click.native="deleteProfile(rowData.scope.Profile)"
        />
      </td>
      <TdContent :value="rowData.scope.Profile" />
      <TdContent :value="rowData.scope.TenancyOCID" />
      <TdContent :value="rowData.scope.UserOCID" />
      <TdContent :value="rowData.scope.KeyFingerprint" />
      <TdContent :value="rowData.scope.Region" />
      <TdContent :value="rowData.scope.PrivateKey" />
    </template>
  </FullTable>
</template>

<script>
import { mapGetters } from 'vuex'
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
        'Profile',
        'TenancyOCID',
        'UserOCID',
        'KeyFingerprint',
        'Region',
        'PrivateKey'
      ]
    }
  },
  methods: {
    editProfile(profile) {
      bus.$emit('editProfile', profile)
    },
    deleteProfile(profile) {
      console.log(`delete profile ${profile}`)
    }
  },
  computed: {
    ...mapGetters(['getProfileList'])
  }
}
</script>

<style lang="scss" scoped></style>
