<template>
  <FullTable
    placeholder="Search on MySql Agreements"
    :keys="keys"
    :tableData="returnLicensesAgreement('mysql')"
    :clickedRow="() => []"
  >
    <template slot="headData">
      <v-th sortKey="type">Type</v-th>
      <v-th sortKey="numberOfLicenses">Number of licenses</v-th>
      <v-th sortKey="clusters">Clusters</v-th>
      <v-th sortKey="hosts">Hosts</v-th>
      <th colspan="2" style="max-width: 100px">Actions</th>
    </template>

    <template slot="bodyData" slot-scope="rowData">
      <TdContent :value="rowData.scope.type" />
      <TdContent :value="rowData.scope.numberOfLicenses" />
      <TdArray :value="rowData.scope.clusters" />
      <TdArray :value="rowData.scope.hosts" />
      <td style="min-width: 50px;">
        <b-icon
          v-tooltip="options('Edit Agreement')"
          type="is-info"
          class="edit-icon"
          pack="fas"
          icon="edit"
          @click.native="editAgreement(rowData.scope)"
        />
      </td>
      <td style="min-width: 50px;">
        <b-icon
          v-tooltip="options('Delete Agreement')"
          type="is-danger"
          class="delete-icon"
          pack="fas"
          icon="trash-alt"
          @click.native="deleteAgreement('mysql', rowData.scope.id)"
        />
      </td>
    </template>
  </FullTable>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import LicensesAgreementMixin from '@/mixins/licensesAgreement.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdArray from '@/components/common/Table/TdArray.vue'

export default {
  mixins: [TooltipMixin, LicensesAgreementMixin],
  components: {
    FullTable,
    TdContent,
    TdArray
  },
  data() {
    return {
      keys: ['type', 'numberOfLicenses', 'clusters', 'hosts']
    }
  },
  methods: {
    editAgreement(data) {
      bus.$emit('editAgreementMysql', data)
    }
  }
}
</script>

<style lang="scss" scoped></style>
