<template>
  <FullTable
    slot="center"
    placeholder="Profile"
    :keys="keys"
    :tableData="returnCloudProfiles"
    :isLoadingTable="loadingTableStatus"
  >
    <template slot="headData">
      <th style="text-align: center !important">
        {{ $t('common.collumns.activeProfiles') }}
      </th>
      <th colspan="2" style="text-align: center !important">
        {{ $t('common.collumns.actions') }}
      </th>
      <v-th sortKey="id"> ID </v-th>
      <v-th sortKey="accesskeyid"> Access Key ID </v-th>
      <v-th sortKey="region"> Region </v-th>
    </template>

    <template slot="bodyData" slot-scope="rowData">
      <td style="min-width: 0; text-align: center !important">
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
      <TdContent :value="rowData.scope.id" />
      <TdContent :value="rowData.scope.accesskeyid" />
      <TdContent :value="rowData.scope.region" />
    </template>
  </FullTable>
</template>

<script>
import profileListMixin from '@/mixins/cloud/profileList.js'

export default {
  name: 'cloud-aws-profileconfig-list-component',
  mixins: [profileListMixin],
  data() {
    return {
      keys: ['id', 'accesskeyid', 'region', 'selected'],
    }
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
