<template>
  <section>
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
        <td>
          <b-icon
            v-tooltip="options('Show Clusters')"
            type="is-link"
            class="hosts-icon"
            pack="fas"
            icon="server"
            @click.native="openModal('Show Clusters', rowData.scope.clusters)"
            v-if="rowData.scope.clusters.length > 0"
          />
          <span v-else>-</span>
        </td>
        <td>
          <b-icon
            v-tooltip="options('Hosts')"
            type="is-link"
            class="hosts-icon"
            pack="fas"
            icon="server"
            @click.native="openModal('Hosts', rowData.scope.hosts)"
            v-if="rowData.scope.hosts.length > 0"
          />
          <span v-else>-</span>
        </td>
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
  </section>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import LicensesAgreementMixin from '@/mixins/licensesAgreement.js'
import MysqlAssociatedModal from '@/components/licenses/agreement/MySQL/MysqlAssociatedModal.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  mixins: [TooltipMixin, LicensesAgreementMixin],
  components: {
    FullTable,
    TdContent
  },
  data() {
    return {
      keys: ['type', 'numberOfLicenses', 'clusters', 'hosts']
    }
  },
  methods: {
    editAgreement(data) {
      bus.$emit('editAgreementMysql', data)
    },
    openModal(type, data) {
      this.$buefy.modal.open({
        component: MysqlAssociatedModal,
        hasModalCard: true,
        props: { agreementType: type, agreementData: data }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
