<template>
  <section>
    <FullTable
      placeholder="MySql Agreements"
      :keys="keys"
      :tableData="returnLicensesAgreement('mysql')"
      :clickedRow="() => []"
    >
      <template slot="headData">
        <th colspan="2" style="text-align: center !important;">
          {{ $t('common.collumns.actions') }}
        </th>
        <v-th sortKey="type">
          {{ $t('common.collumns.type') }}
        </v-th>
        <v-th sortKey="agreementID">
          {{ $t('common.collumns.agreeNumber') }}
        </v-th>
        <v-th sortKey="csi">
          {{ $t('common.collumns.csi') }}
        </v-th>
        <v-th sortKey="numberOfLicenses">
          {{ $t('common.collumns.numberLicenses') }}
        </v-th>
        <v-th sortKey="clusters">Clusters</v-th>
        <v-th sortKey="hosts">Hosts</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <td style="min-width: 0;">
          <b-icon
            v-tooltip="options('Edit Agreement')"
            type="is-info"
            class="edit-icon"
            pack="fas"
            icon="edit"
            @click.native="editAgreement(rowData.scope)"
          />
        </td>
        <td style="min-width: 0;">
          <b-icon
            v-tooltip="options('Delete Agreement')"
            type="is-danger"
            class="delete-icon"
            pack="fas"
            icon="trash-alt"
            @click.native="
              deleteAgreement(
                'mysql',
                rowData.scope.id,
                rowData.scope.agreementID
              )
            "
          />
        </td>
        <TdContent :value="rowData.scope.type | toLower" />
        <TdContent :value="rowData.scope.agreementID" />
        <TdContent :value="rowData.scope.csi" />
        <TdContent :value="rowData.scope.numberOfLicenses" />
        <td>
          <b-icon
            v-tooltip="options('Show Clusters')"
            type="is-link"
            class="hosts-icon"
            pack="fas"
            icon="server"
            @click.native="
              openModal(
                'Clusters',
                rowData.scope.clusters,
                rowData.scope.agreementID
              )
            "
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
            @click.native="
              openModal('Hosts', rowData.scope.hosts, rowData.scope.agreementID)
            "
            v-if="rowData.scope.hosts.length > 0"
          />
          <span v-else>-</span>
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
    openModal(type, data, agreeID = ' - ') {
      this.$buefy.modal.open({
        component: MysqlAssociatedModal,
        hasModalCard: true,
        props: {
          agreementType: type,
          agreementData: data,
          agreementNumber: agreeID
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
