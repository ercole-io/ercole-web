<template>
  <FullTable
    :placeholder="$t('menu.repository')"
    :keys="keys"
    :tableData="getRepository"
    :isLoadingTable="loadingTableStatus"
  >
    <template slot="headData">
      <v-th sortKey="Download">Copy Path</v-th>
      <v-th sortKey="Download">Download</v-th>
      <v-th sortKey="Name">{{ $t('common.collumns.repoName') }}</v-th>
      <v-th sortKey="Version">{{ $t('common.collumns.version') }}</v-th>
      <v-th sortKey="Filename">{{ $t('common.collumns.filename') }}</v-th>
      <v-th sortKey="Arch">{{ $t('common.collumns.arch') }}</v-th>
      <v-th sortKey="OperatingSystem">{{ $t('common.collumns.opSys') }}</v-th>
      <v-th sortKey="OperatingSystemFamily">{{
        $t('common.collumns.opSysFam')
      }}</v-th>
      <v-th sortKey="Repository">{{ $t('common.collumns.repository') }}</v-th>
      <v-th sortKey="Installed">{{ $t('common.collumns.installed') }}</v-th>
      <v-th sortKey="ReleaseDate">{{ $t('common.collumns.releaseDate') }}</v-th>
    </template>

    <template slot="bodyData" slot-scope="rowData">
      <td>
        <span
          class="is-block has-text-centered"
          v-copy="rowData.scope.Download"
        >
          <b-icon type="is-info" icon="copy" pack="fas" size="is-small" />
        </span>
      </td>
      <td v-tooltip="options(rowData.scope.Filename)">
        <span
          class="is-block has-text-centered"
          @click="downloadRepo(rowData.scope.Download, rowData.scope.Filename)"
        >
          <b-icon
            type="is-custom-primary"
            icon="download"
            pack="fas"
            size="is-small"
          />
        </span>
      </td>
      <TdContent :value="rowData.scope.Name" />
      <TdContent :value="rowData.scope.Version" />
      <TdContent :value="rowData.scope.Filename" />
      <TdContent :value="rowData.scope.Arch" />
      <TdContent :value="rowData.scope.OperatingSystem" />
      <TdContent :value="rowData.scope.OperatingSystemFamily" />
      <TdContent :value="rowData.scope.Repository" />
      <TdIcon :value="rowData.scope.Installed" />
      <TdContent :value="rowData.scope.ReleaseDate" />
    </template>
  </FullTable>
</template>

<script>
import { mapGetters } from 'vuex'
import downloadMixin from '@/mixins/repository/download.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'

export default {
  mixins: [downloadMixin],
  components: {
    FullTable,
    TdContent,
    TdIcon,
  },
  data() {
    return {
      keys: [
        'Repository',
        'Installed',
        'Version',
        'ReleaseDate',
        'Filename',
        'Name',
        'OperatingSystemFamily',
        'OperatingSystem',
        'Arch',
        'Download',
      ],
    }
  },
  computed: {
    ...mapGetters(['getRepository', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped>
[copy-tooltip]::before {
  opacity: 0;
}
[copy-tooltip]::after {
  top: 21px;
  z-index: 0;
}
</style>
